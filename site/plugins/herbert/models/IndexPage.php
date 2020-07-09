<?php

class IndexPage extends Page
{
  public function layout(): string {
    return $this->site()->layout();
  }
  public function dateFormat(): string {
    return $this->site()->dateFormat();
  }
  public function posts(): Kirby\Cms\Pages {
    return $this->kirby()->collection('posts');
  }
}
