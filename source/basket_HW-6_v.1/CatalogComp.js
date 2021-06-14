Vue.component('products', {
	props: ['products', 'img'],
	template:
		`
		<div class = "products">
			<h1>Каталог товаров</h1>
			<div class = "products-row">
				<product class = "product-item" v-for = "item of products"
					:key = "item.id_product"
					:img="img"
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
							<p><button class = "buy-btn press_btn"	@click = "$parent.$emit('add-product', product)">ADD GOODS TO BASKET</button></p>
						</div>
					</div>	
					`,
});