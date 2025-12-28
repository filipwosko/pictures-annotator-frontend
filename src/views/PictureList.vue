<template>
  <div class="container mt-4">
    <h4>Lista zdjęć</h4>

    <table class="table mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in pictures" :key="p.id">
          <td>{{ p.id }}</td>
          <td>
            <button
              class="btn btn-sm btn-primary"
              @click="$router.push(`/pictures/${p.id}`)">
              Otwórz
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import pictureApi from "@/services/pictureApi";

export default {
  data() {
    return { pictures: [] };
  },
  async mounted() {
    try {
      const res = await pictureApi.getAllPictures();
      this.pictures = res.data;
    } catch (err) {
      console.error("Błąd pobierania obrazów:", err);
    }
  }
};
</script>
