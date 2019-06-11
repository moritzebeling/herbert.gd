<?php

/**
 * single post content
 *
 * recieves
 * - $page
 *
 */

// validate container
if( !isset( $page ) ){
  $page = $kirby->site();
}

// intended template
$template = $page->intendedTemplate();

?>
<article>
  <section class="header">

    <h2 class="title"><?= $page->title() ?></h2>
    <h4 class="subtitle"><?php snippet('fields/subtitle') ?></h4>

  </section>
  <section class="info">

    <?php snippet('fields/date') ?>
    <?php snippet('fields/location') ?>

  </section>

  <?php snippet('fields/gallery') ?>

  <?php snippet('fields/body') ?>

  <section class="meta">

    <?php snippet('fields/credits') ?>
    <?php snippet('fields/link') ?>
    <?php snippet('fields/tags') ?>

  </section>
</article>
