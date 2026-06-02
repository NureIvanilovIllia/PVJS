<script setup>
import { computed, onMounted, ref } from 'vue'
import GalleryGrid from './components/GalleryGrid.vue'

const API_URL = 'https://picsum.photos/v2/list?page=1&limit=20'

const images = ref([])
const isLoading = ref(false)
const error = ref(null)
const favorites = ref([])
const searchQuery = ref('')
const viewMode = ref('all')

const filteredImages = computed(() => {
  let result = images.value

  if (viewMode.value === 'favorites') {
    result = result.filter((image) => favorites.value.includes(image.id))
  }

  const query = searchQuery.value.trim().toLowerCase()
  if (query) {
    result = result.filter((image) => image.author.toLowerCase().includes(query))
  }

  return result
})

async function loadImages() {
  isLoading.value = true
  error.value = null

  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`Помилка HTTP: ${response.status}`)
    }
    const data = await response.json()
    images.value = data.map((item) => ({
      id: item.id,
      author: item.author,
      download_url: item.download_url,
    }))
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Не вдалося завантажити зображення'
    images.value = []
  } finally {
    isLoading.value = false
  }
}

function toggleFavorite(id) {
  const index = favorites.value.indexOf(id)
  if (index === -1) {
    favorites.value.push(id)
  } else {
    favorites.value.splice(index, 1)
  }
}

function setViewMode(mode) {
  viewMode.value = mode
}

onMounted(() => {
  loadImages()
})
</script>

<template>
  <section class="lab2">
    <h2 class="lab2__title">Галерея Picsum Photos</h2>

    <div class="lab2__controls">
      <input
        v-model="searchQuery"
        type="search"
        class="lab2__search"
        placeholder="Пошук за автором..."
        :disabled="isLoading || !!error"
      />
      <div class="lab2__modes">
        <button
          type="button"
          class="lab2__mode"
          :class="{ 'lab2__mode--active': viewMode === 'all' }"
          :disabled="isLoading || !!error"
          @click="setViewMode('all')"
        >
          Усі
        </button>
        <button
          type="button"
          class="lab2__mode"
          :class="{ 'lab2__mode--active': viewMode === 'favorites' }"
          :disabled="isLoading || !!error"
          @click="setViewMode('favorites')"
        >
          Обрані
        </button>
      </div>
    </div>

    <p v-if="isLoading" class="lab2__status">Завантаження...</p>

    <div v-else-if="error" class="lab2__error">
      <p class="lab2__error-text">{{ error }}</p>
      <button type="button" class="lab2__retry" @click="loadImages">Спробувати знову</button>
    </div>

    <GalleryGrid
      v-else
      :images="filteredImages"
      :favorites="favorites"
      @toggle-favorite="toggleFavorite"
    />
  </section>
</template>

<style scoped>
.lab2 {
  max-width: 56rem;
  margin: 0 auto;
  padding: 1.5rem;
}

.lab2__title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
}

.lab2__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.lab2__search {
  flex: 1;
  min-width: 12rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
}

.lab2__search:focus {
  outline: 2px solid #2563eb;
  outline-offset: 0;
}

.lab2__search:disabled {
  background: #f1f5f9;
  cursor: not-allowed;
}

.lab2__modes {
  display: flex;
  gap: 0.375rem;
}

.lab2__mode {
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  color: #334155;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  cursor: pointer;
}

.lab2__mode:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.lab2__mode--active {
  color: #fff;
  background: #2563eb;
  border-color: #2563eb;
}

.lab2__status {
  margin: 2rem 0;
  text-align: center;
  color: #64748b;
  font-size: 1rem;
}

.lab2__error {
  padding: 1.5rem;
  text-align: center;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
}

.lab2__error-text {
  margin: 0 0 1rem;
  color: #b91c1c;
}

.lab2__retry {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #fff;
  background: #2563eb;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.lab2__retry:hover {
  background: #1d4ed8;
}
</style>
