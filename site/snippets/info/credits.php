<?php if ($page->contact()->isNotEmpty()) : ?>
    <li>
        <h4>Contact</h4>
        <?= Html::email($page->contact()) ?>
    </li>
<?php endif ?>

<?php foreach ($page->credits()->toStructure() as $credit) : ?>
    <li>
        <h4><?= $credit->job()->html() ?></h4>
        <?php if ($credit->link()->isNotEmpty()) : ?>
            <?= $credit->link()->toAnchor($credit->name()->html()) ?>
        <?php else : ?>
            <?= $credit->name() ?>
        <?php endif ?>
    </li>
<?php endforeach ?>

<li>
    <h4>Webdesign & Programming</h4>
    <a href="https://moritzebeling.com" target="_blank">Moritz Ebeling</a>
</li>

<li>
    <h4>Typeface</h4>
    <a href="https://github.com/rsms/inter" target="_blank">Inter</a>
</li>

<li>
    <a target="_blank" href="<?= option('repo') ?>">Contribute to this website on GitHub</a>
</li>

<?php if ($page->imprint()->isNotEmpty()) : ?>
    <li>
        <?= $page->imprint()->toAnchor('Imprint & Privacy policy') ?>
    </li>
<?php endif ?>

<?php if ($sitemap = page('sitemap')) : ?>
    <li>
        <a href="<?= $sitemap->url() ?>" rel="sitemap">Sitemap</a>
    </li>
<?php endif ?>

<li>
    &copy; <?= date('Y') ?> <a href="<?= $site->url() ?>"><?= $site->title() ?></a>
</li>