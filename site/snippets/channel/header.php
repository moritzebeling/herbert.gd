<?php

$channel = isset( $channel ) ? $channel : $page;

?>
<header>
	<?php if( $channel->showDescription()->isTrue() || $channel->description()->isNotEmpty() ): ?>

		<div class="about">
			<?= $channel->description()->kirbytext(); ?>
		</div>

		<?php snippet('fields/links'); ?>

	<?php endif; ?>
</header>
