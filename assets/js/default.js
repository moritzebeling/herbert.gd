console.info('Welcome on herbert.gd');
console.info('This website was made by Moritz Ebeling https://moritzebeling.com');
console.info('If you want to contribute to this website, go to https://github.com/moritzebeling/herbert.gd');

/*
* herbert.gd
*/

/*

function cut( str, i ){
  let glue = ' ';
  if( i === 0 ){
    glue = '';
    i = 1;
  }
  let words = [];
  for( let word of str.split(' ') ){
    words.push( word.substring( 0, i ) );
  }
  return words.join( glue );
}

function condenseTitle( e ){
  el = e.target.closest('a');
  if( el.classList.contains('condensed') || el.classList.contains('animating') ){
    return;
  }
  el.classList.add('animating');
  let title = el.title;
  let max = longestWord( title ).length;
  let i = max;
  el.innerHTML = cut( title, i );
  let intervalA = setInterval(function () {
    i--;
    el.innerHTML = cut( title, i );
    if (i === 0) {
      el.classList.remove('animating');
      el.classList.add('condensed');
      window.clearInterval(intervalA);
    }
  }, 30);
}

function expandTitle( e ){
  el = e.target.closest('a');
  if( !el.classList.contains('condensed') || el.classList.contains('animating')  ){
    return;
  }
  el.classList.add('animating');
  let title = el.title;
  let max = longestWord( title ).length;
  let i = 0;
  el.innerHTML = cut( title, i );
  let intervalB = setInterval(function () {
    i++;
    el.innerHTML = cut( title, i );
    if (i === max) {
      el.classList.remove('animating');
      el.classList.remove('condensed');
      window.clearInterval(intervalB);
    }
  }, 30);
}

*/

function loggo( text = 'XXX' ){
  console.log( text );
}

class animationElement {
  constructor( element ){
    this.interval;

    this.element = element;

    this.title = element.title;
    this.words = this.title.split(' ');
    this.max = this.longestWord( this.title );

    element.addEventListener( 'onmouseenter', loggo, false );
    element.addEventListener( 'onmouseleave', loggo, false );

    this.position = this.max;
    this.isCondensed = this.title !== this.text;
    this.isAnimating = false;
    this.isMouseOver = false;
  }
  longestWord( text ){
    return text.split(' ').reduce((a, b) => a.length > b.length ? a : b, '').length;
  }
  over(){
    if( this.isMouseOver === true ){
      return;
    }
    this.isMouseOver = true;
    this.animate( 1 );
  }
  out(){
    if( this.isMouseOver === true ){
      return;
    }
    this.isMouseOver = true;
    this.animate( -1 );
  }
  set text( t ){
    this.element.innerHTML = t;
  }
  get text(){
    return this.element.innerHTML;
  }
  cut( p ){
    this.position = p;

    let glue = p === 1 ? '' : ' ';

    let w = [];
    for( let word of this.words ){
      w.push( word.substring( 0, p ) );
    }

    this.text = w.join( glue );
  }
  animate( direction ){
    if( this.isAnimating === true ){
      return;
    }
    this.isAnimating = true;

    let p = this.position + direction;
    cut( p );

    this.interval = setInterval(function () {

      let p = this.position + direction;
      cut( p );

      if (p === 1) {
        this.isCondensed = true;
        this.isAnimating = false;
        clearInterval( this.interval );
      } else if( p === this.max ){
        this.isCondensed = false;
        this.isAnimating = false;
        clearInterval( this.interval );
      }
    }, 30);

  }
}

let animationElements = [];
onLoad(()=>{
  let links = getAll('.condense-animation');
  for (let link of links) {
    animationElements.push( new animationElement( link ) );
  }
  console.log( animationElements );
});

/*
function hit(e){
  let el = event.target.closest('a');
  let siblings = el.closest('nav').querySelectorAll('a');
  for( let a of siblings ){
    a.classList.remove('active');
  }
  el.classList.add('active');
  expandTitle( e, el );
}
*/
