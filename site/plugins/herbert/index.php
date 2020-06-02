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

class HomePage extends Page
{
  public function layout(): string {
    return $this->site()->layout();
  }
  public function dateFormat(): string {
    return $this->site()->dateFormat();
  }
  public function posts(): Kirby\Cms\Pages {
    return $this->site()->content()->featured()->toPages();
  }
  public function json(): array {
    $posts = $this->posts();
    return [
      'title' => $this->site()->title()->value(),
      'href' => $this->site()->url(),
      'template' => 'channel',
      'layout' => $this->layout(),
      'categories' => $posts->pluck('categories', ',', true),
      'posts' => $posts->json(),
    ];
  }
}
class ChannelPage extends Page
{
  public function image( string $filename = null ) {
    if( $filename !== null ){
      return parent::image( $filename );
    } else if( $image = $this->content()->image()->toFile() ){
      return $image;
    }
    return $this->images()->first();
  }
  public function dateFormat(): string {
    if( $this->content()->dateFormat()->isNotEmpty() ) {
      return $this->content()->dateFormat()->value();
    }
    return $this->site()->dateFormat();
  }
  public function layout(): string {
    if( $this->content()->layout()->isNotEmpty() ) {
      return $this->content()->layout()->value();
    }
    return $this->site()->layout();
  }
  public function posts(): Kirby\Cms\Pages {
    return $this->children()->listed()->flip();
  }
  public function json(): array {
    $posts = $this->posts();
    return [
      'title' => $this->title()->value(),
      'href' => $this->url(),
      'template' => 'channel',
      'layout' => $this->layout(),
      'categories' => $posts->pluck('categories', ',', true),
      'posts' => $posts->json(),
    ];
  }
}
class PostPage extends Page
{
  public function images() {
    return parent::images()->sortBy('sort', 'ASC', 'filename', 'ASC');
  }
  public function image( string $filename = null ) {
    if( $filename !== null ){
      return parent::image( $filename );
    } else if( $image = $this->content()->image()->toFile() ){
      return $image;
    }
    return $this->images()->first();
  }
  public function gallery( bool $filter = true ) {
    if( $filter === true ){
      return $this->images()->filter(function($image) {
        return !$image->exclude()->isTrue();
      });
    }
    return $this->images();
  }
  public function channel(): ChannelPage {
    return $this->parent();
  }
  public function dateFormat(): string {
    return $this->channel()->dateFormat();
  }
  public function displayDate( string $format = null ): string {

    $format = $format !== null ? $format : $this->dateFormat();

    switch ($format) {
      case 'none':
        return '';
      case 'semester':
        return $this->date()->toSemester();
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
  public function json(): array {

    $return = [
      'href' => $this->url(),
      'title' => $this->title()->value(),
      'subtitle' => $this->subtitle()->value(),
      'categories' => $this->categories()->split(),
      'date' => $this->displayDate(),
      'keywords' => $this->keywords()->split(),
    ];

    if( $image = $this->image() ){
      $return['image'] = $image->json();
    }

    return $return;
  }
}

Kirby::plugin('moritzebeling/herbert', [

  'pageModels' => [
    'channel' => 'ChannelPage',
    'post' => 'PostPage',
    'start' => 'HomePage',
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
  	}
  ],

  'pageMethods' => [
    'info' => function (): string {
      return 'legacyyyyy';
  	},
    'panelinfo' => function (): string {
      if( $this->hasChildren() ){
        return $this->children()->count() . ' posts';
      } else if( $this->content()->date()->exists() ){
        return $this->date()->toDate('d-m-Y');
      }
      return '';
  	},
    'json' => function (): array {
      return [
        'title' => $this->title()->value(),
        'href' => $this->url(),
        'template' => $this->intendedTemplate()
      ];
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
    'json' => function(): array {
      $json = [];
      foreach($this as $page) {
        $json[] = $page->json();
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
    'json' => function(): array {

      if( $this->videoUrl()->isNotEmpty() ){
        return [
          'type' => 'video',
          'html' => video( $this->videoUrl()->value(), option('video') )
        ];
      }
      return [
        'type' => 'image',
        'orientation' => $this->orientation(),
        'html' => $this->tag()
      ];

    }
  ]


]);
