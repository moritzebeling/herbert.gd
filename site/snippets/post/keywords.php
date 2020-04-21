<?php

if( $page->categories()->isEmpty() && $page->keywords()->isEmpty() ){
  return;
}

$categories = $page->categories()->split();
$keywords = $page->keywords()->split();

$list = array_merge( $categories, $keywords );

?>
<div class="row keywords">

  <div class="key">
    Keywords
  </div>

  <ul class="value">

    <?php foreach( $list as $item ): ?>

      <li><?= Keyword::link( $item ); ?></li>

    <?php endforeach; ?>

  </ul>

</div>
