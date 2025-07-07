import kirby from 'vite-plugin-kirby'
import mkcert from 'vite-plugin-mkcert'

const HTTP_PORT = 3000;

export default ({ mode }) => ({
    // During development the assets are served directly from vite's dev server
    // e.g. `localhost:5173/index.js`, but for production they are placed inside
    // the `build.outDir`, `/dist/` in this case.
    base: mode === 'development' ? '/' : '/site/assets/',

    root: './', // Standard ist das Projektverzeichnis

    build: {
        // Where your manifest an bundled assets will be placed. This example
        // assumes you use a public folder structure.
        outDir: 'site/assets',
        assetsDir: 'site/assets',

        // Your entry file(s).
        // Note: CSS files can either be a separate entry. In this case you use it
        // like this: `<?= vite->css('main.css') ?>`. Or you can only add the
        // `main.js` as an entry and import the CSS in your JS file. In this case
        // you would use the JS file name: `vite()->css('main.js')`.
        rollupOptions: {
            input: {
                app: '/src/App.ts',
                dev: '/src/Dev.ts',
            }
        },
    },

    server: {
        manifest: true,
        https: true,
        // Special address that respond to _all_ network requests
        host: '0.0.0.0',
        // Use a strict port because we have to hard code this in vite.php
        strictPort: true,
        // This is the port running "inside" the Web container
        // It's the same as continer_port in .ddev/config.yaml
        port: HTTP_PORT,
        origin: 'https://localhost:3000',
        cors: true,
    },

    plugins: [
        mkcert(),
        kirby({
            // By default Kirby's templates, snippets, controllers, models, layouts and
            // everything inside the content folder will be watched and a full reload
            // triggered. All paths are relative to Vite's root folder.
            watch: [
                '/site/(templates|snippets|controllers|models|layouts)/**/*.php',
                '/content/**/*',
            ],
            // or disable watching
            //   watch: false,

            // Where the automatically generated `vite.config.php` file should be
            // placed. This has to match Kirby's config folder!
            kirbyConfigDir: 'site/config', // default
        }),
    ],
})