import pointInEllipse from './pointInEllipse';

export function getPixelsInside(pixelArray, ellipse) {
  let index = 0;
  let newArr = [];
  for (let y = ellipse.top; y < ellipse.top + ellipse.height; y++) {
    for (let x = ellipse.left; x < ellipse.left + ellipse.width; x++) {
      const point = {
        x,
        y,
      };

      if (pointInEllipse(ellipse, point)) {
        newArr.push(pixelArray[index]);
      }

      index++;
    }
  }
  return newArr;
}
