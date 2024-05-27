import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { stringOrNull } from '@/types/types'

export const useAuthStore = defineStore('auth', () => {
  // ref - state variables
  const jwt = ref<stringOrNull>(null)
  const refreshToken = ref<stringOrNull>(null)
  const userName = ref<stringOrNull>(null)
  const isAuthenticated = ref<boolean>(false);

  // functions - actions


  // return your refs, computeds and functions
  return { jwt, refreshToken, userName, isAuthenticated }
})

