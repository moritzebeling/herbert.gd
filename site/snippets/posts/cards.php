<?php

$layout = isset( $layout ) ? $layout : 'cards';

?>
<section class="posts">
	<ol class="cards">
		<?php foreach( $posts as $post ): ?>
			<li class="post">

				<a href="<?= $post->url() ?>">

					<?php if( $image = $post->image() ): ?>
						<?= $image->tag('medium') ?>
					<?php endif; ?>

					<div class="info">

						<span class="date"><?= $post->date()->toDate('Y'); ?></span>

						<h3 class="title"><?= $post->title(); ?></h3>

						<?php if( $post->subtitle()->isNotEmpty() ): ?>
							<h4 class="subtitle"><?= $post->subtitle(); ?></h4>
						<?php endif; ?>

						<?php if( $post->type()->isNotEmpty() ): ?>
							<span class="type"><?= $post->type(); ?></span>
						<?php endif; ?>

					</div>

				</a>
			</li>
		<?php endforeach; ?>
	</ol>
</section>
