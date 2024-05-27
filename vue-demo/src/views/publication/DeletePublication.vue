<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import PublicationService from '@/services/PublicationService';
import type {IPublication} from "@/types/IPublication";


const router = useRouter();


const authStore = useAuthStore();

const publication = ref<IPublication>();
const errors = ref("");

const loadData = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id')!;
  const response = await PublicationService.get(authStore.jwt, id);
  if (response.data) {
    publication.value = response.data;
  } else if (response.errors) {
    errors.value = response.errors[0];
  }
};


const handleDelete = async () => {
  if (publication.value) {
    const response = await PublicationService.delete(authStore.jwt, publication.value.id);
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
    <h1 class="main-header">Are you sure you want to delete publication?</h1>
    <div v-if="publication" class="details">
      <h2>Details:</h2>
      <div>
        <p>Publication Header: {{ publication.publicationHeader }}</p>
      </div>
      <div>
        <p>Description: {{ publication.description }}</p>
      </div>
      <div>
        <p>Game Date: {{ publication.gameDate }}</p>
      </div>
      <div>
        <p>Game Location: {{ publication.gameLocation }}</p>
      </div>
      <div>
        <p>Players Amount: {{ publication.playersAmount }}</p>
      </div>
      <div>
        <p>Created By: {{ publication.createdBy }}</p>
      </div>
      <div>
        <p>Updated By: {{ publication.updatedBy }}</p>
      </div>
    </div>
    <div v-else>
      Bad Request
    </div>
    <div v-if="errors" class="error-message">{{ errors }}</div>
    <button class="delete-btn" @click="handleDelete">Delete</button>
  </div>
</template>



