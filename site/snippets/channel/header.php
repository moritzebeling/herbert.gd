<?php

$channel = isset( $channel ) ? $channel : $page;

if( ! $channel->showDescription()->isTrue() || $channel->description()->isEmpty() ){
	return;
}

?>
<header class="channel-header">

	<div class="description"><?= $channel->description()->kirbytext(); ?></div>

	<?php snippet('fields/links'); ?>

</header>
