' use strict';

class ProductList {

	constructor(container = '.products') {
		this.container = container;
		this.goods = [];//список товаров
		this.allProducts = [];//каталог эксземпляров классов товаров - актуальное состояние текущего списка товаров
		this.fetchGoods();
		this.render();
	}
	//метод, который обращался бы к серверу и получал данные
	fetchGoods() {
		this.goods = [
			{
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

	//метод для перебора массива товаров и возвращения кусочка разметки для каждого товара
	render() {
		const block = document.querySelector(this.container);
		for (let item of this.goods) {
			const prodCard = new ProductItem(item);

			this.allProducts.push(prodCard);
			block.insertAdjacentHTML('beforeend', prodCard.render());
		}
	}
	
}
class ProductItem {
	constructor(product, foto = '../img/HW-1/blind.jpg') {
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.foto = product.foto;
	}
	render() {
		return `<div class = "product-item" data-id = "${this.id}">
						<h3>${this.title}</h3>
						<img src = "${this.foto}" alt = "img ${this.id}">
						<p>${this.price} \u20bd</p>
						<button class = "buy-btn">Добавить</button>
				</div>`;
	}
}

const catalog = new ProductList();
