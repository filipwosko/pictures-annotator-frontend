<template>
  <div class="canvas-wrapper-container">

    <div
      class="canvas-wrapper"
      @contextmenu.prevent
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
    >
      <img
        ref="image"
        :src="imageSrc"
        class="image"
        @load="onImageLoad"
      />

      <!-- Bounding Boxes -->
      <div
        v-for="box in boxes"
        :key="box.id"
        class="box"
        :class="{ active: box.id === activeBoxId }"
        :style="styleBox(box)"
        @mousedown.stop="startMove(box, $event)"
      >
        <span class="label" @click.stop="editLabel(box)">{{ box.label }}</span>
        <span class="delete" @click.stop="deleteBox(box)">🗑️</span>

        <!-- resize handles -->
        <div
          v-for="handle in handles"
          :key="handle"
          class="handle"
          :class="handle"
          @mousedown.stop="startResize(box, handle, $event)"
        />
      </div>

      <!-- new box preview -->
      <div
        v-if="drawing"
        class="box preview"
        :style="stylePreview"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "BoundingBoxCanvas",

  props: {
    imageSrc: String,
    boxes: Array
  },

  emits: ["createBox", "updateBox", "deleteBox"],

  data() {
    return {
      imgRect: null,

      drawing: false,
      moving: false,
      resizing: false,

      startX: 0,
      startY: 0,

      activeBoxId: null,
      currentBox: null,
      resizeHandle: null,

      previewBox: null,

      handles: ["nw", "ne", "sw", "se"]
    };
  },

  computed: {
    stylePreview() {
      if (!this.previewBox) return {};
      return this.styleBox(this.previewBox);
    }
  },

  methods: {
    onImageLoad() {
      this.imgRect = this.$refs.image.getBoundingClientRect();
    },

    getMouse(e) {
      return {
        x: e.clientX - this.imgRect.left,
        y: e.clientY - this.imgRect.top
      };
    },

    styleBox(box) {
      return {
        left: box.x + "px",
        top: box.y + "px",
        width: box.width + "px",
        height: box.height + "px"
      };
    },

    onMouseDown(e) {
      if (e.button !== 0) return; // lewy przycisk do tworzenia

      const { x, y } = this.getMouse(e);
      this.startX = x;
      this.startY = y;

      this.previewBox = { x, y, width: 0, height: 0 };
      this.drawing = true;
    },

    onMouseMove(e) {
      const { x, y } = this.getMouse(e);

      if (this.drawing) {
        this.previewBox.width = Math.abs(x - this.startX);
        this.previewBox.height = Math.abs(y - this.startY);
        this.previewBox.x = Math.min(x, this.startX);
        this.previewBox.y = Math.min(y, this.startY);
      }

      if (this.moving && this.currentBox) {
        const box = this.currentBox;

        let newX = box.x + e.movementX;
        let newY = box.y + e.movementY;

        newX = Math.max(0, Math.min(newX, this.imgRect.width - box.width));
        newY = Math.max(0, Math.min(newY, this.imgRect.height - box.height));

        box.x = newX;
        box.y = newY;
      }

      if (this.resizing && this.currentBox) {
        this.resizeBox(x, y);
      }
    },

    onMouseUp() {
      if (this.drawing && this.previewBox.width > 5 && this.previewBox.height > 5) {
        let label = prompt("Podaj label dla nowego boxa:") || "";
        this.$emit("createBox", {
          ...this.previewBox,
          label
        });
      }

      if (this.moving || this.resizing) {
        this.$emit("updateBox", { ...this.currentBox });
      }

      this.drawing = false;
      this.moving = false;
      this.resizing = false;
      this.previewBox = null;
      this.currentBox = null;
    },

    startMove(box, e) {
      if (e.button !== 0) return;
      this.activeBoxId = box.id;
      this.currentBox = box;
      this.moving = true;
    },

    startResize(box, handle) {
      this.activeBoxId = box.id;
      this.currentBox = box;
      this.resizeHandle = handle;
      this.resizing = true;
    },

    resizeBox(mx, my) {
      const box = this.currentBox;
      const right = box.x + box.width;
      const bottom = box.y + box.height;

      if (this.resizeHandle.includes("n")) {
        box.y = Math.max(0, Math.min(my, bottom - 5));
        box.height = bottom - box.y;
      }
      if (this.resizeHandle.includes("s")) {
        box.height = Math.max(5, Math.min(my - box.y, this.imgRect.height - box.y));
      }
      if (this.resizeHandle.includes("w")) {
        box.x = Math.max(0, Math.min(mx, right - 5));
        box.width = right - box.x;
      }
      if (this.resizeHandle.includes("e")) {
        box.width = Math.max(5, Math.min(mx - box.x, this.imgRect.width - box.x));
      }
    },

    editLabel(box) {
      const newLabel = prompt("Edytuj label:", box.label);
      if (newLabel !== null) {
        box.label = newLabel;
        this.$emit("updateBox", { ...box });
      }
    },

    deleteBox(box) {
      if (confirm("Na pewno chcesz usunąć ten box?")) {
        this.$emit("deleteBox", box.id);
      }
    }
  }
};
</script>

<style scoped>
.canvas-wrapper-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.instructions {
  font-size: 12px;
  color: #555;
  margin-bottom: 4px;
}

.canvas-wrapper {
  position: relative;
  display: inline-block;
  user-select: none;
}

.image {
  display: block;
  max-width: 100%;
}

.box {
  position: absolute;
  border: 2px solid #0d6efd;
  box-sizing: border-box;
}

.box.active {
  border-color: red;
}

.box.preview {
  border-style: dashed;
}

.label {
  position: absolute;
  top: -18px;
  left: 0;
  background: #0d6efd;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  cursor: pointer;
}

.delete {
  position: absolute;
  top: -18px;
  right: 0;
  cursor: pointer;
  font-size: 12px;
}

.handle {
  width: 8px;
  height: 8px;
  background: white;
  border: 1px solid black;
  position: absolute;
}

.handle.nw {
  top: -4px;
  left: -4px;
  cursor: nwse-resize;
}

.handle.ne {
  top: -4px;
  right: -4px;
  cursor: nesw-resize;
}

.handle.sw {
  bottom: -4px;
  left: -4px;
  cursor: nesw-resize;
}

.handle.se {
  bottom: -4px;
  right: -4px;
  cursor: nwse-resize;
}
</style>
