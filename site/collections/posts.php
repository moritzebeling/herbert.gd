<?php

return function ($site) {
	return $site->find('posts')->children()->listed()->flip();
};
