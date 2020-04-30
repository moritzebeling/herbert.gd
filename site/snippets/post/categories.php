<?php

if( $page->categories()->isEmpty() ){
  return;
}

$categories = $page->categories()->split();

?>
<ul class="categories">

  <?php foreach( $categories as $category ): ?>

    <li><?= SiteSearch::link( $category ); ?></li>

  <?php endforeach; ?>

</ul>
