<?php

$links = isset( $links ) ? $links->toStructure() : $page->links()->toStructure();

if( $links->count() < 1 ){
  return;
}
?>
<ul class="external-links">
  <?php foreach ($links as $link): ?>
    <a target="_blank" href="<?= $link->url() ?>">
      <?php e( $link->title()->isNotEmpty(), $link->title()->html(), parse_url( $link->url(), PHP_URL_HOST ) ) ?>
    </a>
  <?php endforeach; ?>
</ul>
