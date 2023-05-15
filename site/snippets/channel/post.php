<?php

$orientation = 'landscape';

if($image = $item->image()){
    $orientation = $image->orientation();
}

?>

<article class="item <?= $orientation ?>">
	<a href="<?= $item->url() ?>">

		<?php if( $image ): ?>
			<?= $image->tag() ?>
		<?php endif ?>

		<div class="title">
			<h3><?= $item->title() ?></h3>
			<h4><?= $item->subtitle() ?></h4>
		</div>

	</a>
</article>
