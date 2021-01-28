<?php

class PostPage extends Page
{

	public function images() {
		return parent::images()->sortBy('sort', 'ASC', 'filename', 'ASC');
	}

	public function image( string $filename = null ) {
		if( $filename !== null ){
			return parent::image( $filename );
		} else if( $image = $this->content()->image()->toFile() ){
			return $image;
		}
		return $this->images()->first();
	}

	public function gallery( bool $filter = true ): Kirby\Cms\Files {
		if( $filter === true ){
			return $this->images()->filter(function($image) {
				return !$image->exclude()->isTrue();
			});
		}
		return $this->images();
	}

	public function channel(): ChannelPage {
		return $this->parent();
	}

	public function dateFormat(): string {
		return $this->channel()->dateFormat();
	}

	public function displayDate( string $format = null ): string {

		$format = $format !== null ? $format : $this->dateFormat();

		switch ($format) {
			case 'none':
				return '';
			case 'semester':
				return $this->date()->toSemester();
			case 'day':
				$dateFormat = 'd/m/Y';
				break;
			case 'month':
				$dateFormat = 'm/Y';
				break;
			default:
				$dateFormat = 'Y';
		}

		return $this->date()->toDate( $dateFormat );
	}

	public function json( bool $full = true ): array {

		$return = parent::json();

		$return = array_merge( $return, [
			'channel' => $this->channel()->uid(),
			'date' => $this->displayDate(),
			'year' => $this->date()->toDate('Y'),
			'subtitle' => $this->subtitle()->value(),
			'categories' => $this->categories()->split(),
			'keywords' => $this->keywords()->split(),
		]);

		if( $image = $this->image() ){
			$return['image'] = $image->json();
		}

		if( $full !== true ){
			return $return;
		}

		if( $this->body()->isNotEmpty() ){
			$return['content'] = $this->body()->kirbytext()->value();
		}

		if( $this->hasImages() ){
			$return['gallery'] = $this->gallery()->json();
		}

		return $return;
	}

}
