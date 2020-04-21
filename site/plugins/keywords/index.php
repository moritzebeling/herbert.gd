<?php

/**
 * herbert
 *
 */

class Keyword {

  public function url( string $keyword ): string
  {

    $query = '?' . http_build_query([
      'search' => $keyword
    ]);

    return kirby()->site()->url() .'/'. option('herbert.keywords.search.path') . $query;

  }

  public function link( string $keyword ): string
  {

    $url = Keyword::url( $keyword );
    $count = Keyword::count( $keyword );

    $html = $keyword;
    if( $count > 0 ){
       $html .= '<span class="count">'.$count.'</span>';
    }

    return '<a class="keyword" href="'.$url.'">'.$html.'</a>';

  }

  public function count( string $keyword )
  {

    $kirby = kirby();

    if( option('herbert.keywords.cache',false) ){

      $slug = Str::slug( $keyword );

      $cache = $kirby->cache('herbert.keywords');

      $count = $cache->get( $slug );
      if( $count !== null ){
        return $count;
      }
      $count = $kirby->collection('posts')->search( $keyword )->count();
      $cache->set( $slug, $count, option('herbert.keywords.expires',1440) );

      return $count;

    }

    return $kirby->collection('posts')->search( $keyword )->count();

  }

}

Kirby::plugin('herbert/keywords', [

  'options' => [
    'search.path' => 's',
    'search.parameter' => 'search',
    'cache' => true,
    'expires' => 1440
  ]

]);
