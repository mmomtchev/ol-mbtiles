import home from './velivole';
import klokantech from './klokantech';
import osm from './osm-vector-tiles';

$('.menu-btn').on('click', (ev) => {
  $('#example').html('<div id="map"></div>');
  switch (ev?.target?.id) {
    default:
      home();
      break;

    case 'klokantech':
      klokantech();
      break;

    case 'osm':
      osm();
      break;
  }
});

