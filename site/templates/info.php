<?php snippet('header') ?>

<main>

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
          <li class="person">

            <figure>
              <?php if( $image = $member->image()->toFile() ): ?>
                <?= $image->tag(); ?>
              <?php endif; ?>
            </figure>

            <h3 class="name"><?= $member->name()->html(); ?></h3>

            <div class="about"><?= $member->text()->kirbytext(); ?></div>

            <?php if( $member->link()->isNotEmpty() ): ?>
              <div class="link"><?= $member->link()->toAnchor(); ?></div>
            <?php endif; ?>

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

  <section class="credits">
    <ul>
      <li>
        <div class="job">Webdesign & Programming</div>
        <div class="name">
          <a href="https://moritzebeling.com" target="_blank">Moritz Ebeling</a>
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
      <li>
        Help improve this website on <a target="_blank" href="<?= option('repo') ?>">GitHub</a>
      </li>
    </ul>
  </section>

  <?php if( $page->imprint()->isNotEmpty() ): ?>
    <section class="imprint">
      <div class="button"><?= $page->imprint()->toAnchor('Imprint'); ?></div>
    </section>
  <?php endif; ?>

</main>

<?php snippet('footer');
