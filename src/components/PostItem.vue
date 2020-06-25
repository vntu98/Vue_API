<template>
    <div>
        <post-item-header v-if="post" :post="post"></post-item-header>

        <post-item-content v-if="post" :post="post"></post-item-content>
        
        <post-item-footer v-if="post" :post="post"></post-item-footer>
    </div>
        
</template>

<script>
import PostItemHeader from './PostItemHeader'
import PostItemContent from './PostItemContent'
import PostItemFooter from './PostItemFooter'
export default {
    name: 'post-item',
    props: {
        post: {
            type: Object,
            default: null
        }
    },
    components: {
        PostItemHeader,
        PostItemFooter,
        PostItemContent
    }
}
</script>

<style>

</style>