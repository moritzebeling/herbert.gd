<?php

/**
 * location
 * 
 * snippet for rendering the location field group
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
  $field = 'location'; 
}

$venue = $page->{$field.'_venue'}();
$city = $page->{$field.'_city'}();
$country = $page->{$field.'_country'}();

// abort if field is empty
if( !$venue && !$city && !$country ){
  return;
}

// output
?>
<div class="location">

  <?php if( $venue ): ?>
    <span class="venue"><?= $venue ?></span>
  <?php endif; ?>

  <?php if( $city ): ?>
    <span class="city"><?= $city ?></span>
  <?php endif; ?>

  <?php if( $country ): ?>
    <span class="country"><?= $country ?></span>
  <?php endif; ?>
  
</div>