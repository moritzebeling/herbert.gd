<?php

// https://jsonld.com/json-ld-generator/

$jsonld = [
  '@context' => 'https://schema.org/',
  '@type' => 'WebSite',
  'copyrightYear' => date('Y'),
  'name' => $site->title()->value(),
  'url' => $site->url()
];

?>
<script type="application/ld+json"><?= json_encode($jsonld) ?></script>
