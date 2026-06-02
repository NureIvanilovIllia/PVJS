<script setup>
defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'info',
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="message" class="toast" :class="`toast--${type}`" role="alert">
        <p class="toast__text">{{ message }}</p>
        <button type="button" class="toast__close" aria-label="Закрити" @click="emit('close')">
          ×
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  max-width: 22rem;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgb(0 0 0 / 0.12);
}

.toast--success {
  background: #dcfce7;
  border: 1px solid #86efac;
  color: #166534;
}

.toast--error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
}

.toast--info {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
}

.toast__text {
  margin: 0;
  font-size: 0.875rem;
}

.toast__close {
  flex-shrink: 0;
  padding: 0;
  font-size: 1.25rem;
  line-height: 1;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.7;
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
