<?php if( $image = $post->image() ): ?>
	<?= $image->figure() ?>
<?php endif; ?>

<div class="info">

	<h3 class="title"><?= $post->title(); ?></h3>

	<?php if( $post->subtitle()->isNotEmpty() ): ?>
		<h4 class="subtitle"><?= $post->subtitle(); ?></h4>
	<?php endif; ?>

	<?php if( $post->type()->isNotEmpty() ): ?>
		<span class="type"><?= $post->type(); ?></span>
	<?php endif; ?>

	<span class="date"><?= $post->date()->toDate('Y'); ?></span>

</div>
