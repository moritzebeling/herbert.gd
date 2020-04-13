<?php

if( $page->categories()->isEmpty() && $page->keywords()->isEmpty() ){
  return;
}

$categories = $page->categories()->split();
$keywords = $page->keywords()->split();

$list = array_merge( $categories, $keywords );

?>
<ul class="keywords">
  Search for: 
  <?php foreach( $list as $item ): ?>

    <li><?= ucwords( $item ) ?></li>

  <?php endforeach; ?>
</ul>
