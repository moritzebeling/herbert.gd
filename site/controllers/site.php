<?php

return function ( $kirby ) {

	if( $query = get('search') ){

		$posts = $kirby->collection('posts')->search( $query );

	} else {

		$posts = $kirby->collection('featured');

	}

	return [
	  'posts' => $posts
	];
};
