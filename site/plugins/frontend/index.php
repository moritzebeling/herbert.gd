<?php

/**
 * herbert
 *
 */

function flushCache( $id = false ){

  $cache = kirby()->cache('herbert.frontend');

	if( $id === false ){
    $cache->flush();
	} else {
    $cache->remove( $id . '.json' );
  }

}

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

        $id = $page->id();
        $result = null;
        $cached = false;

        if( option('herbert.frontend.cache',false) ){

          $cache = $kirby->cache('herbert.frontend');
          $result = $cache->get( $id );

          if( $result !== null ){
            $cached = true;
          }

        }

        if( $result === null ){
          $result = $page->json();

          if( option('herbert.frontend.cache',false) ){
            $cache->set( $id, $result, option('herbert.frontend.expires',1440) );
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
  ],
  'hooks' => [
		// files
		'file.changeName:after' => function ( $file, $old ) {
			flushCache( $file->parentId() );
		},
		'file.changeSort:after' => function ( $file, $old ) {
      flushCache( $file->parentId() );
		},
		'file.create:after' => function ( $file ) {
      flushCache( $file->parentId() );
		},
		'file.delte:after' => function ( $status, $file ) {
      flushCache( $file->parentId() );
		},
		'file.replace:after' => function ( $file, $old ) {
      flushCache( $file->parentId() );
		},
		'file.update:after' => function ( $file, $old ) {
      flushCache( $file->parentId() );
		},
		// pages
		'page.changeSlug:after' => function ($page, $old) {
			flushCache( $page->id() );
		},
		'page.changeStatus:after' => function ($page, $old) {
			flushCache( $page->id() );
		},
		'page.changeTitle:after' => function ($page, $old) {
			flushCache( $page->id() );
		},
		'page.create:after' => function ($page) {
			flushCache( $page->id() );
		},
		'page.delete:after' => function ($status, $page) {
			flushCache( $page->id() );
		},
		'page.duplicate:after' => function ($page) {
			flushCache( $page->id() );
		},
		'page.update:after' => function ($page, $old) {
			flushCache( $page->id() );
		},
		// site
    /*
		'site.update:after' => function () {
			flushCache();
		},
    */
  ]

]);
