<template>
    <div>
        <b-container class="mt-4">
            <h2 class="title">Edit your Post</h2>
            <b-form @submit.prevent="onSubmit" enctype="multipart/form-data" id="form">
                <b-form-textarea
                id="postContent"
                :placeholder="this.originalContent"
                rows="5"
                max-rows="10"
                class="content"
                v-model.trim="form.postContent"
                >
                </b-form-textarea>
                
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
                    
                </b-form-group>
                <b-button type="submit" variant="success">Edit Post</b-button>
                <b-button variant="danger" @click="cancelEditPost">Cancel Changes</b-button>
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
                postContent: ''
            },
            postImage: null,
            postID: null,
            originalContent: ''
        }
    },
    created () {
     this.postID = parseInt(this.$route.query.postID);
     this.originalContent = this.$route.query.postContent;
     
    },
    methods: {
        upload(event) {
            this.postImage = event.target.files[0];
            
        },
        async onSubmit() {
            const token = localStorage.getItem("token");
            let headers = 'Bearer ' + token;
            const updatedContent = this.form.postContent ? this.form.postContent : this.originalContent;
            
            
            const fd = new FormData();
            fd.append('image', this.postImage);
            fd.append('postContent', updatedContent);
            fd.append('postID', this.postID);
            
            try {
                await axios.put('http://localhost:3000/posts/editPost', fd, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': headers
                    }
                });
                this.form.postContent = '';
                this.postImage = null;
                this.postID = null;
                document.getElementById('form').reset();
                this.$router.push('/posts');
            } catch (err) {
                console.log(err);
            }
            
        },
        cancelEditPost() {
            this.postImage = null;
            this.$router.push('/posts');
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