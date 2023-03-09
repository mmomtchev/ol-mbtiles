import 'ol/ol.css';
import './style.css';
import 'prism-themes/themes/prism-vsc-dark-plus.css';

const examples = {
  'velivole': 'Towns from velivole.fr, EPSG: 4326',
  'klokantech': 'Borders from klokantech, EPSG: 3857',
  'osm-vector-tiles': 'OSM data for Europe from MapTiler, 34.4GB, EPSG: 3857'
};

async function loadExample() {
  const example = window.location.hash.slice(1);
  console.log('load', example);
  const code = import(`./code/${example}`);
  const text = import(`!!html-loader?{"minimize":false}!./prettier-loader.cjs!./code/${example}.ts`);

  $('#example').html('<div id="map"></div>');
  code.then((mod) => mod.default());
  text.then((s) => $('#text').html(s.default));
}

$(function () {
  $('#menu').empty();
  for (const e of Object.keys(examples)) {
    $('#menu').append(`<button id="id-${e}" class="menu-btn btn btn-primary m-2" >${examples[e]}</button>`);
  }

  $('.menu-btn').on('click', (ev) => {
    console.log(ev.target.id);
    window.location.hash = ev.target.id.slice(3);
    loadExample();
  });

  if (!window.location.hash)
    window.location.hash = Object.keys(examples)[0];
  loadExample();
});
