<template>
    <div>
        <div class="row">
            <div class="col-lg-8">
                <!--section-->
                <div class="ass1-section ass1-section__edit-post">
                    <div class="ass1-section__content">
                        <form action="#">
                            <div class="form-group">
                                <input v-model="url_image" type="text" class="form-control ttg-border-none" placeholder="https://">
                            </div>
                            <div class="form-group">
                                <textarea v-model="post_content" type="text" class="form-control ttg-border-none"
                                    placeholder="Mô tả ..."></textarea>
                            </div>
                        </form>
                        <div class="ass1-section__image">
                            <a @click.prevent="uploadImage" href="#"><img :src="renderImage" alt="default"></a>
                        </div>
                        <a href="https://memeful.com/" target="_blank" class="ass1-btn ass1-btn-meme">Chế ảnh từ
                            meme</a>
                        <a @click.prevent="uploadImage" href="#" class="ass1-btn ass1-btn-meme">Đăng ảnh từ máy tính</a>
                        <input @change="handleUploadImage" ref="imageUpload" type="file" name="image" style="display:none">
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <aside class="ass1-aside ass1-aside__edit-post">
                    <div>
                        <a href="#" @click.prevent="handleUploadPost" class="ass1-btn">Đăng bài</a>
                    </div>
                    <div class="ass1-aside__edit-post-head">
                        <span style="display: block; width: 100%; margin-bottom: 10px;">Chọn danh mục</span>
                        <label v-for="item in allCategories" :key="item.id" class="ass1-checkbox">
                            <input type="checkbox" name="state-post" :value="item.text" v-model="categories">
                            <span></span>
                            <p>{{ item.text }}</p>
                        </label>
                    </div>
                    <div class="ass1-aside__get-code">
                        <p>Share Link</p>
                    </div>
                    <div class="ass1-aside__social">
                        <a href="" class="ass1-btn-social__facebook ass1-btn-social"><i class="fa fa-facebook"
                                aria-hidden="true"></i></a>
                        <a href="" class="ass1-btn-social__twitter ass1-btn-social"><i class="fa fa-twitter"
                                aria-hidden="true"></i></a>
                        <a href="" class="ass1-btn-social__google ass1-btn-social"><i class="fa fa-google-plus"
                                aria-hidden="true"></i></a>
                    </div>

                </aside>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { checkImageFile, checkImageURL } from '../helpers'
export default {
    name: 'post-upload',
    data() {
        return {
            post_content: '',
            categories: [],
            url_image: '',
            obj_image: {
                objFile: null,
                base64URL: ''
            }
        }
    },
    computed: {
        allCategories() {
            return this.$store.state.post.categories;
        },
        renderImage() {
            if(this.url_image) {
                return this.url_image;
            } else if(this.obj_image.base64URL) {
                return this.obj_image.base64URL;
            }
            return '/dist/images/no_image_available.jpg';
        }
    },
    methods: {
        ...mapActions({
            createNewPost: 'post/createNewPost'
        }),
        uploadImage() {
            this.$refs.imageUpload.click();
        },
        handleUploadImage(e) {
            let imageUpload = e.target.files[0];
            let check =  checkImageFile(imageUpload);
            if(!check) {
                alert('File upload is not valid !!');
                return;
            }
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                this.obj_image.base64URL = reader.result;
                this.obj_image.objFile = imageUpload;
            }, false);

            if (imageUpload) {
                reader.readAsDataURL(imageUpload);
            }
        },
        resetData() {
            this.post_content = '';
            this.categories = [];
            this.url_image = '';
            this.obj_image = {
                base64URL: '',
                objFile: null
            }
        },
        handleUploadPost() {
            if(this.post_content && this.categories.length) {
                if(this.url_image || this.obj_image.objFile) {
                    let data = {
                        url_image: this.url_image,
                        obj_image: this.obj_image.objFile,
                        post_content: this.post_content,
                        category: this.categories
                    };
                    this.createNewPost(data).then(res => {
                        if(res.ok) {
                            this.resetData();
                            this.$router.push('/');
                        } else {
                            console.log(res.error);
                        }
                    });
                } else {
                    alert('Please select image or paste image url!!');
                }
            } else {
                alert('Please enter full information !!');
            }
        }
    }
}
</script>

<style>

</style>