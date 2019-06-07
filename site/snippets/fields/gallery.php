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
  <?php foreach($images as $image): ?>
    <figure onclick="gallerySwitch(event)" class="progressive">
      <img
        src="<?= $image->resize(160)->url() ?>"
        class="progressive__img progressive--not-loaded"
        data-progressive="<?= $image->resize(1600)->url() ?>"
        alt="<?= $image->caption()->html(); ?>" />
      <?php if( $caption ): ?>
        <figcaption>
          <span class="count"><?= $i.' / '.$c; $i++; ?></span>
          <?= $image->caption()->html(); ?>
        </figcaption>
      <?php endif; ?>
    </figure>
  <?php endforeach ?>
</section>
