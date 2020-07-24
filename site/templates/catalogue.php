<?php snippet('header') ?>

<main>

    <header>
        <h1><?= $page->title() ?></h1>

	<?php foreach( $kirby->collection('channels') as $channel ): ?>
        <section>
            <h2><?= $channel->title(); ?></h2>

            <table width="100%">

                <tr>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Date</th>
                    <th class="s">Words</th>
                    <th class="s">Images</th>
                    <th>Categories</th>
                    <th>Keywords</th>
                    <th>Invisible Keywords</th>
                    <th>Link</th>
                </tr>

                <?php foreach( $channel->posts() as $post ): ?>
                    <tr>
                        <td><a target="_blank" href="<?= $post->url() ?>"><?= $post->title() ?></a></td>
                        <td><a target="_blank" href="<?= $post->url() ?>"><?= $post->subtitle() ?></a></td>
                        <td><?= $post->displayDate() ?></td>
                        <td class="s"><?= $post->body()->words() ?></td>
                        <td class="s"><?= $post->images()->count() ?></td>
                        <td><?= $post->categories()->value() ?></td>
                        <td><?= $post->keywords()->value() ?></td>
                        <td><?= $post->searchwords()->value() ?></td>
                        <td>
                            <a target="_blank" href="<?= $post->panelUrl() ?>">Edit</a>
                        </td>
                    </tr>
                <?php endforeach; ?>

            </table>

        </section>
    <?php endforeach; ?>

</main>

<?php snippet('footer');
