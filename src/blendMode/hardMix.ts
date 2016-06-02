/**
 * Hard Mix
 */
class HardMix {
    
    constructor() {
        
    }
    
    run(A: number, B: number) {
        
        if( (A + B) >= 255 ) {
            return 255;
        }
        else {
            return 0;
        }

    }
}

export { HardMix }