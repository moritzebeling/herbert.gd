<ul class="keywords">
    <?php

    $posts = $page->kirby()->collection('posts');

    $keywords = array_unique(
        array_merge(
            $posts->pluck('categories', ',', true),
            $posts->pluck('keywords', ',', true)
        )
    );

    ?>
    <?php foreach ($keywords as $keyword) : ?>
        <li><?= SiteSearch::link($keyword) ?></li>
    <?php endforeach ?>
</ul>