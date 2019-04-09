<?php

/**
 * authors
 * 
 * snippet for rendering the authors list
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
  $field = 'authors'; 
}

// abort if field is empty
if( $page->{$field}()->isEmpty() ){
  return;
}

// output
?>
<ul class="authors">
  <?php foreach( $page->{$field}()->toStructure() as $item ): ?>
    <li>
    <?php if( $item->link()->isNotEmpty() ): ?>
      <a href="<?= $item->link() ?>" target="_blank">
    <?php endif; ?>
        <?= $item->name()->html() ?>
    <?php if( $item->link()->isNotEmpty() ): ?>
      </a>
    <?php endif; ?>
    </li>
  <?php endforeach; ?>
</ul>