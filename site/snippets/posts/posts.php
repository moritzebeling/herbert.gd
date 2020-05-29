<?php

// $posts defined in controller

$dateFormat = $page->dateFormat();

?>
<section class="posts <?= $page->layout() ?>">

	<nav class="results-options">

		<div class="left">
			<label for="results-layout">Layout</label>
			<ul name="results-layout" id="results-layout">
			  <li value="s">Small</li>
			  <li value="m">Medium</li>
			  <li value="l">Large</li>
			</ul>
		</div>

		<div class="right">
			<label for="results-filter">Categories</label>
			<ul name="results-filter" id="results-filter">
			  <li value="false">All</li>
				<?php foreach( $posts->pluck('categories', ',', true) as $category ): ?>
					<li value="<?= $category; ?>"><?= ucwords( $category ); ?></li>
				<?php endforeach; ?>
			</ul>
		</div>

	</nav>

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
					endif; ?>

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
