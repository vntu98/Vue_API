import store from '../store'

const ifNotAuthenticate = (to, from, next) => {
    if(!store.getters['user/isLogin']) next();
    else next({ name: 'home-page', query: { redirect: to.name } })
}

const ifAuthenticate = (to, from, next) => {
    if(store.getters['user/isLogin']) next();
    else next({ name: 'login', query: { redirect: to.name } })
}

export default {
    ifNotAuthenticate,
    ifAuthenticate
}