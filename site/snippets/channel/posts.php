<?php

/**
 * @todo make filters work with alpine js
 */

$layout = $layout ?? 'grid';
$categories = [];

foreach( $pages as $item ){
    if( $item->categories()->isEmpty() ){
        continue;
    }
    foreach( $item->categories()->split() as $category ){
        if( !isset($categories[$category]) ){
            $categories[$category] = 0;
        }
        $categories[$category]++;
    }
}
arsort( $categories );

?>

<section class="posts">
	<?php if($pages->count()): ?>

		<div class="result-options">
			<ul class="keywords filters">
				<?php foreach( $categories as $category => $count ): ?>
					<li>
						<button title="Filter by <?= $category ?>">
                            <?= $category ?>
                            <span class="count"><?= $count ?></span>
                        </button>
					</li>
				<?php endforeach ?>
			</ul>
		</div>

		<ol class="container <?= $layout ?>">
            <?php foreach( $pages as $item ): ?>
                <li>
                    <?php snippet('channel/post',[
                        'item' => $item
                    ]) ?>
                </li>
            <?php endforeach ?>
		</ol>

	<?php else: ?>
		<h3 class="error">No posts found</h3>
	<?php endif ?>
</section>
