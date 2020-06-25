<template>
    <div>
        <div class="row">
            <div class="col-lg-8">
                <!--section-->
                <div class="ass1-section__list" v-if="getDataPostDetail && getDataPostDetail.post">
                    <div class="ass1-section">
                        <post-item :post="getDataPostDetail.post"></post-item>

                        <ul>
                            <li v-for="item in getDataPostDetail.categories" :key="item.TAG_ID">
                                <router-link :to="getLinkCategory(item)">{{ item.tag_value }}</router-link>
                            </li>
                        </ul>
                    </div>

                    <post-comment-add></post-comment-add>

                    <post-comments></post-comments>
                </div>
            </div>
            <div class="col-lg-4">
                <side-bar></side-bar>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from '../components/SideBar'
import PostItem from '../components/PostItem'
import PostFeeling from '../components/PostFeeling'
import PostCommentAdd from '../components/PostCommentAdd'
import PostComments from '../components/PostComments'
import { mapActions, mapGetters } from 'vuex'
import { removeVietnameseFromString } from '../helpers'
export default {
    name: 'post-detail',
    data() {
        return {
            postId: this.$route.params.id
        }
    },
    methods: {
        ...mapActions({
            'getPostDetailById': 'post/getPostDetailById'
        }),
        async fetchDataPostDetail() {
            /* this.getPostDetailById(this.postId).then(res => {
                if(!res.ok) {
                    this.$router.push('/');
                }
            }); */
            let result = await this.getPostDetailById(this.postId);
            if(!result.ok) {
                this.$router.push('/');
            }
        },
        getLinkCategory(category) {
            return {
                name: 'home-page',
                query: {
                    text: removeVietnameseFromString(category.tag_value),
                    tagIndex: category.tag_index
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            getDataPostDetail: 'post/getDataPostDetail'
        })
    },
    components: {
        SideBar,
        PostItem,
        PostFeeling,
        PostCommentAdd,
        PostComments
    },
    watch: {
        '$route'(to, from) {
            this.postId = to.params.id;
            this.fetchDataPostDetail();
        }
    },
    created() {
        this.fetchDataPostDetail();
    }
}
</script>

<style>

</style>