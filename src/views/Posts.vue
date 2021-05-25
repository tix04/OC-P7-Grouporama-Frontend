<script>
import axios from 'axios'
import Notification from '../components/Notification.vue'
import store from '../store/index'
export default {
    data () {
        return {
            
            imageUrl: "../assets/default-user-image.png",
            profile_image: '',
            newComment: '',
            userID: null,
            postID: null,
            commentID: null,
            initialComments: 0,
            initialLikes: 0,
            
        }
    },
    components: {
      Notification
    },
    async created () {
        try { 
                let posts, comments, userID, userProfileImage, postArray ,data;
                const token = localStorage.getItem("token");
                console.log(token);

                let headers = 'Bearer ' + token;
                await axios.get('http://localhost:3000/posts', {
                  headers: {
                    "Authorization": headers
                  }
                }).then(function (response) {
                  console.log(response.data);
                  posts = response.data[0];
                  comments = response.data[1];
                  userProfileImage = response.data[2][0].profile_image;
                  userID = response.data[3][0].userId;
                  
                  for (let i = 0; i < posts.length; i++) {
                    posts[i].linked_comments = [];

                    for (let j = 0; j < comments.length; j++) {
                      if(comments[j].post_id === posts[i].post_id) {
                        posts[i].linked_comments.push(comments[j]);
                      }
                    }
                  }
                  
                  postArray = posts;

                  data =[postArray, userID, userProfileImage];
                  console.log(userProfileImage);
                })
                .catch(err => console.log(err));

                store.commit('retrieveNewsFeedData', data);
                
            } catch(err) {
                console.error(err);
            }
        },
        methods: {
          addComment(index) {
            document.querySelectorAll('.commentInputContainer')[index].style.display = 'block';
          },
          cancelComment (index) {
            document.querySelectorAll('.commentInputContainer')[index].style.display = 'none';
            const commentElement = document.getElementById(`newComment${index}`);
            commentElement.value = '';
          },
          async deleteComment (postID ,commentId, index) {
            this.postID = postID;
            this.commentID = commentId;
            this.initialComments = this.postArray[index].comments;


            const commentsDeleted = this.initialComments - 1;
            let commentAmount = document.querySelectorAll('.icons .totalComments')[index].innerHTML;

            commentAmount = parseInt(commentAmount) - 1;
            document.querySelectorAll('.icons .totalComments')[index].innerHTML = commentAmount;

            console.log(this.postID);
            console.log(this.commentID);
            console.log(this.initialComments);
            console.log(commentsDeleted);
            console.log(commentAmount);


            let commentData = {post_id: this.postID ,comment_id: this.commentID, comments: commentsDeleted};
            console.log(commentData);

            try {
              await axios.delete('http://localhost:3000/comments/delete', {data: commentData});
              let eraseElement = document.getElementById(`comments_${commentId}`);
              eraseElement.style.display = "none";
              this.commentID = null;
              this.postID = null;
              this.userID = null;
              this.initialComments = 0;
             
              
            } catch (err) {
              console.log(err);
            }

          },
          async postComment (id, index) {
            
            //Retrieve new comment Content and Initial Comment Amount for the Appropriate Post.
            let newComment = document.getElementById(`newComment_${index}`).value;
            let postID = id;
            let userID = store.state.userID;
            let initialCommentAmount = document.querySelectorAll('.icons .totalComments')[index].textContent;

            let parsedCommentAmount = parseInt(initialCommentAmount);
            let updatedCommentAmount = ++parsedCommentAmount;
            console.log(this.newComment, postID, userID, updatedCommentAmount);

            /*
            //Retrieve Token Authentication
            const token = localStorage.getItem("token");
            console.log(token);

            let headers = 'Bearer ' + token;*/

            let commentData = {commentContent: newComment, postID: postID, comments: updatedCommentAmount, userID: userID };

            await axios.post('http://localhost:3000/comments/newComment', commentData/*, {
              headers: {
                "Authorization": headers
              }
            }*/).then(function () {
                document.querySelectorAll('.commentInputContainer')[index].style.display = 'none';//See if we use this or reload page
                newComment = '';
                store.dispatch('updateComments', postID);

            }).catch(function (err) {
              console.log(err);
            })
            
          },
          async setLikes (id, /*likesArray*/) {
            
            //Initial likes Array state. Used to check if user has already liked or not
            let parsedLikesArray;
            let likeButton = document.getElementById(`likeBtn_${id}`);
            let likeAmount = document.getElementById(`likeAmount_${id}`);
            likeButton.classList.toggle('like-active');
            

            let amount = parseInt(likeAmount.textContent);

            //Retrieve Token Authentication
            const token = localStorage.getItem("token");
            console.log(token);

            let headers = 'Bearer ' + token;
            let url = `http://localhost:3000/posts/${id}`;
            await axios.get(url, {
              headers: {
                "Authorization": headers
              }
            }).then(function (response) {
                console.log(response.data[0].likes_array, typeof(response.data[0].likes_array));
                parsedLikesArray = JSON.parse(response.data[0].likes_array);

                if(!parsedLikesArray.includes(store.state.userID) ) { //TODO: Just for rendering, not database, make like button function correctly without reload
                  likeAmount.innerHTML = amount + 1;
                  parsedLikesArray.push(store.state.userID);

                }else{
                  likeAmount.innerHTML = amount - 1;
                  let index = parsedLikesArray.indexOf(store.state.userID);

                  parsedLikesArray.splice(index, 1);
                }
              
                axios.put('http://localhost:3000/posts/setLikes', 
                {
                  data: {
                    postID: id,
                    likesArray: parsedLikesArray
                  }
                },
                {
                  headers: {
                        "Authorization": headers
                  }
                }
                )
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                })

            });

          },
          async deletePost(id) {
            const postID = id;
            const token = localStorage.getItem("token");
            console.log(token);

            let headers = 'Bearer ' + token;
            
            console.log(postID);
            try {
              await axios.delete('http://localhost:3000/posts/delete', 
              {data: {
                postID: postID
                }
              },
              {
                headers: {
                      "Authorization": headers
                }
              });

              this.$router.go();//Test if it works
            } catch(err) {
              console.log(err);
            }
          },
          editPost(id, content) {
            this.$router.push({name: 'EditPost', query: {postID: id,postContent: content}});
          }
        }
    }
    
</script>
<template>
    <div id="posts">
      <b-container style="background: transparent;">
        <div>
          <a href="/createPost">
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
      <b-container v-for="(post, index) in $store.state.postsData" :key="post.post_id" :id="'post_'+post.post_id"><!--User (post, index) in v-for loop and use index as name attribute to retrieve initial comment and like-->
        <b-dropdown v-if="post.user_id === $store.state.userID" class="postSettings" size="sm"  variant="outline-secondary" toggle-class="text-decoration-none" no-caret>
          <template #button-content>
            <b-icon font-scale="2.5" icon="gear"></b-icon><span class="sr-only">Post Settings</span>
          </template>
          <b-dropdown-item @click="editPost(post.post_id, post.post_content)">Edit Post</b-dropdown-item>
          <b-dropdown-item @click="deletePost(post.post_id)">Delete Post</b-dropdown-item>
        </b-dropdown>
        <!--<b-icon class="postSettings" font-scale="3" icon="three-dots"></b-icon>-->
        <div class="profilePic">
          <b-img v-if="post.profile_image === null || post.profile_image === ''" :src="this.imageUrl" alt="Profile picture" rounded="circle" thumbnail></b-img>
          <b-img v-else :src="post.profile_image" alt="Profile picture" rounded="circle" thumbnail></b-img>
          <span class="username">{{ post.username }}</span>
        </div>

        <p class="content"> {{ post.post_content }} </p>
        <hr/>

        <div v-if="post.post_image !== '' || post.post_image !== null" class="attachedFiles"><!--Display only if image is present-->
          <b-img class="postFiles" :src="post.post_image"></b-img>
        </div>
        <hr/>

        <div class="icons">
          
          <b-button-toolbar>
            <b-button-group class="mr-1">
              <span><b-icon-chat-left-text font-scale="1.2"></b-icon-chat-left-text> Comments <span class="totalComments">{{post.comments}}</span></span>
              <button v-if="JSON.parse(post.likes_array).includes($store.state.userID)" class="like-active" :id="'likeBtn_'+post.post_id" @click="setLikes(post.post_id, post.likes_array)" style="border: none;"><b-icon-hand-thumbs-up font-scale="1.2"></b-icon-hand-thumbs-up><span :id="'likeAmount_'+post.post_id">{{post.likes}}</span></button>
              <button v-else :id="'likeBtn_'+post.post_id" @click="setLikes(post.post_id, post.likes_array)" style="border: none;"><b-icon-hand-thumbs-up font-scale="1.2"></b-icon-hand-thumbs-up><span :id="'likeAmount_'+post.post_id">{{post.likes}}</span></button>
              <!--<button v-if="userID === post.likes_array" :id="'likeBtn_'+post.post_id" class="like-active" style="border: none;"><b-icon-hand-thumbs-up font-scale="1.2"></b-icon-hand-thumbs-up> {{post.likes}}</button>
              <button v-else :id="'likeBtn_'+post.post_id" style="border: none;"><b-icon-hand-thumbs-up font-scale="1.2"></b-icon-hand-thumbs-up> {{post.likes}}</button>-->
              <b-button size="sm" @click="addComment(index)" variant="outline-secondary" style="border: none;margin-left: 10px;"><b-icon class="commentIcon" icon="plus-circle"></b-icon>Comment</b-button>
            </b-button-group>
          </b-button-toolbar>
        </div>

        <!--<b-container mb="2" v-show="commentInput">-->
          <b-container mb="2" style="display: none;" class="commentInputContainer">
            <b-form-textarea
            class="newComment"
            :id="'newComment_'+index"
            v-model="newComment"
            placeholder="Add your Comments..."
            rows="1"
            max-rows="3"
            >
            </b-form-textarea>
            <b-button size="sm" @click="postComment(post.post_id, index)" variant="primary">Submit</b-button>
            <b-button size="sm" @click="cancelComment(index)" variant="secondary">Cancel</b-button>
        </b-container>

        <b-container v-if="post.comments > 0">
            
          <b-row v-for="comment in post.linked_comments" :key="comment.comment_id" :id="'comments_'+comment.comment_id" class="comments">
            
            <b-col class="content" cols="12">
              <b-img v-if="comment.profile_image === null || comment.profile_image === ''" :src="this.imageUrl" alt="Profile picture" rounded="circle"></b-img>
              <b-img v-else :src="comment.profile_image" alt="Profile picture" rounded="circle"></b-img>
              <span class="username">{{comment.username}}</span> 
              <br/>
              {{ comment.comment_content}}
              <b-row align-h="end" v-if="post.user_id === $store.state.userID">
                <b-button @click="deleteComment(post.post_id ,comment.comment_id, index)" size="sm" pill variant="outline-danger" style="font-weight: bold;border: none;">Delete</b-button>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
</template>

<style scoped>
  #posts {
    text-align: center;
    padding: 10px;
  }

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

  .postSettings {
    position: absolute;
    right: 2%;
    border-radius: 5px;
    padding: 5px;
  }

  .content {
    margin-left: 20px;
    margin-top: 20px;
  }

  .profilePic img {
    width: 50px;
    height: 50px;
  }

  .container {
    position: relative;
    background-color: #efefef;
    margin: 20px auto;
    padding: 10px;
    border-radius: 10px;
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
    width: 35px;
    height: 35px;
    border: 1px solid white;
    border-radius: 50%;
    margin-right: 5px;
  }

  .comments .content {
    background-color: #fff;
    padding: 10px;
    margin: 5px;
    border-radius: 15px;
  }

  .newComment {
    margin: 0 auto 10px auto;

    width: 75%;
  }

  .like-active {
    color: #007bff;
  }
    
</style>