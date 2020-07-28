<?php

$images = isset( $images ) ? $images : $page->gallery();

$count = $images->count();
if( $count < 1 ){
	return;
}

$image = $images->first();

?>
<section class="images">

	<figure class="<?php e($image->isPortrait(),'portrait','landscape') ?>">

		<?= $image->tag() ?>

		<?php if( $image->description()->isNotEmpty() || $image->credits()->isNotEmpty() ): ?>
			<figcaption>
				<?php if( $image->description()->isNotEmpty() ): ?>
					<?= $image->description()->html(); ?>
				<?php endif; ?>
				<?php if( $image->credits()->isNotEmpty() ): ?>
					<span class="credits">&copy; <?= $image->credits()->html(); ?></span>
				<?php endif; ?>
			</figcaption>
		<?php endif; ?>

	</figure>

</section>
