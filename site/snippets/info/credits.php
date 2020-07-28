<?php if( $page->contact()->isNotEmpty() ): ?>
    <li>
        <h4>Contact:</h4>
        <?= Html::email( $page->contact() ) ?>
    </li>
<?php endif ?>

<li>
    <h4>Webdesign & Programming</h4>
    <a href="https://moritzebeling.com" target="_blank">Moritz Ebeling</a>
</li>

<li>
    <a target="_blank" href="<?= option('repo') ?>">Contribute to this website on GitHub</a>
</li>

<?php foreach( $page->credits()->toStructure() as $credit ): ?>
    <li>
        <h4><?= $credit->job()->html() ?></h4>
        <?php if( $credit->link()->isNotEmpty() ): ?>
            <?= $credit->link()->toAnchor( $credit->name()->html() ) ?>
        <?php else: ?>
            <?= $credit->name(); ?>
        <?php endif; ?>
    </li>
<?php endforeach; ?>

<li>
    &copy; <?= date('Y') ?> <a href="<?= $site->url() ?>"><?= $site->title() ?></a>
</li>

<?php if( $page->imprint()->isNotEmpty() ): ?>
    <li>
        <?= $page->imprint()->toAnchor('Imprint'); ?>
    </li>
<?php endif; ?>
