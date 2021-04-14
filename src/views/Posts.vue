<script>
import axios from 'axios'
import Notification from '../components/Notification.vue'
export default {
    data () {
        return {
            postArray: [],
            imageUrl: "../assets/default-user-image.png"
        }
    },
    components: {
      Notification
    },
    async created () {
        try {
                const response = await axios.get('http://localhost:3000/posts');

                this.postArray = response.data;
                console.log(this.postArray);
            } catch(err) {
                console.error(err);
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
      <notification />
        <b-container v-for="post in postArray" :key="post.post_id">
          <div class="profilePic">
            <b-img :src="require('../assets/default-user-image.png')" alt="Profile picture" rounded="circle" thumbnail></b-img>
            <span class="username">Username</span>
          </div>

          <p class="content"> {{ post.post_content }} </p>
          <hr/>

          <div class="attachedFiles">
            <b-img class="postFiles" :src="post.attached_files"></b-img>
          </div>
          <hr/>

          <div class="icons">
            <span><b-icon-chat-left-text font-scale="1.2"></b-icon-chat-left-text> Comments 3</span>
            <span><b-icon-hand-thumbs-up variant="primary" font-scale="1.2"></b-icon-hand-thumbs-up> 5</span>
            <span><b-icon-hand-thumbs-down variant="danger" font-scale="1.2"></b-icon-hand-thumbs-down> 3</span>
          </div>
          
          <b-container class="comments">

            <b-row>
              <b-col cols="2"><img :src="require('../assets/default-user-image.png')" alt="Profile pic"></b-col>
              <b-col class="content" cols="8">
                <span class="username">Username</span> 
                <br/>
                {{ post.comment_content}}
              </b-col>
            </b-row>
              
          </b-container>
        </b-container>
    </div>
</template>

<style scoped>
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

    
    
</style>