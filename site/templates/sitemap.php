<?php snippet('header') ?>

<main>

    <div class="main">

        <header>
            <h1><?= $page->title() ?></h1>
        </header>

        <section>
            <ul class="channels">
                <?php foreach ($kirby->collection('channels') as $channel) : ?>
                    <li class="channel">
                        <a href="<?= $channel->url() ?>" title="<?= $channel->title() ?>">
                            <h2><?= $channel->title() ?> (<?= $channel->children()->listed()->count() ?>)</h2>
                        </a>
                        <ul>
                            <?php foreach ($channel->children()->listed() as $post) : ?>
                                <li>
                                    <a href="<?= $post->url() ?>">
                                        <?= $post->title() ?>
                                    </a>
                                </li>
                            <?php endforeach ?>
                        </ul>
                    </li>
                <?php endforeach ?>
            </ul>
        </section>

    </div>

</main>

<?php snippet('footer');
