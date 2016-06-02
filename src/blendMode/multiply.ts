/**
 * Multiply
 */
class Multiply {
    
    constructor() {
        
    }
    
    run(A: number, B: number) {
        
        let result: number = 0;
        
        result = A*B/255;
        
        return Math.round(result);  
    }
}

export { Multiply }