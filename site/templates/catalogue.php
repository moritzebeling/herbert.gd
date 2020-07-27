<?php snippet('header') ?>

<main>

	<?php foreach( $kirby->collection('channels') as $channel ): ?>
        <section>
            <h2><a target="_blank" href="<?= $channel->url() ?>"><?= $channel->title(); ?></a></h2>

            <table width="100%">

                <tr>
                    <th class="img">Title</th>
                    <th class="l">&nbsp;</th>
                    <th class="m">Url</th>
                    <th>Date</th>
                    <th class="s">Words</th>
                    <th class="s">Images</th>
                    <th>Categories</th>
                    <th>Keywords</th>
                    <th>Invisible Keywords</th>
                    <th class="s">Link</th>
                </tr>

                <?php foreach( $channel->posts() as $post ): ?>
                    <tr>
                        <td class="img">
                            <a target="_blank" href="<?= $post->url() ?>">
                                <img src="<?= $post->image()->url() ?>" srcset="<?= $post->image()->srcset([
                                    '1x' => [
                                        'width' => 40,
                                        'height' => 40,
                                        'crop' => 'center'
                                    ],
                                    '2x' => [
                                        'width' => 80,
                                        'height' => 80,
                                        'crop' => 'center'
                                    ]
                                ]) ?>" />
                            </a>
                        </td>
                        <td class="l">
                            <a target="_blank" href="<?= $post->url() ?>">
                                <h3><?= $post->title() ?></h3>
                                <h4><?= $post->subtitle() ?></h4>
                            </a>
                        </td>
                        <td class="m"><?= $post->uid() ?></td>
                        <td><?= $post->displayDate() ?></td>
                        <td class="s"><?= $post->body()->words() ?></td>
                        <td class="s"><?= $post->images()->count() ?></td>
                        <td><?= $post->categories()->value() ?></td>
                        <td><?= $post->keywords()->value() ?></td>
                        <td><?= $post->searchwords()->value() ?></td>
                        <td class="s">
                            <a target="_blank" href="<?= $post->panelUrl() ?>">Edit</a>
                        </td>
                    </tr>
                <?php endforeach; ?>

            </table>

        </section>
    <?php endforeach; ?>

</main>

<?php snippet('footer');
