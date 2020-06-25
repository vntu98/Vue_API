<template>
    <div>
        <user-page-info :userInfo="userInfo" :countPost="countPost"/>

        <!--sections-->
        <div 
            v-if="listPostOfUser && listPostOfUser.length"
            v-masonry
            column-width='.grid-sizer'
            transition-duration="0.3s" 
            item-selector=".ass1-section__item"
            class="ass1-section__wrap row ass1-section__isotope-init"
        >
            <!--section-->
            <div class="grid-sizer"></div>
            <post-item v-masonry-tile v-for="(item, index) in listPostOfUser" :post="item" :key="index" class="ass1-section__item col-lg-6"></post-item>
        </div>
    </div>
</template>

<script>
import UserPageInfo from '../components/UserPageInfo'
import PostItem from '../components/PostItem'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'user-page',
    data(){
        return {
            userInfo: null,
            listPostOfUser: [],
            userId: this.$route.params.id
        }
    },
    components: {
        UserPageInfo,
        PostItem
    },
    computed: {
        ...mapGetters({
            'getListPostsOfCurrentUser': 'user/getListPostsOfCurrentUser'
        }),
        countPost() {
            if(this.listPostOfUser && this.listPostOfUser.length) return this.listPostOfUser.length;
            return 0;
        }
    },
    methods: {
        ...mapActions({
            setLoading: 'setLoading',
            getUserById: 'user/getUserById',
            getListPostByUserId: 'user/getListPostByUserId'
        }),
        async fetchAllData() {
            this.setLoading(true);
            let promiseUser = this.getUserById(this.userId);
            let promisePostUser = this.getListPostByUserId(this.userId);
            let [ resultUser, resultPostUser ] = await Promise.all([promiseUser, promisePostUser]);
            this.setLoading(false);
            if(resultUser.ok && resultPostUser.ok) {
                this.userInfo = resultUser.data;
                this.listPostOfUser = resultPostUser.posts;
                this.$redrawVueMasonry();
            } else {
                this.$router.push('/');
            }
        }
    },
    created() {
        this.fetchAllData();
    },
    watch: {
        '$route'(to, from) {
            this.userId = to.params.id;
            this.fetchAllData();
        }
    }
}
</script>

<style>
    
</style>