<template>
    <div>
        <b-container class="mt-4">
            <h2 class="title">Create your Post</h2>
            <b-form @submit.prevent="onSubmit" enctype="multipart/form-data" id="form">
                <b-form-textarea
                id="postContent"
                placeholder="Enter your post contents here..."
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
                        accept=".jpeg, .jpg, .png, .gif"
                        @change="upload"
                        >
                        </b-form-file>
                        
                    </b-input-group>
                    <span v-if="postImage === null"></span>
                    <span v-else-if="invalidFile" style="color: #dc3545;">Only Image Files Are Allowed(jpeg, jpg, png, gif)</span>
                    <span v-else style="color: #28a745;">File is Valid</span>
                </b-form-group>
                <b-button type="submit" variant="success">Submit Post</b-button>
                <b-button type="reset" variant="danger" @click="onReset">Cancel</b-button>
            </b-form>
            <div id="validationError">
                At least one of the fields is required!!
            </div>
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
                likes: 0,
                comments: 0
            },
            postImage: null,
            invalidFile: false
        }
    },

    methods: {
        upload(event) {
            this.postImage = event.target.files[0];

            let regex = /image\/jpeg|image\/jpg|image\/png|image\/gif/;

            if(!regex.test(this.postImage.type)) {
                this.invalidFile = true;
                document.getElementById('postImage').value = null;
                document.getElementById('postImage').style.borderColor = "#dc3545";
            }else {
                this.invalidFile = false;
                document.getElementById('postImage').style.border = "2px solid green";
            }

        },
        onReset() {
            this.postImage = null;
            this.invalidFile = false;
            document.getElementById('validationError').style.display = "none";
            document.getElementById('form').reset();
            this.$router.push('/posts');
        },
        async onSubmit() {
            let text = document.getElementById('postContent');
            const token = localStorage.getItem("token");
            let headers = 'Bearer ' + token;

            if(text.textContent === '' && this.postImage === null) {
                document.getElementById('validationError').style.display = "block";
            }else {
                const fd = new FormData();
                fd.append('image', this.postImage);
                fd.append('postContent', this.form.postContent);
                fd.append('likes', this.form.likes);
                fd.append('comments', this.form.comments);
                

                try {
                    await axios.post('http://localhost:3000/posts/newPost', fd, {
                        headers: {
                            "Authorization": headers
                        }
                    });

                    document.getElementById('validationError').style.display = "none";
                    this.form.postContent = '';
                    this.postImage = null;
                    this.invalidFile = false;

                    document.getElementById('form').reset();
                    this.$router.push('/posts');
                } catch (err) {
                    console.log(err);
                }
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

#validationError {
    background-color: #ffb6c1;
    border: 1px solid pink; 
    border-radius: 5px;
    padding: 25px;
    width: 75%;
    margin: 25px auto;
    text-align: center;
    font-weight: bold;
    display: none;
}

</style>