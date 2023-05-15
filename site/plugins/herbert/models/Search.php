<?php

use Kirby\Cms\Page;
use Kirby\Cms\Pages;

class SearchPage extends Page
{

    public function layout(): string
    {
        return $this->site()->layout();
    }

    public function dateFormat(): string
    {
        return $this->site()->dateFormat();
    }

    public function posts(): Pages
    {
        return $this->kirby()->collection('posts');
    }
}
