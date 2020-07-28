<link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">
<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
<script>

	const swiperOptions = {
		speed: 700,
		spaceBetween: 0,
		loop: true,
		lazy: true,
		grabCursor: true,
		initialSlide: 0,
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
	};

	const gContainer = document.querySelector('.swiper-container');
	let gSwiper, figures;

	if( gContainer && gContainer.classList.contains('multiple') ){

		startSwiper();

	}

	function startSwiper( i = 0 ){
		console.log('show slider', i);

		gContainer.classList.add('swiper-container');

		swiperOptions.initialSlide = i;
		gSwiper = new Swiper( gContainer, swiperOptions );
	}

</script>
