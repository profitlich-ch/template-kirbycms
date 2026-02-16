import { run } from 'profitlich-template-toolkit/scripts/deploy';

const uploadTasks = [
    {
        name: 'Root Files (.htaccess)',
        localPattern: '.htaccess',
        localBase: '.',
        remoteDir: '/'
    },
    {
        name: 'Site (Templates, Snippets, Blueprints, Config, Plugins, Models)',
        localPattern: 'site/**/*',
        ignore: [
            'site/cache/**',
            'site/sessions/**',
            'site/accounts/**'
        ],
        localBase: 'site',
        remoteDir: '/site'
    },
    {
        name: 'Assets (Build)',
        localPattern: 'dist/**/*',
        localBase: 'dist',
        remoteDir: '/dist'
    },
    {
        name: 'Static Assets',
        localPattern: 'assets/**/*',
        localBase: 'assets',
        remoteDir: '/assets'
    }
];

run(uploadTasks);
