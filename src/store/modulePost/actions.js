import axiosInstance from '../../plugins/axios'
import { PAGE_SIZE, CURRENT_PAGE } from '../../constants'

export default {
    async getListPostHasPaging({ commit }, { pageSize = PAGE_SIZE, currPage = CURRENT_PAGE, tagIndex = null}) {
        commit('SET_LOADING', true, { root: true });
        let config = {
            params: {
                pagesize: pageSize,
                currPage: currPage
            }
        };
        try {
            let result;
            if(tagIndex) {
                config.params.tagIndex = tagIndex;
                result = await axiosInstance.get('/post/getListByCategory.php', config);
            } else {
                result = await axiosInstance.get('/post/getListPagination.php', config);
            }
            commit('SET_LOADING', null, { root: true });
            if(result.data.status === 200) {
                if(currPage === 1) commit('SET_LIST_POST', result.data.posts);
                else if(currPage > 1) commit('PUSH_LIST_POST', result.data.posts);
            }
        } catch (error) {
            commit('SET_LOADING', null, { root: true });
            console.log('error: ', error);
        }
    },
    async getPostDetailById({ commit, dispatch }, postid) {
        commit('SET_LOADING', true, { root: true });
        let config = {
            params: {
                postid
            }
        };
        try {
            let result = await axiosInstance.get('/post/post.php', config);
            if(result.data.status === 200) {
                let resultUser = await dispatch('user/getUserById', result.data.data.post.USERID, { root: true });
                commit('SET_LOADING', null, { root: true });
                commit('SET_POST_DETAIL', result.data.data);
                return {
                    ok: true,
                    data: result.data.data,
                    error: null
                }
            }
        } catch (error) {
            commit('SET_LOADING', null, { root: true });
            return {
                ok: false,
                error: error.message
            }
        }
    }
}