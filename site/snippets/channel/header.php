<?php

$channel = isset( $channel ) ? $channel : $page;

?>
<header class="channel-header">

	<h1><?= $channel->title() ?></h1>

	<div><?= $channel->description()->kirbytext(); ?></div>

</header>
