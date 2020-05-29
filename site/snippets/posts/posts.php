<?php

// $posts defined in controller

$dateFormat = $page->dateFormat();

?>
<section class="posts list">

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
								<?php snippet('post/video',[
									'videoUrl' => $image->videoUrl()->value()
								]); ?>
							</figure>
				    <?php endif;
					else: ?>
						<figure class="placeholder"></figure>
					<?php endif; ?>

					<div class="info">

						<div class="title">
							<h3 class="headline"><?= $post->title(); ?></h3>
							<?php if( $post->subtitle()->isNotEmpty() ): ?>
								<h4 class="subline"><?= $post->subtitle(); ?></h4>
							<?php endif; ?>
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
