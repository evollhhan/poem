/**
 * Blur
 * --------------
 * 1. Gaussian
 * --------------
 */
class Blur {
	
	constructor() {
		
	}
	
	// sigma = 2 -> 3*3
	Gaussian(ctxSrc: any, ctxDst: any, w: number, h: number, sigma: number) {
		
		let mathC : number = -1 / ( 2 * sigma * sigma );
		let mathM : number = 1 / Math.sqrt( Math.PI*2 );
		let r : number = 0;
		let g : number = 0;
		let b : number = 0;
		let a : number = 0;
		let dataLen : number = w * h;
		
		let tempR : number[] = [];
		let tempG : number[] = [];
		let tempB : number[] = [];
		
		let imageData : any = ctxSrc.getImageData(0, 0, w, h);
		let newData : any = ctxDst.createImageData(w, h);		
		
		// Time Consuming: start
		let _start : number = new Date().getTime();
		
		// Get weight coefficient matrix
		let weightCoefficient : number[] = (function() {
			let dist0 : number = mathM / sigma;
			let dist1 : number = mathM * Math.exp( mathC * 1 ) / sigma;
			let  we00 : number = dist0 * dist0;
			let  we01 : number = dist0 * dist1;
			let  we11 : number = dist1 * dist1;
			let   sum : number = 4*we11 + 4*we01 + we00;
			we00 = we00 / sum;
			we01 = we01 / sum;
			we11 = we11 / sum;
			return [we11,we01,we11,we01,we00,we01,we11,we01,we11];
		})();
		
		// Calculate the value according to the weight coefficient
		function calculateMatrix(a) {
			// @a {Array} 3*3 Matrix
			let sum = 0;
			for( let i = 0; i < 9; i++ ) {
				sum += a[i] * weightCoefficient[i];
			}
			return sum;
		}	
		
		// Read image data and do the gaussian blur
		for( let j = 0; j < h; j++ ) {

			for( let i = 0; i < w; i++ ) {

				// 中心点位置
				// r = imageData.data[(j*400+i)*4],
				// g = imageData.data[(j*400+i)*4 + 1],
				// b = imageData.data[(j*400+i)*4 + 2],
				// a = imageData.data[(j*400+i)*4 + 3];

				if( i === 0 || j == 0 || i === 399 || j == 399 ) { r = g = b = 0; }

				else {

					tempR = [];
					tempG = [];
					tempB = [];

					for( var k = -1; k <= 1; k++ ) {

						tempR.push(imageData.data[( (j + k)*400 + i - 1 )*4]);
						tempR.push(imageData.data[( (j + k)*400 + i )*4]);
						tempR.push(imageData.data[( (j + k)*400 + i + 1 )*4]);

						tempG.push(imageData.data[( (j + k)*400 + i - 1 )*4 + 1]);
						tempG.push(imageData.data[( (j + k)*400 + i )*4 + 1]);
						tempG.push(imageData.data[( (j + k)*400 + i + 1 )*4 + 1]);

						tempB.push(imageData.data[( (j + k)*400 + i - 1 )*4 + 2]);
						tempB.push(imageData.data[( (j + k)*400 + i )*4 + 2]);
						tempB.push(imageData.data[( (j + k)*400 + i + 1 )*4 + 2]);
					}
					
					r = calculateMatrix(tempR);
					g = calculateMatrix(tempG);
					b = calculateMatrix(tempB);					
				}
				
				newData.data[(j*400+i)*4] = Math.round(r);
				newData.data[(j*400+i)*4 + 1] = Math.round(g);
				newData.data[(j*400+i)*4 + 2] = Math.round(b);
				newData.data[(j*400+i)*4 + 3] = 255;				
			}
		}
		
		// Time Consuming: end
		let _end : number = new Date().getTime();
		
		// Output time consumption
		console.info('Operation: Gaussian Blur');
		console.log('Gaussian Blur ->[Time-Consuming]: ' + (_end - _start) + 'ms' );
		
		// Draw the image on the destination canvas
		ctxDst.putImageData(newData, 0, 0);
	}
}

export { Blur };