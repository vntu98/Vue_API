<template>
    <div class="ass1-head-user">
        <div class="ass1-head-user__content">
            <div class="ass1-head-user__image"><a href="#"><img :src="getAvatar" alt=""></a></div>
            <div class="ass1-head-user__info">
                <div class="ass1-head-user__info-head">
                    <div class="ass1-head-user__name">
                        <span v-if="userInfo">{{ userInfo.fullname }}</span> 
                        <i><img src="/dist/fonts/emotion/svg/Verified.svg" alt=""></i>
                    </div>
                    <div class="w-100"></div>
                    <router-link v-if="!isCurrentUser" to="#" class="ass1-head-user__btn-follow ass1-btn">Theo dõi</router-link>
                    <template v-else>
                        <router-link :to="{name: 'change-password', params: {id: userInfo.USERID}}" class="ass1-head-user__btn-follow ass1-btn">Đổi mật khẩu</router-link>
                        <router-link :to="{name: 'user-profile', params: {id: userInfo.USERID}}" class="ass1-head-user__btn-follow ass1-btn">Profile</router-link>
                    </template>
                </div>
                <div class="ass1-head-user__info-statistic">
                    <div class="ass1-btn-icon"><i class="icon-Post"></i><span>Bài viết: {{ countPost }}</span></div>
                    <div class="ass1-btn-icon"><i class="icon-Followers"></i><span>Theo dõi: 99999</span></div>
                    <div class="ass1-btn-icon"><i class="icon-Following"></i><span>Đang theo dõi: 999</span></div>
                    <!-- <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> -->
                </div>
                <p v-if="userInfo">{{ userInfo.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'user-page-info',
    props: {
        userInfo: Object,
        countPost: Number
    },
    computed: {
        ...mapGetters({
            currentUser: 'user/currentUser'
        }),
        getAvatar() {
            if(this.userInfo) {
                if(this.userInfo.profilepicture) return this.userInfo.profilepicture;
                return '/dist/images/cat-1634369_1920.jpg';
            }
        },
        isCurrentUser() {
            if(this.currentUser && this.userInfo) {
                if(this.currentUser.USERID === this.userInfo.USERID) return true;
            }
            return false;
        }
    }
}
</script>

<style>

</style>