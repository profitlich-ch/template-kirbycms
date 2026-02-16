import { defineConfig, loadEnv } from 'vite';
import kirby from 'vite-plugin-kirby'
import manifestSRI from 'vite-plugin-manifest-sri'
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'
import * as fs from 'fs';
import * as path from 'path';

// Match ports in .ddev/config.yaml and config/vite.php
const HTTPS_PORT = 5173;
const configJson = JSON.parse(fs.readFileSync('./src/config.json', 'utf8'));

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        root: '.',
        base: command === 'serve' ? '/' : '/dist/',

        build: {
            outDir: 'dist',
            assetsDir: '',
            sourcemap: mode === 'development',
            // empty the out dir before writing new files
            emptyOutDir: true,
            // Activates terser for minification
            minify: 'terser',
            cssMinify: 'lightningcss',
            terserOptions: {
                compress: {
                    // drops all console.log commands
                    drop_console: true,
                },
            },
            rollupOptions: {
                input: {
                    appCss: 'src/scss/app.scss',
                    app: 'src/App.js',
                    dev: 'src/Dev.js',
                }
            },
        },

        server: {
            host: '0.0.0.0',
            port: HTTPS_PORT,
            strictPort: true,
            origin: `${env.PRIMARY_SITE_URL.replace(/:\d+$/, "")}:${HTTPS_PORT}`,
            cors: {
              origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(?::\d+)?$/,
            },
            watch: {
                ignored: [
                    '**/node_modules/**',
                    '**/vendor/**',
                ],
            },
        },

        plugins: [
            kirby({
                watch: [
                    '../site/(templates|snippets|controllers|models|layouts)/**/*.php',
                    '../content/**/*',
                ],
                kirbyConfigDir: 'site/config',
            }),
            manifestSRI(),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern',
                    importers: [{
                        canonicalize(url) {
                            return url === 'config' ? new URL('custom:config') : null;
                        },
                        load(canonicalUrl) {
                            if (canonicalUrl.toString() !== 'custom:config') return null;
                            return { contents: jsonToScss(configJson), syntax: 'scss' };
                        }
                    }],
                    loadPaths: [
                        path.resolve(__dirname, 'src/scss'),
                        path.resolve(__dirname, 'node_modules'),
                    ],
                },
            },
        },
    };
});

function jsonToScss(json) {
    const toValue = (v) => {
        if (typeof v === 'object' && v !== null) {
            return '(' + Object.entries(v).map(([k, val]) => `"${k}": ${toValue(val)}`).join(', ') + ')';
        }
        if (typeof v === 'string') return `"${v}"`;
        return v;
    };
    return Object.entries(json)
        .filter(([key]) => key !== 'README')
        .map(([key, value]) => `$${key}: ${toValue(value)};`)
        .join('\n');
}
