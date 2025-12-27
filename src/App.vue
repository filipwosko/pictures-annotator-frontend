<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
      <a class="navbar-brand">Pictures Annotator</a>

      <div class="navbar-nav">
        <router-link class="nav-link" to="/pictures">Pictures</router-link>
        <router-link class="nav-link" to="/add-picture">Add Picture</router-link>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {};
</script>
