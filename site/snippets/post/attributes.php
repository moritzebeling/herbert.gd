<?php

$attributes = $page->attributes()->toStructure();

if( $attributes->count() < 1 ){
  return;
}

?>
<?php foreach( $attributes as $attribute ): ?>

  <div>

    <div class="attribute"><?= $attribute->attribute()->html() ?></div>

    <div class="value"><?= SiteSearch::link( $attribute->value()->value() ) ?></div>

  </div>

<?php endforeach; ?>
