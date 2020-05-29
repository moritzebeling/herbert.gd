<?php

// $videoUrl
if( !isset( $videoUrl ) ){
	return;
}

$options = [
	'youtube' => [
		'color' => 'ffffff',
		'controls' => true,
		'loop' => 1,
		'modestbranding' => 1,
		'rel' => 0,
		'showinfo' => 0,
	],
	'vimeo' => [
		'byline' => false,
		'color' => 'ffffff',
		'controls' => true,
		'loop' => true,
		'portrait' => false,
		'title' => false
	],
];

?>
<div class="player">

	<?= video( $videoUrl, $options ); ?>

</div>
