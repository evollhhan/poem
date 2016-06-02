/**
 * Vivid Light
 */
class VividLight {
    
    constructor() {
        
    }
    
    run(A: number, B: number) {
        
        let result: number = 0;
        
        if( B <= 128 ) {
            result = A - (255 - A)*(255 - 2*B)/(2*B);
        }
        else {
            result = A + A*(2*B - 255)/(2*(255 - B));
        }
        
        return Math.round(result);  
    }
}

export { VividLight }