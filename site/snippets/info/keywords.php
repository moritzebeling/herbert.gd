<ul class="keywords">
    <?php

    $posts = $page->kirby()->collection('posts');

    $keywords = [];

    foreach( $posts->pluck('categories',',',true) as $category ){
        $keywords[] = SiteSearch::link( $category );
    }
    foreach( $posts->pluck('keywords',',',true) as $keyword ){
        $keywords[] = SiteSearch::link( $keyword );
    }

    ?>
    <?php foreach( $keywords as $keyword ): ?>
        <li><?= $keyword ?></li>
    <?php endforeach; ?>
</ul>
