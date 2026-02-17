import { run } from 'profitlich-template-toolkit/scripts/copy-files';

const copyTasks = [
    {
        name: 'snippets',
        src: ['src/snippets/**/*.php', '!src/snippets/**/_*.*'],
        dest: 'site/snippets',
        base: 'src/snippets'
    },
    {
        name: 'snippetsAssets',
        src: ['src/snippets/**/*.+(svg|jpg|jpeg|gif|png|html)', '!src/snippets/**/_*.*'],
        dest: 'public/assets/snippets',
        base: 'src/snippets'
    },
];

run(copyTasks);
