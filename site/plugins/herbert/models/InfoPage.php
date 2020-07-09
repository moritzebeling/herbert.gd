<?php

class InfoPage extends Page
{
  public function json(): array {

    $return = parent::json();
    unset( $return['layout'] );

    $return['description'] = $this->body()->kirbytextinline()->value();
    $return['collaboration'] = option('repo');
    $return['imprint'] = $this->imprint()->value();

    if( $this->contact()->isNotEmpty() ){
      $return['email'] = $this->contact()->value();
    }

    foreach( $this->team()->toStructure() as $item ){
      $member = [
        'name' => $item->name()->html()->value(),
        'description' => $item->text()->kirbytextinline()->value()
      ];
      if( $item->link()->isNotEmpty() ){
        $member['link'] = $item->link()->value();
      }
      if( $image = $item->image()->toFile() ){
        $member['image'] = $image->json();
      }

      if( !isset($return['team']) ){
        $return['team'] = [];
      }
      $return['team'][] = $member;
    }

    $return['credits'] = [
      [
        'job' => 'Webdesign & Programming',
        'name' => 'Moritz Ebeling',
        'link' => 'https://moritzebeling.com',
      ]
    ];
    foreach( $this->credits()->toStructure() as $item ){
      $credit = [
        'job' => $item->job()->html()->value(),
        'name' => $item->name()->html()->value()
      ];
      if( $item->link()->isNotEmpty() ){
        $credit['link'] = $item->link()->value();
      }
      $return['credits'][] = $credit;
    }

    return $return;
  }
}
