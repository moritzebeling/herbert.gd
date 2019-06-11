<?php

/**
 * feed of posts that lists all posts from current domain and all featured posts from other domains
 *
 * recieves
 * - $collection
 */

if( !$collection ){
  $collection = $site->feed( $page->domain() );
}

?>
<ul class="feed">
  <?php foreach ( $collection as $item ):

    snippet('domains/feed-item', ['item' => $item]);

  endforeach; ?>
</ul>
