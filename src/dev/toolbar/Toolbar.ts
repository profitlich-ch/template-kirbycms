import Cookies from 'js-cookie';

export class Toolbar {
    // Private Eigenschaften der Klasse
    private isDevToolsLoaded: boolean = false;
    private isDevToolsShown: boolean = false;
    private grid: 'lines' | 'ribbons' = 'lines';
    private devDiv: HTMLDivElement | null = null;
    private devDivText: HTMLDivElement | null = null;

    constructor() {
        this.loadFromCookie();
        this.setupEventListeners();
    }

    /**
     * Überprüft Cookies beim Initialisieren und lädt die DevTools, falls nötig.
     */
    private loadFromCookie(): void {
        const devToolsCookie = Cookies.get('devTools'); // <-- Geändert
        if (devToolsCookie) {
            const devToolsArray = devToolsCookie.split(',');
            if (devToolsArray[0] === 'true') {
                this.grid = devToolsArray[1] === 'ribbons' ? 'ribbons' : 'lines';
                this.initialiseDevTools();
            }
        }
    }

    /**
     * Richtet die globalen Event-Listener ein.
     */
    private setupEventListeners(): void {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Control') {
                event.preventDefault();

                if (!this.isDevToolsLoaded) {
                    this.initialiseDevTools();
                } else {
                    const newIsShown = !this.isDevToolsShown;
                    if (newIsShown) {
                        this.grid = this.grid === 'lines' ? 'ribbons' : 'lines';
                    }
                    this.toggleDevTools(newIsShown, this.grid);
                }
            }
        });
    }

    /**
     * Erstellt die notwendigen DOM-Elemente für die Toolbar.
     */
    private initialiseDevTools(): void {
        if (this.isDevToolsLoaded) return;

        this.devDiv = document.createElement('div');
        this.devDiv.classList.add('dev-toolbar');
        this.devDiv.id = 'dev-toolbar';
        document.body.prepend(this.devDiv);

        this.devDivText = document.createElement('div');
        this.devDivText.classList.add('dev-toolbar__text');
        this.devDivText.id = 'dev-toolbar__text';
        this.devDiv.append(this.devDivText);

        const devDivRaster = document.createElement('div');
        devDivRaster.classList.add('dev-toolbar__grid');
        devDivRaster.id = 'dev-toolbar__grid';
        this.devDiv.append(devDivRaster);

        window.addEventListener('resize', this.updateDevDisplay);

        this.isDevToolsLoaded = true;
        this.toggleDevTools(true, this.grid);
        this.updateDevDisplay();
    }

    /**
     * Aktualisiert die Anzeige mit Layout-Name und Fenstergrösse.
     */
    private updateDevDisplay = (): void => {
        if (this.isDevToolsShown && this.devDivText) {
            const layout = document.body.getAttribute('data-layout') || 'default';
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            this.devDivText.textContent = `${layout} @ ${windowWidth}×${windowHeight}`;
        }
    }

    /**
     * Schaltet die DevTools an/aus und speichert den Zustand im Cookie.
     * @param isOn - Soll die Toolbar sichtbar sein?
     * @param grid - Welcher Grid-Modus ('lines' oder 'ribbons')?
     */
    private toggleDevTools(isOn: boolean, grid: 'lines' | 'ribbons'): void {
        this.isDevToolsShown = isOn;
        document.body.setAttribute('data-dev', String(isOn));
        document.body.setAttribute('data-dev-grid', grid);

        // Cookie mit js-cookie setzen
        Cookies.set('devTools', `${isOn},${grid}`, { // <-- Geändert
            expires: new Date(2099, 1, 1),
            domain: window.location.hostname,
            secure: true,
            sameSite: 'lax'
        });

        this.updateDevDisplay();
    }
}