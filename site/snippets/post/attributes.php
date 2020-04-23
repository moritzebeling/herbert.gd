<?php

$attributes = $page->attributes()->toStructure();

if( $attributes->count() < 1 ){
  return;
}

?>
<ul class="attributes">

  <?php foreach( $attributes as $attribute ): ?>

    <li>

      <span class="attribute"><?= $attribute->attribute()->html() ?></span>
      <span class="value"><?= Keyword::link( $attribute->value()->html() ) ?></span>

    </li>

  <?php endforeach; ?>

</ul>
