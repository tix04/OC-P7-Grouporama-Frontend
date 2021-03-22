<template>
    <div>
        <b-container>
            <div>

                <!--<h3>User Information</h3>-->
                <b-card no-body class="overflow-hidden" style="max-width: 900px;margin: 0 auto 25px auto;">
                    <b-row no-gutters>
                        <b-col md="6">
                            <!--<b-card-img src="../assets/default-user-image.png" alt="User Profile Picture" class="rounded-0">
                            </b-card-img>-->
                            <img :src="userDetails[0].profile_image" alt="User Profile Picture">
                        </b-col>
                        <b-col md="6">
                            <b-card-body :title="userDetails[0].username">
                                <b-card-text><b>First Name</b>: {{ this.userDetails[0].first_name }}</b-card-text>
                                <b-card-text><b>Last Name</b>: {{ this.userDetails[0].last_name }}</b-card-text>
                                <b-card-text><b>Age</b>: {{ this.userDetails[0].age }}</b-card-text>
                                <b-card-text><b>Gender</b>: User Gender</b-card-text>
                                <b-card-text><b>Email</b>: {{ this.userDetails[0].email }}</b-card-text>
                            </b-card-body>
                        </b-col>
                        <!---->
                    </b-row>
                </b-card>
                <b-button variant="outline-success">Update</b-button>
                <b-button variant="danger">Delete Account</b-button>
            
            </div>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data () {
        return {
            userDetails: []
        }
    },
    //Use Axios
    async created() {
            try {
                const response = await axios.get('http://localhost:3000/user/1');

                this.userDetails = response.data;
                console.log(this.userDetails);
            } catch(err) {
                console.error(err);
            }
        }
    }
    /****Use Fetch
    //mounted () {
    async created() {
            
           let userDetails = "http://localhost:3000/user/1";
            
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

<style scoped>
button {
    margin: 0 5px;
}

img {
    width: 300px;
    float: left;
}
</style>