import Flickity from 'flickity';

var flkty = new Flickity('.carousel', {
  cellAlign: 'left',
  contain: true,
  wrapAround: true,
  watchCSS: true
});

export default flkty;
