<?php

if( $page->date()->isEmpty() ){
  return;
}

?>
<span class="date">
  <?= Keyword::link( $page->displayDate() ); ?>
</span>
