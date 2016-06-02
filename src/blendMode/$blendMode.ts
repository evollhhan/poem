/**
 * blendMode
 */

// Function List
// Import your function here when you make a new one
import { ColorBurn } from './colorBurn';
import { ColorDodge } from './colorDodge';
import { Darken } from './darken';
import { Difference } from './difference';
import { Exclusion } from './exclusion';
import { HardLight } from './hardLight';
import { HardMix } from './hardMix';
import { Lighten } from './lighten';
import { LinearBurn } from './linearBurn';
import { LinearDodge } from './linearDodge';
import { LinearLight } from './linearLight';           
import { Multiply } from './multiply';
import { Overlay } from './overlay'; 
import { PinLight } from './pinLight';
import { Screen } from './screen';
import { SoftLight } from './softLight'; 
import { VividLight } from './vividLight'; 
 

// Main
class blendMode {
    
    ctxA: any;
    ctxB: any;
    ctxDst: any;
    imageDataA: any;
    imageDataB: any;
    w: number;
    h: number;
    dataLen: number;
    
    constructor(ctxA: any, ctxB: any, ctxDst: any, w: number, h: number) {
        this.ctxA = ctxA;
        this.ctxB = ctxB;
        this.ctxDst = ctxDst;
        this.imageDataA = ctxA.getImageData(0, 0, w, h);
        this.imageDataB = ctxB.getImageData(0, 0, w, h);
        this.w = w;
        this.h = h;
        this.dataLen = w * h;
    }
    
    traverseImageData(func: any) {
        let newData = this.ctxDst.createImageData(this.w, this.h);
        for( let i = 0; i < this.dataLen; i++ ) {
            for( let j = 0; j < 3; j++ ) {
                newData.data[i*4+j] = func(this.imageDataA.data[i*4+j], this.imageDataB.data[i*4+j]);
            }
            newData.data[i*4+3] = 255;
        }
        this.ctxDst.putImageData(newData, 0, 0)
    }
    
    ColorBurn() {
        var colorBurn = new ColorBurn();
        this.traverseImageData(colorBurn.run);
    }
    
    ColorDodge() {
        var colorDodge = new ColorDodge();
        this.traverseImageData(colorDodge.run);
    }
    
    Darken() {
        var darken = new Darken();
        this.traverseImageData(darken.run);
    }
    
    Difference() {
        var difference = new Difference();
        this.traverseImageData(difference.run);
    }
    
    Exclusion() {
        var exclusion = new Exclusion();
        this.traverseImageData(exclusion.run);
    }
    
    HardLight() {
        var hardLight = new HardLight();
        this.traverseImageData(hardLight.run);
    }
    
    HardMix() {
        var hardMix = new HardMix();
        this.traverseImageData(hardMix.run);
    }
    
    Lighten() {
        var lighten = new Lighten();
        this.traverseImageData(lighten.run);
    }
    
    LinearBurn() {
        var linearBurn = new LinearBurn();
        this.traverseImageData(linearBurn.run);
    }
    
    LinearDodge() {
        var linearDodge = new LinearDodge();
        this.traverseImageData(linearDodge.run);
    }
    
    LinearLight() {
        var linearLight = new LinearLight();
        this.traverseImageData(linearLight.run);
    }
    
    Multiply() {
        var multiply = new Multiply();
        this.traverseImageData(multiply.run);
    }
    
    Overlay() {
        var overlay = new Overlay();
        this.traverseImageData(overlay.run);
    }
    
    PinLight() {
        var pinLight = new PinLight();
        this.traverseImageData(pinLight.run);
    }
    
    Screen() {
        var screen = new Screen();
        this.traverseImageData(screen.run);
    }
    
    SoftLight() {
        var softLight = new SoftLight();
        this.traverseImageData(softLight.run);
    }
    
    VividLight() {
        var vividLight = new VividLight();
        this.traverseImageData(vividLight.run);
    }
    
}


export { blendMode };