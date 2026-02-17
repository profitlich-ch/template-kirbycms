import { run } from 'profitlich-template-toolkit/scripts/deploy';

const uploadTasks = [
    {
        name: 'Public (index.php, .htaccess)',
        localPattern: 'public/**/*',
        localBase: 'public',
        remoteDir: '/public',
        ignore: [
            'public/dist/**',
            'public/assets/**',
            'public/media/**',
        ]
    },
    {
        name: 'Site (Templates, Snippets, Blueprints, Config, Plugins, Models)',
        localPattern: 'site/**/*',
        localBase: 'site',
        remoteDir: '/site'
    },
    {
        name: 'Assets (Build)',
        localPattern: 'public/dist/**/*',
        localBase: 'public/dist',
        remoteDir: '/public/dist'
    },
    {
        name: 'Static Assets',
        localPattern: 'public/assets/**/*',
        localBase: 'public/assets',
        remoteDir: '/public/assets'
    }
];

run(uploadTasks);
