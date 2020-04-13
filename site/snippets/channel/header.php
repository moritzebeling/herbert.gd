<?php

$channel = isset( $channel ) ? $channel : $page;

?>
<header class="channel-header">

	<h1><?= $channel->title() ?></h1>

	<div><?= $channel->description()->kirbytext(); ?></div>

	<?php snippet('fields/links'); ?>

	<div class="search">

    <form>
      <input type="text" name="q" value="">
      <input type="submit" value="Search">
    </form>

  </div>

</header>
