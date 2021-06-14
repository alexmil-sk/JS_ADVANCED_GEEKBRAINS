Vue.component('cart', {
	data() {
		return {
			imgCatalog: "../../img/HW-3/LeBoard-sm.jpg",
			cartUrl: 'getBasket.json',
			basketItems: [],
			isVisibleCart: false,
		};
	},
	methods: {
		addProduct(item) {
				this.$parent.getJson(`${API}/addToBasket.json`)
					.then(data => {
						console.log(data);
						if (data.result === 1) {
							let find = this.basketItems.find(el => el.id_product === item.id_product);
							if (find) {
								find.quantity++;
							} else {
								let prod = Object.assign({
									quantity: 1
								}, item);
								this.basketItems.push(prod);
							}
						} else {
							alert('Error');
						}
					});
			},
			remove(item) {
				this.$parent.getJson(`${API}/deleteFromBasket.json`)
					.then(data => {
						console.log(data);
						if (data.result === 1) {
							if (item.quantity > 1) {
								item.quantity--;
							} else {
								this.basketItems.splice(this.basketItems.indexOf(item), 1);
							}
						}
					});
			},
	},
	 mounted() {
	 	this.$parent.getJson(`${this.API + this.cartUrl}`)
	 		.then(data => {
	 			for (let el of data.contents) {
	 				this.basketItems.push(el);
	 			}
				 });
	 },
	template:	`
	 				<div>
	 					<button type="button" class="btn-cart press_btn width-300" @click="isVisibleCart = !isVisibleCart">Корзина</button>
						<div class = "cart-block" v-show = "isVisibleCart">
							<h1>Корзина</h1>
							<p v-if="!basketItems.length">В КОРЗИНЕ ТОВАР ОТСУТСТВУЕТ</p>
							<div class="cart-item">
								<div class="cart-item-row">
									<cart-item class="product-bio" v-for="item of basketItems"
										:key="item.id_product"
										:cart-item="item"
										:img="imgCatalog"
										@remove='remove'>
									</cart-item>
								</div>
							</div>
						</div>
					</div>
					`,
});

Vue.component('cart-item', {
	props: ['cartItem', 'img'],
	template:
				`<div>
					<div class="product-desc">
						<img :src="img" alt="Some img">
						<p class="product-title">Наименование товара: {{ cartItem.product_name.toUpperCase() }}</p>
						<p class="product-quantity">Количество: {{ cartItem.quantity }} шт.</p>
						<p class="product-single-price"> {{ cartItem.price }} руб. за ед.</p>
						<p class="product-price">Стоимость выбранного товара: {{ cartItem.price * cartItem.quantity }} руб.</p>
					</div>
					<p><button class="del-btn" @click="$emit('remove', cartItem)">&times;</button></p>
				</div>`
});
