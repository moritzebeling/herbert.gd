<?php

$links = isset( $links ) ? $links->toStructure() : $page->links()->toStructure();

if( $links->count() < 1 ){
  return;
}
?>
<?php foreach ($links as $link): ?>
  <?php $title = $link->title()->isNotEmpty() ? $link->title()->value() : null;
  echo $link->url()->toAnchor( $title ) ?>
<?php endforeach; ?>
