/**
 * Soft Light
 */
class SoftLight {
    
    constructor() {
        
    }
    
    run(A: number, B: number) {
        
        let result: number = 0;
        
        if( B <= 128 ) {
            result = A*B/128 + Math.pow(A/255,2)*(255 - 2*B);
        }
        else {
            result = A*(255 - B)/128 + Math.sqrt(A/255)*(2*B - 255);
        }
        
        return Math.round(result);  
    }
}

export { SoftLight }