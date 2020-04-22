<?php

/**
 * herbert
 *
 */

Kirby::plugin('moritzebeling/herbert', [

  'siteMethods' => [
    'channels' => function (): Kirby\Cms\Pages {
      return $this->children()->template('channel');
  	},
    'posts' => function (): Kirby\Cms\Pages {
  		return $this->channels()->children()->sortBy('date','desc');
  	},
  ],

  'pageMethods' => [
    'info' => function (): string {
      if( $this->hasChildren() ){
        return $this->children()->count() . ' posts';
      } else if( $this->content()->date()->exists() ){
        return $this->date()->toDate('d-m-Y');
      }
      return '';
  	},
  ],

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
    'tag' => function ( string $size = 'large' ) {

  		return Html::tag( 'img', null, [
  			'src' => $this->url(),
  			'title' => $this->title()->value(),
  			'alt' => $this->description()->value(),
        'srcset' => $this->srcset( $size )
  		]);

  	},
    'figcaption' => function ( $includeCaption = false ) {

  		$html = '';

      if( $this->description()->isNotEmpty() ){
        $html .= $this->description()->kirbytext();
      }

      if( $this->credits()->isNotEmpty() ){
        $html .= '<span class="credits">'.$this->credits()->kirbytext().'</span>';
      }

      if( $html !== '' ){
        $html = Html::tag('figcaption', $html );
      }

      return $html;

  	},
    'figure' => function ( $includeCaption = false ) {

  		$img = $this->tag();

  		$caption = '';
  		if( $includeCaption === true ){
  			$caption = $this->figcaption();
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
