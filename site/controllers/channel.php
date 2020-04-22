<?php

return function ( $kirby, $page ) {

	$posts = $page->children()->listed();

	return [
	  'posts' => $posts
	];
};
