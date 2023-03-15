import 'ol/ol.css';
import './style.css';
import 'prism-themes/themes/prism-vsc-dark-plus.css';
import { Map } from 'ol';
import Layer from 'ol/layer/Layer';

const examples = {
  'velivole': 'Towns from velivole.fr, vector EPSG: 4326',
  'klokantech': 'Borders from klokantech, vector EPSG: 3857',
  'osm-vector-tiles': 'OSM data for Europe from MapTiler, 34.4GB, vector EPSG: 3857',
  'reunion-raster': 'Mapotempo, BD Ortho 5m, La Réunion, raster EPSG: 3857'
};

let map: Map | null = null;

async function loadExample() {
  const example = window.location.hash.slice(1);
  const code = import(`./code/${example}`);
  const text = import(`!!html-loader?{"minimize":false}!./prettier-loader.cjs!./code/${example}.ts`);

  $('#example').html('<div id="map"></div>');
  if (map) {
    // This should probably go into Openlayers
    for (const l of map.getLayers().getArray()) {
      if (typeof (l as Layer).getSource === 'function') {
        const source = (l as Layer).getSource();
        if (source && typeof source.dispose === 'function') {
          source.dispose();
        }
      }
      if (typeof l.dispose === 'function')
        l.dispose();
    }
    map.dispose();
  }
  code.then((mod) => {
    map = mod.default();
  });
  text.then((s) => $('#text').html(s.default));
}

$(function () {
  const isolation = typeof crossOriginIsolated === 'undefined' || !crossOriginIsolated;
  $('#menu').empty();
  for (const e of Object.keys(examples)) {
    $('#menu').append(`<button id="id-${e}" class="menu-btn btn btn-primary m-2" >${examples[e]}</button>`);
  }
  $('#menu').append('<div class="mt-auto me-2 border p-1 bg-light d-flex flex-column"><div>Cross-Origin isolation:</div>' +
    `<div class="ms-auto">${isolation ? '<strong class="text-danger">disabled</strong>' : '<strong class="text-success">enabled</strong>'}</div></div>`);

  $('.menu-btn').on('click', (ev) => {
    window.location.hash = ev.target.id.slice(3);
    loadExample();
  });

  if (!window.location.hash)
    window.location.hash = Object.keys(examples)[0];
  loadExample();
});
