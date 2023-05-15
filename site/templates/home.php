<?php snippet('header') ?>

<main>
	<?php snippet('channel/posts',[
		// 'pages' => $site->featured()->toPages()
		'pages' => $site->featured()->toPages()->template('post')
	]) ?>
</main>

<?php snippet('footer');
