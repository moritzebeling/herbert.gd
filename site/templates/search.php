<?php snippet('header') ?>

<main>

  <section class="searchform">

    <form>
      <input type="text" name="q" value="<?= html($query) ?>">
      <input type="submit" value="Search">
    </form>

  </section>

  <?php snippet('domains/feed', [ 'collection' => $results ]) ?>

</main>

<?php snippet('footer') ?>
