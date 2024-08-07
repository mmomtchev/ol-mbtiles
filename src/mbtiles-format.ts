import Protobuf from 'pbf';
import { VectorTile, VectorTileFeature } from '@mapbox/vector-tile';
import pako from 'pako';

import FeatureFormat, { ReadOptions } from 'ol/format/Feature.js';
import Projection from 'ol/proj/Projection.js';
import RenderFeature from 'ol/render/Feature.js';
import { FeatureLike } from 'ol/Feature.js';
import { get as getProjection } from 'ol/proj.js';

declare module '@mapbox/vector-tile' {
  interface VectorTileFeature {
    toGeoJSON(x: number, y: number, z: number, project?: (xy: [number, number]) => [number, number]): GeoJSON.Feature;
  }
}

export interface Options {
  layers?: string[];
  featureClass?: typeof RenderFeature;
  geometryName?: string;
  idProperty?: string;
  extent?: number;
}

export class MBTilesFormat<F extends FeatureLike = RenderFeature> extends FeatureFormat<F> {
  dataProjection: Projection;
  private featureClass_: typeof RenderFeature;
  private geometryName_: string;
  private layers_: string[] | null;
  private idProperty_: string | undefined;
  supportedMediaTypes: string[];
  extent: number;
  static MBTypes = {
    mono: ['Unknown', 'Point', 'LineString', 'Polygon'],
    multi: ['Unknown', 'MultiPoint', 'MultiLineString', 'Polygon']
  } as const;

  constructor(options?: Options) {
    super();

    options = options ? options : {};

    this.dataProjection = new Projection({
      code: '',
      units: 'tile-pixels',
    });

    this.featureClass_ = options.featureClass ? options.featureClass : RenderFeature;
    this.geometryName_ = options.geometryName ?? 'Geometry';
    this.layers_ = options.layers ?? null;
    this.idProperty_ = options.idProperty;
    this.extent = options.extent ?? 4096;

    /*
     * As this is the very first time MBTiles will be distributed by HTTP
     * there is still no official MIME type
     */
    this.supportedMediaTypes = [
      'application/vnd-mbtiles'
    ];
  }

  readFeature(source: VectorTileFeature, options?: ReadOptions): F {
    const properties = source.properties;

    let id: string | number;
    if (!this.idProperty_) {
      id = source.id;
    } else {
      id = properties[this.idProperty_] as string | number;
      delete properties[this.idProperty_];
    }
    const points = source.loadGeometry();
    const flatCoordinates = [] as number[];
    const ends = [] as number[];

    const type = MBTilesFormat.MBTypes[points.length > 1 ? 'multi' : 'mono'][source.type];
    if (type === 'Unknown')
      return null as unknown as F;

    for (let i = 0; i < points.length; i++) {
      if (points[i].length == 0)
        continue;
      for (let j = 0; j < points[i].length; j++) {
        flatCoordinates.push(points[i][j].x, points[i][j].y);
      }
      ends.push(flatCoordinates.length);
    }

    const feature = new this.featureClass_(type, flatCoordinates, ends, 2, properties, id) as F;
    if (options?.dataProjection && 'transform' in feature)
      feature.transform(options?.dataProjection);

    return feature;
  }

  readFeatures(source: ArrayBuffer, options?: ReadOptions): F[] {
    const layers = this.layers_;

    const features: F[] = [];
    const tile = new VectorTile(new Protobuf(pako.ungzip(source)));
    options = this.adaptOptions(options);
    const dataProjection = getProjection(options?.dataProjection);
    const extent = options?.extent;
    if (!dataProjection || !options || !extent)
      throw new Error('Cannot determine the projection/extent');
    dataProjection.setWorldExtent(extent);
    dataProjection.setExtent([0, 0, this.extent, this.extent]);
    options.dataProjection = dataProjection;

    for (const layerName of Object.keys(tile.layers)) {
      if (layers && !layers.includes(layerName)) {
        continue;
      }
      const l = tile.layers[layerName];
      for (let idx = 0; idx < l.length; idx++) {
        const vectorFeature = l.feature(idx);
        const feature = this.readFeature(vectorFeature, options);
        feature.getProperties().layer = layerName;
        features.push(feature);
      }
    }

    return features;
  }

  readProjection() {
    return this.dataProjection;
  }
}
