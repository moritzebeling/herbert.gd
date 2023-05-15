<?php

$metaParent = $page;

if ($page->isHome()) {
    $metaParent = $site;
}

if ($metaParent->subtitle()->isNotEmpty()) {
    $desc = $metaParent->subtitle()->value();
} elseif ($metaParent->description()->isNotEmpty()) {
    $desc = $metaParent->description()->value();
} else {
    $desc = $site->description()->value();
}

$keywords = array_merge($page->keywords()->split(), $site->keywords()->split());

if ($image = $metaParent->image()) {
} elseif ($image = $parent->image()) {
}

$address = [
    '@type' => 'PostalAddress',
    'addressLocality' => 'Weimar',
    'postalCode' => '99423',
    'streetAddress' => 'Geschwister-Scholl-Straße 8',
    'addressCountry' => 'Germany',
    'url' => 'https://uni-weimar.de'
];

$jsonld = [
    '@context' => 'https://schema.org/',
    '@type' => 'WebSite',
    'copyrightYear' => date('Y'),
    'name' => $site->title()->value(),
    'url' => $site->url(),
    'about' => [
        '@type' => 'Course',
        'name' => 'Visuelle Kommunikation',
        'teaches' => 'Graphic Design, Typography, Design, Product Design, Photography, Cinematography',
        'description' => 'Herbert.gd is the online platform for the department of visual communication and graphic design at the bauhaus University Weimar, Germany.',
        'provider' => [
            '@type' => 'CollegeOrUniversity',
            'name' => 'Bauhaus-Universität Weimar',
            'location' => $address,
        ]
    ],
    'abstract' => $desc,
    'text' => $desc,
    'keywords' => $keywords,
    'description' => 'Herbert.gd is the online platform for the department of visual communication and graphic design at the bauhaus University Weimar, Germany.',
    'alternateName' => 'Visuelle Kommunikation',
    'author' => [
        '@type' => 'Organization',
        'name' => 'Bauhaus-Universität Weimar',
        'location' => $address,
    ],
    'publisher' => [
        '@type' => 'Organization',
        'name' => 'Bauhaus-Universität Weimar',
        'location' => $address,
    ],
    'creator' => [
        '@type' => 'Person',
        'name' => 'Markus Weisbeck',
        'jobTitle' => 'Professor',
    ],
    'producer' => [
        '@type' => 'Person',
        'name' => 'Moritz Ebeling',
        'jobTitle' => 'Designer, Programmer',
        'url' => 'https://moritzebeling.com',
    ],
    'editor' => [
        '@type' => 'Person',
        'name' => 'Adrian Palko',
        'jobTitle' => 'Tutor',
    ],
];



?>

<link rel="canonical" href="<?= $page->url() ?>" />
<meta name="description" content="<?= $desc ?>">
<meta name="keywords" content="<?= implode(', ', $keywords) ?>">
<meta name="Generator" content="Moritz Ebeling (https://moritzebeling.com)">
<?php if ($info = page('info')) : ?>
    <link rel="author" href="<?= $info->url() ?>">
<?php endif ?>

<meta property="og:site_name" content="<?= $site->title() ?>">
<meta property="og:type" content="website">
<meta property="og:title" content="<?= $metaParent->title() ?>">
<meta property="og:url" content="<?= $metaParent->url() ?>">
<meta property="og:locale" content="de_DE">
<meta property="og:description" content="<?= $desc ?>">
<meta property="og:image" content="<?= $image->resize(1000)->url() ?>" />

<script type="application/ld+json">
    <?= json_encode($jsonld) ?>
</script>