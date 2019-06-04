<?php

/**
 * feed of posts that lists all posts from current domain and all featured posts from other domains
 *
 */

?>
<li class="post">
  <a href="<?= $item->url() ?>">

    <h3 class="title"><?= $item->title() ?></h3>
    <h4 class="subtitle"><?= $item->subtitle() ?></h4>

    <span class="published"><?= ucwords( $item->published() ) ?></span>

    <?php snippet('fields/picture', ['page' => $item]); ?>

  </a>
</li>
