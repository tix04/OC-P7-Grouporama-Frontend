<template>
<b-container>
    <b-container>
        <HelloUser msg="Welcome to Grouporama Chat" />
        <p>You have <span>7</span> new Posts.</p>
        <!--Figure out Logic to determine which posts you haven't seen-->
    </b-container>
</b-container>
</template>

<script>
import HelloUser from "./HelloUser.vue"
export default {
    name: "Notification",
    components: {
        HelloUser
    }
}
</script>

<style scoped>

</style>