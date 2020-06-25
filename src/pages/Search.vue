<template>
    <div class="search-page">
        <div class="search-info">
            <h3>Từ khóa tìm kiếm: <strong>{{ query }}</strong></h3>
            <p>Tìm kiếm được ({{ listPostSearch.length }}) bài viết</p>
        </div>
        <div 
            v-if="listPostSearch && listPostSearch.length"
            v-masonry
            column-width='.grid-sizer'
            transition-duration="0.3s" 
            item-selector=".ass1-section__item"
            class="ass1-section__wrap row ass1-section__isotope-init"
        >
            <!--section-->
            <div class="grid-sizer"></div>
            <post-item v-masonry-tile v-for="(item, index) in listPostSearch" :post="item" :key="index" class="ass1-section__item col-lg-6"></post-item>
        </div>
    </div>
</template>

<script>
import PostItem from '../components/PostItem'
import { mapActions } from 'vuex'
export default {
    name: 'search',
    data() {
        return {
            query: this.$route.query.query,
            listPostSearch: []
        }
    },
    methods: {
        ...mapActions({
            'getListPostSearch': 'post/getListPostSearch'
        }),
        fetchDataSearch() {
            if(this.query) {
                this.getListPostSearch(this.query).then(res => {
                    if(res.ok) {
                        this.listPostSearch = res.data;
                        this.$redrawVueMasonry();
                    }
                })
            }
            
        },
        checkQuery() {
            if(!this.query) this.$router.push('/');
        }
    },
    components: {
        PostItem
    },
    created() {
        this.checkQuery();
        this.fetchDataSearch();
    },
    watch: {
        '$route'(to, from) {
            this.query = to.query.query;
            this.checkQuery();
            this.fetchDataSearch();
        }
    }
}
</script>

<style>
    .search-page {
        margin-top: 4px;
    }
    .search-info {
        padding-bottom: 30px;
    }
    mark, .mark {
        background-color: yellow;
        padding: 0;
    }
</style>