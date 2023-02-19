<template>
  <vue-final-modal
    v-model="show"
    classes="modal-container"
    content-class="modal-content"
  >
    <span v-if="strings.modalTitle" class="modal__title">
      <slot name="title">
        <p>{{ strings.modalTitle }}</p>
      </slot>
    </span>

    <div class="modal__content">
      <div v-show="selectedImage" class="image-wrapper">
        <img ref="img" class="image-canvas" :src="selectedImage" />
      </div>
    </div>

    <div class="modal__action">
      <button :id="cropImageAction" class="save" @click.prevent="onCropImage">
        {{ strings.modalSaveAction }}
      </button>
      <button
        :id="cancelDialogAction"
        class="cancel-action"
        @click.prevent="onCancel"
      >
        {{ strings.modalCancelAction }}
      </button>
    </div>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from "vue-final-modal";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  name: "CropperDialog",
  components: {
    VueFinalModal,
  },
  props: {
    cropImageAction: {
      type: String,
      default: "",
    },
    cancelDialogAction: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: false,
    },
    selectedImage: {
      type: String,
      default: "",
    },
    fileExtention: {
      type: String,
      default: "",
    },
    strings: {
      type: Object,
      default: () => ({}),
    },
    cropperConfigs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  mounted() {
    this.cropper = new Cropper(this.$refs.img, {
      aspectRatio: 4 / 6,
      viewMode: 1,
      dragMode: "move",
      background: true,
      cropBoxResizable: false,
      ...this.cropperConfigs,
    });

    // setInterval(() => this.cropper.scale(2), 2000)
  },
  destroyed() {
    this.cropper.destroy();
  },
  methods: {
    onCropImage() {
      const croppedCanvas = this.cropper.getCroppedCanvas({
        imageSmoothingQuality: "high", // low - medium - high
      });

      // Guard from corrupted files
      if (croppedCanvas) {
        const croppedImage = croppedCanvas.toDataURL(this.fileExtention);

        croppedCanvas.toBlob((croppedBlob) => {
          this.$emit("save", {
            croppedBlob,
            croppedImage,
          });
        }, this.fileExtention);
      }
    },
    onCancel() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./cropperDialog.module";
</style>
