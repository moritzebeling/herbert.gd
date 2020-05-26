<section class="posts gallery">

	<ol>
		<?php foreach( $posts as $post ): ?>
			<li>
				<a href="<?= $post->url() ?>">

					<div class="image">
						<?php if( $image = $post->image() ): ?>
							<?= $image->tag('medium') ?>
						<?php else: ?>
							<figure class="placeholder"></figure>
						<?php endif; ?>
					</div>

					<div class="info">

						<div class="title">
							<h3><?= $post->title(); ?></h3>
							<h4><?= $post->subtitle(); ?></h4>
						</div>

						<div class="meta">

							<div class="categories">
								<ul>
									<?php foreach( $post->categories()->split() as $category ): ?>
										<li><?= ucwords( $category ); ?></li>
									<?php endforeach; ?>
								</ul>
							</div>

							<div class="date">
								<?= $post->displayDate(); ?>
							</div>

						</div>

					</div>

				</a>
			</li>
		<?php endforeach; ?>
	</ol>

</section>
