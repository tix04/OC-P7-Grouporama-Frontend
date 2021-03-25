<template>
  <div>
      
    
    <div>
      <div>
        <img src="../assets/icon-left-font-monochrome-black.png" alt="Company Logo">
      </div>
      <h1>
        {{ msg + ' username' }}
      </h1>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'HelloUser',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

img {
  width: 150px;
  margin-right: 20px;
}
</style>
