/**
 * Time Consumption Recoder
 */
class timeConsumptionRecoder {
    
    operationName: string;
    
    constructor(name: string) {
        this.operationName = name;
    }
    
    run(func: any) {
        
        // Time Consuming: start
        let _start = new Date().getTime();
        
        func();
        
        // Time Consuming: end
        let _end = new Date().getTime();
        
        // Output time consumption
        console.info('Operation: ' + this.operationName);
        console.log(this.operationName + ' ->[Time-Consuming]: ' + (_end - _start) + 'ms' );
     
    }
    
}

export { timeConsumptionRecoder };