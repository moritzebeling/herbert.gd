<?php snippet('header') ?>

<main>

  <header>

    <?php if( $page->body()->isNotEmpty() ): ?>
      <?= $page->body()->kirbytext(); ?>
    <?php endif ?>

    <?php snippet('fields/links',[
      'links' => $site->links()
    ]); ?>

    <div>
      <ul class="keywords">
        <?php

        $entries = [];
        $posts = kirby()->collection('posts');

        foreach( $posts->pluck('categories',',',true) as $category ){

        	$entries[] = '<li class="category">'.
        		SiteSearch::link( $category ).
        		'</li>';

        }

        foreach( $page->attributes()->toStructure() as $attribute ){

        	$entries[] = '<li class="attribute">'.
        		SiteSearch::link( $attribute->value()->value() ).
        		'</li>';

        }

        foreach( $posts->pluck('keywords',',',true) as $keyword ){

        	$entries[] = '<li class="tag">'.
        		SiteSearch::link( $keyword ).
        		'</li>';

        }

        ?>
    		<?php foreach( $entries as $html ): ?>
    			<?= $html ?>
    		<?php endforeach; ?>

      </ul>
    </div>

  </header>

  <?php $team = $page->team()->toStructure();
  if( $team->count() > 0 ): ?>
    <section class="team">
      <ul class="flex rulers">
        <?php foreach( $team as $member ): ?>
          <li class="col-6">

            <figure>
              <?php if( $image = $member->image()->toFile() ): ?>
                <?= $image->tag(); ?>
                <figcaption><span>&copy; <?= $image->credits(); ?></span></figcaption>
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

</main>

<?php snippet('footer');
