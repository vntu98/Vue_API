<template>
    <nav>
        <ul class="ass1-header__menu">
            <li>
                <a href="#">Danh mục</a>
                <div class="ass1-header__nav" style="display: none;">
                    <div class="container">
                        <ul>
                            <li v-for="category in categories" :key="category.id">
                                <router-link :to="getLinkCategory(category)">{{ category.text }}</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="ass1-header__menu-transition" style="left: 319.594px; height: 30px; width: 73px;"></div>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
import { removeVietnameseFromString } from '../helpers'
export default {
    name: 'app-navigation',
    methods: {
        getLinkCategory(category) {
            return {
                name: 'home-page',
                query: {
                    text: removeVietnameseFromString(category.text),
                    tagIndex: category.id
                }
            }
        }
    },
    computed: {
        categories() {
            return this.$store.state.post.categories;
        }
    }
}
</script>

<style scoped>
    .ass1-header__nav > .container ul {
        flex-direction: row;
        flex-wrap: wrap;
    }
    .ass1-header__nav > .container ul li {
        width: 25%;
    }
    .ass1-header__nav > .container ul li:first-child {
        margin-top: 8px;
    }
</style>