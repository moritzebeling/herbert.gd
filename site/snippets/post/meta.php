<?php

$entries = [];

if( $page->date()->isNotEmpty() ){

	$entries[] = '<li class="date">'.
		SiteSearch::date( $page->dateFormat(), $page->date()->toDate('Y-m-d'), $page->displayDate() ).
		'</li>';

}

foreach( $page->categories()->split() as $category ){

	$entries[] = '<li class="category">'.
		SiteSearch::link( $category ).
		'</li>';

}

foreach( $page->keywords()->split() as $keyword ){

	$entries[] = '<li class="tag">'.
		SiteSearch::link( $keyword ).
		'</li>';

}

if( count($entries) < 1 ){
	return;
}

?>
<ul class="keywords">
	<?php foreach( $entries as $html ): ?>
		<?= $html ?>
	<?php endforeach; ?>
</ul>
