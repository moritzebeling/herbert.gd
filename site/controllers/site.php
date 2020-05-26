<?php

return function ( $kirby, $site ) {

	$posts = $kirby->collection('featured');

	return [
	  'posts' => $posts
	];
};
