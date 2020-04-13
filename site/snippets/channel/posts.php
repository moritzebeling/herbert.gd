<?php

$layout = isset( $layout ) ? $layout : 'cards';

?>
<section class="content posts">

	<ol class="cards">
		<?php foreach( $posts as $post ): ?>
			<li class="post">
				<a href="<?= $post->url() ?>">

					<?php if( $image = $post->image() ): ?>
						<?= $image->figure() ?>
					<?php endif; ?>

					<span class="date"><?= $post->date(); ?></span>

					<h3 class="title"><?= $post->title(); ?></h3>

					<?php if( $post->subtitle()->isNotEmpty() ): ?>
						<h4 class="subtitle"><?= $post->subtitle(); ?></h4>
					<?php endif; ?>

					<?php if( $post->type()->isNotEmpty() ): ?>
						<span class="type"><?= $post->type(); ?></span>
					<?php endif; ?>

				</a>
			</li>
		<?php endforeach; ?>
	</ol>

</section>
