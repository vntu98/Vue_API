<template>
    <div>
        <div class="ass1-login">
            <div class="ass1-login__content">
                <p>Đổi mật khẩu</p>
                <div class="ass1-login__form">
                    <form action="#" @submit.prevent="handleChangePassword">
                        <input v-model="oldPassword" type="password" class="form-control" placeholder="Mật khẩu cũ" required="">
                        <input v-model="newPassword" type="password" class="form-control" placeholder="Mật khẩu mới" required="">
                        <input v-model="reNewPassword" type="password" class="form-control" placeholder="Xác nhận mật khẩu mới" required="">
                        <div class="ass1-login__send justify-content-center">
                            <button type="submit" class="ass1-btn">Gửi</button>
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
    name: 'change-password',
    data() {
        return {
            userId: this.$route.params.id,
            oldPassword: '',
            newPassword: '',
            reNewPassword: ''
        }
    },
    methods: {
        ...mapActions({
            'changePassword': 'user/changePassword'
        }),
        isCurrentUser() {
            if(this.currentUser && this.userId) {
                if(this.currentUser.USERID != this.userId) this.$router.push('/');
            } 
        },
        handleChangePassword() {
            let { oldPassword, newPassword, reNewPassword } = this;
            if(oldPassword && newPassword && reNewPassword) {
                if(oldPassword === newPassword) {
                    alert("The new password must not match old password");
                } else if(newPassword !== reNewPassword) {
                    alert("The renew password must match new password")
                } else {
                    let data = {
                        oldPassword,
                        newPassword,
                        reNewPassword
                    };
                    this.changePassword(data).then(res => {
                        if(res.ok) {
                            alert(res.message);
                            this.$router.push('/');
                        }
                        else alert(res.error);
                    })
                }
            } else {
                alert('Please enter full information !!');
            }
        }
    },
    computed: {
        ...mapGetters({
            currentUser: 'user/currentUser'
        })
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