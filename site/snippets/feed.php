<?php

/**
 * feed of posts that lists all posts from current domain and all featured posts from other domains
 *
 */

$layout = 'grid';
if( $domain->id() == 'herbert'){
  $layout = 'grid';
}

?>
<ul class="feed <?= $layout; ?>">
<?php foreach ( $site->feed( $domain ) as $item ): ?>
  <li class="post <?= $item->intendedTemplate() ?>">
    <a href="<?= $item->url() ?>">

      <h3 class="title"><?= $item->title() ?></h3>
      <h4 class="subtitle"><?= $item->subtitle() ?></h4>

      <span class="date"><?= $item->date() ?></span>

      <?php snippet('fields/coverImage', ['page' => $item]); ?>

    </a>
  </li>
<?php endforeach; ?>
</ul>
