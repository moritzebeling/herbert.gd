<?php

/**
 * credits
 *
 * snippet for rendering the credits list
 *
 * recieves
 * - $page (field owner)
 * – $field (field name)
 *
 */

// validate owner
if( !isset( $page ) ){
  $page = $kirby->site();
}

// validate field
if( !isset( $field ) ){
  $field = 'credits';
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
<ul class="credits">
  <?php foreach( $page->{$field}()->yaml() as $item ): ?>
    <li>
      <?php if($item['role']): ?>
        <span><?= $item['role'] ?> </span>
      <?php endif; ?>

      <?php if($item['link']): ?>
        <a href="<?= $item['link'] ?>" target="_blank" title="<?= $item['name']; ?>">
      <?php else: ?>
        <a href="<?= $searchbase.rawurlencode( $item['name'] ); ?>" title="<?= $item['name']; ?>">
      <?php endif; ?>

          <?= $item['name']; ?>

        </a>

    </li>
  <?php endforeach; ?>
</ul>
