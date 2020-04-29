<?php

$images = isset( $images ) ? $images : $page->images();

$count = $images->count();
if( $count < 1 ){
  return;
}

?>
<section class="images">
  <?php foreach($images->sortBy('sort') as $image):
    if( $image->isPortrait() ){
      $class = "portrait";
    } else {
      $class = "landscape";
    }
    ?>

    <figure class="<?= $class ?>">

      <div class="img">
        <?= $image->tag() ?>
      </div>

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
