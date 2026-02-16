import config from './config.json' with { type: "json" };
import { MediaQueries } from 'profitlich-template-toolkit/utils/MediaQueries';
import { BodyScrolled } from 'profitlich-template-toolkit/utils/BodyScrolled';

class App {
    mediaQuery;
    bodyScrolledEvent;

    constructor() {
        this.mediaQuery = MediaQueries.getInstance(config.breakpoints);
        this.bodyScrolledEvent = BodyScrolled.getInstance();

        this.#initialize();
    }

    #initialize() {
        console.info('App initialized.');
    }
}

export const app = new App();
