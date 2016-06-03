import '../stylus/main';
import './core/stage';
import { Router } from './core/Router';

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
        tpl: 'test1.html'
    })
    .when({
        url: '/test2',
        tpl: 'test2.html'
    })
    .on();