<template>
    <div>
        <div class="ass1-login">
            <div class="ass1-login__content">
                <p>Profile</p>

                <div class="ass1-login__form">
                    <div class="avatar">
                        <img :src="getAvatar" alt="">
                    </div>
                    <form action="#" v-if="currentUser" @submit.prevent="handleEditProfile">
                        <input v-bind:value="currentUser.fullname" @input="fullname = $event.target.value" type="text" class="form-control" placeholder="Tên ..." required="">
                     
                        <select v-bind:value="currentUser.gender" @change="gender = $event.target.value" class="form-control">
                            <option value="">Giới tính</option>
                            <option value="nam">Nam</option>
                            <option value="nu">Nữ</option>
                        </select>
                        <input @change="uploadAvatar" type="file" name="avatar"  placeholder="Ảnh đại diện" class="form-control">
                        <textarea v-bind:value="currentUser.description" @input="description = $event.target.value" class="form-control" cols="30" rows="5" placeholder="Mô tả ngắn ..."></textarea>
                        <div class="ass1-login__send justify-content-center">
                            <button type="submit" class="ass1-btn">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'user-profile',
    data() {
        return {
            userId: this.$route.params.id,
            fullname: '',
            gender: '',
            description: '',
            avatar: {
                objFile: null,
                base64URL: ''
            }
        }
    },
    methods: {
        ...mapActions({
            'uploadProfile': 'user/uploadProfile'
        }),
        isCurrentUser() {
            if(this.currentUser && this.userId) {
                if(this.currentUser.USERID != this.userId) this.$router.push('/');
            } 
        },
        handleEditProfile() {
            if(!this.fullname) this.fullname = this.currentUser.fullname;
            if(!this.description) this.description = this.currentUser.description;
            if(!this.gender) this.gender = this.currentUser.gender;
            if(this.fullname && this.description && this.gender) {
                let data = {
                    fullname: this.fullname,
                    description: this.description,
                    gender: this.gender,
                };
                if(this.avatar.objFile) data.objFile = this.avatar.objFile;
                this.uploadProfile(data).then(res => {
                    if(res.ok) {
                        alert('Update successfully !!');
                    } else {
                        alert(res.error);
                    }
                });
            }
            
        },
        uploadAvatar(e) {
            if(e.target.files && e.target.files.length) {
                const fileAvatar = e.target.files[0];
                let reader = new FileReader();
                let el = this;
                reader.addEventListener("load", function () {
                    let previewSrc = reader.result;
                    el.avatar.base64URL = previewSrc;
                    el.avatar.objFile = fileAvatar;
                }, false);

                if (fileAvatar) {
                    reader.readAsDataURL(fileAvatar);
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            currentUser: 'user/currentUser'
        }),
        getAvatar() {
            if(!this.avatar.base64URL) {
                if(this.currentUser) {
                    if(this.currentUser.profilepicture) return this.currentUser.profilepicture;
                    return '/dist/images/cat-1634369_1920.jpg';
                }
            } else {
                return this.avatar.base64URL;
            }
        }
    },
    created() {
        this.isCurrentUser();
    },
    watch: {
        '$route'(to, from) {
            this.userId = to.params.id;
            this.isCurrentUser();
        }
    }
}
</script>

<style>

</style>