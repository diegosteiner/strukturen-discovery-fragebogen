import Vue from 'vue';
import Router from 'vue-router';
import Person from '@/components/Person';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Person',
      component: Person,
    },
  ],
});
