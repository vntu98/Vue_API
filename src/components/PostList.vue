<template>
    <div class="ass1-section__list">
        
        <post-item v-for="(item, index) in getListPost" :post="item" :key="index" />

        <button 
            @click="handleLoadMore"
            v-if="getListPost && getListPost.length" 
            class="load-more ass1-btn">
            <span>Xem thêm</span>
        </button>
        <h3 v-else-if="!getListPost.length && !isLoading">List Empty</h3>
    </div>
</template>

<script>
import PostItem from './PostItem'
import { mapGetters, mapActions } from 'vuex'
import { PAGE_SIZE, CURRENT_PAGE } from '../constants'
export default {
    name: 'post-list',
    data() {
        return {
            pageSize: PAGE_SIZE,
            currPage: CURRENT_PAGE,
            tagIndex: parseInt(this.$route.query.tagIndex)
        }
    },
    methods: {
        ...mapActions({
            'getListPostHasPaging': 'post/getListPostHasPaging'
        }),
        handleLoadMore(e) {
            this.currPage += 1;
            let data = {
                pageSize: this.pageSize,
                currPage: this.currPage,
                tagIndex: this.tagIndex
            };
            this.getListPostHasPaging(data);
        }
    },
    watch: {
        '$route'(to, from) {
            this.tagIndex = parseInt(to.query.tagIndex);
            this.currPage = 1;
        }
    },
    computed: {
        ...mapGetters({
            getListPost: 'post/getListPost',
        }),
		isLoading() {
			return this.$store.state.isLoading;
		}
    },
    components: {
        PostItem
    }
}
</script>

<style>

</style>