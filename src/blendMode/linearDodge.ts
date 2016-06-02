/**
 * Linear Dodge
 */
class LinearDodge {
    
    constructor() {
        
    }
    
    run(A: number, B: number) {
        
        return (A + B) > 255? 255 : (A + B);
        
    }
}

export { LinearDodge }