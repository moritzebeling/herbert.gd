<?php

use Kirby\Cms\App as Kirby;
use Kirby\Cms\Html;
use Kirby\Cms\Field;
use Kirby\Toolkit\Str;

function dateToSemester(int $time): string
{
    $month = date('n', $time);
    $year = date('y', $time);

    if ($month <= 3) {
        return 'Winter Semester ' . ($year + 1999) . '/' . $year;
    } else if ($month <= 9) {
        return 'Summer Semester ' . ($year + 2000);
    } else {
        return 'Winter Semester ' . ($year + 2000) . '/' . ($year + 1);
    }
}

function linkText(Field $text, string $url): string
{

    if ($text->isNotEmpty()) {
        $text = $text->html()->value();
    } else {
        $text = parse_url($url, PHP_URL_HOST);
    }

    $text = str_replace('http://', '', $text);
    $text = str_replace('https://', '', $text);
    $text = str_replace('www.', '', $text);

    return $text;
}

Str::$language = [
    'ß' => 'sz',
    'ä' => 'ae',
    'ö' => 'oe',
    'ü' => 'ue',
    'æ' => 'ae',
    '€' => 'euro',
];

require_once __DIR__ . '/models/Channel.php';
require_once __DIR__ . '/models/Home.php';
require_once __DIR__ . '/models/Search.php';
require_once __DIR__ . '/models/Post.php';

Kirby::plugin('moritzebeling/herbert', [

    'pageModels' => [
        'channel' => 'ChannelPage',
        'home' => 'HomePage',
        'search' => 'SearchPage',
        'post' => 'PostPage',
    ],

    'siteMethods' => [
        'dateFormat' => function (): string {
            if ($this->content()->dateFormat()->isNotEmpty()) {
                return $this->content()->dateFormat()->value();
            }
            return 'semester';
        },
        'layout' => function (): string {
            if ($this->content()->layout()->isNotEmpty()) {
                return $this->content()->layout()->value();
            }
            return 'cards';
        }
    ],

    'pageMethods' => [
        'layout' => function (): string {
            return 'grid';
        },
        'panelinfo' => function (): string {
            if ($this->hasChildren()) {
                return $this->children()->count() . ' posts';
            } else if ($this->content()->date()->exists()) {
                return $this->date()->toDate('d-m-Y');
            }
            return '';
        }
    ],

    'fieldMethods' => [
        'toSemester' => function ($field) {
            return dateToSemester(strtotime($field->value));
        },
        'toAnchor' => function ($field, string $text = null, bool $external = true) {
            if ($field->isEmpty()) {
                return;
            }
            if ($text === null) {
                $text = parse_url($field->value, PHP_URL_HOST);
            } else {
                $text = str_replace('http://', '', $text);
                $text = str_replace('https://', '', $text);
            }
            $text = trim($text);
            if ($external === true) {
                $attr = [
                    'target' => '_blank',
                    'rel' => 'noopener',
                    'class' => 'external',
                    'title' => 'Open ' . $text . ' in a new tab',
                ];
            }
            $text = str_replace('www.', '', $text);
            return Html::a($field->value, $text, $attr ?? []);
        },
    ],

    'fileMethods' => [
        'tag' => function (string $size = 'large') {

            return Html::tag('img', null, [
                'alt' => $this->alt(),
                'width' => $this->width(),
                'height' => $this->height(),
                'class' => 'lazyload',
                'data-sizes' => 'auto',
                'src' => $this->resize(2000)->url(),
                'data-src' => $this->resize(2000)->url(),
                'data-srcset' => $this->srcset($size),
            ]);
        },
        'figcaption' => function ($includeCaption = false) {

            $html = '';

            if ($this->description()->isNotEmpty()) {
                $html = $this->description()->kirbytext();
            }

            if ($this->credits()->isNotEmpty()) {
                $html .= '<span class="credits">©' . $this->credits()->kirbytext() . '</span>';
            }

            if ($html !== '') {
                $html = Html::tag('figcaption', $html);
            }

            return $html;
        },
        'figure' => function ($includeCaption = false) {

            $img = $this->tag();

            $caption = '';
            if ($includeCaption === true) {
                $caption = $this->figcaption();
            }

            return '<figure>' . $img . $caption . '</figure>';
        },
        'panelinfo' => function (): string {

            $help = '';
            if ($this->exclude()->isTrue()) {
                $help .= '<span class="k-icon k-icon-protected"><svg viewBox="0 0 16 16"><use xlink:href="#icon-protected"></use></svg></span>';
            }
            if ($this->videoUrl()->isNotEmpty()) {
                $help .= '<span class="k-icon k-icon-video"><svg viewBox="0 0 16 16"><use xlink:href="#icon-video"></use></svg></span>';
            }
            return $help;
        },
        'alt' => function (): string {

            $alt = '';

            if ($this->description()->isNotEmpty()) {
                $alt = $this->description()->html();
            } else {
                $alt = $this->parent()->title()->html();
            }

            if ($this->credits()->isNotEmpty()) {
                $alt .= ' (©' . $this->description()->html() . ')';
                $alt = trim($alt);
            }

            return $alt;
        }
    ]

]);
