<?php

/**
 * herbert
 *
 */

Kirby::plugin('moritzebeling/herbert', [

  'pagesMethods' => [
    'pluckStructure' => function ( $structureField, $innerField = false ) {
  		/*
  		* needed to suggest autocompletes for fields within structures
  		* $field: name of the structure field you want to pluck
  		* $innerField: field within the structure field, that you actually want to recieve
  		*/
  		$structures = $this->pluck( $structureField );
  		$return = [];
  		foreach( $structures as $structure ){
  			foreach( $structure->{$structureField}()->yaml() as $row ){
  				if( !$innerField && array_filter($row) ){
  					$return[] = $row;
  				} else if( isset( $row[$innerField] ) ){
  					$return[] = $row[$innerField];
  				}
  			}
  		}
  		return array_unique($return);
  	},
  ],

  'fileMethods' => [
    'figure' => function ( $includeCaption = false ) {

  		$img = Html::tag( 'img', null, [
  			'src' => $this->url(),
  			'title' => $this->title()->value(),
  			'alt' => $this->description()->value()
  		]);

  		$caption = '';
  		if( $includeCaption === true ){
  			if( $this->description()->isNotEmpty() ){
  				$caption = Html::tag('figcaption', $this->description()->value() );
  			}
  		}

  		return '<figure>'.$img.$caption.'</figure>';

  	},
  ],

  'controllers' => [
      'search' => function ( $site ) {
          $query   = get('q');
          $results = $site->index()->listed()->search($query, 'title|subtitle|tags|description|body|credits|location|date');

          return [
            'query'   => $query,
            'results' => $results,
          ];
      }
  ]


]);
