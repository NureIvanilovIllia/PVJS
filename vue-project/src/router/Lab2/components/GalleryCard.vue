<script setup>
defineProps({
  image: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <article class="gallery-card">
    <img
      :src="image.download_url"
      :alt="`Фото автора ${image.author}`"
      class="gallery-card__image"
      loading="lazy"
    />
    <div class="gallery-card__footer">
      <p class="gallery-card__author">{{ image.author }}</p>
      <button
        type="button"
        class="gallery-card__favorite"
        :class="{ 'gallery-card__favorite--active': isFavorite }"
        @click="emit('toggle-favorite', image.id)"
      >
        {{ isFavorite ? '★ У обраному' : '☆ В обране' }}
      </button>
    </div>
  </article>
</template>

<style scoped>
.gallery-card {
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: #fff;
}

.gallery-card__image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  background: #f1f5f9;
}

.gallery-card__footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
}

.gallery-card__author {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #0f172a;
}

.gallery-card__favorite {
  padding: 0.375rem 0.625rem;
  font-size: 0.8125rem;
  color: #475569;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
}

.gallery-card__favorite:hover {
  background: #e2e8f0;
}

.gallery-card__favorite--active {
  color: #b45309;
  background: #fffbeb;
  border-color: #fcd34d;
}
</style>
