<?php

/**
 * coverImage
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
  $field = 'coverImage'; 
}

$image = $page->{$field}()->toFile();

// abort if image doesn’t exist
if( !$image ){
  return;
}

// output
?>
<div class="coverImage">
  <figure>
    <img src="<?= $image->url() ?>">
  </figure>
</div>