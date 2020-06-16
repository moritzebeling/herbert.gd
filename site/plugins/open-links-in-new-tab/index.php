<?php

Kirby::plugin('moritzebeling/open-links-in-new-tab', [
	'tags' => [
		'link' => [
			'attr' => [
				'class',
				'lang',
				'rel',
				'role',
				'target',
				'title',
				'text',
			],
			'html' => function ($tag) {

				if (empty( $tag->lang ) === false) {
					$tag->value = Url::to($tag->value, $tag->lang);
				}

				if (empty( $tag->target )) {
					if ($domain = parse_url( $tag->value )) {
						if (isset( $domain['host'] )) {

							$tag->target = '_blank';

							if (empty( $tag->text )) {
								$tag->text = $domain['host'];
							}

						}
					}
				}

				return Html::a($tag->value, $tag->text, [
					'rel'    => $tag->rel,
					'class'  => $tag->class,
					'role'   => $tag->role,
					'title'  => $tag->title,
					'target' => $tag->target,
				]);
			}
		],
  ]
]);
