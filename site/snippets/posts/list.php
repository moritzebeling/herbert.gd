<section class="posts list">

	<table>
		<?php foreach( $posts as $post ): ?>
			<tr>

				<td class="min">
					<span class="date"><?= $post->displayDate(); ?></span>
				</td>

				<td class="title">
					<a href="<?= $post->url() ?>">
						<h3><?= $post->title(); ?></h3>
						<h4><?= $post->subtitle(); ?></h4>
					</a>
				</td>

				<td class="right">
					<ul class="categories">
						<?php foreach( $post->categories()->split() as $category ): ?>
							<li><?= ucwords( $category ); ?></li>
						<?php endforeach; ?>
					</ul>
				</td>

			</tr>
		<?php endforeach; ?>
	</table>

</section>
