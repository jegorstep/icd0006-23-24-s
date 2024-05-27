<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type {IBoardGame} from "@/types/IBoardGame";
import BoardGameService from "@/services/BoardGameService";


const router = useRouter();


const authStore = useAuthStore();

const boardGame = ref<IBoardGame>();
const errors = ref("");

const loadData = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id')!;
  const response = await BoardGameService.get(authStore.jwt, id);
  if (response.data) {
    boardGame.value = response.data;
  } else if (response.errors) {
    errors.value = response.errors[0];
  }
};


const handleDelete = async () => {
  if (boardGame.value) {
    const response = await BoardGameService.delete(authStore.jwt, boardGame.value.id);
    if (!response.errors) {
      console.log("Deleted");
      router.back();
    } else if (response.errors) {
      errors.value = response.errors[0];
    }
  }
};

onMounted(loadData);
</script>

<template>
  <div>
    <h1 class="main-header">Are you sure you want to delete board game?</h1>
    <div v-if="boardGame" class="details">
      <h2>Details:</h2>
      <div>
        <p>Name: {{ boardGame.name }}</p>
      </div>
      <div>
        <p>Description: {{ boardGame.description }}</p>
      </div>
      <div>
        <p>Complexity: {{ boardGame.complexity }}</p>
      </div>
      <div>
        <p>Minimum Players: {{ boardGame.minimumPlayers }}</p>
      </div>
      <div>
        <p>Maximum Players: {{ boardGame.maximumPlayers }}</p>
      </div>
    </div>
    <div v-else>
      Bad Request
    </div>
    <div v-if="errors" class="error-message">{{ errors }}</div>
    <button class="delete-btn" @click="handleDelete">Delete</button>
  </div>
</template>



