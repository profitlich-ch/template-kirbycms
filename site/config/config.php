<?php

return [
    'panel' => [
        'slug' => 'redaktion'
    ],
    'slugs' => 'de',
    'date'  => [
        'handler' => 'intl'
    ],
    'locale' => 'de_DE.utf-8',
    'debug' => true,
    'hooks' => [
        'page.create:after' => function ($page) {
            // Wenn die Seite noch Entwurf ist, Status auf "listed" setzen
            if ($page->isDraft()) {
                if ($page->intendedTemplate()->name() === 'intro' || $page->intendedTemplate()->name() === 'abschnitte' || $page->intendedTemplate()->name() === 'form') {
                   try {
                       $page->changeStatus('listed');
                   } catch (Exception $e) {
                       // Fehlerbehandlung (optional)
                       kirby()->log('publish-error')->error($e->getMessage());
                   }
                }
            }
        }
    ]
];