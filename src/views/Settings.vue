<template>
    <b-container>
        
        <div class="setting">
           <h5>Change your username</h5> 
            <hr/> 
            <b-button>
                Modify Username
            </b-button>
        </div>
        <div class="setting">
           <h5>Change your First Name</h5> 
            <hr/> 
            <b-button>
                Modify First Name
            </b-button>
        </div>
        <div class="setting">
           <h5>Change your Last Name</h5> 
            <hr/> 
            <b-button>
                Modify Last Name
            </b-button>
        </div>
        <div class="setting">
           <h5>Change your age</h5> 
            <hr/> 
            <b-button>
                Modify your age
            </b-button>
        </div>
        <div class="setting">
           <h5>Change your email information</h5> 
            <hr/> 
            <b-button>
                Modify email account
            </b-button>
        </div>
        <div class="setting">
           <h5>Change your password</h5> 
            <hr/> 
            <b-button>
                Modify Password
            </b-button>
        </div>
        <div class="setting delete">
           <h5>Delete your account</h5> 
            <hr/> 
            <b-button variant="danger">
                Delete Account
            </b-button>
        </div>
        
    </b-container>
    
</template>
<style scoped>
.setting {
    text-align: left;
    font-weight:  bold;
    border: 1px solid #eee;
    margin: 10px;
    padding: 15px;
    background-color: rgb(250, 250, 250);
    border-radius: 10px;
}

.delete {
    color: red;
}
</style>
<script>
export default {
    
}
</script>