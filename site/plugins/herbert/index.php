<?php

/**
 * herbert
 *
 */

function dateToSemester( int $time ): string {
  $month = date('n', $time);
  $year = date('y', $time);

  if( $month <= 3 ){
    return '<span class="term">Winter</span> '.($year+1999).'/'.$year;
  } else if( $month <= 9 ){
    return '<span class="term">Sommer</span> '.($year+2000);
  } else {
    return '<span class="term">Winter</span> '.($year+2000).'/'.($year+1);
  }
}

class ChannelPage extends Page
{
    // your custom page methods
}
class PostPage extends Page
{
  public function displayDate(): string {

    $format = $this->parent()->dateFormat()->isNotEmpty() ? $this->parent()->dateFormat()->value() : 'year';

    if( $format === 'semester' ){
      return $this->date()->toSemester();
    }

    switch ($format) {
      case 'day':
        $dateFormat = 'd/m/Y';
        break;
      case 'month':
        $dateFormat = 'm/Y';
        break;
      default:
        $dateFormat = 'Y';
    }

    return $this->date()->toDate( $dateFormat );
  }
}

Kirby::plugin('moritzebeling/herbert', [

  'pageModels' => [
    'channel' => 'ChannelPage',
    'post' => 'PostPage',
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

  'fieldMethods' => [
    'toCategoryLabel' => function($field) {
      $values = $field->split(',');
      $return = '';
      foreach( $values as $v ){
        $return .= '<span class="category-label">' . $v . '</span>';
      }
      return $return;
    },
    'toSemester' => function($field) {
      return dateToSemester( strtotime($field->value ) );
    },
    'toAnchor' => function($field, string $text = null, bool $external = true ) {
      if( $field->isEmpty() ){
        return;
      }
      if( $text === null ){
        $text = parse_url( $field->value, PHP_URL_HOST );
      } else {
        $text = str_replace('http://','',$text);
        $text = str_replace('https://','',$text);
      }
      if( $external === true ){
        $attr = [
          'target' => '_blank',
          'rel' => 'noopener'
        ];
      }
      $text = str_replace('www.','',$text);
      return Html::a($field->value, $text, $attr ?? []);
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
