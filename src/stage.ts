import { Blur } from './filter/blur';
import { Overlay } from './blendMode/overlay';

let IMAGE_WIDTH	: number = 400,
	IMAGE_HEIGHT: number = 400;

let cvsO = <HTMLCanvasElement> document.getElementById('origin'),
	cvsG = <HTMLCanvasElement> document.getElementById('guass'),
	cvsA = <HTMLCanvasElement> document.getElementById('add'),
	ctxO = cvsO.getContext('2d'),
	ctxG = cvsG.getContext('2d'),
	ctxA = cvsA.getContext('2d');

(<any>window).draw = function() {	
	let img = new Image();
	img.src = 'images/test.jpeg';
	img.onload = function() {
		ctxO.drawImage(img, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);		
	}
};

(<any>window).processGuass = function () {
	let gauss = new Blur();
	gauss.Gaussian(ctxO, ctxG, IMAGE_WIDTH, IMAGE_WIDTH, 2);
};

(<any>window).processAdd = function () {
	let overlay = new Overlay();
	overlay.run(ctxO, ctxG, ctxA, IMAGE_WIDTH, IMAGE_HEIGHT);
}


