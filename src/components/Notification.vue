<template>
<b-container>
    <b-container>
        <HelloUser msg="Welcome" />
        <p v-if="this.totalPosts > this.viewedPosts" style="font-weight: bold;">Notification: <span style="color: red;">{{ newPosts }}</span> new Posts.</p>
        <p v-else style="font-weight: bold;color: green;">You have no new Posts</p>
        
    </b-container>
</b-container>
</template>

<script>
import HelloUser from "./HelloUser.vue";
import axios from 'axios';
export default {
    name: "Notification",
    components: {
        HelloUser
    },
    data () {
        return {

            viewedPosts: 0,
            totalPosts: 0

        }
    },
    computed: {
        newPosts() {

            return this.totalPosts - this.viewedPosts;
            
        }
    },
    async created () {

        try {
            const token = localStorage.getItem("token");
            let headers = 'Bearer ' + token;

            let postSummary = await axios.get('http://localhost:3000/posts/postCount', {
                headers: {
                    "Authorization": headers
                }
            });
            
            let postsTotal = postSummary.data[0][0];
            let viewedPosts = postSummary.data[1][0]
            
            this.totalPosts = postsTotal.postsCount;
            this.viewedPosts = viewedPosts.viewed_posts;

            
        }catch(err) {
            console.error(err);
        }

    },
    async beforeDestroy () {
        
        try {
            
            const token = localStorage.getItem("token");
            let headers = 'Bearer ' + token;
            
            await axios.put('http://localhost:3000/posts/newPostStatus/', {count: this.totalPosts}, {
                headers: {
                    "Authorization": headers
                }
            });

            
        }catch(err) {
            console.error(err);
        }
    }
}
</script>

<style scoped>

</style>