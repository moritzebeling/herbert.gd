<?php

return function ($kirby) {
	return $kirby->collection('channels')->children()->sortBy('date','desc');
};
