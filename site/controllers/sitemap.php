<?php

return function ( $site ) {
  return [
    'pages' => $site->index()->listed()
  ];
};
