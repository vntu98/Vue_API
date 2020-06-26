<template>
    <div class="ass1-comments__section">
        <a href="#" class="ass1-comments__avatar ass1-avatar"><img :src="getAvatar" alt=""></a>
        <div class="ass1-comments__content">
            <a href="#" class="ass1-comments__name">{{ comment.fullname }}</a>
            <span class="ass1-comments__passed">{{ formatTimeAdded }}</span>
            <p> {{ comment.comment }}</p>
            <div class="ass1-comments__info">
                <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"><i class="icon-Upvote"></i><span>256</span></a>
                <a href="#" class="ass1-comments__btn-down ass1-btn-icon"><i class="icon-Downvote"></i><span>12</span></a>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'post-comment-item',
    props: {
        comment: Object
    },
    computed: {
        getAvatar() {
            if(this.comment && this.comment.profilepicture) {
                return this.comment.profilepicture;
            }
            return '/dist/images/avatar-10.png';
        },
        formatTimeAdded() {
            moment.locale('vi');
            return moment(this.comment.time_added).fromNow();
        },
    }
}
</script>

<style>

</style>