<?php

/**
 * feed of posts that lists all posts from current domain and all featured posts from other domains
 * 
 */

$layout = 'grid';
if( $domain->id() == 'herbert'){
  $layout = 'list';
}

?>
<ul class="feed <?= $layout; ?>">
<?php foreach ( $site->feed( $domain ) as $item ): ?>
  <li class="post <?= $item->intendedTemplate() ?>">
    <a href="<?= $item->url() ?>">

      <?php $thumbnail = $item->coverImage()->toFile();
      if( $thumbnail ): ?>
        <img src="<?= $thumbnail->url() ?>" alt="" />
      <?php endif; ?>

      <span class="date"><?= $item->date() ?></span>

      <h3 class="title"><?= $item->title() ?></h3>
      <h4 class="subtitle"><?= $item->subtitle() ?></h4>

    </a>
  </li>
<?php endforeach; ?>
</ul>