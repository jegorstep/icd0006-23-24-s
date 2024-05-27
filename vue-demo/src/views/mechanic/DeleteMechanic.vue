<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type {IBoardGame} from "@/types/IBoardGame";
import BoardGameService from "@/services/BoardGameService";
import MechanicService from "@/services/MechanicService";
import type {IMechanic} from "@/types/IMechanic";


const router = useRouter();


const authStore = useAuthStore();

const mechanic = ref<IMechanic>();
const errors = ref("");

const loadData = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id')!;
  const response = await MechanicService.get(authStore.jwt, id);
  if (response.data) {
    mechanic.value = response.data;
  } else if (response.errors) {
    errors.value = response.errors[0];
  }
};


const handleDelete = async () => {
  if (mechanic.value) {
    const response = await MechanicService.delete(authStore.jwt, mechanic.value.id);
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
    <h1 class="main-header">Are you sure you want to delete mechanic?</h1>
    <div v-if="mechanic" class="details">
      <h2>Details:</h2>
      <div>
        <p>Name: {{ mechanic.name }}</p>
      </div>
    </div>
    <div v-else>
      Bad Request
    </div>
    <div v-if="errors" class="error-message">{{ errors }}</div>
    <button class="delete-btn" @click="handleDelete">Delete</button>
  </div>
</template>



