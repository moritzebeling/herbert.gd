<?php snippet('header') ?>

<main>

  <header class="post-header">
    <h1><?= $page->title()->html() ?></h1>
  </header>

  <section class="content">

    <?php if( $page->body()->isNotEmpty() ): ?>
      <?= $page->body()->kirbytext(); ?>
    <?php endif ?>

  </section>

  <?php $team = $page->team()->toStructure();
  if( $team->count() > 0 ): ?>
    <section class="team">
      <ul>
        <?php foreach( $team as $member ): ?>
          <li>
            <div>

              <?php if( $image = $member->image()->toFile() ): ?>
                <?= $image->figure(); ?>
              <?php endif; ?>

            </div>
            <div>

              <h3 class="name"><?= $member->name()->html(); ?></h3>

              <?= $member->text()->kirbytext(); ?>

              <?= $member->link()->toAnchor(); ?>

            </div>
          </li>
        <?php endforeach; ?>
      </ul>
    </section>
  <?php endif; ?>

  <?php if( $page->contact()->isNotEmpty() ): ?>
    <section class="contact">
      <?= Html::email( $page->contact() ) ?>
    </section>
  <?php endif ?>

  <?php if( $page->imprint()->isNotEmpty() ): ?>
    <section class="imprint">
      <?= $page->imprint()->toAnchor('Imprint'); ?>
    </section>
  <?php endif; ?>

  <section class="credits">
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
  </section>

</main>

<?php snippet('footer') ?>
