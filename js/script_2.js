' use strict';

//??<ЗАДАНИЕ №2>==================================================================================================

class ProductList {

	constructor(container = '.products') {
		this.container = container;
		this.goods = []; //!!список товаров
		this.allProducts = []; //!!каталог эксземпляров классов товаров - актуальное состояние текущего списка товаров
		this.fetchGoods();
		this.render();
		this.createTotal();
		this.sumTotal();
	}
	//!!метод, который обращался бы к серверу и получал данные
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
		//h2Total.innerHTML = 'ИТОГО, общая стоимость игрушек составляет: '; //todo__По совету преподавателя удалил_------------------------------
		h2Total.innerHTML = `ИТОГО, общая стоимость игрушек составляет: ${this.sumTotal()} \u20bd`; //todo__По совету преподавателя добавил_см. метод sumTotal() ------------------------------
	}

	sumTotal() {
		const sumT = document.querySelector('.total');
		let sum = 0;
		for (let item of this.goods) {
			sum += item.price;
		}
		return sum; //todo__По совету преподавателя добавил_см. метод createTotal() ------------------------------
		//sumT.insertAdjacentHTML('beforeend', `${sum} \u20bd`);//todo__По совету преподавателя удалил_------------------------------
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


//??</ЗАДАНИЕ №2>===================================================================================


//??<ЗАДАНИЕ №3>=====================================================================================

const size = [
	{
		name: 'Стандартный гамбургер',
		cal: 40,
		price: 20,
	},
	{
		name: 'Двойной гамбургер',
		cal: 20,
		price: 40,
	},
];

const stuffs = [
	{
		name: 'Сыр',
		cal: 20,
		price: 10
	},
	{
		name: 'Салат',
		cal: 5,
		price: 20
	},
	{
		name: 'Картофель',
		cal: 10,
		price: 15
	},
];

const toppings = [
	{
		name: 'Приправа',
		cal: 0,
		price: 15
	},
	{
		name: 'Майонез',
		cal: 5,
		price: 20
	},
];

class MenuCard {
	constructor(src, title, descr, alt, cal, price, parentSelector, stuff, topping) {
		this.src = src;
		this.title = title;
		this.descr = descr;
		this.alt = alt;
		this.cal = cal;
		this.price = price;
		this.parent = document.querySelector(parentSelector);
		this.stuff = stuff;
		this.topping = topping;
	}
	render() {
		const element = document.createElement('div');
		element.innerHTML = `
			<div class="hamburger">
					<h1 class="boldBlack">${this.title}</h1>
					<p class="center"><img style="border: 1px solid black" width='300' src=${this.src} alt=${this.alt}></p>
					<p>Описание: ${this.descr}.</p>
					<h1 class = "left">Выберите желаемый размер гамбургера</h1>
					<input id="${size[0].name}" data-price="${size[0].price}" data-calories="${size[0].cal}" type = "radio" name = "size" value="small" >
					<label for="small"> ${size[0].name} (Стоимость: ${size[0].price} \u20bd;. Калорийность: ${size[0].cal} калорий.)</label><br>
					<input id="${size[1].name}" data-price = "${size[1].price}" data-calories="${size[1].cal}" type = "radio" name = "size" value="big">
					<label for="big"> ${size[1].name} (Стоимость: ${size[1].price} \u20bd;. Калорийность: ${size[1].cal} калорий.)</label><br>
					<h1 class = "left" > Начинка </h1>
					<p>1. ${stuffs[0].name} (Стоимость: ${stuffs[0].price} \u20bd;. Калорийность: ${stuffs[0].cal} калорий.) <br>
					2. ${stuffs[1].name} (Стоимость: ${stuffs[1].price} \u20bd;. Калорийность: ${stuffs[1].cal} калорий.) <br>
					3. ${stuffs[2].name} (Стоимость: ${stuffs[2].price} \u20bd;. Калорийность: ${stuffs[2].cal} калорий.)
					</p>
					<select size = "1" class="select__list">
						<option selected >Выберите начинку</option>
						<option value="0" data-price="${stuffs[0].price}">_${stuffs[0].name}</option>
						<option value="1" data-price="${stuffs[1].price}">_${stuffs[1].name}</option>
						<option value="2" data-price="${stuffs[2].price}">_${stuffs[2].name}</option>
						<option value="3">Удалить все начинки</option>
					</select>
					<h1 class = "left" >Топпинг</h1>
					<p>1. ${toppings[0].name} (Стоимость: ${toppings[0].price} \u20bd;. Калорийность: ${toppings[0].cal} калорий.) <br>
					2. ${toppings[1].name} (Стоимость: ${toppings[1].price} \u20bd;. Калорийность: ${toppings[1].cal} калорий.)
					</p>
					<input id = "0" type = "checkbox" name="Приправа">
					<label for="0">&nbsp;Приправа</label>
					<input id = "1" type="checkbox" name="Майонез">
					<label for="1">&nbsp;Майонез</label>
			</div>
		`;
		this.parent.append(element);
	}
}

new MenuCard(
	'../img/HW-2/hamburger.jpg',
	'Гамбургер',
	'Гамбургер - вкусное и сбалансированное питание',
	'Гамбургер',
	'',
	'',
	'.hamburger__row',
	'',
	''
).render();

const inputs = document.querySelectorAll('input[type="checkbox"]');
const radios = document.querySelectorAll('input[type="radio"]');
const selects = document.querySelector('.select__list');

const totalStructure = document.querySelector('.structure');
const totalStructure0 = document.querySelector('.structure0');
const totalStructure1 = document.querySelector('.structure1');

const totalPrice = document.querySelector('.total__price');
const totalPrice0 = document.querySelector('.total__price0');
const totalPrice1 = document.querySelector('.total__price1');

const totalCal = document.querySelector('.total__cal');
const totalCal0 = document.querySelector('.total__cal0');
const totalCal1 = document.querySelector('.total__cal1');

radios.forEach(item => {
	item.addEventListener('click', () => {
		totalStructure.innerHTML = ' ';
		totalPrice.innerHTML = ' ';
		totalCal.innerHTML = ' ';

		let inputRadios = document.querySelectorAll('input[type="radio"]:checked');
		inputRadios.forEach(item => {
			totalStructure.insertAdjacentHTML('beforeend', ` ${item.id};<br>`);
			totalPrice.insertAdjacentHTML('beforeend', ` ${item.id} - ${item.dataset.price} \u20bd;<br>`);
			totalCal.insertAdjacentHTML('beforeend', ` ${item.id} - ${item.dataset.calories} калорий;<br>`);
		});
	});
});

selects.addEventListener('change', (ev) => {
	if (ev.target.value === '0') {
		totalStructure0.insertAdjacentHTML('beforeend', ` ${stuffs[0].name};<br>`);
		totalPrice0.insertAdjacentHTML('beforeend', ` ${stuffs[0].name} - ${stuffs[0].price} \u20bd;<br>`);
		totalCal0.insertAdjacentHTML('beforeend', ` ${stuffs[0].name} - ${stuffs[0].cal} калорий;<br>`);
	} else if (ev.target.value === '1') {
		totalStructure0.insertAdjacentHTML('beforeend', ` ${stuffs[1].name};<br>`);
		totalPrice0.insertAdjacentHTML('beforeend', ` ${stuffs[1].name} - ${stuffs[1].price} \u20bd;<br>`);
		totalCal0.insertAdjacentHTML('beforeend', ` ${stuffs[1].name} - ${stuffs[1].cal} калорий;<br>`);
	} else if (ev.target.value === '2') {
		totalStructure0.insertAdjacentHTML('beforeend', ` ${stuffs[2].name};<br>`);
		totalPrice0.insertAdjacentHTML('beforeend', ` ${stuffs[2].name} - ${stuffs[2].price} \u20bd;<br>`);
		totalCal0.insertAdjacentHTML('beforeend', ` ${stuffs[2].name} - ${stuffs[2].cal} калорий;<br>`);
	} else if (ev.target.value === '3') {
		totalStructure0.innerHTML = ' ';
		totalPrice0.innerHTML = ' ';
		totalCal0.innerHTML = ' ';
	}
});


inputs.forEach(item => {
	item.addEventListener('click', () => {
		totalStructure1.innerHTML = ' ';
		totalPrice1.innerHTML = ' ';
		totalCal1.innerHTML = ' ';

		let inputCheckeds = document.querySelectorAll('input[type="checkbox"]:checked');
		inputCheckeds.forEach(item => {
			totalStructure1.insertAdjacentHTML('beforeend', ` ${toppings[item.id].name};<br>`);
			totalPrice1.insertAdjacentHTML('beforeend', ` ${toppings[item.id].name} - ${toppings[item.id].price} \u20bd;<br>`);
			totalCal1.insertAdjacentHTML('beforeend', ` ${toppings[item.id].name} - ${toppings[item.id].cal} калорий;<br>`);
		});
	});
});


const reset = document.querySelector('#reset');

reset.addEventListener('click', () => {
	totalStructure.innerHTML = ' ';
	totalPrice.innerHTML = ' ';
	totalCal.innerHTML = ' ';

	totalStructure0.innerHTML = ' ';
	totalPrice0.innerHTML = ' ';
	totalCal0.innerHTML = ' ';

	totalStructure1.innerHTML = ' ';
	totalPrice1.innerHTML = ' ';
	totalCal1.innerHTML = ' ';
});



//??</ЗАДАНИЕ №3>==========================================

