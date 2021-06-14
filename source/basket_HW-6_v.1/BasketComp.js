Vue.component('cart', {
	props: ['basketitems', 'img', 'isvisiblecart'],
	template:	`<div class="cart-block" v-show="isvisiblecart">
							<h1>Корзина</h1>
							<p v-if="!basketitems.length">В КОРЗИНЕ ТОВАР ОТСУТСТВУЕТ</p>
							<div class="cart-item">
								<div class="cart-item-row">
									<cart-item class="product-bio" v-for="item of basketitems"
										:key="item.id_product"
										:cart-item="item"
										:img="img">
									</cart-item>
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
					<p><button class="del-btn press_btn" @click="$parent.$emit('remove', cartItem)">Х</button></p>
				</div>`
});
