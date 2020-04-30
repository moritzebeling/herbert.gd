<?php

return function ( $kirby ) {

	$posts = $kirby->collection('featured');

	return [
	  'posts' => $posts
	];
};
