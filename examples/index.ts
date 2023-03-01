import 'ol/ol.css';
import './style.css';
import 'prism-themes/themes/prism-vsc-dark-plus.css';

const examples = {
  'velivole': 'Towns from velivole.fr, EPSG: 4326',
  'klokantech': 'Borders from klokantech, EPSG: 3587',
  'osm-vector-tiles': 'OSM data for Europe from MapTiler, 34.4GB, EPSG: 3587'
};

async function loadExample(example: string) {
  const code = import(`./code/${example}`);
  const text = import(`!!html-loader?{"minimize":false}!./prettier-loader.js!./code/${example}.ts`);

  $('#example').html('<div id="map"></div>');
  code.then((mod) => mod.default());
  text.then((s) => $('#text').html(s.default));
}

for (const e of Object.keys(examples)) {
  $('#menu').append(`<button id="${e}" class="menu-btn btn btn-primary m-2" >${examples[e]}</button>`);
}

$('.menu-btn').on('click', (ev) => {
  loadExample(ev.target.id);
});

loadExample(Object.keys(examples)[0]);
