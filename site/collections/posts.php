<?php

return function ($site) {
	return $site->children()->template('channel')->listed()->children()->sortBy('date','desc');
};
