var IMAGE_WIDTH  = 400,
	IMAGE_HEIGHT = 400;

var cvsO = document.getElementById('origin'),
	cvsG = document.getElementById('guass'),
	cvsA = document.getElementById('add'),
	ctxO = cvsO.getContext('2d'),
	ctxG = cvsG.getContext('2d'),
	ctxA = cvsA.getContext('2d');

function draw() {
	
	var img = new Image();
	img.src = 'images/test.jpeg';
	img.onload = function() {
		ctxO.drawImage(img, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);		
	}

}

// 获得权重矩阵
var sigma = 2, // 3*3

	mathC = -1 / ( 2 * sigma * sigma ),

	mathM = 1 / Math.sqrt( Math.PI*2 );

var GW = (function() {

	var dist0 = mathM / sigma;

		dist1 = mathM * Math.exp( mathC * 1 ) / sigma,

		we00 = dist0 * dist0,

		we01 = dist0 * dist1,

		we11 = dist1 * dist1,

		sum = 4*we11 + 4*we01 + we00;

	we00 = we00 / sum;

	we01 = we01 / sum;

	we11 = we11 / sum;

	return [we11,we01,we11,we01,we00,we01,we11,we01,we11];

})();

// 根据权重计算值
function matrixCalc(a) {

	// @a {Array} 距离为1的9格数据
	var sum = 0;
	for( var i = 0; i < 9; i++ ) {
		sum += a[i]*GW[i];
	}
	return sum;

}


// 计算高斯
function processGuass() {

	var imageData = ctxO.getImageData(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT),
		newData = ctxG.createImageData(IMAGE_WIDTH, IMAGE_HEIGHT),
		dataLen = IMAGE_WIDTH * IMAGE_HEIGHT,
		r = 0,
		g = 0,
		b = 0,
		a = 0,
		tempR = [],
		tempG = [],
		tempB = [];

	var start = new Date().getTime();

	for( var j = 0; j < IMAGE_HEIGHT; j++ ) {

		for( var i = 0; i < IMAGE_WIDTH; i++ ) {

			// 中心点位置
			// r = imageData.data[(j*400+i)*4],
			// g = imageData.data[(j*400+i)*4 + 1],
			// b = imageData.data[(j*400+i)*4 + 2],
			// a = imageData.data[(j*400+i)*4 + 3];

			if( i === 0 || j == 0 || i === 399 || j == 399 ) {

				r = g = b = 0;

				// if( j === 0 ) {

				// 	r = matrixCalc([
				// 		[imageData.data[1604],imageData.data[1600],imageData.data[1604]],
				// 		[imageData.data[4],imageData.data[0],imageData.data[4]]
				// 		[imageData.data[1604],imageData.data[1600],imageData.data[1604]]
				// 	]);

				// 	g = matrixCalc([
				// 		[imageData.data[1605],imageData.data[1601],imageData.data[1605]],
				// 		[imageData.data[5],imageData.data[1],imageData.data[5]]
				// 		[imageData.data[1605],imageData.data[1601],imageData.data[1605]]
				// 	]);

				// 	b = matrixCalc([
				// 		[imageData.data[1606],imageData.data[1602],imageData.data[1606]],
				// 		[imageData.data[5],imageData.data[2],imageData.data[6]]
				// 		[imageData.data[1606],imageData.data[1602],imageData.data[1606]]
				// 	]);

				// }
			}

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

				r = matrixCalc(tempR);
				g = matrixCalc(tempG);
				b = matrixCalc(tempB);

			}

			newData.data[(j*400+i)*4] = Math.round(r);
			newData.data[(j*400+i)*4 + 1] = Math.round(g);
			newData.data[(j*400+i)*4 + 2] = Math.round(b);
			newData.data[(j*400+i)*4 + 3] = 255;

		}

	}

	var end = new Date().getTime();

	console.info('Operation: Gaussian Blur');

	console.log('Gaussian Blur ->[Time-Consuming]: ' + (end - start) + 'ms' );

	ctxG.putImageData(newData, 0, 0);

}

// 叠加算法
function processAdd() {

	var oriData = ctxO.getImageData(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT),
		gasData = ctxG.getImageData(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT),
		newData = ctxA.createImageData(400,400),
		dataLen = IMAGE_HEIGHT * IMAGE_WIDTH;

	var start = new Date().getTime();

	for( var i = 0; i < dataLen; i++ ) {

		for( var j = 0; j < 3; j++ ) {

			if( gasData.data[i*4+j] <= 128 ) {
				newData.data[i*4+j] = Math.round( oriData.data[i*4+j]*gasData.data[i*4+j]/128 );
			}
			else {
				newData.data[i*4+j] = 255 - Math.round( (255 - oriData.data[i*4+j])*(255 - gasData.data[i*4+j])/128 );
			}
		}
		newData.data[i*4+3] = 255;
	}

	var end = new Date().getTime();

	console.info('Operation: Overlay');

	console.log('Overlay ->[Time-Consuming]: ' + (end - start) + 'ms' );

	ctxA.putImageData(newData, 0, 0);

}