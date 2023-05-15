<?php

use Kirby\Cms\Page;
use Kirby\Cms\Files;

class PostPage extends Page
{

    public function images()
    {
        return parent::images()->sortBy('sort', 'ASC', 'filename', 'ASC');
    }

    public function image(string $filename = null)
    {
        if ($filename !== null) {
            return parent::image($filename);
        } else if ($image = $this->content()->image()->toFile()) {
            return $image;
        }
        return $this->images()->first();
    }

    public function gallery(bool $filter = true): Files
    {
        if ($filter === true) {
            return $this->images()->filter(function ($image) {
                return !$image->exclude()->isTrue();
            });
        }
        return $this->images();
    }

    public function channel(): ChannelPage
    {
        return $this->parent();
    }

    public function dateFormat(): string
    {
        return $this->channel()->dateFormat();
    }

    public function displayDate(string $format = null): string
    {

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

        return $this->date()->toDate($dateFormat);
    }

}
