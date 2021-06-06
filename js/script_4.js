' use strict';

//??__< ЗАДАНИЕ № 1 >__==================================================================================================

const text1 = document.querySelector('#text1');

//todo__Замена всех одинарных кавычек без исключения
document.querySelector('.p1_result').insertAdjacentHTML('beforeend', text1.innerText.replaceAll('\'', '\"'));

//todo__Замена всех одинарных кавычек за исключением апострофов c форматированием текста
const text2 = text1.innerText.replaceAll('\.\'', '\.\"<br>');
const text3 = text2.replaceAll('\?\'', '\?\"<br>');

document.querySelector('.p2_result').insertAdjacentHTML('beforeend', text3.replaceAll(' \'', ' \"'));

//??__</ ЗАДАНИЕ № 1 >__==================================================================================================


//??__< ЗАДАНИЕ № 2 >__==================================================================================================

document.querySelector('.p3_result').insertAdjacentHTML('beforeend', text1.innerText.replaceAll('\'', '\"'));

//document.querySelector('.p4_result').insertAdjacentHTML('beforeend', text1.innerText.replace(/\B'/g, '"'));

let regexp = /\B'/g;
let regexp1 = /\"\B/g;
let text5 = text1.innerText.replace(regexp, '"');
//document.querySelector('.p4_result').insertAdjacentHTML('beforeend', text5);


document.querySelector('.p4_result').insertAdjacentHTML('beforeend', text5.replace(regexp1, '\"<br>'));

//??__</ ЗАДАНИЕ № 2 >__==================================================================================================


//??__< ЗАДАНИЕ № 3 >__==================================================================================================






//??__</ ЗАДАНИЕ № 3 >__==================================================================================================


