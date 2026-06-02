import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue = null) {
  function read() {
    try {
      const raw = localStorage.getItem(key)
      if (raw !== null) {
        return JSON.parse(raw)
      }
    } catch {
      /* ignore */
    }
    return defaultValue
  }

  const data = ref(read())

  function save(value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  watch(
    data,
    (value) => {
      save(value)
    },
    { deep: true },
  )

  return {
    data,
    save,
    reload() {
      data.value = read()
    },
  }
}
