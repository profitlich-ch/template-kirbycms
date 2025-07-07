import 'lazysizes';
import { MediaQueries } from './utils/MediaQueries.ts';
import { BodyScrolled } from './utils/BodyScrolled.ts';

class App {
    public mediaQuery: MediaQueries;
    public bodyScrolledEvent: BodyScrolled;

    constructor() {
        this.mediaQuery = new MediaQueries();
        this.bodyScrolledEvent = new BodyScrolled();

        this.initialize();
    }

    private initialize() {
        console.log('App initialized');
    }
}

export const app = new App();