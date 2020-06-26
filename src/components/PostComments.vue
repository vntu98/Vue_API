<template>
    <div class="ass1-comments">
        <div class="ass1-comments__head">
            <div class="ass1-comments__title">{{ comments.length }} Bình luận</div>
            <div class="ass1-comments__options">
                <span>Sắp xếp theo:</span>
                <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"><i class="icon-Upvote"></i></a>
                <a href="#" class="ass1-comments__btn-down ass1-btn-icon"><i class="icon-Downvote"></i></a>
                <a href="#" class="ass1-comments__btn-expand ass1-btn-icon"><i class="icon-Expand_all"></i></a>
            </div>
        </div>
        <!--comment-->
        <post-comment-item v-for="item in comments" :comment="item" :key="item.CID" />
    </div>
</template>
    
<script>
import PostCommentItem from './PostCommentItem'
export default {
    name: 'post-comments',
    props: {
        comments: Array
    },
    components: {
        PostCommentItem
    }
}
</script>

<style>

</style>