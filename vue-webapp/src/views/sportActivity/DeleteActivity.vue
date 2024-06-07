<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type {ISportActivity} from "@/types/ISportActivity";
import SportActivityService from "@/services/SportActivityService";


const router = useRouter();


const authStore = useAuthStore();

const activity = ref<ISportActivity>();
const errors = ref("");

const loadData = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id')!;
  const response = await SportActivityService.get(authStore.jwt, id);
  if (response.data) {
    activity.value = response.data;
  } else if (response.errors) {
    errors.value = response.errors[0];
  }
};


const handleDelete = async () => {
  if (activity.value) {
    const response = await SportActivityService.delete(authStore.jwt, activity.value.id);
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
    <h1 class="main-header">Are you sure you want to delete your activity?</h1>
    <div v-if="activity" class="details">
      <h2>Details:</h2>
      <div>
        <p>Name: {{ activity.name }}</p>
        <p>Time: {{activity.time}}</p>
      </div>
    </div>
    <div v-else>
      Bad Request
    </div>
    <div v-if="errors" class="error-message">{{ errors }}</div>
    <button class="delete-btn" @click="handleDelete">Delete</button>
  </div>
</template>



