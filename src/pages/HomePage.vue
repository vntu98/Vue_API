<template>
    <div>
        <div class="row">
            <div class="col-lg-8">
                <post-list></post-list>
            </div>
            <div class="col-lg-4">
                <side-bar></side-bar>
            </div>
        </div>
    </div>
</template>

<script>
import PostList from '../components/PostList'
import SideBar from '../components/SideBar'
export default {
    name: 'home-page',
    components: {
        SideBar,
        PostList
    },
    watch: {
        $route(to, from) {
            let tagIndex = to.query.tagIndex;
            this.$store.dispatch('post/getListPostHasPaging', { tagIndex });
        }
    },
	created() {
		let tagIndex = this.$route.query.tagIndex;
		this.$store.dispatch('post/getListPostHasPaging', { tagIndex });
	}
}
</script>

<style>

</style>