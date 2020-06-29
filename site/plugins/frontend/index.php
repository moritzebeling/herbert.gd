<?php

/**
 * herbert
 *
 */

Kirby::plugin('herbert/frontend', [

  'options' => [
    'cache' => true,
    'expires' => 1440
  ],

  'routes' => [
    [
      'pattern' => '(:all).json',
      'action'  => function ( $path ) {

        $kirby = kirby();

        if( $page = kirby()->page( $path ) ){

        } else {
          $page = kirby()->site()->homePage();
        }

        $result = null;
        $cached = false;

        if( option('herbert.frontend.cache',false) ){

          $cache = $kirby->cache('herbert.frontend');
          $result = $cache->get( $page->id() );

          if( $result !== null ){
            $cached = true;
          }

        }

        if( $result === null ){
          $result = $page->json();

          if( option('herbert.frontend.cache',false) ){
            $cache->set( $page->id(), $result, option('herbert.frontend.expires',1440) );
          }

        }

        return [
          'status' => 200,
          'request' => $kirby->request()->url()->toString(),
          'cached' => $cached,
          'data' => $result
        ];

      }
    ]
  ]

]);
