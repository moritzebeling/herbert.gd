<?php snippet('header') ?>

<main>
    <?php snippet('channel/posts',[
        'pages' => $results,
    ]) ?>
</main>

<?php snippet('footer');
