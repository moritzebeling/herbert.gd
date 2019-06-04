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
  $searchbase = $domain->id().'/s';
}

// compose search base
$link = $searchbase.'/'.rawurlencode( $item );

// output
?>
<ul class="tags">
  <?php foreach( $page->{$field}()->split() as $item ): ?>
    <?php //  ?>
    <li><a href="<?= $link; ?>" rel="tag"><?= $item; ?></a></li>
  <?php endforeach; ?>
</ul>
