<?php

$images = isset( $images ) ? $images : $page->gallery();

$count = $images->count();
if( $count < 1 ){
	return;
}

?>
<section class="swiper-container gallery <?php e( $count > 1, 'multiple' ) ?>">
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

	<?php if( $count > 1 ): ?>

		<div class="controls">

			<div class="left">
				<div class="swiper-pagination"></div>
			</div>

			<div class="right">
				<div class="swiper-button-index">Index</div>
				<div class="swiper-button-prev"><span class="arrow"></span></div>
				<div class="swiper-button-next"><span class="arrow"></span></div>
			</div>

		</div>

	<?php endif; ?>

</section>
