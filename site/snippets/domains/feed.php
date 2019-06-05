<?php

/**
 * feed of posts that lists all posts from current domain and all featured posts from other domains
 *
 */

?>
<ul class="feed">
  <?php foreach ( $site->feed( $domain ) as $item ):

    snippet('domains/feed-item', ['item' => $item]);

  endforeach; ?>



  <?php
  // fake som mass
  foreach ( $site->feed( $domain ) as $item ):

    snippet('domains/feed-item', ['item' => $item]);

  endforeach; ?>
  <?php foreach ( $site->feed( $domain ) as $item ):

    snippet('domains/feed-item', ['item' => $item]);

  endforeach; ?>
  <?php foreach ( $site->feed( $domain ) as $item ):

    snippet('domains/feed-item', ['item' => $item]);

  endforeach; ?>
  <?php foreach ( $site->feed( $domain ) as $item ):

    snippet('domains/feed-item', ['item' => $item]);

  endforeach; ?>
  
</ul>
