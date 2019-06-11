<?php

/**
 * picture
 *
 * snippet for rendering the cover image
 *
 * recieves
 * - $page (field containing the file)
 * - $sizes (name of preset defines in config)
 *
 */

// abort if image doesn’t exist
if( !$image ){
  return;
}


// output



if( $figtag !== false ): ?>
<figure>
<?php endif; ?>

  <img class="lazy"
    alt="<?= $image->caption()->html(); ?>"
    src="<?= $image->resize(2)->url() ?>"
    data-srcset="<?= $image->srcset( $sizes ); ?>"
    />
<?php if( $figtag !== false ): ?>
</figure>
<?php endif; ?>
