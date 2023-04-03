import 'ol/ol.css';
import './style.css';
import 'prism-themes/themes/prism-vsc-dark-plus.css';
import { Map } from 'ol';
import Layer from 'ol/layer/Layer';
import pkgJson from '../package.json';
import pkgLockJson from '../package-lock.json';

// Alas, in MBTilesLand all projections are 3857, all angles are square and there is no poverty
// TODO: Produce a non-3857 tileset
const examples: Record<string, string> = {
  'velivole': 'Towns from velivole.fr<br>vector<br>EPSG: 3857',
  'klokantech': 'Borders from klokantech<br>vector<br>EPSG: 3857',
  'osm-vector-tiles': 'OSM data for Europe from MapTiler, 34.4GB<br>vector<br>EPSG: 3857',
  'reunion-raster': 'IGN<br>BD Ortho 5m<br>La Réunion<br>raster<br>EPSG: 3857',
  'sync-init': 'Synchronous initialization when the metadata is known beforehand'
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
  code.then(async (mod) => {
    const r = mod.default();
    if (r instanceof Promise) {
      map = await r;
    } else {
      map = r;
    }
  });
  text.then((s) => $('#text').html(s.default));
}

$(function () {
  const isolation = typeof crossOriginIsolated === 'undefined' || !crossOriginIsolated;
  $('#menu').empty();
  for (const e of Object.keys(examples)) {
    $('#menu').append(`<button id="id-${e}" class="menu-btn btn btn-primary m-0 mb-1 px-1" >${examples[e]}</button>`);
  }
  $('#menu').append('<div class="mt-auto me-2 mb-1 border p-1 bg-light d-flex flex-column"><div>Cross-Origin isolation:</div>' +
    `<div class="ms-auto">${isolation ? '<strong class="text-danger">disabled</strong>' : '<strong class="text-success">enabled</strong>'}</div></div>`);
  $('#menu').append(`<small>ol-mbtiles@${pkgJson.version}</small>`);
  $('#menu').append(`<small>sqlite-wasm-http@${pkgLockJson.packages['node_modules/sqlite-wasm-http'].version}</small>`);

  $('.menu-btn').on('click', (ev) => {
    window.location.hash = ev.target.id.slice(3);
    loadExample();
  });

  if (!window.location.hash)
    window.location.hash = Object.keys(examples)[0];
  loadExample();
});
