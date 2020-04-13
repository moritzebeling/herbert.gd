<?php

if( $page->body()->isEmpty() ){
  // return;
}

?>
<div class="content">
  <?= $page->body()->kirbytext(); ?>
</div>
