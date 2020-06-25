<template>
    <aside class="ass1-aside">
        <div class="ass1-content-head__t">
            <div>Bài viết gần đây của bạn.</div>
        </div>
        <div v-if="!isLogin">Vui lòng đăng nhập để xem nội dung này 
            <router-link to="/login">Đăng nhập</router-link>
        </div>
        <div v-else-if="isLogin && getListPostsOfCurrentUser && getListPostsOfCurrentUser.length">
            <post-item v-for="(item, index) in getListPostsOfCurrentUser" :post="item" :key="index" />
        </div>
    </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import PostItem from './PostItem'
export default {
    name: 'side-bar',
    computed: {
        ...mapGetters({
            'isLogin': 'user/isLogin',
            'getListPostsOfCurrentUser': 'user/getListPostsOfCurrentUser'
        })
    },
    components: {
        PostItem
    }
}
</script>

<style>

</style>