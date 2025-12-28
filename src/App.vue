<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img
          src="@/assets/logo.png"
          alt="Logo"
          height="30"
          class="me-2"
        />
        Pictures Annotator
      </router-link>

      <div class="navbar-nav">
        <router-link class="nav-link" to="/pictures">Lista zdjęć</router-link>
        <router-link class="nav-link" to="/add-picture">Dodaj zdjęcie</router-link>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {};
</script>
