const App = {
	data() {
		return {
			placeholderString: 'Введите название заметки',
			title: 'Список заметок',
			inputValue: 'test',
		}
	},
	methods: {
		inputChangehandler(event) {
			console.log('inputChangehandler', event.target.value);
		}
	}
}


const app = Vue.createApp(App).mount('#app')
//app.mount('#app')