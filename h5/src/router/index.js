import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = () => import('@/views/Home/Home');
const Login = () => import('@/views/Login/Login');
const Conversations = () => import('@/views/Conversations/Conversations');
const Contacts = () => import('@/views/Contacts/Contacts');
const PrivateChat = () => import('@/views/Chat/PrivateChat');
const GroupChat = () => import('@/views/Chat/GroupChat');
Vue.use(VueRouter);

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
                components: {
                    default: Conversations,
                },
                children: [
                    {
                        path: '/privatechat/:id',
                        name: 'private',
                        components: {
                            default: PrivateChat,
                        },
                    },
                    {
                        path: '/groupchat/:id',
                        name: 'group',
                        components: {
                            default: GroupChat,
                        },
                    },
                ],
            },
            {
                path: '/contacts',
                name: 'Contacts',
                components: {
                    default: Contacts,
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        components: {
            default: Login,
        },
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
