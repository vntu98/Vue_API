export default {
    getListPost: state => {
        return state.listPost;
    },
    getDataPostDetail: (state, getters, rootState) => {
        if(state.postDetail) {
            let userId = state.postDetail.post.USERID;
            let user = rootState.user.users[userId];
            let data = {
                post: {
                    ...state.postDetail.post,
                    fullname: user.fullname,
                    profilepicture: user.profilepicture
                },
                categories: state.postDetail.categories,
                comments: state.postDetail.comments
            }
            return data;
        }
    }
}