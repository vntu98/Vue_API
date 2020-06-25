<template>
	<div id="app">
		<loading :class="{ show: isLoading }"/>
		<app-header v-if="isRenderHeader" />
		<main>
			<div class="container">
				<router-view></router-view>
			</div>
		</main>
		<app-footer v-if="isRenderFooter"/>
	</div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import Loading from './components/Loading'
import { mapActions } from 'vuex'
export default {
	name: 'app',
	data () {
		return {
			
		}
	},
	components: {
		AppHeader,
		AppFooter,
		Loading
	},
	methods: {
		...mapActions({
			checkLogin: 'user/checkLogin'
		})
	},
	computed: {
		isRenderHeader() {
			let arrRouter = ['login', 'register'];
			let routerName = this.$route.name;
			if (arrRouter.indexOf(routerName) === -1) {
				return true;
			}
			else {
				return false;
			}
		},
		isRenderFooter() {
			let arrRouter = ['home-page', 'post-detail'];
			let routerName = this.$route.name;
			if (arrRouter.indexOf(routerName) === -1) {
				return true;
			}
			else {
				return false;
			}
		},
		isLoading() {
			return this.$store.state.isLoading;
		}
	},
	created() {
		this.checkLogin();
	}
}
</script>

<style>

</style>
