<ul class="keywords">
    <?php

    $entries = [];
    $posts = kirby()->collection('posts');

    foreach( $posts->pluck('categories',',',true) as $category ){

        $entries[] = '<li class="category">'.
            SiteSearch::link( $category ).
            '</li>';

    }

    foreach( $posts->pluck('keywords',',',true) as $keyword ){

        $entries[] = '<li class="tag">'.
            SiteSearch::link( $keyword ).
            '</li>';

    }

    ?>
    <?php foreach( $entries as $html ): ?>
        <?= $html ?>
    <?php endforeach; ?>

</ul>
