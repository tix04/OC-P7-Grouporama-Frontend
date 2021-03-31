<template>
<b-container>
    <b-container>
        <HelloUser msg="Welcome to Grouporama Chat" />
        <p v-if="this.totalPosts > this.viewedPosts">You have <span>{{ newPosts }}</span> new Posts.</p>
        <p v-else>You have no new Notifications</p>
        <!--Figure out Logic to determine which posts you haven't seen-->
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
            let postSummary = await axios.get('http://localhost:3000/posts/postCount');
            
            
            this.totalPosts = postSummary.data[0].postsCount;
            this.viewedPosts = postSummary.data[0].viewed_posts;
            console.log(this.totalPosts);
        }catch(err) {
            console.error(err);
        }

    },
    async beforeDestroy () {
        
        try {
            
            await axios.put('http://localhost:3000/posts/newPostStatus/', {
                count: this.totalPosts
            });

            console.log('setting new viewed posts is done')

        }catch(err) {
            console.error(err);
        }
    }
}
</script>

<style scoped>

</style>