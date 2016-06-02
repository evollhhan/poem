/**
 * Color Burn
 */
class ColorBurn {
    
    constructor() {
        
    }
    
    run(A: number, B: number) {
        
        let result: number = 0;
        
        result = A - (255-A)*(255-B)/B;
        
        return Math.round(result);  
    }
}

export { ColorBurn }