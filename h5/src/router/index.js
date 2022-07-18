import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = () => import('@/views/Home/Home');
const Login = () => import('@/views/Login/Login');
const Conversations = () => import('@/views/Conversations/Conversations');
const Contacts = () => import('@/views/Contacts/Contacts');
const PrivateChat = () => import('@/views/Chat/PrivateChat');
const GroupChat = () => import('@/views/Chat/GroupChat');
Vue.use(VueRouter);

//解决vue-router3.0以上版本，避免对当前位置冗余导航的警告信息：NavigationDuplicated: Avoided redundant navigation to current location
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '',
                redirect: '/conversations',
            },
            {
                path: '/conversations',
                name: 'Conversations',
	            component: Conversations,
                children: [
                    {
                        path: '/privatechat/:id',
                        name: 'PrivateChat',
                        component: PrivateChat,
                    },
                    {
                        path: '/groupchat/:id',
                        name: 'GroupChat',
	                    component: GroupChat,
                    },
                ],
            },
            {
                path: '/contacts',
                name: 'Contacts',
	            component: Contacts,
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
	    component: Login,
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
	const currentUser = JSON.parse(localStorage.getItem('currentUser'));
	if (to.name !== 'Login' && !currentUser) {
		next({name: 'Login'})
	}
	else next()
})

export default router;
