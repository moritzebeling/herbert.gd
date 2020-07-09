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
          /*
          if( method_exists( $page, 'posts' ) ) {
            // check if children were queried
            $query = $kirby->request()->get();
            if( !empty( $query ) ){
              $result['posts'] = SiteSearch::query( $query )->json();
            } else {
              $result['posts'] = $page->posts()->json();
            }
          }
          */

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
    'page.*:after' => function ( $event ) {
      $page = $event->page() ? $event->page() : $event->newPage();
      switch ( $event->action() ) {
        case 'create':
        case 'delete':
        case 'changeSlug':
        case 'changeStatus':
        case 'changeTitle':
        case 'duplicate':
        case 'update':
          flushCache( $page->id() );
      }
    },
    'file.*:after' => function ( $event ) {
      $file = $event->file() ? $event->file() : $event->newFile();
      switch ( $event->action() ) {
        case 'create':
        case 'delete':
        case 'changeName':
        case 'changeSort':
        case 'replace':
        case 'update':
          flushCache( $file->parentId() );
      }
    },
    /*
		'site.update:after' => function () {
			flushCache();
		},
    */
  ]

]);
