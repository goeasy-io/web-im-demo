import Vue from 'vue';
import Router from 'vue-router';
import Login from "../views/login/login";
import Contacts from "../views/contacts/contacts";
import Conversations from "../views/conversations/conversations";
import Index from "../views/Index";
import Mine from "../views/mine/mine";
import CustomMessage from '../views/chat/customMessageForm/customMessageForm'
import Private from '../views/chat/privateChat/privateChat'
import Group from '../views/chat/groupChat/groupChat'

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};


const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/customMessage',
            name: 'customMessage',
            component: CustomMessage
        },
        {
            path: '/private',
            name: 'private',
            component: Private
        },
        {
            path: '/group',
            name: 'group',
            component: Group
        },
        {
            path: '/index',
            name: 'index',
            redirect: '/conversations',
            component: Index,
            children: [
                {
                    path: '/conversations',
                    name: 'conversations',
                    component: Conversations,
                },
                {
                    path: '/contacts',
                    name: 'contacts',
                    component: Contacts
                },
                {
                    path: '/mine',
                    name: 'mine',
                    component: Mine
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if(user){
        // 存在currentUser
        if(to.name === 'login'){
            // 访问login页面,跳转conversations 页面
            next({path: "/conversations"});
        }else {
            next();
        }
    }else {
        // 不存在currentUser
        if(to.name === 'login'){
            // 访问login页面，则进行默认行为
            next();
        }else {
            // 访问其他页面,则跳转到login页面
            next({path: "/"});
        }
    }
});

export default router;