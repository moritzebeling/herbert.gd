<?php

$images = isset( $images ) ? $images : $page->gallery();

$count = $images->count();
if( $count < 1 ){
	return;
}

?>
<section class="gallery">
	<?php foreach($images as $image): ?>

		<figure class="<?php e($image->isPortrait(),'portrait','landscape') ?>">

			<div class="img">
				<?= $image->tag() ?>
			</div>

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

	<?php endforeach ?>
</section>


<link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">
<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>

<script>

	var flkty = new Flickity( '.gallery', {
		wrapAround: true,
		pageDots: false,
		adaptiveHeight: true
	});

</script>
<style>

	.flickity-viewport {
  		transition: height 0.2s;
	}

</style>
