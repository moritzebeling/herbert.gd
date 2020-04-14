<?php

/**
 * general site configuration
 *
 */

 return [

   'home' => 'index',

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

 ];
