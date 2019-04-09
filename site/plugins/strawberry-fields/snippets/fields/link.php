<?php

/**
 * link
 * 
 * snippet for rendering an external link button
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
  $field = 'link'; 
}

// abort if field is empty
if( $page->{$field}()->isEmpty() ){
  return;
}

// output
?>
<div class="external-link">
  <a class="button" target="_blank" href="<?= $page->{$field}() ?>"><?= parse_url( $page->{$field}(), PHP_URL_HOST ) ?></a>
</div>