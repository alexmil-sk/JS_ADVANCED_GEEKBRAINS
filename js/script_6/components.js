
//todo__ОСНОВНЫЕ ПРАВИЛА ПРИ СОЗДАНИИ КОМПОЛНЕНТОВ__

///todo__1_data в компоненте всегда должна быть функцией
///todo__2_в компоненте всегда должен быть template - шаблон разметки HTML, в который помещаются элементы компонета


Vue.component('component-one', {
	template: `<div>Lorem-1 dvfaqervsfbsgbsrtv trhbsrbtbt ratbetbveasvb rvqerwv avvc</div>`
});

Vue.component('component-two', {
	template: `<div>Lorem-2 dvfaqerv rvqervaarevaervrae regreagv rwegeravg wv avvc</div>`
});

Vue.component('component-three', {
	template: `<div>Lorem-3 dvfaqerv rvqe reagreag reg rae garwv avvc</div>`
});





//??__Вариант__1__Глобальная регистрация компонента__

//Vue.component('some-el', {
//	data() {//!!__ВНИМАНИЕ!!__В компоненте data должна быть функцией
//		return {
//			title: 'Новый Компонент Тайтл',
//		};
//	},
//	template: `<div>{{ title }}</div>`,
//	mounted() {
//		console.log(this);
//	}
//});

//??__Вариант__2__Локальная регистрация компонента__

//*__Дочерний компонент подключающийся в целевой компонент

const childComponent = {
	name: 'child-component',
	template: '<p>Заголовок дочернего компонента</p>',
};


//*__Целевой компонент в новом файле

Vue.component('some-el', {
	props: ['title', 'counter', 'increase'], //!!_Свойства для передачи между компонентами
	//!!__В данном массиве указываем те параметры, которые ожидаем получить из другого компонентов
	//!__Для более подробного описания свойств ожидаемых параметров необходимо применять перечень объектов в массиве
	//!__Внимание!!! Все передаваемые параметры при занесении в HTML разметку указываются в тэгах как атрибуты
	data() { //!!__ВНИМАНИЕ!!__В компоненте data должна быть функцией
		return {
			title: 'Целевой Компонент Тайтл',
		};
	},
	components: {//Это объект куда передается все, что мы хотим использовать в текущем компоненте
		childComponent,
	},
	template:	`<div>
						<div @click="$emit('click', $event)">{{ title }}</div>
						<child-component></child-component>
						<slot>
							<p>Default</p>
						</slot>
						<p>{{ counter }}</p>
						<button @click="$root.increase()">Добавить</button> 
						<button @click="$emit('increase-counter')">Добавить</button>
					</div>`,
	mounted() {
		console.log(this);
	}
});



