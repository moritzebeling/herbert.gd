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
	'quality' => 80,
	'presets' => [
		'layload' => ['width' => 64, 'quality' => 70],
		'small' => ['width' => 640],
		'medium' => ['width' => 1200],
		'large' => ['width' => 2000],
	],
  	'srcsets' => [
  		'small' => [ 240, 360, 640 ],
  		'medium' => [480, 640, 880, 1200],
  		'large' => [640, 880, 1200, 1600, 2000, 3000],
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
