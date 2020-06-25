<template>
    <div>
        <div class="ass1-login">
            <div class="ass1-login__logo">
            	<a href="index.html" class="ass1-logo">ZendVn Meme</a>
            </div>
            <div class="ass1-login__content">
                <p>Đăng ký một tài khoản</p>
                <div class="ass1-login__form">
                    <form action="#" @submit.prevent="handleSubmitRegister">
                        <input v-model="fullname" type="text" class="form-control" placeholder="Tên hiển thị" required="">
                        <input v-model="email" type="email" class="form-control" placeholder="Email" required="">
                        <input v-model="password" type="password" class="form-control" placeholder="Mật khẩu" required="">
                        <input v-model="repassword" type="password" class="form-control" placeholder="Nhập lại mật khẩu" required="">
                        <div class="ass1-login__send">
                            <router-link to="/login">Đăng nhập</router-link>
                            <button type="submit" class="ass1-btn">Đăng ký</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'register',
    data() {
        return {
            fullname: '',
            email: '',
            password: '',
            repassword: ''
        }
    },
    methods: {
        ...mapActions({
            'register': 'user/register'
        }),
        handleSubmitRegister() {
            let data = {
                email: this.email,
                fullname: this.fullname,
                password: this.password,
                repassword: this.repassword
            };
            this.register(data).then(res => {
                if(res.ok) {
                    alert('Register success !!');
                    this.$router.push('/');
                } else {
                    alert(res.error);
                }
            });
        }
    }
}
</script>

<style>

</style>