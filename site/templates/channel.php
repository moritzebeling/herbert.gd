<?php snippet('header') ?>

<main>
    <?php
    snippet('channel/header');
    snippet('channel/posts',[
        'pages' => $page->children()->listed()->sortBy('date','desc')
    ]);
    ?>
</main>

<?php snippet('footer');
