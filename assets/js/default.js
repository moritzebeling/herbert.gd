/*
* herbert.gd
*/


function gallerySwitch( e ){

  e = e || window.event;
  e = e.target || e.srcElement;
  if ( e.nodeName != 'FIGURE' ) {
    e = e.parentNode;
    if ( e.nodeName != 'FIGURE' ) {
      e = e.parentNode;
      if ( e.nodeName != 'FIGURE' ) {
        e = e.parentNode;
      }
    }
  }
  console.log( e );
  e.classList.toggle('expose');

}
