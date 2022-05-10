<template>
  <vue-final-modal
    v-model="show"
    classes="modal-container"
    content-class="modal-content"
  >
    <span
      v-if="strings.modalTitle"
      class="modal__title"
    >
      <slot name="title">
        <p>{{ strings.modalTitle }}</p>
      </slot>
    </span>

    <div class="modal__content">
      <div
        v-show="selectedImage"
        class="image-wrapper"
      >
        <img
          ref="imageRef"
          class="image-canvas"
          :src="selectedImage"
        >
      </div>
    </div>

    <div class="modal__action">
      <button
        class="save"
        @click="onCropImage"
      >
        {{ strings.modalSaveAction }}
      </button>
      <button
        class="cancel-action"
        @click="onCancel"
      >
        {{ strings.modalCancelAction }}
      </button>
    </div>
  </vue-final-modal>
</template>

<script>
import { ref, toRefs, onMounted, onUnmounted, defineComponent } from 'vue';
import { VueFinalModal } from 'vue-final-modal'

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

export default defineComponent({
  name: 'CropperDialog',
  components: {
    VueFinalModal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    selectedImage: {
      type: String,
      default: ''
    },
    fileExtention: {
      type: String,
      default: ''
    },    
    strings: {
      type: Object,
      default: () => ({})
    },    
    cropperConfigs: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props, { emit }) {
    const cropper = ref(null);
    const imageRef = ref(null);
    const { fileExtention, cropperConfigs } = toRefs(props);

    onMounted(() => {
      cropper.value = new Cropper(imageRef.value, {
        aspectRatio: 4 / 6,
        viewMode: 1,
        dragMode: 'move',
        background: true,
        cropBoxResizable: true,
        ...cropperConfigs.value,
      })
    })

    onUnmounted(() => {
      cropper.value?.destroy();
    })

    // Methods
    function onCropImage() {
      const croppedCanvas = cropper.value.getCroppedCanvas({
        imageSmoothingQuality: 'high', // low - medium - high 
      });

      const croppedImage = croppedCanvas.toDataURL(fileExtention.value);

      croppedCanvas.toBlob((croppedBlob) => {
          // update parent
          emit('save', {
            croppedBlob,
            croppedImage
          });
        }, fileExtention.value)
    }

    function onCancel () {
      emit('close');
    }

    return {
      imageRef,
      // Methods
      onCancel,
      onCropImage
    };
  }
});
</script>

<style scoped>
.image-wrapper {
  /* width: 300px; */
  height: 300px;
}

.image-canvas {
  display: block;

  max-width: 100%;
}

.image-wrapper .cropper-container {
  width: 100% !important;
}

/* Dialog styles */
:deep(.modal-container) {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}

:deep(.modal-content) {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 99%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

:deep(.modal__content) {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 10px;
}

.modal__title {
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid #eee;
}

.modal__action {
  border-top: 1px solid #eee;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.modal__action .save {
  flex-basis: 70%;
  color: #fff;
  background-color: green;
  padding: 5px;
}

.modal__action .save {
  flex-basis: 70%;
  color: #fff;
  background-color: #158e8d;
  padding: 5px;
}

.modal__action .cancel-action {
  flex-basis: 25%;
  color: #fff;
  background-color: #ae351c;
  padding: 5px;
}

@media (min-width: 576px) {
  :deep(.modal-container)  {
    max-width: 500px;
    margin: 1.75rem auto;
  }
}
</style>