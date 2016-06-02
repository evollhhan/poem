/**
 * Hard Light
 */
class HardLight {
    
    constructor() {
        
    }
    
    run(A: number, B: number) {
        
        let result: number = 0;
        
        if( B <= 128 ) {
            result = A*B/128;
        }
        else {
            result = 255 - (255-A)*(255-B)/128;
        }
        
        return Math.round(result);  
    }
}

export { HardLight }