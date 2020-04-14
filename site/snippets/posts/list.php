<?php

$layout = isset( $layout ) ? $layout : 'cards';

?>
<section class="content posts">

	<ol class="cards grid">
		<?php foreach( $posts as $post ): ?>
			<li class="post col-xlg-2 col-lg-3 col-md-4 col-sm-6 col-xs-12">

				<?php if( $post->linkRedirect()->isTrue() && $post->link()->isNotEmpty() ): ?>
					<a href="<?= $post->link() ?>" target="_blank">
				<?php else: ?>
					<a href="<?= $post->url() ?>">
				<?php endif; ?>

					<?php snippet('posts/item',[
						'post' => $post
					]) ?>

				</a>
			</li>
		<?php endforeach; ?>
	</ol>

</section>
