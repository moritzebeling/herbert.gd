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
        $cached = false;
        $data = null;

        if( option('herbert.frontend.cache',false) ){

          $cache = $kirby->cache('herbert.frontend');
          $data = $cache->get( $path );

          if( $data !== null ){
            $cached = true;
            // ready for return
          }

        }

        if( $data === null ){
          // create data

          // find the right page
          if( $path === 'index' ){

            $data = $kirby->site()->json( true );

          } else if( $path === 'posts' ){

            $data = $kirby->collection('posts')->json( false );

          } else if( $page = $kirby->page( $path ) ){

            $data = $page->json( true );

          } else {

            return [
              'status' => 404,
              'route' => $path,
            ];

          }

          if( option('herbert.frontend.cache',false) ){
            $cache->set( $path, $data, option('herbert.frontend.expires',1440) );
          }

        }

        return [
          'status' => 200,
          'route' => $path,
          'cached' => $cached,
          'data' => $data
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
