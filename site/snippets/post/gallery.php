<?php

$images = isset( $images ) ? $images : $page->images();

if( $images->count() < 1 ){
  return;
}

?>
<section class="swiper-container gallery">
  <div class="swiper-wrapper">
    <?php foreach($images as $image): ?>

      <figure class="swiper-slide">

        <?= $image->tag() ?>

        <?php if( $image->description()->isNotEmpty() ): ?>
          <figcaption><?= $image->description()->kirbytext(); ?></figcaption>
        <?php endif; ?>

      </figure>

    <?php endforeach ?>
  </div>

  <div class="swiper-pagination"></div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

</section>
