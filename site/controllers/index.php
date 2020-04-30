<?php

return function ( $kirby, $page ) {

	$posts = $kirby->collection('posts');

	return [
	  'posts' => $posts,
		'layout' => 'list',
		'dateformat' => 'semester',
	];
};
