<?php

$persons = $page->persons()->toStructure();

if( $persons->count() < 1 ){
  return;
}

?>
<div class="row persons">

  <div class="key">
    Persons
  </div>

  <ul class="value">

    <?php foreach( $persons as $person ): ?>

      <li><?= $person->name() ?></li>

    <?php endforeach; ?>

  </ul>

</div>
