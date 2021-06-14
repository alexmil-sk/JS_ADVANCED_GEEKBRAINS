const app = new Vue({
    data: {
        title: 'Hello!',
        counter: 0,
        tabs: ['one', 'two', 'three'],
        currentTab: 'one',
    },
    el: '#app',
    methods: {
        increase() {
            this.counter++;
        },
    },
    computed: {
        currentComponent() {
            return `component-${this.currentTab}`;
        },
    },
    mounted() {
        console.log(this);
    },
});
