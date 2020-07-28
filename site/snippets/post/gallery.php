<?php

$images = isset( $images ) ? $images : $page->gallery();

$count = $images->count();
if( $count < 1 ){
	return;
}

?>
<section class="swiper-container gallery">
	<div class="swiper-wrapper">
		<?php foreach($images as $image): ?>

			<div class="swiper-slide">

				<?php if( $image->videoUrl()->isEmpty() ): ?>
					<figure class="<?php e($image->isPortrait(),'portrait','landscape') ?>">
						<div class="image">
							<?= $image->tag() ?>
						</div>
				<?php else: ?>
					<figure class="video">
						<?php snippet('post/video',[
							'videoUrl' => $image->videoUrl()->value()
						]); ?>
				<?php endif; ?>

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

			</div>

		<?php endforeach ?>

	</div>

	<div class="controls">

		<div class="swiper-button-prev" title="Show previous image"></div>
		<div class="swiper-button-next" title="Show next image"></div>

	</div>

</section>

<?php if( $count === 1 ){
	return;
} ?>

<?= css('assets/css/swiper.css') ?>
<?= js('assets/js/swiper.min.js') ?>
<script>

	let swpr = new Swiper( '.swiper-container',{
		speed: 700,
		spaceBetween: 20,
		loop: true,
		lazy: true,
		grabCursor: true,
		autoHeight: true,
		initialSlide: 0,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
	});

	console.log( swpr );

</script>
