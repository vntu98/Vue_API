<template>
    <div class="ass1-add-comment">
        <form action="#">
            <textarea v-model="comment" class="form-control ttg-border-none" placeholder="Thêm một bình luận"></textarea>
        </form>
        <div class="ass1-add-comment__content">
            <a href="#" @click.prevent="handleAddComment" class="ass1-add-comment__btn-save ass1-btn-icon"><span>{{ renderMaxLength }}</span><i class="icon-Submit_Tick"></i></a>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'post-comment-add',
    data() {
        return {
            comment: '',
            maxLength: 180,
            postId: this.$route.params.id
        }
    },
    computed: {
        renderMaxLength() {
            return this.maxLength - this.comment.length;
        }
    },
    watch: {
        '$route'(to, from) {
            this.postId = to.params.id;
        }
    },
    methods: {
        ...mapActions({
            'addNewComment': 'post/addNewComment'
        }),
        handleAddComment(e) {
            if(this.comment.length <= this.maxLength) {
                let data = {
                    comment: this.comment,
                    postid: this.postId
                };
                this.addNewComment(data).then(res => {
                    if(res.ok) this.comment = '';
                    else alert('Error !!', res.error);
                });
            } else {    
                alert('Error limit !!');
            }
        }
    }
}
</script>

<style>

</style>