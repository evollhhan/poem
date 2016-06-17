/**
 * Custom System Setting
 */

class CustomSetting {

    constructor() {

    }
    
    pageLoadProgress(evt?: any) {

        let dom = <HTMLElement>document.querySelector('.pageProgress'),
            progress = Math.round(evt.loaded / evt.total * 100);
        dom.style.width = progress + '%';
        if(progress === 100) {
            setTimeout(function() {
                dom.style.display = 'none';
                setTimeout(function() {
                    dom.style.width = '0';
                    dom.style.display = 'block';
                },100);
            }, 200);
        }
    }


}

export { CustomSetting }