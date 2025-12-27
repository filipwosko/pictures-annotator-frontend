<template>
  <div class="container mt-3">
    <h4>Picture {{ picture.id }}</h4>
    <small>{{ picture.width }} × {{ picture.height }}</small>

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
  components: { BoundingBoxCanvas },

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
      this.imageSrc = `data:image/png;base64,${res.data.data}`;
      this.boxes = res.data.boundingBoxes;
    },

    async createBox(box) {
      await boundingBoxApi.create({ pictureId: this.pictureId, ...box });
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
