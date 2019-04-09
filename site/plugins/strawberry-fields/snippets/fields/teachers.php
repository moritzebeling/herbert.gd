<?php

/**
 * teachers
 * 
 * snippet for rendering the teachers list
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
  $field = 'teachers'; 
}

// abort if field is empty
if( $page->{$field}()->isEmpty() ){
  return;
}

// output
?>
<ul class="teachers">
  <?php foreach( $page->{$field}()->split() as $item ): ?>
    <li><?= $item; ?></li>
  <?php endforeach; ?>
</ul>