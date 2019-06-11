<?php

/**
 * location
 *
 * snippet for rendering the location field group
 *
 * recieves
 * - $page (field owner)
 * – $field (field name)
 *
 */

// abort if field is empty
if( $page->location()->isEmpty() ){
  return;
}

// validate search base
if( !isset( $searchbase ) ){
  $searchbase = $site->find('search')->url().option('searchbase');
}

// output
?>
<div class="location">
  <?php foreach ($page->location()->yaml() as $location): ?>

    <?php if($location['link']): // ext url ?>
      <a class="external" href="<?= $location['link'] ?>" target="_blank" title="Open <?= parse_url( $location['link'], PHP_URL_HOST ) ?>">
    <?php else: // internal search ?>
      <a class="keyword" href="<?= $searchbase.rawurlencode( $location['title'] ); ?>" title="Search for <?= $location['title']; ?>">
    <?php endif; ?>

      <?= $location['title'] ?></a>

      <?= $location['address'] ?>

      <a class="keyword" href="<?= $searchbase.rawurlencode( $location['city'] ); ?>" title="Search for <?= $location['city']; ?>"><?= $location['city'] ?></a>

      <a class="keyword" href="<?= $searchbase.rawurlencode( $location['country'] ); ?>" title="Search for <?= $location['country']; ?>"><?= $location['country'] ?></a>


  <?php endforeach; ?>
</div>
