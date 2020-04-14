<?php

if( $page->body()->isEmpty() ){
  // return;
}

?>
<div>
  <?= $page->body()->kirbytext(); ?>
</div>
