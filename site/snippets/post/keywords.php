<?php

if( $page->keywords()->isEmpty() ){
  return;
}

$keywords = $page->keywords()->split();

?>
<ul class="keywords">

  <?php foreach( $keywords as $keyword ): ?>

    <li><?= SiteSearch::link( $keyword ); ?></li>

  <?php endforeach; ?>

</ul>
