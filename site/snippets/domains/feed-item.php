<?php

/**
 * feed of posts that lists all posts from current domain and all featured posts from other domains
 *
 */

?>
<li class="post">
  <a href="<?= $item->url() ?>">

    <div class="thumbnail">
      <?php snippet('picture', ['image' => $item->picture()->toFile() , 'sizes' => 'thumbnail' ]); ?>
    </div>

    <h3 class="title"><?= $item->title() ?></h3>
    <h4 class="subtitle"><?= $item->subtitle() ?></h4>

    <span class="published"><?= ucwords( $item->published() ) ?></span>

  </a>
</li>
