/**
 * Overlay
 */
class Overlay {
    
    constructor() {
        
    }
    
    run(ctxA: any, ctxB: any, ctxDst: any, w: number, h: number) {
        
        let oriData : any = ctxA.getImageData(0, 0, w, h);
        let gasData : any = ctxB.getImageData(0, 0, w, h);
        let newData : any = ctxDst.createImageData(400,400);
        let dataLen : number = h * w;
        
        // Time Consuming: start
        let _start = new Date().getTime();
        
        // Read image data and do the overlay
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
        
        // Time Consuming: end
        let _end = new Date().getTime();
        
        // Output time consumption
        console.info('Operation: Overlay');
        console.log('Overlay ->[Time-Consuming]: ' + (_end - _start) + 'ms' );

        ctxDst.putImageData(newData, 0, 0);   
    }
}

export { Overlay }