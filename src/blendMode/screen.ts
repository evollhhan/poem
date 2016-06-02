/**
 * Screen
 */
class Screen {
    
    constructor() {
        
    }
    
    run(A: number, B: number) {
        
        let result: number = 0;
        
        result = 255 - (255-A)*(255-B)/255;
        
        return Math.round(result);  
    }
}

export { Screen }