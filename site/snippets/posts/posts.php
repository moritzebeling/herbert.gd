<?php

// $posts defined in controller

$dateFormat = $page->dateFormat();

?>
<section class="posts <?= $page->layout(); ?>">

	<ol>
		<?php foreach( $posts as $post ): ?>
			<li>
				<a href="<?= $post->url() ?>">

					<?php if( $image = $post->image() ):

						if( $image->videoUrl()->isEmpty() ): ?>
				      <figure class="<?php e($image->isPortrait(),'portrait','landscape') ?>">
				        <div class="image">
				          <?= $image->tag() ?>
				        </div>
							</figure>
				    <?php else: ?>
				      <figure class="video">
				        <div class="player">
				          <?= video( $image->videoUrl()->value() ) ?>
				        </div>
							</figure>
				    <?php endif;

					else: ?>
						<figure></figure>
					<?php endif; ?>

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
								<?= $post->displayDate( $dateFormat ); ?>
							</div>

						</div>

					</div>

				</a>
			</li>
		<?php endforeach; ?>
	</ol>

</section>
