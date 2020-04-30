<?php

$channel = isset( $channel ) ? $channel : $page;

?>
<header class="channel-header">

	<h1 class="title"><?= $channel->title() ?></h1>

	<div class="description"><?= $channel->description()->kirbytext(); ?></div>

	<?php snippet('fields/links'); ?>

</header>
