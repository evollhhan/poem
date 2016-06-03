/**
 * HttpServer
 */
interface HttpOption {
    url: string;
    data?: any;
    success?: any;
    // async?: boolean;  *In the main thread will always be TRUE
} 

class HttpServer {
    
    xhr: any;
    
    constructor() {
        this.xhr = new XMLHttpRequest();    
    }
    
    Get(opt: HttpOption) {
       this.AsyncRequest(opt.success);
       if( typeof(opt.data) === 'object' ) {
           for( let i in opt.data ) {
               opt.url += (opt.url.indexOf('?') === -1)? '?' : '&';
               opt.url += encodeURIComponent(i) + '=' + encodeURIComponent(opt.data[i]);
           }
       }
       this.xhr.open('get', opt.url, true);
       this.xhr.send();
    }
    
    Post(opt: HttpOption) {
        this.AsyncRequest(opt.success);
        this.xhr.open('post', opt.url, true);
        this.xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        this.xhr.send(JSON.stringify(opt.data));
    }
    
    Abort() {
        this.xhr.abort();
    }
    
    private AsyncRequest(success?: any) {
        let that = this;
        let stateChange = (function(xhr: any, success: any) {
            return function() {
                if( this.readyState === 4 ) {
                    xhr.Response(success);
                }  
            }                      
        })(that, success);
        this.xhr.onreadystatechange = stateChange;
    }
    
    private Response(success?: any) {
        if( this.xhr.status >= 200 && this.xhr.status < 300 || this.xhr.status == 304 ) {
            success && success(this.xhr.responseText);
        }
        else {
            console.error('HttpServer Error: ' + this.xhr.status);
        }
    }
    
    private SetRequestHeader() {
        // Todo    
    }
    
}

export { HttpServer }