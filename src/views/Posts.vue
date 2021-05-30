<script>
import axios from 'axios'
import Notification from '../components/Notification.vue'
import store from '../store/index'
export default {
    data () {
        return {
            
            imageUrl: "../assets/default-user-image.png",
            profile_image: '',
            username: 'Deleted User',
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
                let posts, comments, userID, userName, userProfileImage, postArray ,data;
                const token = localStorage.getItem("token");

                let headers = 'Bearer ' + token;
                await axios.get('http://localhost:3000/posts', {
                  headers: {
                    "Authorization": headers
                  }
                }).then(function (response) {
                  posts = response.data[0];
                  comments = response.data[1];
                  userProfileImage = response.data[2][0].profile_image;
                  userName = response.data[2][0].username;
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

                  data =[postArray, userID, userProfileImage, userName];
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
            document.getElementById('commentForm').reset();
          },
          async deleteComment (postID ,commentId, index) {
            this.postID = postID;
            this.commentID = commentId;
            this.initialComments = this.postArray[index].comments;


            const commentsDeleted = this.initialComments - 1;
            let commentAmount = document.querySelectorAll('.icons .totalComments')[index].innerHTML;

            commentAmount = parseInt(commentAmount) - 1;
            document.querySelectorAll('.icons .totalComments')[index].innerHTML = commentAmount;


            let commentData = {post_id: this.postID ,comment_id: this.commentID, comments: commentsDeleted};

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
            

            
            //Retrieve Token Authentication
            const token = localStorage.getItem("token");

            let headers = 'Bearer ' + token;

            let commentData = {commentContent: newComment, postID: postID, comments: updatedCommentAmount, userID: userID };

            await axios.post('http://localhost:3000/comments/newComment', commentData, {
              headers: {
                "Authorization": headers
              }
            }).then(function () {

                //FIRST OPTIONAL CODE FOR TEMPORARY COMMENTS
                if(document.getElementById('tempCommentContainer')) {
                  document.getElementById('tempCommentContainer').style.display = "block";
                  document.querySelectorAll('.icons .totalComments')[index].textContent = updatedCommentAmount;
                }
                
                document.querySelectorAll('.commentInputContainer')[index].style.display = 'none';
                newComment = '';
                store.dispatch('updateComments', postID);

            }).catch(function (err) {
              console.log(err);
            })
            document.getElementById('commentForm').reset();
          },
          async setLikes (id) {
            
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

                if(!parsedLikesArray.includes(store.state.userID) ) {
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
            
            await axios.delete('http://localhost:3000/posts/delete', 
              {data: {
                postID: postID
                }
              },
              {
                headers: {
                      "Authorization": headers
                }
              })
              .then(function() {
                  let posts, comments, userID, userName, userProfileImage, postArray ,data;
                  const token = localStorage.getItem("token");

                  let headers = 'Bearer ' + token;
                  axios.get('http://localhost:3000/posts', {
                    headers: {
                      "Authorization": headers
                    }
                  }).then(function (response) {
                    posts = response.data[0];
                    comments = response.data[1];
                    userProfileImage = response.data[2][0].profile_image;
                    userName = response.data[2][0].username;
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

                    data =[postArray, userID, userProfileImage, userName];

                  })
                  .catch(function(err) {
                    console.log(err);
                  });

                  store.commit('retrieveNewsFeedData', data);
              })
              .catch(function(err) {
                console.log(err);
              })
                
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
          <router-link to="/createPost">
            <b-button class="newPost" block variant="primary">Create new post</b-button>
          </router-link>
            
        </div>
      </b-container>

      <notification />
      
      <b-container v-for="(post, index) in $store.state.postsData" :key="post.post_id" :id="'post_'+post.post_id">
        <b-dropdown v-if="post.user_id === $store.state.userID" class="postSettings" size="sm"  variant="outline-secondary" toggle-class="text-decoration-none" no-caret>
          <template #button-content>
            <b-icon font-scale="2.5" icon="gear"></b-icon><span class="sr-only">Post Settings</span>
          </template>
          <b-dropdown-item @click="editPost(post.post_id, post.post_content)">Edit Post</b-dropdown-item>
          <b-dropdown-item @click="deletePost(post.post_id)">Delete Post</b-dropdown-item>
        </b-dropdown>
        
        <div class="profilePic">
          <b-img fluid v-if="post.profile_image === null || post.profile_image === '' || post.profile_image === undefined" :src="this.imageUrl" alt="Profile picture" rounded="circle" thumbnail></b-img>
          <b-img v-else :src="post.profile_image" alt="Profile picture" rounded="circle" thumbnail></b-img>
          <span class="username">{{ post.username }}</span>
        </div>

        <p class="content"> {{ post.post_content }} </p>
        

        <div v-if="post.post_image === '' || post.post_image === null || post.post_image === undefined"  style="display: none;border: none;">
          
        </div>
        <div v-else class="attachedFiles">
          <b-img class="postFiles" :src="post.post_image"></b-img>
        </div>
        

        <div class="icons">
          
          <b-button-toolbar>
            <b-button-group class="mr-1">
              <span><b-icon-chat-left-text font-scale="1.2"></b-icon-chat-left-text> Comments <span class="totalComments">{{post.comments}}</span></span>
              <button v-if="JSON.parse(post.likes_array).includes($store.state.userID)" class="like-active" :id="'likeBtn_'+post.post_id" @click="setLikes(post.post_id, post.likes_array)" style="border: none;"><b-icon-hand-thumbs-up font-scale="1.2"></b-icon-hand-thumbs-up><span :id="'likeAmount_'+post.post_id">{{post.likes}}</span></button>
              <button v-else :id="'likeBtn_'+post.post_id" @click="setLikes(post.post_id, post.likes_array)" style="border: none;"><b-icon-hand-thumbs-up font-scale="1.2"></b-icon-hand-thumbs-up><span :id="'likeAmount_'+post.post_id">{{post.likes}}</span></button>
              <b-button size="sm" @click="addComment(index)" variant="outline-secondary" style="border: none;margin-left: 10px;"><b-icon class="commentIcon" icon="plus-circle"></b-icon>Comment</b-button>
            </b-button-group>
          </b-button-toolbar>
        </div>

          <b-container mb="2" style="display: none;" class="commentInputContainer">
            <b-form @submit.prevent="postComment(post.post_id, index)"  id="commentForm">
              <b-form-textarea
              class="newComment"
              :id="'newComment_'+index"
              v-model="newComment"
              placeholder="Add your Comments..."
              rows="1"
              max-rows="3"
              required
              >
              </b-form-textarea>
              <b-button size="sm"  variant="primary" type="submit">Submit</b-button>
              <b-button size="sm" @click="cancelComment(index)" variant="secondary">Cancel</b-button>
            </b-form>
        </b-container>

        <b-container v-if="post.comments > 0">
            
          <b-row v-for="comment in post.linked_comments" :key="comment.comment_id" :id="'comments_'+comment.comment_id" class="comments">
            
            <b-col class="content" cols="12">
              <b-img v-if="comment.profile_image === null || comment.profile_image === ''" :src="this.imageUrl" alt="Profile picture" rounded="circle"></b-img>
              <b-img v-else :src="comment.profile_image" alt="Profile picture" rounded="circle"></b-img>
              <span v-if="comment.username === null || comment.username === '' || comment.username === undefined" class="username">{{this.username}}</span>
              <span v-else class="username">{{comment.username}}</span> 
              <br/>
              {{ comment.comment_content}}
              <b-row align-h="end" v-if="post.user_id === $store.state.userID">
                <b-button @click="deleteComment(post.post_id ,comment.comment_id, index)" size="sm" pill variant="outline-danger" style="font-weight: bold;border: none;">Delete</b-button>
              </b-row>
            </b-col>
          </b-row>
        </b-container>

        <!--FIRST OPTIONAL CODE FOR TEMPORARY COMMENTS-->
        <b-container v-else style="display: none;" id="tempCommentContainer">
            
          <b-row v-for="comment in post.linked_comments" :key="comment.comment_id" :id="'comments_'+comment.comment_id" class="comments">
            
            <b-col class="content" cols="12">
              <b-img v-if="comment.profile_image === null || comment.profile_image === ''" :src="this.imageUrl" alt="Profile picture" rounded="circle"></b-img>
              <b-img v-else :src="comment.profile_image" alt="Profile picture" rounded="circle"></b-img>
              <span v-if="comment.username === null || comment.username === '' || comment.username === undefined" class="username">{{this.username}}</span>
              <span v-else class="username">{{comment.username}}</span> 
              <br/>
              {{ comment.comment_content}}
              <b-row align-h="end" v-if="post.user_id === $store.state.userID">
                <b-button @click="deleteComment(post.post_id ,comment.comment_id, index)" size="sm" pill variant="outline-danger" style="font-weight: bold;border: none;">Delete</b-button>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
        <!-- ***SECOND OPTIONAL CODE FOR TEMPORARY COMMENTS
        <b-container v-else style="display: none;" id="tempCommentContainer">
          <b-row id="temporaryComment">
            <b-col class="content" cols="12">
              <b-img v-if="$store.state.userProfilePicture === null || $store.state.userProfilePicture === '' || $store.state.userProfilePicture === undefined" :src="this.imageUrl" alt="Profile picture" rounded="circle"></b-img>
              <b-img v-else :src="$store.state.userProfilePicture" alt="Profile picture" rounded="circle"></b-img>
              <span v-if="$store.state.username === null || $store.state.username === '' || $store.state.username === undefined" class="username">{{this.username}}</span>
              <span v-else class="username">{{$store.state.username}}</span> 
              <br/>
              <span id="temporaryContent"></span>
              <b-row align-h="end" v-if="post.user_id === $store.state.userID">
                <b-button @click="deleteComment(post.post_id ,comment.comment_id, index)" size="sm" pill variant="outline-danger" style="font-weight: bold;border: none;">Delete</b-button>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
        -->
      </b-container>
    </div>
</template>

<style scoped>
  a:hover {
    text-decoration: none;
  }

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

  .attachedFiles {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 15px;
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
    width: 90%;
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