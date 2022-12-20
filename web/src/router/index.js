import store from '../store'
import { createRouter, createWebHistory } from 'vue-router';
const Home = () => import('../views/Home.vue');
const Login = () => import('../views/Login.vue');
const Conversations = () => import('../views/Conversations.vue');
const Contacts = () => import('../views/Contacts.vue');
const PrivateChat = () => import('../views/PrivateChat.vue');
const GroupChat = () => import('../views/GroupChat.vue');

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

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    const currentUser = store.state.currentUser;
    if (to.path !== '/login' && !currentUser) {
        next({path: '/login'})
    } else next()
})

export default router;
