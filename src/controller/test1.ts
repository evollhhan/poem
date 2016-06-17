/**
 * test1
 */

import { poem } from '../core/poem';



let test1 = poem({

    $id: 'test1',
    welcome: 'Hello World',
    $extend: ['Blur'],
    $run: function(blur) {

        console.log(blur);

    }

});

export { test1 };