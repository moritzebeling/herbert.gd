<?php

return function ( $page ) {

	$posts = $page->children()->listed()->flip();

	$layout = $page->layout()->isNotEmpty() ? $page->layout()->value() : 'list';

	$dateFormat = $page->dateFormat()->isNotEmpty() ? $page->dateFormat()->value() : 'date';

	return [
	  'posts' => $posts,
		'layout' => $layout,
		'dateFormat' => $dateFormat,
	];
};
