<?php

/**
 * strawberry-fields
 * 
 * toolbox that provides
 * - blueprints with simple but reusable fields
 * - snippets to render them
 * 
 */

Kirby::plugin('moritz-ebeling/strawberry-fields', [

  // blueprints
  'blueprints' => [

    // fields
    'fields/authors' =>     __DIR__ . '/blueprints/fields/authors.yml',
    'fields/body' =>        __DIR__ . '/blueprints/fields/body.yml',
    'fields/city' =>        __DIR__ . '/blueprints/fields/city.yml',
    'fields/country' =>     __DIR__ . '/blueprints/fields/country.yml',
    'fields/coverImage' =>  __DIR__ . '/blueprints/fields/coverImage.yml',
    'fields/date' =>        __DIR__ . '/blueprints/fields/date.yml',
    'fields/description' => __DIR__ . '/blueprints/fields/description.yml',
    'fields/gallery' =>     __DIR__ . '/blueprints/fields/gallery.yml',
    'fields/hostname' =>    __DIR__ . '/blueprints/fields/hostname.yml',
    'fields/line' =>        __DIR__ . '/blueprints/fields/line.yml',
    'fields/link' =>        __DIR__ . '/blueprints/fields/link.yml',
    'fields/logo' =>        __DIR__ . '/blueprints/fields/logo.yml',
    'fields/newTab' =>      __DIR__ . '/blueprints/fields/newTab.yml',
    'fields/includeDomain' =>__DIR__ . '/blueprints/fields/includeDomain.yml',
    'fields/semester' =>    __DIR__ . '/blueprints/fields/semester.yml',
    'fields/subtitle' =>    __DIR__ . '/blueprints/fields/subtitle.yml',
    'fields/tags' =>        __DIR__ . '/blueprints/fields/tags.yml',
    'fields/teachers' =>    __DIR__ . '/blueprints/fields/teachers.yml',
    'fields/time' =>        __DIR__ . '/blueprints/fields/time.yml',
    'fields/venue' =>       __DIR__ . '/blueprints/fields/venue.yml',
    'fields/year' =>        __DIR__ . '/blueprints/fields/year.yml',

  ],

  // snippets
  'snippets' => [

    // fields
    'fields/coverImage' =>  __DIR__ . '/snippets/fields/coverImage.php',
    'fields/subtitle' =>    __DIR__ . '/snippets/fields/subtitle.php',

    'fields/authors' =>     __DIR__ . '/snippets/fields/authors.php',
    'fields/teachers' =>    __DIR__ . '/snippets/fields/teachers.php',
    'fields/semester' =>    __DIR__ . '/snippets/fields/semester.php',
    'fields/location' =>    __DIR__ . '/snippets/fields/location.php',
    'fields/datetime' =>    __DIR__ . '/snippets/fields/datetime.php',

    'fields/gallery' =>     __DIR__ . '/snippets/fields/gallery.php',
    'fields/body' =>        __DIR__ . '/snippets/fields/body.php',

    'fields/link' =>        __DIR__ . '/snippets/fields/link.php',
    'fields/tags' =>        __DIR__ . '/snippets/fields/tags.php',

  ],

]);
