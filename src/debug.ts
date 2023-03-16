declare const OL_MBTILES_DEBUG: string;
const debugEnabled = (typeof OL_MBTILES_DEBUG !== 'undefined' && OL_MBTILES_DEBUG) ||
  (typeof process !== 'undefined' && typeof process?.env?.OL_MBTILES_DEBUG !== 'undefined' && process.env.OL_MBTILES_DEBUG);

export const debug = debugEnabled ? console.debug.bind(console) : () => undefined;
