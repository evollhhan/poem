/**
 * Color Dodge
 */
class ColorDodge {
    
    constructor() {
        
    }
    
    run(A: number, B: number) {
        
        let result: number = 0;
        
        result = A + A*B/(255-B);
        
        return Math.round(result);  
    }
}

export { ColorDodge }