/**
 * Global Function
 */

import { timeConsumptionRecoder as TSR } from './timeConsume'

class systemFunction {
    
    constructor() {
        
    }
    
    timeConsume(name: string, func: any) {
        let tsr = new TSR(name);
        tsr.run(func);
    }    
    
}

export { systemFunction };