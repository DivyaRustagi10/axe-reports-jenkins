import { createCanvas } from 'canvas';

global.HTMLCanvasElement.prototype.getContext = function() {
  return createCanvas().getContext('2d');
};
 