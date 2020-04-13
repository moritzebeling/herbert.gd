<?php

return function ( $kirby, $page ) {
	return [
	  'posts' => $kirby->collection('posts')->filterBy('channels', $page->slug() )
	];
};
