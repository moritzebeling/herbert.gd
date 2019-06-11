<?php

/**
 * general site configuration
 *
 */

return [

    // while debugging
    'debug' => true,
    'cache' => false,
    'whoops' => true,
    'panel' =>[
        'install' => true
    ],

    'thumbs' => [
      'srcsets' => [
        'default' => [240, 320, 480, 640, 720, 920, 1020, 1280, 1366, 1440, 1600, 1920, 2560],
        'thumbnail' => [240, 320, 480, 640, 720, 920, 1020, 1280]
      ]
    ]

];
