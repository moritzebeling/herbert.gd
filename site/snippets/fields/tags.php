<?php

/**
 * tags
 *
 * snippet for rendering the tag list
 *
 * recieves
 * - $page (field owner)
 * – $field (field name)
 * - $searchbase (url of search page)
 *
 */

// validate owner
if( !isset( $page ) ){
  $page = $kirby->site();
}

// validate field
if( !isset( $field ) ){
  $field = 'tags';
}

// abort if field is empty
if( $page->{$field}()->isEmpty() ){
  return;
}

// validate search base
if( !isset( $searchbase ) ){
  $searchbase = $site->find('search')->url().option('searchbase');
}

// output
?>
<ul class="links tags">
  <?php foreach( $page->{$field}()->split() as $item ): ?>
    <li><a class="keyword" href="<?= $searchbase.rawurlencode( $item ); ?>" rel="tag"><?= $item; ?></a></li>
  <?php endforeach; ?>
</ul>
