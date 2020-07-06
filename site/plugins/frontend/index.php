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
    'cache' => false,
    'expires' => 1440
  ],

  'routes' => [
    [
      'pattern' => '(:all).json',
      'action'  => function ( $path ) {

        $kirby = kirby();

        $request = $kirby->request()->path()->toString();
        if( $kirby->request()->url()->hasQuery() ){
          $request .= '?' . $kirby->request()->query()->toString();
        }

        $requestId = str_replace('?','/',$request);

        $result = null;
        $cached = false;

        if( option('herbert.frontend.cache',false) ){

          $cache = $kirby->cache('herbert.frontend');
          $result = $cache->get( $requestId );

          if( $result !== null ){
            $cached = true;
            // ready for return
          }

        }

        if( $result === null ){
          // create result

          // find the right page
          $page = $kirby->page( $path );
          if( $page === null ){
            $page = $kirby->site()->homePage();
          }

          // get json data about page
          $result = $page->json();

          // check if page carries posts
          if( method_exists( $page, 'posts' ) ) {

            // check if children were queried
            $query = $kirby->request()->get();
            if( !empty( $query ) ){
              // $result['posts'] = $page->posts()->query( $query );
              $result['posts'] = $page->posts()->json();
            } else {
              $result['posts'] = $page->posts()->json();
            }

          }

          if( option('herbert.frontend.cache',false) ){
            $cache->set( $requestId, $result, option('herbert.frontend.expires',1440) );
          }

        }

        return [
          'status' => 200,
          'request' => $request,
          'cached' => $cached,
          'data' => $result
        ];

      }
    ],
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
