<?php

return function ($kirby) {

    $posts = $kirby->collection('posts');

    $query = kirby()->request()->get();
    $posts = SiteSearch::query($query);

    return [
        'results' => $posts
    ];
};
