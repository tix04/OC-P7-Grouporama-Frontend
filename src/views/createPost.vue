<template>
    <div>
        <b-container style="width: 50%;">
            <h2 class="title">Create your Post</h2>
            <b-form @submit.prevent="onSubmit" enctype="multipart/form-data" id="form">
                <b-form-textarea
                id="postContent"
                placeholder="Enter your post contents here..."
                rows="5"
                max-rows="10"
                class="content"
                v-model.trim="form.postContent"
                required
                >
                </b-form-textarea>
                <!--{{this.postContent}}-->
                <b-form-group
                id=userInput1
                label="Upload an image (Optional)"
                label-for="postImage">
                    <b-input-group size="sm" class="mb-2">
                        <b-form-file
                        id="postImage"
                        ref="postImage"
                        placeholder="Select file"
                        accept="image/*"
                        @change="upload"
                        >
                        </b-form-file>
                        
                    </b-input-group>
                    <!--<div style="text-align: left;" class="mt-3">Selected file: {{ this.form.profilePhoto ? this.form.profilePhoto.name : '' }}</div>-->
                </b-form-group>
                <b-button type="submit" variant="success">Submit Post</b-button>
            </b-form>
        </b-container>
        
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            form: {
                postContent: '',
                likes: 0
            },
            //postContent: '',
            //likes: 0,
            postImage: null
        }
    },
    methods: {
        upload(event) {
            this.postImage = event.target.files[0];
            console.log(this.postImage);
        },
        async onSubmit() {
            const fd = new FormData();
            fd.append('image', this.postImage);
            fd.append('postContent', this.form.postContent);
            fd.append('likes', this.form.likes);
            //const formData = {postContent: this.form.postContent, likes: this.form.likes, image: this.postImage};
            console.log(/*formData*/fd);

            try {
                await axios.post('http://localhost:3000/posts/newPost', fd);
                this.form.postContent = '';
                this.postImage = null;
            } catch (err) {
                console.log(err);
            }
            
        }
    }
}
</script>
<style scoped>
.container {
    background-color: #eee;
    padding: 50px;
    border-radius: 5px;
}

.title {
    margin-bottom: 20px;
}

.content {
    margin: 50px 0;
}
</style>