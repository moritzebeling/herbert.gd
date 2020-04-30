<section class="posts list">

	<ul>
		<?php foreach( $posts as $post ): ?>
			<li>

				<div class="date replaceSlashes">
					<?= $post->displayDate(); ?>
				</div>

				<div class="title">
					<a href="<?= $post->url() ?>">

						<h3 class="replaceSlashes"><?= $post->title(); ?></h3>
						<h4><?= $post->subtitle(); ?></h4>
						<div class="image">
							<?php if( $image = $post->image() ): ?>
								<?= $image->tag('medium') ?>
							<?php endif; ?>
						</div>

					</a>
				</div>

				<div class="categories right">
					<ul>
						<?php foreach( $post->categories()->split() as $category ): ?>
							<li><?= ucwords( $category ); ?></li>
						<?php endforeach; ?>
					</ul>
				</div>

			</li>
		<?php endforeach; ?>
	</ul>

</section>
