import Feature from 'ol/Feature';
import { Style, Text, Fill, Stroke, Circle } from 'ol/style';

export function styleTown(size: number, feature: Feature): Style {
  let width: number;
  let font: string;
  switch (size) {
    case 0:
      width = 6;
      font = '2em';
      break;
    case 1:
      width = 5;
      font = '1.2em';
      break;
    case 2:
      width = 3;
      font = '0.8em';
      break;
    default:
      width = 1;
      font = '0.5em';
      break;
  }
  font += ' helvetica, sans-serif';
  const color1 = '#00007f';
  const color2 = '#ffffff';

  const style = new Style({
    image: new Circle({
      fill: new Fill({
        color: color1,
      }),
      radius: width,
      stroke: new Stroke({
        color: color1,
        width: width,
      }),
    }),
    text: new Text({
      font: font,
      text: feature.get('n'),
      fill: new Fill({
        color: color2
      }),
      stroke: new Stroke({
        color: color1,
        width: 2
      })
    })
  });
  return style;
}

export const styleBorder = new Style({
  stroke: new Stroke({
    color: 'blue',
    width: 2
  })
})