<?php

$keywords = [];

if( $page->date()->isNotEmpty() ){
	$keywords[] = SiteSearch::date( $page->dateFormat(), $page->date()->toDate('Y-m-d'), $page->displayDate() );
}

foreach( $page->categories()->split() as $category ){
	$keywords[] = SiteSearch::link( $category );
}

foreach( $page->keywords()->split() as $keyword ){
	$keywords[] = SiteSearch::link( $keyword );
}

if( count($keywords) < 1 ){
	return;
}

?>
<ul class="keywords">
	<?php foreach( $keywords as $keyword ): ?>
		<li><?= $keyword ?></li>
	<?php endforeach; ?>
</ul>
