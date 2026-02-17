<?php

include __DIR__ . '/../vendor/autoload.php';

$base    = dirname(__DIR__);
$storage = $base . '/storage';

$kirby = new Kirby([
    'roots' => [
        'index'    => __DIR__,
        'base'     => $base,
        'content'  => $base . '/content',
        'site'     => $base . '/site',
        'storage'  => $storage,
        'accounts' => $storage . '/accounts',
        'cache'    => $storage . '/cache',
        'sessions' => $storage . '/sessions',
    ]
]);

echo $kirby->render();
