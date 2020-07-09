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
}
