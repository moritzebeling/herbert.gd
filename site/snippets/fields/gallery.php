<?php

/**
 * gallery
 *
 * snippet for rendering an image gallery
 *
 * recieves
 * - $page (field owner)
 * – $field (field name)
 *
 */

// validate owner
if( !isset( $page ) ){
  $page = $kirby->site();
}

// validate field
if( !isset( $field ) ){
  $field = 'gallery';
}

$images = $page->{$field}()->toFiles();

// abort if empty
if( !$images ){
  return;
}

$i = 1;
$c = $images->count();

// output
?>
<section class="gallery">
  <?php foreach($images as $image):
    // image caption
    $caption = $image->caption();
    ?>
    <figure onclick="gallerySwitch(event)">
      <img src="<?= $image->url() ?>" <?php if( $caption ): ?>alt="<?= $caption; ?>"<?php endif; ?>>
      <?php if( $caption ): ?>
        <figcaption>
          <span class="count"><?= $i.' / '.$c; $i++; ?></span>
          <?= $caption; ?>
        </figcaption>
      <?php endif; ?>
    </figure>
  <?php endforeach ?>
</section>
