<?php

if( $page->date()->isEmpty() ){
  return;
}

?>
<span class="date">
  <?= $page->displayDate(); ?>
</span>
