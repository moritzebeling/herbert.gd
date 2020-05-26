<?php

return function ( $page ) {

	return [
	  'posts' => $page->posts(),
		'layout' => $page->layout(),
	];
};
