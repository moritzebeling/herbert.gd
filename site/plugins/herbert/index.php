<?php

/**
 * herbert
 *
 */

Kirby::plugin('moritz-ebeling/herbert', [

    'siteMethods' => [
        'domains' => function () {
            // returns a list of all domains
            return $this->children()->listed()->template('domain');
        },
        'feed' => function ( $domain = false, $features = true ) {
            // $domain must be page object

            if( $domain === false ){

                // returns a list of all posts accros all domains
                return $this->domains()->children()->listed();

            }

            $posts = $domain->children()->listed();

            if ( $features === true ) {

                // including features from other domains
                $features = $this->domains()->not( $domain )->children()->listed()->filterBy( 'channels', $domain->id(), ',' );
                $posts = $posts->merge( $features )->sortBy('date','desc');

            }

            return $posts;

        }
    ],

    'pageMethods' => [
        'domain' => function () {

            if( $this->depth() > 1 ){
                $domain = $this->parents()->last();
            } else {
                $domain = $this;
            }

            if( $domain->intendedTemplate() == 'domain' ){
                return $domain;
            }

            return $this->site();

        },
        'otherDomains' => function () {

            $domain = $this->domain();
            return kirby()->site()->domains()->not( $domain );

        },
        'published' => function(){
            if( $this->intendedTemplate() != 'default' ){
              return false;
            }
            if( $this->isSemester()->isTrue() ){
              $semester = $this->semester()->yaml();
              $semester = $semester[0];
              return $semester['term'] . ' ' . $semester['year'];
            } else {
              return $this->date();
            }
        }
    ],

    'routes' => [
        [
            'pattern' => '',
            'action'  => function () {
                go( kirby()->site()->domains()->first()->url() );
            }
        ]
    ],

    'controllers' => [
        'search' => function ( $site ) {
            $query   = get('q');
            $results = $site->index()->listed()->search($query, 'title|subtitle|tags|description|body|credits|location|date');

            return [
              'query'   => $query,
              'results' => $results,
            ];
        }
    ]


]);
