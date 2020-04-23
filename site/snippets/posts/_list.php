<section class="posts">

	<ol class="list">
		<?php foreach( $posts as $post ): ?>
			<li class="post">
				<a href="<?= $post->url() ?>">

					<div>
						<span class="date"><?= $post->displayDate(); ?></span>
					</div>

					<div class="title">
						<h3><?= $post->title(); ?></h3>
						<h4><?= $post->subtitle(); ?></h4>
					</div>

					<div class="right">
						<ul class="categories">
							<?php foreach( $post->categories()->split() as $category ): ?>
								<li><?= ucwords( $category ); ?></li>
							<?php endforeach; ?>
						</ul>
					</div>

				</a>
			</li>
		<?php endforeach; ?>
	</ol>

</section>
