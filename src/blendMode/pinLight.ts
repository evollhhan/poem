/**
 * Pin Light
 */
class PinLight {
    
    constructor() {
        
    }
    
    run(A: number, B: number) {

        if( B <= 128 ) {
            return Math.min(A, 2*B);
        }
        else {
            return Math.min(A, 2*B - 255);
        }

    }
}

export { PinLight }