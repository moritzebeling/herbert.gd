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

    <?php if( $template == 'event' || $template == 'workshop' ):
      snippet('fields/datetime');
      snippet('fields/location');
    endif; ?>

    <?php if( $template == 'course' || $template == 'workshop' ):
      snippet('fields/teachers');
      snippet('fields/semester');
    endif; ?>

    <?php if( $template == 'project' ):
      snippet('fields/authors');
    endif; ?>

  </section>
  
  <?php snippet('fields/gallery') ?>
  
  <?php snippet('fields/body') ?>

  <section class="meta">

    <?php snippet('fields/link') ?>
    <?php snippet('fields/tags') ?>

  </section>
</article>