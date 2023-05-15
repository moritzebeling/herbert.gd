<figure>
    <?php if ($image = $person->image()->toFile()) : ?>
        <?= $image->tag() ?>
        <figcaption><span>&copy; <?= $image->credits() ?></span></figcaption>
    <?php endif ?>
</figure>

<h3 class="name"><?= $person->name()->html() ?></h3>

<div class="about"><?= $person->text()->kirbytext() ?></div>

<?php if ($person->link()->isNotEmpty()) : ?>
    <div class="link"><?= $person->link()->toAnchor() ?></div>
<?php endif ?>