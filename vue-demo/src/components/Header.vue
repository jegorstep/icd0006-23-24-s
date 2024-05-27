<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';


const authStore = useAuthStore();

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
      <div class="container">
        <a class="navbar-brand" href="/">WebApp</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul class="navbar-nav flex-grow-1">
            <li class="nav-item">
              <RouterLink class="nav-link text-dark" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-dark" :to="{ name : 'Publication' }">Publications</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-dark" :to="{ name : 'BoardGame' }">Board Games</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-dark" :to="{ name : 'Mechanic' }">Mechanics</RouterLink>
            </li>
          </ul>


          <ul v-if="!authStore.isAuthenticated" class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link text-dark" :to="{ name: 'Register' }">Register</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-dark" :to="{ name: 'Login' }">Login</RouterLink>
            </li>
          </ul>
          <ul v-else class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link text-dark" href="/Identity/Account/Manage">Hello, {{ authStore.userName }}!</a>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-dark" :to="{name: 'Logout' }">Logout</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
