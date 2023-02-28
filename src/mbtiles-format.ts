import Protobuf from 'pbf';
import { VectorTile, VectorTileFeature } from '@mapbox/vector-tile';
import * as pako from 'pako';

import FeatureFormat, { ReadOptions } from 'ol/format/Feature';
import Projection from 'ol/proj/Projection';
import RenderFeature from 'ol/render/Feature';
import { Extent } from 'ol/extent';
import { FeatureLike } from 'ol/Feature';
import { Geometry } from 'ol/geom';
import { ProjectionLike, get as getProjection } from 'ol/proj';

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
};

export class MBTilesFormat extends FeatureFormat {
  dataProjection: Projection;
  private featureClass_: typeof RenderFeature;
  private geometryName_: string;
  private layers_: string[] | null;
  private idProperty_: string;
  private layerName_: string;
  supportedMediaTypes: string[];
  extent: number;
  static MBTypes = [
    'Unknown', 'Point', 'LineString', 'Polygon'
  ] as ('Unknown' | 'Point' | 'LineString' | 'Polygon')[];

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

    /**
     * As this is the very first time MBTiles will be distributed by HTTP
     * there is still no official MIME type
     */
    this.supportedMediaTypes = [
      'application/vnd-mbtiles'
    ];
  }

  readFeature(source: VectorTileFeature, options?: ReadOptions): FeatureLike {
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

    let type = MBTilesFormat.MBTypes[source.type];
    if (type === 'Unknown')
      return null;

    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < points[i].length; j++) {
        flatCoordinates.push(points[i][j].x, points[i][j].y);
      }
      ends.push(flatCoordinates.length);
    }

    const feature = new this.featureClass_(type, flatCoordinates, ends, properties, id);
    feature.transform(options.dataProjection);

    return feature;
  }

  readFeatures(source: ArrayBuffer, options?: ReadOptions): FeatureLike[] {
    const layers = this.layers_;

    const features: FeatureLike[] = [];
    const tile = new VectorTile(new Protobuf(pako.ungzip(source)));
    options = this.adaptOptions(options);
    const dataProjection = getProjection(options.dataProjection);
    dataProjection.setWorldExtent(options.extent);
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

  readProjection(source) {
    return this.dataProjection;
  }

}