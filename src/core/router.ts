/**
 * Router
 */
import { HttpServer } from './httpServer';
import { Compile } from './compile';
import { CustomSetting } from './customSetting';

interface RouterArg {
    url: string;
    tpl: string;
    ctrl?: any;
}

class Router {
    
    cs: CustomSetting;
    cp: Compile;

    origin: string;
    viewer: any;
    urlBase: any;
    ctrlBase: any;
    
    /** 
     * @errorPage
     * Redirect the Page when the requested URL was not found on this server 
     * @type {string}
     * @default '/'
     * @value '/' to the index Page
     * @value '/404' to the 404 Page( specify errorPage PATH )
     */
    errorPageURL: string;
    errorPagePATH: string;
    
    constructor() {
        if( window.location.hash === '' ) window.location.hash = '#/';
        this.origin = window.location.origin;
        let viewer: any = document.getElementsByTagName('po-view');
        if( viewer.length > 1 ) {
            console.error('Router Error: Two or more <po-view> in this document.');
            return;
        }
        else {
            this.viewer = viewer[0];
        }
        this.urlBase = {};
        this.ctrlBase = {};
        this.errorPageURL = '/';
        this.errorPagePATH = '';
        this.cs = new CustomSetting();
        this.cp = new Compile();
    }
    
    private HashChange(e: any) {
        let url: string = e.newURL.replace(this.origin +　'/#', '').match(/[^\?]*/g)[0];
        let process = (function(that: any){
            if( !that.urlBase || !that.urlBase['/'] ) {
                return function(url: string) {
                    console.error('Router Error: no "/" page is defined.');
                }
            }
            else {
                return function(url: string) {
                    if( !that.urlBase.hasOwnProperty(url) ) {
                        window.location.hash = that.errorPageURL;
                        return;
                    }
                    let http = new HttpServer();
                    http.Get({
                        url: './templates/' + that.urlBase[url],
                        progress: function(evt) {
                            that.cs.pageLoadProgress && that.cs.pageLoadProgress(evt);
                        },
                        success: function(data) {
                            that.cp.update(that.viewer, data, that.ctrlBase[url]);
                        }
                    });                 
                }
            }
        })(this);
        process(url);
    }
    
    config(opt: any) {
        this.errorPageURL = opt.errorPageURL || this.errorPageURL;
        this.errorPagePATH = opt.errorPagePATH || this.errorPagePATH;
        if(this.errorPageURL !== '/') this.urlBase[this.errorPageURL] = this.errorPagePATH;
        return this;
    }
    
    when(router: RouterArg) {
        this.urlBase[router.url] = router.tpl;
        router.ctrl && (this.ctrlBase[router.url] = router.ctrl);
        return this;
    }
    
    on() {
        let that: any = this;
        window.onhashchange = (function(that) {
            return function(e) {
                that.HashChange(e);
            }
        })(that);
        let currentURL: any = {};
        currentURL.newURL = window.location.href;
        this.HashChange(currentURL);      
    }
    
    off() {
        window.onhashchange = null;
    }
    
    
}

export { Router }