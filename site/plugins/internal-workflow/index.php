<?php

/**
 * internal-workflow
 * 
 * register when andy by whom a page was created and updated
 * 
 */

Kirby::plugin('moritz-ebeling/internal-workflow', [

  // blueprints
  'blueprints' => [

    // tabs
    'tabs/workflow' => __DIR__ . '/blueprints/tabs/workflow.yml',

  ],

  // hooks
  'hooks' => [
    'page.update:after' => function ($page) {

      if( $page->workflow_updated()->exists() && $page->workflow_updatedBy()->exists() ){
        $page->update([
          'workflow_updated' => date('Y-m-d H:i'),
          'workflow_updatedBy' => $this->user()
        ]);
      }

    }
  ],

]);
