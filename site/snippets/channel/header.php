<?php

$channel = isset( $channel ) ? $channel : $page;

if( ! $channel->showDescription()->isTrue() || $channel->description()->isEmpty() ){
	return;
}

?>
<header>

	<div class="about"><?= $channel->description()->kirbytext(); ?></div>

	<?php snippet('fields/links'); ?>

</header>
