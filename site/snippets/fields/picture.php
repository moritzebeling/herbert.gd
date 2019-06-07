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
  <figure class="progressive">
    <img
      src="<?= $image->resize(10)->url() ?>"
      data-progressive="<?= $image->resize(1000)->url() ?>"
      class="progressive__img progressive--not-loaded"
      alt="<?= $image->caption()->html(); ?>" />
  </figure>
</div>
