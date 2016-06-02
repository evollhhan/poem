/**
 * Linear Burn
 */
class LinearBurn {
    
    constructor() {
        
    }
    
    run(A: number, B: number) {
        
        return (A + B) < 255? 0 : (A + B - 255);
        
    }
}

export { LinearBurn }