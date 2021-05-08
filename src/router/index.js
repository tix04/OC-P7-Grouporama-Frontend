import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '../views/SignUpForm.vue'
import Posts from '../views/Posts.vue'
import User from '../views/User.vue'
import Login from '../views/Login.vue'
import CreatePost from '../views/createPost.vue'
import EditPost from '../views/editPost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/createPost',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/editPost',
    name: 'EditPost',
    component: EditPost
  }
];

const router = new VueRouter({
  routes
});

export default router
