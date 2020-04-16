<?php

$images = isset( $images ) ? $images : $page->images();

if( $images->count() < 1 ){
  return;
}

?>
<section class="swiper-container gallery">
  <div class="swiper-wrapper">
    <?php foreach($images as $image): ?>

      <div class="swiper-slide">

        <figure class="img">

          <?= $image->tag() ?>

          <?php if( $image->description()->isNotEmpty() ): ?>
            <figcaption><?= $image->description()->kirbytext(); ?></figcaption>
          <?php endif; ?>

        </figure>

      </div>

    <?php endforeach ?>
  </div>

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

</section>
