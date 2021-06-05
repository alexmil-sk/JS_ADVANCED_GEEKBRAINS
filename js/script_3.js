' use strict';

//??__< ЗАДАНИЕ №1 >__==================================================================================================

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//??__getRequest с использованием PROMISE----------------------------------------------

//Переделать. B ДЗ №1 не использовать fetch, a Promise.
//Дальше в коде не использовать! Только в задании №1

let getRequest = (url) => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = () => {
			setTimeout(() => {
				if (xhr.readyState === 4) {
					if (xhr.status !== 200) {
						reject(`Error! ${xhr.status} ${xhr.statusText}`);
					} else {
						resolve(xhr.responseText);
					}
				}
			}, 2000);
		};
		xhr.send();
	});
};

getRequest('https://api.sampleapis.com/coffee/iced')
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
	console.log(error);
	});

//??__</ ЗАДАНИЕ №1 >__==================================================================================================






//??__< ЗАДАНИЕ №2 >__==================================================================================================

class ProductList {

	constructor(container = '.products') {
		this.container = container;
		this.goods = []; //!!__массив объектов товаров
		this.allProducts = []; //!!каталог эксземпляров классов товаров - актуальное состояние текущего списка товаров
		//this.fetchGoods();
		//this.render();//Чтобы рендер не выполнялся на пустом массиве, т.к. данные о товарах приходят позже, его надо вызвать в конце getRequest
		this.createTotal();
		this.sumTotal();
		this.getProducts()
			.then((data) => {
				this.goods = data;
				this.render();
			});
	}
	//!!__метод, который обращался бы к серверу и получал данные

	//??__Удалили fetchGoods(). Заменили на другой вариант__---
	/*
	fetchGoods() {
		this.goods = [{
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
	}
*/
	//??__другой fetchGoods() как делали раньше___
/*
	fetchGoods() {
		getRequest(`${API}/catalogData.json`, (data) => { //!!__файл catalogData.json взят из gitHub ссылки в API.
			console.log('response');
			//console.log(data);
			this.goods = JSON.parse(data);
			console.log(this.goods);
			this.render();//render вызывается после получения массива товаров
		});
	}
*/

	//??__fetchGoods() правильный на сейчас___

	getProducts() {
		return fetch(`${API}/catalogData.json`)
			.then((response) => response.json())
			.catch((err) => console.log(err));
		}
	//!!метод для перебора массива товаров и возвращения кусочка разметки для каждого товара
	render() {
		const block = document.querySelector(this.container);
		for (let item of this.goods) {
			const prodCard = new ProductItem(item);

			this.allProducts.push(prodCard);
			block.insertAdjacentHTML('beforeend', prodCard.render());
		}
	}

	createTotal() {
		const h2Total = document.createElement('h2');
		h2Total.classList.add('total');
		const flexRow = document.querySelector('.flex__row');
		flexRow.append(h2Total);
		h2Total.innerHTML = 'ИТОГО, общая стоимость товаров составляет: ';
	}

	sumTotal() {
		const sumT = document.querySelector('.total');
		let sum = 0;
		for (let item of this.goods) {
			sum += item.price;
		}
		sumT.insertAdjacentHTML('beforeend', `${sum} \u20bd`);
	}

}
class ProductItem {
	constructor(product, foto = '../img/HW-3/LeBoard.png') {
		this.title = product.product_name;
		this.price = product.price;
		this.id = product.id_product;
		//this.foto = product.foto;
		this.foto = foto;
	}
	render() {
		return `<div class = "product-item" data-id = "${this.id}">
						<h3>${this.title}</h3>
						<img src = "${this.foto}" alt = "img ${this.id}">
						<p>${this.price} \u20bd</p>
						<button class = "buy-btn">Добавить в корзину</button>
				</div>`;
	}
}

const catalog = new ProductList();

class BasketList {

	constructor(container = '.basket_goods') {
		this.container = container;
		this.basketGoods = [];
		this.allBasketProducts = [];
		this.getBasket() 
			.then((data) => {
				this.basketGoods = data;
				//console.log(this.basketGoods);
				this.renderBasket();
			});
		//this.deleteFromBasket();
		this.deleteFromBasket();
		this.addToBasket();
	}

	getBasket() {
		return fetch(`${API}/getBasket.json`)
			.then((response) => response.json())
			.catch((err) => console.log(err));
	}

	renderBasket() {
		const basketBlock = document.querySelector(this.container);
		const basketSum = document.querySelector('.sum');
		const basketQuant = document.querySelector('.quantity');
		for (let item of this.basketGoods.contents) {
			const basketCard = new BasketItem(item);
			this.allBasketProducts.push(basketCard);
			basketBlock.insertAdjacentHTML('beforeend', basketCard.render());
		}
		basketSum.insertAdjacentHTML('beforeend', `Стоимость товаров в корзине: ${this.basketGoods.amount} \u20bd `);
		basketQuant.insertAdjacentHTML('beforeend', ` Количество товаров в корзине: ${this.basketGoods.countGoods} шт.`);
	}

	deleteFromBasket() {
			fetch(`${API}/deleteFromBasket.json`)
			.then((response) => { return response.json(); })
			.then((data) => {
				//console.log(data);
				if (data.result == 1) {
					const delBtn = document.querySelectorAll('.buy_btn__del');
					delBtn.forEach(item => {
						item.addEventListener('click', () => {
							item.parentNode.parentNode.removeChild(item.parentNode);
						});
					});
				} else {
					return;
				}
			})
			.catch((err) => console.log(err));
	}

	addToBasket() {
		fetch(`${API}/addToBasket.json`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				//console.log(data);
				if (data.result == 1) {
					const buyBtn = document.querySelectorAll('.buy-btn');
					buyBtn.forEach(item => {
						item.addEventListener('click', () => {
							const basketGoods = document.querySelector('.basket_goods');
							console.log(basketGoods);
							basketGoods.append(item.parentNode);
							item.classList.toggle('buy-btn');
							item.classList.add('buy_btn__del');
							item.innerHTML = 'Удалить из корзины';
						});
					});
				} else {
					return;
				}
			})
			.catch((err) => console.log(err));
	}
}
class BasketItem {
	constructor(product, foto = '../img/HW-3/LeBoard.png', ) {
		this.title = product.product_name;
		this.price = product.price;
		this.id = product.id_product;
		//this.foto = product.foto;
		this.foto = foto;
	}
	render() {
		return `<div class = "product-item" data-id = "${this.id}">
						<h3>${this.title}</h3>
						<img src = "${this.foto}" alt = "img ${this.id}">
						<p>${this.price} \u20bd</p>
						<button class = "buy_btn__del" > Удалить из корзины </button>
				</div>`;
	}
}
//console.log(new BasketItem());

const basketCatalog = new BasketList();


//??__</ ЗАДАНИЕ №2 >__==================================================================================================




