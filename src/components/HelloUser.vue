<template>
  <div>
    <div>
      <h1>
        {{ msg + ' ' + $store.state.userName }}
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
