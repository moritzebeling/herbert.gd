<?php

$images = isset( $images ) ? $images : $page->images();

if( $images->count() < 1 ){
  return;
}

?>
<section class="gallery">
  <?php foreach($images as $image): ?>

    <?= $image->figure( true ) ?>

  <?php endforeach ?>
</section>
