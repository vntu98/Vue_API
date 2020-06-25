import axiosInstance from '../../plugins/axios'
import { parseJwt } from '../../helpers'
import { CONFIG_ACCESS_TOKEN } from '../../constants'

export default {
    async getUserById({ commit }, userId) {
        try {
            let result = await axiosInstance.get(`/member/member.php?userid=${userId}`);
            if(result.data.status === 200) {
                commit('SET_USER_INFO', result.data.user);
                return {
                    ok: true,
                    data: result.data.user,
                    error: null
                }
            } else {
                return {
                    ok: false,
                    error: null
                }
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async login({ commit, dispatch }, { email = '', password = ''}) {
        commit('SET_LOADING', true, { root: true });
        try {
            let data = {
                email,
                password
            }
            let result = await axiosInstance.post('/member/login.php', data);
            commit('SET_LOADING', false, { root: true });
            if(result.data.status === 200) {
                commit('SET_USER_INFO', result.data.user);
                commit('SET_LOGIN_INFO', result.data);
                dispatch('getListPostByUserId', result.data.user.USERID);
                return {
                    ok: true,
                    data: result.data,
                    error: null
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            commit('SET_LOADING', false, { root: true });
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async register({ commit, dispatch }, { email = '', fullname = '', password = '', repassword = '' }) {
        commit('SET_LOADING', true, { root: true });
        try {
            let data = {
                email,
                fullname,
                password,
                repassword
            }
            let result = await axiosInstance.post('/member/register.php', data);
            commit('SET_LOADING', false, { root: true });
            if(result.data.status === 200) {
                let objLoginInfo = {
                    user: result.data.user,
                    token: result.data.token
                };
                commit('SET_USER_INFO', result.data.user);
                commit('SET_LOGIN_INFO', objLoginInfo);
                dispatch('getListPostByUserId', result.data.user.USERID);
                return {
                    ok: true,
                    data: result.data,
                    error: null
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async logout({ commit }) {
        commit('SET_LOGOUT');
        return null;
    },
    async checkLogin({ commit, dispatch }) {
        try {
            let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN);
            let userObj = parseJwt(tokenLocal);
            if(userObj) {
                // let resultUser = await dispatch('getUserById', userObj.id);
                // let resultPostUser = await dispatch('getListPostByUserId', userObj.id);
                let promiseUser = dispatch('getUserById', userObj.id);
                let promisePostUser = dispatch('getListPostByUserId', userObj.id);
                let [ resultUser, resultPostUser ] = await Promise.all([promiseUser, promisePostUser])
                if(resultUser.ok && resultPostUser.ok) {
                    commit('SET_LOGIN_INFO', { user: resultUser.data, token: tokenLocal });
                    return {
                        ok: true,
                        error: null
                    }
                }
            }
            return {
                ok: false,
                error: null
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async getListPostByUserId({ commit }, userid) {
        try {
            let config = {
                params: {
                    userid
                },
                headers: {
                    'accept': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            let result = await axiosInstance.get('/post/getListPostUserID.php', config)
            if(result.data.status === 200) {
                let objData = {
                    posts: result.data.posts,
                    userId: userid
                };
                commit('SET_USER_POSTS', objData);
                return {
                    ok: true,
                    posts: result.data.posts || [],
                    error: null
                }
            } else {
                return {
                    ok: false,
                    error: null
                }
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async uploadProfile({ commit }, { fullname = '', description = '', gender = '', objFile = null }) {
        commit('SET_LOADING', true, { root: true });
        try {
            let bodyFormData = new FormData();
            bodyFormData.append('fullname', fullname);
            bodyFormData.append('description', description);
            bodyFormData.append('gender', gender);
            if(objFile) bodyFormData.append('avatar', objFile);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            let result = await axiosInstance.post('/member/update.php', bodyFormData, config);
            commit('SET_LOADING', false, { root: true });
            if(result.data.status === 200) {
                commit('SET_CURRENT_USER', result.data.user);
                return {
                    ok: true,
                    user: result.data.user
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            commit('SET_LOADING', false, { root: true });
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async changePassword({ commit }, data) {
        commit('SET_LOADING', true, { root: true });
        try {
            let config = {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            let result = await axiosInstance.post('/member/password.php', data, config);
            commit('SET_LOADING', false, { root: true });
            if(result.data.status === 200) {
                return {
                    ok: true,
                    message: result.data.message
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            commit('SET_LOADING', false, { root: true });
            return {
                ok: false,
                error: error.message
            }
        }
    }
}