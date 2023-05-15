    <footer>
        <div>

            <?php if ($page->intendedTemplate()->name() === 'info'): ?>
                <ul class="credits">
                    <?php snippet('info/credits'); ?>
                </ul>
            <?php endif ?>

            <div class="buw-logo-container">
                <?php if ($info = page('info')) : ?>
                    <a class="buw-logo" title="Imprint" href="<?= $info->imprint()->value() ?>" rel="noopener" target="_blank">
                        <?= svg('assets/image/bauhaus-university-logo.svg') ?>
                    </a>
                <?php endif ?>
            </div>

            <?php if ($sitemap = page('sitemap')) : ?>
                <a id="sitemap-footer-link" rel="sitemap" href="<?= $sitemap->url() ?>">Sitemap</a>
            <?php endif ?>

        </div>
    </footer>

    <?= css('@auto') ?>

    <?= js('assets/js/herbert.js', true) ?>
    <?= js('assets/js/lazysizes.min.js', true) ?>

</body>
</html>