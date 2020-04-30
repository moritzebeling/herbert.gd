<?php

if( $page->date()->isEmpty() ){
  return;
}

?>
<span class="date">
  <?= SiteSearch::date( $page->dateFormat(), $page->date()->toDate('Y-m-d'), $page->displayDate() ); ?>
</span>
