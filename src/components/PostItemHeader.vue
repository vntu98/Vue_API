<template>
    <div class="ass1-section__head">
        <router-link 
            class="ass1-section__avatar ass1-avatar" 
            :to="{ name: 'user-page', params: { id: post.USERID }}"
        >
            <img :src="getAvatar" alt="">
        </router-link>
        <div>
            <router-link 
                class="ass1-section__name" 
                :to="{ name: 'user-page', params: { id: post.USERID }}"
                v-html="formatFullname"
            >
            </router-link>
            <span class="ass1-section__passed">{{ formmatTimeAdded }}</span>
        </div>
        <a href="#" class="ass1-section__link ass1-btn-icon"><i class="icon-Link"></i></a>
    </div>
</template>

<script>
import moment from 'moment'
import { replaceAll } from '../helpers'
export default {
    name: 'post-item-header',
    props: {
        post: Object
    },
    data() {
        return {
            querySearch: this.$route.query.query
        }
    },
    computed: {
        getAvatar() {
            if(this.post.profilePicture) return this.post.profilepicture;
            return '/dist/images/avatar-02.png';
        },
        formmatTimeAdded() {
            moment.locale('vi');
            return moment(this.post.time_added).fromNow();
        },
        formatFullname() {
            if(this.querySearch) {
                return replaceAll(this.post.fullname, this.querySearch, `<mark>${this.querySearch}</mark>`);
            } else {
                return this.post.fullname;
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
    .ass1-section__name {
        text-transform: capitalize;
    }
</style>