<?php

$images = isset( $images ) ? $images : $page->gallery();

$count = $images->count();
if( $count < 1 ){
  return;
}

?>
<section class="gallery">
  <?php foreach($images as $image): ?>

    <?php if( $image->videoUrl()->isEmpty() ): ?>
      <figure class="<?php e($image->isPortrait(),'portrait','landscape') ?>">
        <div class="image">
          <?= $image->tag() ?>
        </div>
    <?php else: ?>
      <figure class="video">
        <div class="player">
          <?= video( $image->videoUrl()->value() ) ?>
        </div>
    <?php endif; ?>

      <?php if( $image->description()->isNotEmpty() || $image->credits()->isNotEmpty() ): ?>
        <figcaption>
          <?php if( $image->description()->isNotEmpty() ): ?>
            <?= $image->description()->kirbytextinline(); ?>
          <?php endif; ?>
          <?php if( $image->credits()->isNotEmpty() ): ?>
            <span class="credits">&copy; <?= $image->credits()->html(); ?></span>
          <?php endif; ?>
        </figcaption>
      <?php endif; ?>

    </figure>

  <?php endforeach ?>
</section>
