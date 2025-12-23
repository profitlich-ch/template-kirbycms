import { Toolbar } from './dev/toolbar/Toolbar.ts';

class Dev {
    public toolbar: Toolbar;

    constructor() {
        this.toolbar = new Toolbar();

        this.initialize();
    }

    private initialize() {
        console.log('Dev initialized');
    }
}

export const app = new Dev();