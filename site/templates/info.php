<?php snippet('header') ?>

<main>

  <header class="post-header">
    <h1><?= $page->title()->html() ?></h1>
  </header>

  <section class="content">

    <?php if( $page->body()->isNotEmpty() ): ?>
      <?= $page->body()->kirbytext(); ?>
    <?php endif ?>

    <?php $team = $page->team()->toStructure();
    if( $team->count() > 0 ): ?>
      <div class="team">
        <ul>
          <?php foreach( $team as $member ): ?>
            <li>

              <?php if( $image = $member->image()->toFile() ): ?>
                <?= $image->figure(); ?>
              <?php endif; ?>

              <h3><?= $member->name()->html(); ?></h3>

              <?= $member->text()->kirbytext(); ?>

              <?= $member->link()->toAnchor(); ?>

            </li>
          <?php endforeach; ?>
        </ul>
      </div>
    <?php endif; ?>

    <?php if( $page->contact()->isNotEmpty() ): ?>
      <div class="contact">
        <?= Html::email( $page->contact() ) ?>
      </div>
    <?php endif ?>

    <div class="credits">
      <ul>
        <li>
          <div class="job">Webdesign & Programmierung</div>
          <div class="name">
            <a href="https://moritzebeling.com">Moritz Ebeling</a>
          </div>
        </li>
        <?php foreach( $page->credits()->toStructure() as $credit ): ?>
          <li>
            <div class="job"><?= $credit->job()->html() ?></div>
            <div class="name">
              <?php if( $credit->link()->isNotEmpty() ): ?>
                <?= $credit->link()->toAnchor( $credit->name()->html() ) ?>
              <?php else: ?>
                <?= $credit->name(); ?>
              <?php endif; ?>
            </div>
          </li>
        <?php endforeach; ?>
      </ul>
    </div>

    <?php if( $page->imprint()->isNotEmpty() ): ?>
      <div class="imprint">
        <?= $page->imprint()->toAnchor('Imprint'); ?>
      </div>
    <?php endif; ?>

  </section>

</main>

<?php snippet('footer') ?>
