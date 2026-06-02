<script setup>
import GalleryCard from './GalleryCard.vue'

defineProps({
  images: {
    type: Array,
    required: true,
  },
  favorites: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <div v-if="images.length" class="gallery-grid">
    <GalleryCard
      v-for="image in images"
      :key="image.id"
      :image="image"
      :is-favorite="favorites.includes(image.id)"
      @toggle-favorite="emit('toggle-favorite', $event)"
    />
  </div>
  <p v-else class="gallery-grid__empty">Зображень не знайдено</p>
</template>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.gallery-grid__empty {
  margin: 0;
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
}
</style>
