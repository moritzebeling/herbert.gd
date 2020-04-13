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

					<?= $post->title(); ?>

				</a>
			</li>
		<?php endforeach; ?>
	</ol>

</section>
