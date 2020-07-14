<?php

/**
 * herbert
 *
 */

function dateToSemester( int $time ): string {
  $month = date('n', $time);
  $year = date('y', $time);

  if( $month <= 3 ){
    return 'Winter '.($year+1999).'/'.$year;
  } else if( $month <= 9 ){
    return 'Sommer '.($year+2000);
  } else {
    return 'Winter '.($year+2000).'/'.($year+1);
  }
}

function isolateInitials( string $text ): string {
  $words = explode(' ',$text);
  $sequence = [];
  foreach( $words as $word ){
    $sequence[] = '<span class="i">'.substr( $word, 0, 1 ).'</span><span class="f">'.substr( $word, 1 ).' </span>';
  }
  return implode('', $sequence);
}

function linkText( Kirby\Cms\Field $text, string $url ): string {

  if( $text->isNotEmpty() ){
    $text = $text->html()->value();
  } else {
    $text = parse_url( $url, PHP_URL_HOST );
  }

  $text = str_replace('http://','',$text);
  $text = str_replace('https://','',$text);
  $text = str_replace('www.','',$text);

  return $text;

}

require_once __DIR__.'/models/ChannelPage.php';
require_once __DIR__.'/models/HomePage.php';
require_once __DIR__.'/models/IndexPage.php';
require_once __DIR__.'/models/InfoPage.php';
require_once __DIR__.'/models/PostPage.php';

Kirby::plugin('moritzebeling/herbert', [

  'pageModels' => [
    'channel' => 'ChannelPage',
    'start' => 'HomePage',
    'index' => 'IndexPage',
    'info' => 'InfoPage',
    'post' => 'PostPage',
  ],

  'siteMethods' => [
    'dateFormat' => function (): string {
      if( $this->content()->dateFormat()->isNotEmpty() ) {
        return $this->content()->dateFormat()->value();
      }
      return 'semester';
  	},
    'layout' => function (): string {
      if( $this->content()->layout()->isNotEmpty() ) {
        return $this->content()->layout()->value();
      }
      return 'cards';
  	},
    'json' => function ( bool $full = true ): array {
      $json = [
        'title' => $this->title()->value(),
        'href' => $this->url(),
        'layout' => $this->layout()
      ];
      if( $info = $this->page('info') ){
        $json['info'] = $info->json();
      }
      if( $channels = $this->kirby()->collection('channels') ){
        $json['channels'] = $channels->json();
      }
      return $json;
  	}
  ],

  'pageMethods' => [
    'layout' => function (): string {
      return 'grid';
  	},
    'panelinfo' => function (): string {
      if( $this->hasChildren() ){
        return $this->children()->count() . ' posts';
      } else if( $this->content()->date()->exists() ){
        return $this->date()->toDate('d-m-Y');
      }
      return '';
  	},
    'json' => function ( bool $full = true ): array {
      return [
        'title' => $this->title()->value(),
        'href' => $this->id(),
        'template' => $this->intendedTemplate()->name(),
        'layout' => $this->layout(),
      ];
  	}
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
    'json' => function( bool $full = false ): array {
      $json = [];
      foreach($this as $page) {
        $json[] = $page->json( $full );
      }
      return $json;
    }
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
      return dateToSemester( strtotime( $field->value ) );
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
      $text = trim( $text );
      if( $external === true ){
        $attr = [
          'target' => '_blank',
          'rel' => 'noopener',
          'class' => 'external',
          'title' => 'Open '.$text.' in a new tab',
        ];
      }
      $text = str_replace('www.','',$text);
      return Html::a($field->value, $text, $attr ?? []);
    },
  ],

  'filesMethods' => [
    'json' => function( bool $full = false ): array {
      $json = [];
      foreach($this as $page) {
        $json[] = $page->json( $full );
      }
      return $json;
    }
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
    'panelinfo' => function (): string {

      $help = '';
      if( $this->exclude()->isTrue() ){
        $help .= '<span class="k-icon k-icon-protected"><svg viewBox="0 0 16 16"><use xlink:href="#icon-protected"></use></svg></span>';
      }
      if( $this->videoUrl()->isNotEmpty() ){
        $help .= '<span class="k-icon k-icon-video"><svg viewBox="0 0 16 16"><use xlink:href="#icon-video"></use></svg></span>';
      }
      return $help;

  	},
    'json' => function( bool $full = true ): array {

      $return = [
        'orientation' => $this->orientation(),
        'image' => $this->tag()
      ];

      if( $this->videoUrl()->isNotEmpty() ){
        $return['video'] = video( $this->videoUrl()->value(), option('video') );
      }

      return $return;

    }
  ]


]);
