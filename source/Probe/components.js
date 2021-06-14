Vue.component('component-one', {
    template: `<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias animi delectus ducimus ex in laudantium, nam qui sunt temporibus veritatis vitae. Aliquam eaque et ipsam nemo odit similique voluptate!</div>`
});
Vue.component('component-two', {
    template: `<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci architecto at aut blanditiis culpa cum dignissimos doloribus eaque, esse hic incidunt laboriosam mollitia nihil, placeat quae qui quidem ut!</div></div>`
});
Vue.component('component-three', {
    template: `<div>Lorem ipsum dolor sit amet, ptate!</div>`
});

const childComponent = {
    name: 'child-component',
    template: '<p>some in child component</p>'
};

Vue.component('some-el', {
    props: ['title', 'counter', 'increase'],
    data() {
        return {
            // title: 'Hello Components!',
        };
    },
    components: {
      childComponent,
    },
    template: `<div>
<!--                    <div @click="$emit('click', $event)">{{ title }}</div>-->
                    <div>{{ title }}</div>
                    <child-component/>
                    <slot>
                        <p>Default</p>                    
                    </slot>
                    <p>{{counter}}</p>
<!--                    <button @click="counter++">Increase</button>-->
<!--                    <button @click="increase">Increase</button>-->
<!--                    <button @click="$root.increase()">Increase</button>-->
                    <button @click="$emit('increase-counter')">Increase</button>
                </div>`,
    mounted() {
        console.log(this);
    },
});
