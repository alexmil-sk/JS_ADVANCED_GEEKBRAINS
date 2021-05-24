' use strict';

const products = [{
		id: 1,
		title: 'Котенок',
		foto: '../img/HW-1/kitty.jpg',
		price: 200,
	},
	{
		id: 2,
		title: 'Леопард',
		foto: '../img/HW-1/leopard.jpg',
		price: 100,
	},
	{
		id: 3,
		title: 'Совенок',
		foto: '../img/HW-1/owl.jpg',
		price: 250,
	},
	{
		id: 4,
		title: 'Поросенок',
		foto: '../img/HW-1/piggy.jpg',
		price: 150,
	},
	{
		id: 5,
		title: 'Щенок',
		foto: '../img/HW-1/puppy.jpg',
		price: 350,
	},
];

//ФУНКЦИОНАЛЬНЫЕ ВЫРАЖЕНИЯ СО ЗНАЧЕНИЯМИ ИЗ МАССИВА ОБЪЕКТОВ==========================================

//Функциональное выражение, отвечающее за генерацию строки будущей разметки

/* ИСХОДНЫЙ КОД-----------------------------------------------------------------------------
const renderProduct = (title, foto, price) => {
	return `<div class = "product-item">
				<h3>${title}</h3>
				<img src = ${foto}></img>
				<p>${price}</p>
				<button class = "by-btn">Добавить</button>
				</div>`;
};
*/

//СОКРАЩЕННЫЙ КОД----------------------------------------------------------------------------
const renderProduct = ((title, foto, price) => 
				`<div class = "product-item">
				<h3>${title}</h3>
				<img src = ${foto}></img>
				<p>${price}</p>
				<button class = "by-btn">Добавить</button>
				</div>`
);


//Функциональное выражение, отвечающее за перебор массива товаров и передачи данных в функцию, формирующую строки

/* ИСХОДНЫЙ КОД-------------------------------------------------------------------------------
const renderProducts = (list) => {
	let productList = list.map((product) => {
		return renderProduct(product.title, product.foto, product.price);
	});
	productList = productList.join('');
	document.querySelector('.products').innerHTML = productList;
};
renderProducts(products);

*/

//СОКРАЩЕННЫЙ КОД------------------------------------------------------------------------------

const renderProducts = list => {
	let productList = (list.map(product => renderProduct(product.title, product.foto, product.price))).join('');
	document.querySelector('.products').innerHTML = productList;
};
renderProducts(products);


//ФУНКЦИОНАЛЬНЫЕ ВЫРАЖЕНИЯ СО ЗНАЧЕНИЯМИ ПО УМОЛЧАНИЮ==========================================

/* ИСХОДНЫЙ КОД--------------------------------------------------------------------------------

const renderProduct1 = (title = "Наименование товара", foto = '../img/HW-1/blind.jpg',
	price = 'Цена товара') => {
	return `<div class = "product-item">
				<h3>${title}</h3>
				<img class="blind" src = ${foto}></img>
				<p>${price}</p>
				<button class = "by-btn">Добавить</button>
				</div>`;
};

*/

//СОКРАЩЕННЫЙ КОД------------------------------------------------------------------------------
const renderProduct1 = ((title = "Наименование товара", foto = '../img/HW-1/blind.jpg',
		price = 'Цена товара') => 
				`<div class = "product-item">
				<h3>${title}</h3>
				<img class="blind" src = ${foto}></img>
				<p>${price}</p>
				<button class = "by-btn">Добавить</button>
				</div>`
);


/* ИСХОДНЫЙ КОД---------------------------------------------------------------------------------
const renderProducts1 = list => {
	let productList1 = list.map((product) => {
		return renderProduct1();
	});
	productList1 = productList1.join('');
	document.querySelector('.products1').innerHTML = productList1;
};
renderProducts1(products);
*/


//СОКРАЩЕННЫЙ КОД-------------------------------------------------------------------------------

const renderProducts1 = list => {
	let productList1 = (list.map(() => renderProduct1()).join(''));
	document.querySelector('.products1').innerHTML = productList1;
};
renderProducts1(products);

