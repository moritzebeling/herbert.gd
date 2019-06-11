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
    <figure onclick="gallerySwitch(event)">

      <?php snippet('picture', ['image' => $image, 'figtag' => false ]); ?>

      <figcaption>
        <span class="count"><?= $i.' / '.$c; $i++; ?></span>
        <?= $image->caption()->html(); ?>
      </figcaption>

    </figure>
  <?php endforeach ?>
</section>
