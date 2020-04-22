<?php

return function ($site) {
	return $site->content()->featured()->toPages();
};
