' use strict';

const app = new Vue({
	el: '#app',
	data: {
		title: 'Здравствуйте',
		counter: 0,
		tabs: ['one', 'two', 'three'],
		currentTab: 'one',
	},
	methods: {
		increase() {
			this.counter++;
		},
	},
	computed: {
		currentComponent() {
			return `component-${this.currentTab}`;
		}
	},
	mounted() {
		console.log(this);
	},
	
});


//??__< ЗАДАНИЕ № 1 >__==================================================================================================


//??__</ ЗАДАНИЕ № 2 >__==================================================================================================


//??__< ЗАДАНИЕ № 3 >__==================================================================================================






//??__</ ЗАДАНИЕ № 3 >__==================================================================================================


