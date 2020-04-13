<?php

$persons = $page->persons()->toStructure();

if( $persons->count() < 1 ){
  return;
}

?>
<ul class="persons">
  People involved:
  <?php foreach( $persons as $person ): ?>

    <li><?= $person->name() ?></li>

  <?php endforeach; ?>
</ul>
