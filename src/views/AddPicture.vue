<template>
  <div class="container mt-4">
    <h4 class="text-center">Dodaj Zdjęcie</h4>

    <div class="row mt-4">
      <div class="col-md-6 offset-md-3">
        <form @submit.prevent="upload">
          <div class="mb-3">
            <label class="form-label">JPEG / PNG</label>
            <input
              type="file"
              class="form-control"
              accept="image/jpeg,image/png"
              @change="onChange"
              required
            />
          </div>

          <div v-if="preview" class="mb-3 text-center">
            <img :src="preview" alt="Preview" class="img-fluid" />
          </div>

          <button class="btn btn-primary w-100">Załaduj</button>
        </form>

        <div v-if="errorMessage" class="mt-3 alert alert-danger">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="mt-3 alert alert-success">
          {{ successMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pictureApi from "@/services/pictureApi";

export default {
  data() {
    return {
      file: null,
      preview: null,
      width: 0,
      height: 0,
      errorMessage: null,
      successMessage: null
    };
  },
  methods: {
    onChange(e) {
      this.file = e.target.files[0];
      if (!this.file) {
        this.preview = null;
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        this.preview = event.target.result;

        // Odczyt wymiarów obrazka
        const img = new Image();
        img.onload = () => {
          this.width = img.width;
          this.height = img.height;
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(this.file);
    },

    async upload() {
      this.errorMessage = null;
      this.successMessage = null;

      if (!this.file) {
        this.errorMessage = "Wybierz plik!";
        return;
      }

      try {
        const toBase64 = file =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = error => reject(error);
          });

        const base64Data = await toBase64(this.file);

        const byteArray = Array.from(atob(base64Data), c => c.charCodeAt(0));

        const command = {
          id: null,
          data: byteArray,
          width: this.width,
          height: this.height
        };

        await pictureApi.addPicture(command);
        this.successMessage = "Obraz dodany!";
        this.file = null;
        this.preview = null;

        setTimeout(() => this.$router.push("/pictures"), 1000);

      } catch (err) {
        // Interceptor w api.js już zwraca message z backendu
        this.errorMessage = err;
      }
    }
  }
};
</script>