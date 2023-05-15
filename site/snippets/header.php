<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <?= css('assets/css/global.css') ?>

    <?php if ($page->isHomePage()) : ?>
        <title><?= $site->title() ?></title>
    <?php else : ?>
        <title><?= $page->title() ?> • <?= $site->title() ?></title>
    <?php endif ?>

    <?php snippet('header/meta') ?>

    <?php if (option('analytics')) {
        snippet('header/analytics-1');
    } ?>

    <?php snippet('header/favicon') ?>

    <link rel="sitemap" href="/sitemap.xml" />

</head>
<!-- Website by Moritz Ebeling https://moritzebeling.com -->
<!-- If you want to contribute to this website, go to <?= option('repo') ?> -->

<body class="<?= $page->intendedTemplate() ?>">

    <?php if (option('analytics')) {
        snippet('header/analytics-2');
    } ?>

    <header>
        <div class="container">

            <div id="logo">
                <a href="<?= $site->url() ?>" title="<?= $site->title() ?>">
                    <?= svg('assets/image/herbert-logo.svg') ?>
                </a>
            </div>

            <nav>
                <ol class="channels">
                    <?php foreach ($kirby->collection('channels')->add(page('info')) as $channel) :

                        $class = '';
                        if ($page->is($channel)) {
                            $class = 'active';
                        } else if ($parent = $page->parent()) {
                            if ($parent->is($channel)) {
                                $class = 'active';
                            }
                        }

                    ?>
                        <li>
                            <a class="<?= $class ?>" title="<?= $channel->title()->value() ?>" href="<?= $channel->url() ?>">
                                <?= $channel->title()->value() ?><?php if ($channel->intendedTemplate()->name() === 'channel') : ?><span class="count"><?= $channel->posts()->count() ?></span><?php endif ?>
                            </a>
                        </li>
                    <?php endforeach ?>
                </ol>
            </nav>

        </div>
    </header>