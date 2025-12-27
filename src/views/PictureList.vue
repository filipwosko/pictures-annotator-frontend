<template>
  <div class="container mt-4">
    <h4>Pictures</h4>

    <table class="table mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Width</th>
          <th>Height</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in pictures" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.width }}</td>
          <td>{{ p.height }}</td>
          <td>
            <button
              class="btn btn-sm btn-primary"
              @click="$router.push(`/pictures/${p.id}`)">
              Open
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
    const res = await pictureApi.getAllPictures();
    this.pictures = res.data;
  }
};
</script>
