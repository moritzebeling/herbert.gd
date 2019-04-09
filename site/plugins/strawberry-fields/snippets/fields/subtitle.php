<?php

/**
 * subtitle
 * 
 * snippet for rendering the subtitle
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
  $field = 'subtitle'; 
}

// abort if field is empty
if( $page->{$field}()->isEmpty() ){
  return;
}

// output
?>
<?= $page->{$field}()->html(); ?>