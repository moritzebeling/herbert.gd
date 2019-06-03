<?php

/**
 * semester
 * 
 * snippet for rendering the semester field group
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
  $field = 'semester'; 
}

$term = $page->{$field.'_term'}();
$year = $page->{$field.'_year'}();

// abort if field is empty
if( !$term && !$year ){
  return;
}

// output
?>
<div class="semester">

  <?php if( $term ): ?>
    <span class="term"><?= ucwords( $term ) ?></span>
  <?php endif; ?>

  <?php if( $year ): ?>
    <span class="year"><?= $year ?></span>
  <?php endif; ?>
  
</div>