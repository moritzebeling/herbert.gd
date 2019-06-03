<?php

/**
 * datetime
 * 
 * snippet for rendering the date/time field group
 * 
 * recieves 
 * - $page (field owner)
 * 
 */

// validate owner
if( !isset( $page ) ){
  $page = $kirby->site(); 
}

$date = $page->date()->toDate('d.m.Y');
$dateEnd = $page->dateEnd()->toDate('d.m.Y');

$time = false;
if( $page->time()->isNotEmpty() ){
  $time = $page->time();
}

// abort if field is empty
if( !$date && !$time && !$dateEnd ){
  return;
}

// output
?>
<div class="datetime">

  <?php if( $date ): ?>
    <span class="date"><?= $date ?></span>
  <?php endif; ?>

  <?php if( $dateEnd ): ?>
    &minus; <span class="end"><?= $dateEnd ?></span>
  <?php endif; ?>

  <?php if( $time ): ?>
    <span class="time"><?= $time->html() ?></span>
  <?php endif; ?>

</div>