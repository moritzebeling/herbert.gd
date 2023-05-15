<?php

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

<section class="posts" x-data=" { filter: false } ">
	<?php if($pages->count()): ?>

		<div class="result-options">
			<ul class="keywords filters">
				<?php foreach( $categories as $category => $count ): ?>
					<li>
						<button title="Filter by <?= $category ?>" @click=" filter = '<?= $category ?>' " :class=" filter == '<?= $category ?>' ? 'active' : '' ">
                            <?= $category ?>
                            <span class="count"><?= $count ?></span>
                        </button>
					</li>
				<?php endforeach ?>
			</ul>
		</div>

		<ol class="container <?= $layout ?>">
            <?php foreach( $pages as $item ): ?>
                <li x-show=" filter == false || '<?= $item->categories() ?>'.includes( filter ) ">
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
