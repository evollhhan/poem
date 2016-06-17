/**
 * APP: POEM
 * 
 * @version: 0.0.2(dev)
 * @last update: 2016-06-17
 * @By Pathen
 * @:)
 **/

/**
 * Style File
 */
import './stylus/main';
import './stylus/components';

/**
 * Import Class
 */
import { Router } from './core/router';

/**
 * Page Control
 */
import { test1 } from './controller/test1';

/**
 * Page Router
 * 
 * define page url width related template and function
 */

let router = new Router();
router.config({
        errorPageURL: '/404',
        errorPagePATH: '404.html'
    })
    .when({
        url: '/',
        tpl: 'app.html'
    })
    .when({
        url: '/test1',
        tpl: 'test1.html',
        ctrl: test1
    })
    .when({
        url: '/test2',
        tpl: 'test2.html',
    })
    .on();
