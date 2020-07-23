<?php

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
  public function json( bool $full = true ): array {

    $data = parent::json();
    $data['id'] = $this->num();

    if( $full === true ){
      $data['posts'] = $this->posts()->json();
    }

    return $data;

    if( $full === true && $this->showDescription()->isTrue() ){

      $data['description'] = $this->description()->kirbytext()->value();

      /* links */
      foreach( $this->links()->toStructure() as $item ){
        $link = [
          'text' => linkText( $item->title(), $item->url()->value() ),
          'url' => $item->url()->value()
        ];

        if( !isset($data['links']) ){
          $data['links'] = [];
        }
        $data['links'][] = $link;
      }

    }

  }
}
