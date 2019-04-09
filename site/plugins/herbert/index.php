<?php

/**
 * herbert
 * 
 */

Kirby::plugin('moritz-ebeling/herbert', [

    // site methods
    'siteMethods' => [
        'domains' => function () {
            // returns a list of all domains
            return $this->children()->listed()->template('domain');
        },
        'feed' => function ( $domain = false, $features = true ) {
            // $domain must be page object
            
            // returns a list of posts
            if( $domain === false ){

                // all posts accross all domains
                return $this->domains()->children()->listed();
            
            } else if ( $features === true ) {

                // only of given domain, including features
                $posts = $domain->children()->listed();
                $features = $this->domains()->not( $domain )->children()->listed()->filterBy( 'includeDomain', $domain->id(), ',' );
                return $posts->merge( $features )->sortBy('date','desc');

            } else {

                // only whithin given domain
                return $domain->children()->listed();

            }
        }
    ],

    // page methods
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

            return false;

        },
        'otherDomains' => function () {

            $domain = $this->domain();
            return kirby()->site()->domains()->not( $domain );

        }
    ],

    // routes
    'routes' => [
        [
            'pattern' => '',
            'action'  => function () {
                go( kirby()->site()->domains()->first()->url() );
            }
        ]
        ],

]);
