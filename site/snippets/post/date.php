<?php

if( $page->date()->isEmpty() ){
  return;
}

?>
<span class="date">
  <?= $page->date()->toDate('d-m-Y'); ?>
</span>
