console.info('Welcome on herbert.gd');
console.info('This website was made by Moritz Ebeling https://moritzebeling.com');
console.info('If you want to contribute to this website, go to https://github.com/moritzebeling/herbert.gd');

window.addEventListener(
	"scroll",
	() => {
		window.requestAnimationFrame(() => {
			scrollControl( window.scrollY );
		});
	},
	{ passive: true }
);

let hasScrolled = false;
function scrollControl( pos ){
	if( hasScrolled === false && pos > 100 ){
		document.body.classList.add('has-scrolled');
		hasScrolled = true;
	} else if( hasScrolled === true && pos < 100 ){
		document.body.classList.remove('has-scrolled');
		hasScrolled = false;
	}
}
