<?php

/**
 * body
 * 
 * snippet for rendering the body content
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
  $field = 'body'; 
}

// abort if field is empty
if( $page->{$field}()->isEmpty() ){
  return;
}

// output
?>
<section class="content">
  <?= $page->{$field}()->kirbytext(); ?>
</section>