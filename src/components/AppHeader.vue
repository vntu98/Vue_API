<template>
    <header>
        <div class="ass1-header">
            <div class="container">
                <router-link to="/" class="ass1-logo">
                    Meme
                </router-link>

                <app-navigation />

                <div class="ass1-header__search">
                    <form action="#" @submit.prevent="handleSubmitSearch">
                        <label>
                            <input v-model="searchString" type="search" name="search-text" class="form-control" placeholder="Nhập từ khóa ...">
                            <i class="icon-Search" @click="handleSubmitSearch"></i>
                        </label>
                    </form>
                </div>
                <router-link to="/upload" class="ass1-header__btn-upload ass1-btn">
                    <i class="icon-Upvote"></i> Upload
                </router-link>
                <router-link v-if="!isLogin" class="ass1-header__btn-upload ass1-btn" to="/login">Login</router-link>
                <div v-else class="wrapper-user">
                    <a class="user-header">
                        <span class="avatar">
                            <img :src="getAvatar" alt="avatar">
                        </span>
                        <span @click="goToUserPage" v-if="currentUser" class="email">{{ currentUser.email }}</span>
                    </a>
                    <div @click="handleLogout" class="logout">Logout</div>
                </div>
            </div>
        </div>

    </header>
</template>

<script>
import $ from 'jquery'
import AppNavigation from './AppNavigation'
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'app-header',
	data() {
		return {
			searchString: ''
		}
	},
    mounted() {
        $(".ass1-header__menu li > a").click(function(e) {
            $(this).parent().find(".ass1-header__nav").slideToggle(300, 'swing');
        });
        $(".ass1-header__menu ul li > a").click(function(e) {
            $(this).parents(".ass1-header__nav").slideUp(300, 'swing');
        })
    },
    methods: {
		...mapActions({
			logout: 'user/logout'
		}),
        handleLogout() {
			if(confirm('Are you sure want logout ?')) {
				this.logout().then(res => {
					this.$router.push('/login');
				});
			}
		},
		goToUserPage() {
			if(this.$route.name !== 'user-page')
				this.$router.push({ name: 'user-page', params: { id: this.currentUser.USERID } })
		},
		handleSubmitSearch() {
			if(this.searchString && this.$route.query.query !== this.searchString)
				this.$router.push({ name: 'search', query: { query: this.searchString } });
			this.searchString = '';
		}
    },
    components: {
        AppNavigation
	},
	computed: {
		...mapGetters({
			isLogin: 'user/isLogin',
			currentUser: 'user/currentUser'
		}),
		getAvatar() {
			if(this.currentUser) {
				if(this.currentUser.profilepicture) {
					return this.currentUser.profilepicture;
				}
			}
			return '/dist/images/avatar-01.png';
		}
	}
}
</script>

<style scoped>
    .user-header {
		position: relative;
		color: #1e1633;
		transition: all .2s ease;
		display: inline-block;
	}
	.user-header:hover {
		color: #3482e2;
	}
	.user-header > span {
		display: inline-block;
		vertical-align: middle;
	}
	.user-header .avatar {
		width: 35px;
		height: 35px;
		margin-right: 4px;
		border-radius: 100%;
		overflow: hidden;
	}
	.user-header .avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.wrapper-user {
		position: relative;
	}
	.logout {
		right: 0;
		top: 100%;
		position: absolute;
		background-color: #fff;
		padding: 10px 30px;
		min-width: 150px;
		text-align: right;
		border-radius: 3px;
		box-shadow: 0 0 5px 0px rgba(0,0,0,0.1);
		z-index: 0;
		transition: all .3s ease;
		opacity: 0;
		pointer-events: none;
		cursor: pointer;
	}
	.wrapper-user .logout:hover,
	.wrapper-user .user-header:hover + .logout {
		opacity: 1;
		z-index: 2;
		pointer-events: auto;
	}
    .ass1-header__nav > .container ul {
		flex-direction: row;
		flex-wrap: wrap;
	}
	.ass1-header__nav > .container ul li {
		flex: 0 0 25%;
		max-width: 25%;
	}
	.ass1-header__nav > .container ul li:first-child {
		margin-top: 8px;
	}
	.email {
		cursor: pointer;
	}
</style>