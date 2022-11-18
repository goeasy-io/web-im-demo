import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = () => import('@/views/Home');
const Login = () => import('@/views/Login');
const Conversations = () => import('@/views/Conversations');
const Contacts = () => import('@/views/Contacts');
const PrivateChat = () => import('@/views/PrivateChat');
const GroupChat = () => import('@/views/GroupChat');
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home,
        redirect: '/conversations',
        children: [
            {
                path: 'conversations',
	            component: Conversations,
                children: [
                    {
                        path: 'privatechat/:id',
                        component: PrivateChat,
                    },
                    {
                        path: 'groupchat/:id',
	                    component: GroupChat,
                    },
                ],
            },
            {
                path: 'contacts',
	            component: Contacts,
            },
        ],
    },
    {
        path: '/login',
	    component: Login,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !Vue.prototype.globalData.currentUser) {
        next({path: '/login'})
    } else next()
})

export default router;
