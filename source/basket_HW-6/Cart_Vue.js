' use strict';

const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
	el: '#app',
	data: {
		social_links: {
			'fa-facebook-f': 'https://www.facebook.com',
			'fa-vk': 'https://vk.com',
			'fa-youtube': 'https://www.youtube.com',
			'fa-instagram': 'https://www.instagram.com',
			'fa-GB': 'https://gb.ru',

		},
		btnNum: 0,
		catalogUrl: "/catalogData.json",
		imgCatalog: "../../img/HW-3/LeBoard-sm.jpg",
		basketItems: [
			{
				"id_product": 123,
				"product_name": "Ноутбук",
				"price": 45600,
				"quantity": 2,
			}, {
				"id_product": 456,
				"product_name": "Мышка",
				"price": 1000,
				"quantity": 2,
			}
		],
		products: [{
			"id_product": 123,
			"product_name": "Ноутбук",
			"price": 45600,
			"quantity": 2,
		},
		{
			"id_product": 456,
			"product_name": "Мышка",
			"price": 1000,
			"quantity": 2,
		}
		],
		isVisibleCart: true,
		searchLine: 'строка searchLine',
	},
	methods: {
		cleanText() {
			this.searchLine = '';
		},
		getJson(url) {
			return fetch(url) //указан либо url какой-либо другой или API, который у нас выше по умолчанию для загрузки
				.then(result => result.json())
				.catch(error => {
					console.log(error);
				});
		},
		addProduct(products) {
			console.log(`Добавлено в корзину: ${this.products[0].product_name}`);
			
		},

		showBtnNum() {
			this.btnNum = Math.floor((Math.random() * 100) + 1);
		},

		FilterGoods() {
			console.log('FilterGoods');
		},

		beforeCreate() { //Хук Жизненного цикла-1. Cрабатывает перед созданием приложения
		},

		created() { //Хук Жизненного цикла-2. Срабатывает когда приложение создано и перед тем, как начало монтироваться
			this.getJson(`${API + this.catalogUrl}`)
				.then((data) => {
					console.log(data);
					this.products = data;
				});
						
		},

		beforeMount() { //Хук Жизненного цикла-3. Выполняется перед тем как мы хотим смонтировать нашу страницу.

		},


		mounted() { //Хук Жизненного цикла-4.Выполняется когда приложение уже смотнировано

		},

		beforeUpdate() { //Хук Жизненного цикла-5.Выполняется перед обновлением приложения

		},

		updated() { //Хук Жизненного цикла-6.Выполняется после обновления приложения

		},

		beforeDestroy() { //Хук Жизненного цикла-7.Выполняется перед тем, как уничтожится текущее приложение или компонент

		},

		destroyed() {} //Хук Жизненного цикла-8.Выполняется после того, как уничтожится текущее приложение или компонент
	},
	computed: { //БЛОК ВЫЧИСЛЯЕМЫХ ЗНАЧЕНИЙ. ВНИМАНИЕ!!! В них нельзя передавать параметры в скобках
		
	}
})

	




