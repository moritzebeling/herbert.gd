<?php snippet('header') ?>

<main>
	<?php snippet('channel/posts',[
		'pages' => $site->featured()->toPages()
	]) ?>
</main>

<?php snippet('footer');
