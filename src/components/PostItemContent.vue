<template>
    <div class="ass1-section__content">
        <p v-html="formatContent"></p>
        <div class="ass1-section__image">
            <router-link :to="{ name: 'post-detail', params: { id: post.PID }}"><img :src="post.url_image" :alt="post.post_content"></router-link>
        </div>
    </div>
</template>

<script>
import { replaceAll } from '../helpers'
export default {
    name: 'post-item-content',
    props: {
        post: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            querySearch: this.$route.query.query
        }
    },
    computed: {
        formatContent() {
            if(this.querySearch) {
                return replaceAll(this.post.post_content, this.querySearch, `<mark>${this.querySearch}</mark>`);
            } else {
                return this.post.post_content;
            }
        }
    },
    watch: {
        '$route'(to, from) {
            this.querySearch = to.query.query;
        }
    }
}
</script>

<style>

</style>