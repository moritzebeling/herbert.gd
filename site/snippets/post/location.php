<?php

$locations = $page->location()->toStructure();

if( $locations->count() < 1 ){
  return;
}

$location = $locations->first();

// output
?>
<div class="row location">

  <div class="key">
    Location
  </div>

  <div class="value">

    <?php if( $location->name()->isNotEmpty() ): ?>
      <span class="name"><?= $location->name() ?></span>
    <?php endif; ?>

    <?php if( $location->city()->isNotEmpty() ): ?>
      <span class="city"><?= $location->city() ?></span>
    <?php endif; ?>

  </div>

</div>
