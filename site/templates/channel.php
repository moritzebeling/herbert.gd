<?php snippet('header') ?>

<main>

  <?php snippet('channel/header'); ?>

  <section>

    <ol class="posts">
      <?php foreach( $posts as $post ): ?>
        <li class="post">
          <a href="<?= $post->url() ?>">

            <?php if( $image = $post->image() ): ?>
              <?= $image->figure() ?>
            <?php endif; ?>

            <?= $post->title(); ?>

          </a>
        </li>
      <?php endforeach; ?>
    </ol>

  </section>

</main>

<?php snippet('footer') ?>
