<?php

if( $page->categories()->isEmpty() ){
  return;
}

$categories = $page->categories()->split();

?>
<ul class="categories">

  <?php foreach( $categories as $category ): ?>

    <li><?= Keyword::link( $category ); ?></li>

  <?php endforeach; ?>

</ul>
