<?php

/**
 * herbert
 *
 */

class SiteSearch {

  public function url( array $query ): string
  {

    $string = '?' . http_build_query( $query );

    return kirby()->site()->url() .'/'. option('herbert.site-search.search.path') . $string;

  }

  public function slug( array $query ): string
  {

    return strtolower( http_build_query( $query ) );

  }

  public function link( $query, string $text = '' ): string
  {

    if( $text === '' && is_string( $query ) ){
      $text = ucwords( $query );
    }

    if( !is_array( $query ) ){
      $query = [
        'search' => $query
      ];
    }

    $count = SiteSearch::query( $query )->count();

    if( $count > 0 ){
       $count = '<span class="count">'.$count.'</span>';
    } else {
      $count = '';
    }

    return '<a title="Search for '.$text.'" class="keyword" href="'.SiteSearch::url( $query ).'">'.$text.$count.'</a>';

  }

  public function date( string $format, string $date, string $text ): string
  {

    if( $format === 'semester' ){
      $query = [
        'semester' => $date
      ];
    } else {
      $query = [
        'semester' => $date
        // 'date' => $date
      ];
    }

    return SiteSearch::link( $query, $text );
  }

  public function validateQuery( array $query ): array {

    if( isset($query['date']) ){

      $time = strtotime( $query['date'] );

      $frame = 3600 * 24 * 30;

      $query['after'] = $time - $frame;
      $query['before'] = $time + $frame;

      unset( $query['date'] );

    } else if ( isset($query['semester']) ){

      $time = strtotime( $query['semester'] );

      $month = date('n', $time);
      $year = date('Y', $time);

      if( $month <= 3 ){
        $query['after'] = strtotime( ($year-1).'-10-01' );
        $query['before'] = strtotime( $year.'-03-31' );
      } else if( $month <= 9 ){
        $query['after'] = strtotime( $year.'-04-01' );
        $query['before'] = strtotime( $year.'-09-30' );
      } else {
        $query['after'] = strtotime( $year.'-10-01' );
        $query['before'] = strtotime( ($year+1).'-03-31' );
      }

      unset( $query['semester'] );

    }

    return $query;
  }

  public function query( array $query ): Kirby\Cms\Pages
  {

    $kirby = kirby();

    if( option('herbert.site-search.cache',false) ){

      $slug = SiteSearch::slug( $query );

      $cache = $kirby->cache('herbert.site-search');

      $result = $cache->get( $slug );
      if( $result !== null ){
        // return cache
        $pages = [];
        foreach( $result as $page ){
          $pages[] = page( $page['id'] );
        }
        return new Pages( $pages );
      }

    }

    $query = SiteSearch::validateQuery( $query );

    $result = $kirby->collection('posts');

    foreach ($query as $key => $value) {
      switch ($key) {
        case 'after':
          $result = $result->filter(function ( $page ) use ( $value ) {
            return $page->date()->toDate() > $value;
          });
          break;
        case 'before':
          $result = $result->filter(function ( $page ) use ( $value ) {
            return $page->date()->toDate() < $value;
          });
          break;
        case 'search':
          $result = $result->bettersearch( $value );
          break;
        default:
          $result = $result->filterBy( $key, $value );
          break;
      }
    }

    if( option('herbert.site-search.cache',false) ){

      // save the cache
      $cache->set( $slug, $result->toArray(), option('herbert.site-search.expires',1440) );

    }

    return $result;

  }

}

Kirby::plugin('herbert/site-search', [

  'options' => [
    'search.path' => 'search',
    'cache' => true,
    'expires' => 1440
  ],

]);
