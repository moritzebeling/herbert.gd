/*
* herbert.gd
*/

console.info('Welcome on herbert.gd');
console.info('This website was made by Moritz Ebeling https://moritzebeling.com');
console.info('If you want to contribute to this website, go to https://github.com/moritzebeling/herbert.gd');

function longestWord( str ){
  return str.split(' ').reduce((a, b) => a.length > b.length ? a : b, '');
}

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
  if( el.classList.contains('condensed') ){
    return;
  }
  el.classList.add('condensed');
  let title = el.title;
  let max = longestWord( title ).length;
  let i = max;
  el.innerHTML = cut( title, i );
  let intervalA = setInterval(function () {
    i--;
    el.innerHTML = cut( title, i );
    if (i === 0) {
      window.clearInterval(intervalA);
    }
  }, 20);
}

function expandTitle( e ){
  el = e.target.closest('a');
  if( !el.classList.contains('condensed') ){
    return;
  }
  el.classList.remove('condensed');
  let title = el.title;
  let max = longestWord( title ).length;
  let i = 0;
  el.innerHTML = cut( title, i );
  let intervalB = setInterval(function () {
    i++;
    el.innerHTML = cut( title, i );
    if (i === max) {
      window.clearInterval(intervalB);
    }
  }, 20);
}

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
