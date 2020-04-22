<?php

return function ($site) {
	return $site->children()->template('channel')->listed();
};
