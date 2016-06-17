/**
 * Compile
 */

class Compile {

    constructor() {
        
    }

    update(viewer: HTMLElement, html: string, controller: any) {
        if(controller) {
            let param = controller.$extend;
            controller.$run(param[0]);
        }
        else {
            viewer.innerHTML = html;
        }
    }

}

export { Compile }