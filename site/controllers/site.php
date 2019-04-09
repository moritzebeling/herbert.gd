<?php

/**
 * controller to make $domain availible in templates
 * 
 */

return function ( $page ) {

    return [
        'domain' => $page->domain()
    ];

};