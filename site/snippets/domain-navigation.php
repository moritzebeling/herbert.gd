<?php

/**
 * menu of all availible domains
 * 
 */

?>
<nav id="domain-navigation" class="domains" role="navigation">
  <ul>
  <?php foreach ( $site->domains() as $item ): ?>
    <li>

      <?php
      $class = $item->id();
      if( $item == $page->domain() ){ $class .= ' active'; } ?>
      <a href="<?= $item->url() ?>" class="<?= $class ?>">
        <?= $item->title()->html() ?>
      </a>

    </li>
  <?php endforeach; ?>
  </ul>
</nav>