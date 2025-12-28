<template>
  <div class="container mt-3">
    <h4>Zdjęcie {{ picture.id }}</h4>

    <div class="text-muted mb-2">
      <small>
        Aby dodać bounding box:
        <strong>kliknij lewym przyciskiem myszy</strong>,
        przytrzymaj i przeciągnij po obrazie.
      </small>
    </div>

    <BoundingBoxCanvas
      v-if="imageSrc"
      :imageSrc="imageSrc"
      :boxes="boxes"
      @createBox="createBox"
      @updateBox="updateBox"
      @deleteBox="deleteBox"
    />
  </div>
</template>

<script>
import pictureApi from "@/services/pictureApi";
import boundingBoxApi from "@/services/boundingBoxApi";
import BoundingBoxCanvas from "@/components/BoundingBoxCanvas.vue";

export default {
  name: "PictureDetail",

  components: {
    BoundingBoxCanvas
  },

  data() {
    return {
      pictureId: Number(this.$route.params.id),
      picture: {},
      imageSrc: null,
      boxes: []
    };
  },

  async mounted() {
    await this.load();
  },

  methods: {
    async load() {
      const res = await pictureApi.getPictureById(this.pictureId);

      this.picture = res.data;
      this.boxes = res.data.boundingBoxes || [];
      this.imageSrc = `data:image/png;base64,${res.data.data}`;
    },

    async createBox(box) {
      await boundingBoxApi.create({
        pictureId: this.pictureId,
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
        label: box.label
      });

      await this.load();
    },

    async updateBox(box) {
      await boundingBoxApi.modify({
        id: box.id,
        pictureId: this.pictureId,
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
        label: box.label
      });
    },

    async deleteBox(id) {
      await boundingBoxApi.delete(id);
      this.boxes = this.boxes.filter(b => b.id !== id);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
}
</style>
