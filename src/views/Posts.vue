<script>
import axios from 'axios'
import Notification from '../components/Notification.vue'
export default {
    data () {
        return {
            postArray: [],
            commentArray: [],
            imageUrl: "../assets/default-user-image.png",
            profile_image: '',
            commentInput: false,
            newComment: ''
        }
    },
    components: {
      Notification
    },
    async created () {
        try {
                const response = await axios.get('http://localhost:3000/posts');

                this.postArray = response.data[0];
                this.commentArray = response.data[1];
                console.log(this.postArray);
                console.log(this.commentArray);
            } catch(err) {
                console.error(err);
            }
        },
        methods: {
          addComment() {
            this.commentInput = true;
          },
          postComment () {
            this.newComment = document.getElementById('newComment').value;
            console.log(this.newComment);
            this.commentInput = false;
          },
          cancelComment () {
            this.commentInput = false;
          }
        }
    }
    /*Use Fetch
    //mounted () {
    async created () {
        let posts = ' http://localhost:3000/posts';

        fetch(userDetails)
                .then(function(data) {
                    return data.json();
                })
                .then(function(data) {
                    console.log(data);
                })
    }*/
//}
</script>
<template>
    <div>
      <b-container style="background: transparent;">
        <div>
          <a href="#/createPost">
            <b-button class="newPost" block variant="primary">Create new post</b-button>
          </a>
            <!--<a href="/createPost">
                <img style="width: 150px; border-radius: 50%;" v-if="this.profile_image === null || this.profile_image === ''" :src="require('../assets/default-user-image.png')" alt="Profile picture"/>
                <img style="width: 150px; border-radius: 50%;" v-else :src="post.profile_image" alt="Profile picture"/>
                
              </a>-->
        </div>
      </b-container>

      <notification />
      <!--<b-container v-if="this.postArray.length === 0">
        <h1 style="font-size: 1.5rem; font-weight: bold;">Grouporama Social Network</h1>
          <p>There are no Posts to be displayed</p>
      </b-container>-->
      <b-container v-for="post in postArray" :key="post.post_id">
        <div class="profilePic">
          <b-img v-if="post.profile_image === null || post.profile_image === ''" :src="this.imageUrl" alt="Profile picture" rounded="circle" thumbnail></b-img>
          <b-img v-else :src="post.profile_image" alt="Profile picture" rounded="circle" thumbnail></b-img>
          <span class="username">{{ post.username }}</span>
        </div>

        <p class="content"> {{ post.post_content }} </p>
        <hr/>

        <div class="attachedFiles">
          <b-img class="postFiles" :src="post.post_image"></b-img>
        </div>
        <hr/>

        <div class="icons">
          <span id="comments"><b-icon-chat-left-text font-scale="1.2"></b-icon-chat-left-text> Comments {{post.comments}}</span>
          <span><b-icon-hand-thumbs-up variant="primary" font-scale="1.2"></b-icon-hand-thumbs-up> {{post.likes}}</span>
          <span><b-icon-hand-thumbs-down variant="danger" font-scale="1.2"></b-icon-hand-thumbs-down> 3</span>
          <b-button size="sm" @click="addComment"><b-icon class="commentIcon" icon="plus-circle"></b-icon>Add comment</b-button>
        </div>

        <b-container mb="2" v-show="commentInput">
            <b-form-textarea
            id="newComment"
            v-model="newComment"
            placeholder="Add your Comments..."
            rows="1"
            max-rows="3"
            >
            </b-form-textarea>
            <b-button size="sm" @click="postComment">Submit</b-button>
        </b-container>

        <b-container v-for="comment in commentArray" :key="comment.comment_id" class="comments">

          <b-row v-if="comment.post_id === post.post_id">
            <b-col cols="2">
              <b-img v-if="comment.profile_image === null || comment.profile_image === ''" :src="this.imageUrl" alt="Profile picture" rounded="circle" thumbnail></b-img>
              <b-img v-else :src="comment.profile_image" alt="Profile picture" rounded="circle" thumbnail></b-img>
            </b-col>
            <b-col class="content" cols="8">
              <span class="username">{{comment.username}}</span> 
              <br/>
              {{ comment.comment_content}}
            </b-col>
          </b-row>
            
        </b-container>
      </b-container>
    </div>
</template>

<style scoped>

  .newPostContainer {
    background-color: white;
  }

  .newPost {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .profilePic, .content, .icons {
    text-align: left;
  }

  .container {
    background-color: #efefef;
    margin: 20px auto;
    padding: 15px;
  }
    
  .profilePic, .comments {
    width: 50px;
  }

  .username {
    font-size: 1rem;
    font-weight: bold;
  }

  .postFiles {
    width: 75%;
    margin: 0 auto;
  }

  .commentIcon {
    margin-right: 10px;
  }

  .icons {
    padding: 5px;
  }

  .icons span {
    margin: 0 10px;
    font-weight: bold;
    color: #666;
  }

  .comments {
    width: 75%;
    margin: 10px auto;
  }

  .comments img {
    width: 50px;
    border: 1px solid black;
    border-radius: 50%;
  }

  .comments .content {
    background-color: #fff;
    padding: 10px;
    margin: 5px;
    border-radius: 15px;
  }

  #newComment {
    margin: 0 auto 10px auto;

    width: 75%;
  }
    
</style>