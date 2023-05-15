<?php

// $videoUrl
if (!isset($videoUrl)) {
    return;
}

?>
<div class="player">

    <?= video($videoUrl, option('video')) ?>

</div>