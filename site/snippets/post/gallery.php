<?php

$images = isset( $images ) ? $images : $page->images();

$count = $images->count();
if( $count < 1 ){
  return;
}



?>
<section class="swiper-container gallery <?php e( $count > 1, 'multiple' ) ?>">
  <div class="swiper-wrapper">
    <?php foreach($images->sortBy('sort') as $image): ?>

      <div class="swiper-slide">

        <figure>

          <div class="img">
            <?= $image->tag() ?>
          </div>

          <?php if( $image->description()->isNotEmpty() ): ?>
            <figcaption><?= $image->description()->kirbytext(); ?></figcaption>
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
