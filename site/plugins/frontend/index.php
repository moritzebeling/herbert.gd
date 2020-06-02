<?php

/**
 * herbert
 *
 */

Kirby::plugin('herbert/frontend', [

  'routes' => [
    [
      'pattern' => '(:all).json',
      'action'  => function ( $path ) {

        $kirby = kirby();

        if( $page = page( $path ) ){

          return [
            'status' => 200,
            'request' => $kirby->request()->url()->toString(),
            'data' => $page->json()
          ];

        }

      }
    ]
  ]

]);
