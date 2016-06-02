/**
 * Exclusion
 */
class Exclusion {
    
    constructor() {
        
    }
    
    run(A: number, B: number) {
        
        let result: number = 0;
        
        result = A + B - A*B/128;
        
        return Math.round(result);  
    }
}

export { Exclusion }