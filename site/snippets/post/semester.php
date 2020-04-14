<?php

$semesters = $page->semester()->toStructure();

if( $semesters->count() < 1 ){
  return;
}

$semester = $semesters->first();

?>
<div class="row semester">

  <div class="key">
    Semester
  </div>

  <div class="value">

    <?php if( $semester->term()->isNotEmpty() ): ?>
      <span class="term"><?= ucwords( $semester->term() ) ?></span>
    <?php endif; ?>

    <?php if( $semester->year()->isNotEmpty() ): ?>
      <span class="year"><?= $semester->year() ?></span>
    <?php endif; ?>

  </div>

</div>
