<?php

if( $page->date()->isEmpty() ){
  return;
}

?>
<div class="date">

  <?= $page->date()->toDate('d.m.Y'); ?>

</div>
