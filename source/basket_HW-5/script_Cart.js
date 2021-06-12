' use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//todo__Описываем базовые классы____________________

class List {
	constructor(url, container, list = listContext) { // listContext - это такой словарик (общий список). который поможет соорентироваться в том, какой конкретно товар мне сейчас генерировать, но нам нужно будет сгенерировать либо ProductItem либо CartItem.
		this.container = container;//элемент разметки для отображения данных на странице
		this.list = list; //словарь для классов строк 213
		this.url = url;
		this.goods = [];//здесь хранятся ответы от серверов
		this.allProducts = [];//здесь лежат конкретные экземпляры классов
		this.filtered = []; //отфильтрованные товары
		this._init();//метод общий для всех, который будет инициализировать ту или иную сущность (либо Каталог либо Корзину)
		//_init() он находится в базовом классе, чтобы его не забыть описать, или ничего не будет работать
		//по умолчанию он пустой и просто возвращает false
		//в него можно разместить базовую разметку, которая что-то будет возвращать
		//этот метод можно будет у любого из наследников переопределить на необходимый
	}

	//!!__Получение данных с сервера
	getJson(url) {
		return fetch(url ? url : `${API + this.url}`) //указан либо url какой-либо другой или API, который у нас выше по умолчанию для загрузки
			.then(result => result.json())
			.catch(error => {
				console.log(error);
			});
	}

	//!!__Обработка полученных данных
	handleData(data) {
		this.goods = [...data]; //здесь будет либо ссылка, либо новый массив
		this.render(); //данные вызвали и отрендерили
	}

	//!!__Подсчет стоимости всех товаров
	calcSum() {
		return this.allProducts.reduce((accum, item) => accum + item.price, 0);
	}
	
	render() {
		const block = document.querySelector(this.container);
		for (let product of this.goods) {
			console.log(this.constructor.name); // Проверка в консоли имени конструктора ProductsList или Cart
			const productObj = new this.list[this.constructor.name](product); //list = listContext  (см. строку const listContext) благодаря этому словарику мы можем не применять длинный код с if см. альтернативная реализация без словаря через if

			//??__альтернативная реализация без словаря через if
			// let productObj = null; // создание экземпляра кокого-либо класса товара Каталога или Корзины
			// if (this.constructor.name === 'ProductsList') { productObj = new ProductItem(product); }
			// if (this.constructor.name === 'Cart') { productObj = new CartItem(product);}
			// if (!productObj) { return; }

			console.log(productObj); //Проверочный вывод в консоль созданный экземпляр класса товара Каталога или Корзины
			this.allProducts.push(productObj); //заполняем массив готовыми экземплярами классов товаров Каталога или Корзины
			block.insertAdjacentHTML('beforeend', productObj.render());

		}
	}

	//!!__Метод поиска товаров
	filter(value) { //получаем на входе строку которую хотим найти
		const regexp = new RegExp(value, 'i'); //конструктор регулярного выражения на основе входящей строки данных
		//создаем экземпляр класса, потому, что поиск типа /${value}/ ввести не получится, т.к. знак доллара - это конец строки
		// {} фиг скобки символ квантификатора. Т.е. понятного поиска не получится
		this.filtered = this.allProducts.filter(product => regexp.test(product.product_name)); //проверяем наличие введенного в поиск названию товара
		this.allProducts.forEach(el => { //если товаров много, то будет перебор
			const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
			if (!this.filtered.includes(el)) {
				block.classList.add('invisible');
			} else {
				block.classList.remove('invisible');
			}
		});
	}

	_init() {
		return false;
	}
}

class Item {
	constructor(el, img = 'https://via.placeholder.com/200x150') {
		this.product_name = el.product_name;
		this.price = el.price;
		this.id_product = el.id_product;
		this.img = img;
	}

	render() {//можно задать какую-либо разметку, а можно и не задавать т.к. унаследованный класс будет заниматься оформлением
		return ``;
	}
}

//todo__Наследуемся от базовых классов______________

class ProductsList extends List {
	constructor(cart, container = '.products', url = '/catalogData.json') {
		super(url, container);//вызываем родительский конструктор и передаем туда url и container из строки выше
		this.cart = cart;//cart - это ссылка на экземпляр корзины см. в самом низу
		this.getJson()
			.then(data => this.handleData(data)); //handleData() все кладет в goods = [] и вызывает render()
	}

	_init() {
		document.querySelector(this.container).addEventListener('click', e => {
			if (e.target.classList.contains('buy-btn')) {
				this.cart.addProduct(e.target);
			}
		});

		document.querySelector('.search-form').addEventListener('submit', e => {
			e.preventDefault();
			this.filter(document.querySelector('.search-field').value);//gпередача поиска в метод filter
		});
	}
}

class ProductItem extends Item {
	render() { //все обработчики событий находятся в _init() class ProductsList,
		//что позволяет избавиться от большого количества однотипных обработчиков событий
		return `<div class="product-item" data-id="${this.id_product}">
						<img src="${this.img}" alt="Some img">
						<div class="desc">
							<h3>${this.product_name}</h3>
							<p>${this.price} \u20bd</p>
							<button class="buy-btn"
								data-id="${this.id_product}"
								data-name="${this.product_name}"
								data-price="${this.price}">Купить</button>
						</div>
					</div>`;
	}
}

class Cart extends List {
	constructor(container = '.cart-block', url = '/getBasket.json') {
		super(url, container); //вызываем родительский конструктор и передаем туда url и container из строки выше
		this.getJson()
			.then(data => {
				this.handleData(data.contents); //contents - это массив с сервера //handleData() все кладет в goods = [] и вызывает render()
			});
	}

	//Добавление товара
	addProduct(element) {//На вход передаем ссылку на element
		this.getJson(`${API}/addToBasket.json`)
			.then(data => {
				//Делаем проверку наличия товара на сервере
				if (data.result === 1) {
					let productId = +element.dataset['id'];
					let find = this.allProducts.find(product => product.id_product === productId);
					if (find) {
						find.quantity++;//находим существующий уже в Корзине товар и увеличиваем его количество
						this._updateCart(find);
					} else {//если товара нет, то мы его добавляем
						let product = {
							id_product: productId,
							price: +element.dataset['price'],
							product_name: element.dataset['name'],
							quantity: 1,
						};
						//Это массив goods = [];
						this.goods = [product];
						//Далее, вызывая метод render(), мы добавляем в allProducts только новый товар,
						//тем самым избегая излишнего перерендеринга всего массива goods,
						//что приведет к повторному добавлению в Корзину уже существующего товара и плюс нового
						this.render();
					}
				} else {
					alert('Error');
				}
			});
	}

	//удаление товара
	removeProduct(element) { //На вход передаем ссылку на element
		this.getJson(`${API}/deleteFromBasket.json`)
			.then(data => {
				if (data.result === 1) {
					let productId = +element.dataset['id'];
					let find = this.allProducts.find(product => product.id_product === productId);
					if (find.quantity > 1) {//если кол-во товара больше 1, то уменьшаем на 1 за каждый клик
						find.quantity--;
						this._updateCart(find);//обновляем состояние корзины
					} else {//если элемент будет последним, то удаляем
						this.allProducts.splice(this.allProducts.indexOf(find), 1);//удаление элемента из массива с поиском по индексу
						document.querySelector(`.cart-item[data-id="${productId}"]`).remove();//удаление элемента из html разметки
					}
				} else {
					alert('Error');
				}
		})
	}

	//Обновление данных корзины
	_updateCart(product) {
		let block = document.querySelector(`.cart-item[data-id='${product.id_product}']`);
		block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
		block.querySelector('.product-price').textContent = `${product.quantity * product.price} \u20bd`;
	}

	_init() {
		document.querySelector('.btn-cart').addEventListener('click', () => {
			document.querySelector(this.container).classList.toggle('invisible');
		});
		document.querySelector(this.container).addEventListener('click', e => {
			if (e.target.classList.contains('del-btn')) {//Кнопка удаления товара из Корзины при каждом товаре
				this.removeProduct(e.target); //Вызываем метод removeProduct() и передаем информацию об элементе, на который кликнули
			}
		});
	}
}

class CartItem extends Item {
	constructor(el, img = 'https://via.placeholder.com/50x100') {
		super(el, img);
		this.quantity = el.quantity;
	}
	render() {
		return `<div class="cart-item" data-id="${this.id_product}">
						<div class="product-bio">
							<img src="${this.img}" alt="Some img">
							<div class="product-desc">
								<p class="product-title">${this.product_name}</p>
								<p class="product-quantity">Количество: ${this.quantity}</p>
								<p class="product-single-price">${this.price} \u20bd за ед.</p>
							</div>
						</div>
						<div class="right-block">
							<p class="product-price">${this.quantity * this.price} \u20bd </p>
							<button class="del-btn" data-id="${this.id_product}">x</button>
						</div>
					</div>`;
	}
}

const listContext = {
	ProductsList: ProductItem,
	Cart: CartItem,
};

let cart = new Cart(); //создаем экземпляр Корзину
let products = new ProductsList(cart);//ссылка на экземпляр Корзины передается сюда

//new ProductsList(new Cart()); //Вариант сокращения написания верхних двух строчек