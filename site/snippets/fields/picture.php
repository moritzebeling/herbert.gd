<?php

/**
 * picture
 *
 * snippet for rendering the cover image
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
  $field = 'picture';
}

$image = $page->{$field}()->toFile();

// abort if image doesn’t exist
if( !$image ){
  return;
}

// output
?>
<div class="thumbnail">
  <figure>
    <img src="<?= $image->url() ?>"
      srcset="<?= $image->srcset([300, 450, 600, 800, 1000, 1600]) ?>">
  </figure>
</div>
