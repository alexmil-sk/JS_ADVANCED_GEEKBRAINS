Vue.component('products', {
	data() {
		return {
			catalogUrl: '/catalogData.json',
			filtered: [],
			imgCatalog: "../../img/HW-3/LeBoard-sm.jpg",
			social_links: {
				'fa-facebook-f': 'https://www.facebook.com',
				'fa-vk': 'https://vk.com',
				'fa-youtube': 'https://www.youtube.com',
				'fa-instagram': 'https://www.instagram.com',
				'fa-GB': 'https://gb.ru',
			},
			products: [
				{
					"id_product": 123,
					"product_name": "Ноутбук",
					"price": 45600,
					"quantity": 1,
				},
				{
					"id_product": 456,
					"product_name": "Мышка",
					"price": 1000,
					"quantity": 1,
				}
			],
		};
	},
	methods: {
		filter() {
			let regexp = new RegExp(this.searchLine, 'i');
			this.filtered = this.products.filter(el => regexp.test(el.product_name));
			console.log(this.searchLine);
			console.log(regexp);
			console.log(this.products);
			console.log(this.filtered);
		},
		mounted() {
			this.$parent.getJson(`${API + this.catalogUrl}`)
				.then(data => {
					for (let el of data) {
						this.products.push(el);
						this.filtered.push(el);
					}
				});
		},
	},
	template:
		`
		<div class = "products">
			<h1>Каталог товаров</h1>
			<div class = "products-row">
				<product class = "product-item" v-for = "item of products"
					:key = "item.id_product"
					:img="imgCatalog"
					:product="item">
				</product>
			</div>
		</div>
		`,
});

Vue.component('product', {
	props: ['product', 'img'],
	template:	`
					<div>				
						<h2>{{ product.product_name.toUpperCase() }}</h2>
						<img :src = "img" alt = "Some img">
						<div class = "desc">
							<p>Товара в наличии: {{	product.quantity }} шт.</p>
							<p> Цена за единицу: {{ product.price }} pуб.</p>
							<p><button class = "buy-btn press_btn"	@click = "$root.$refs.cart.addProduct(product)">ADD GOODS TO BASKET</button></p>
						</div>
					</div>	
					`,
});