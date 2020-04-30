<?php

return function ( $kirby, $page ) {

	$query = kirby()->request()->get();
	if( !empty( $query ) ){

		$posts = SiteSearch::query( $query );

	} else {

		$posts = kirby()->collection('posts');

	}

	return [
	  'posts' => $posts,
		'layout' => 'list',
		'dateformat' => 'semester',
	];
};
