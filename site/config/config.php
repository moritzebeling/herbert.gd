<?php

/**
 * general site configuration
 *
 */

date_default_timezone_set('Europe/Berlin');

return [

  'debug' => false,
  'whoops' => false,

  'cache' => [
    'pages' => [
      'active' => true
    ],
  ],

  'smartypants' => true,

  'thumbs' => [
  	'srcsets' => [
  		'small' => [ 240, 360, 640 ],
  		'medium' => [480, 640, 880, 1200],
  		'large' => [640, 880, 1200, 1600, 2000],
  	]
  ],

  'video' => [
    'youtube' => [
  		'color' => 'ffffff',
  		'controls' => true,
  		'loop' => 1,
  		'modestbranding' => 1,
  		'rel' => 0,
  		'showinfo' => 0,
  	],
  	'vimeo' => [
  		'byline' => false,
  		'color' => 'ffffff',
  		'controls' => true,
  		'loop' => true,
  		'portrait' => false,
  		'title' => false
  	],
  ],

  'repo' => 'https://github.com/moritzebeling/herbert.gd',

];
