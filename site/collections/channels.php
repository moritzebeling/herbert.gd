<?php

return function ($site) {
	return $site->children()->listed()->template('channel');
};
