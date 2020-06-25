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
            >
                {{ post.fullname }}
            </router-link>
            <span class="ass1-section__passed">{{ formmatTimeAdded }}</span>
        </div>
        <a href="#" class="ass1-section__link ass1-btn-icon"><i class="icon-Link"></i></a>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'post-item-header',
    props: {
        post: Object
    },
    computed: {
        getAvatar() {
            if(this.post.profilePicture) return this.post.profilepicture;
            return '/dist/images/avatar-02.png';
        },
        formmatTimeAdded() {
            moment.locale('vi');
            return moment(this.post.time_added).fromNow();
        }
    }
}
</script>

<style>

</style>