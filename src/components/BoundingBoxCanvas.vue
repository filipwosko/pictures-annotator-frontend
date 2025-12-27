<template>
  <div class="position-relative d-inline-block mt-3">
    <img :src="imageSrc" ref="img" />

    <canvas
      ref="canvas"
      class="position-absolute top-0 start-0"
      @mousedown="start"
      @mousemove="move"
      @mouseup="end"
    />

    <div
      v-for="box in boxes"
      :key="box.id"
      class="bbox"
      :style="style(box)"
      @dblclick="edit(box)"
    >
      {{ box.label }}
      <button @click="$emit('deleteBox', box.id)">✕</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imageSrc", "boxes"],
  data() {
    return { drawing: false, sx: 0, sy: 0 };
  },
  mounted() {
    const img = this.$refs.img;
    const canvas = this.$refs.canvas;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
    };
  },
  methods: {
    style(b) {
      return {
        left: b.x + "px",
        top: b.y + "px",
        width: b.width + "px",
        height: b.height + "px"
      };
    },
    start(e) {
      this.drawing = true;
      this.sx = e.offsetX;
      this.sy = e.offsetY;
    },
    move(e) {
      if (!this.drawing) return;
      const c = this.$refs.canvas.getContext("2d");
      c.clearRect(0, 0, c.canvas.width, c.canvas.height);
      c.strokeStyle = "red";
      c.strokeRect(this.sx, this.sy, e.offsetX - this.sx, e.offsetY - this.sy);
    },
    end(e) {
      if (!this.drawing) return;
      this.drawing = false;

      const w = Math.abs(e.offsetX - this.sx);
      const h = Math.abs(e.offsetY - this.sy);
      if (w < 1 || h < 1) return;

      const label = prompt("Label");
      if (!label?.trim()) return;

      this.$emit("createBox", {
        x: Math.min(this.sx, e.offsetX),
        y: Math.min(this.sy, e.offsetY),
        width: w,
        height: h,
        label: label.trim()
      });

      this.$refs.canvas
        .getContext("2d")
        .clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
    },
    edit(box) {
      const label = prompt("New label", box.label);
      if (!label) return;
      this.$emit("updateBox", { ...box, label });
    }
  }
};
</script>

<style scoped>
.bbox {
  position: absolute;
  border: 2px solid red;
  background: rgba(255, 0, 0, 0.05);
  color: red;
  font-weight: bold;
}
.bbox button {
  float: right;
  background: white;
  border: none;
}
</style>
