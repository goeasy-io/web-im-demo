import Vue from 'vue';
import VueRouter from 'vue-router';
const DefaultLayout = () => import('@/layout/DefaultLayout');
const Login = () => import('@/views/Login/Login');
const Conversations = () => import('@/views/Conversations/Conversations');
const Contacts = () => import('@/views/Contacts/Contacts');
const PrivateChat = () => import('@/views/Chat/PrivateChat');
const GroupChat = () => import('@/views/Chat/GroupChat');
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const routes = [
    {
        path: '/',
        name: 'DefaultLayout',
        component: DefaultLayout,
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

export default router;
