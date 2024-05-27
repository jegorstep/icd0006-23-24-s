<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import PublicationService from "@/services/PublicationService.js";
import type {IPublication} from "@/types/IPublication";

const authStore = useAuthStore();
const router = useRouter();
const publications = ref<IPublication[]>([]);

const getPublications = async () => {
  try {
    const response = await PublicationService.getAll(authStore.jwt);
    if (response.data) {
      publications.value = response.data;
    } else if (response.errors) {
      console.error("Error fetching publications:", response.errors);
    }
  } catch (error) {
    console.error("Error fetching publications:", error);
  }
}


onMounted(() => {
  getPublications();
});
</script>


<template>
  <div>
    <h1>Publications</h1>
    <router-link :to="{ name: 'CreatePublication' }">Create</router-link>
    <table class="table">
      <thead>
      <tr>
        <th>Publication Header</th>
        <th>Description</th>
        <th>Game Date</th>
        <th>Image URL</th>
        <th>Game Location</th>
        <th>Players Amount</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="publication in publications" :key="publication.id">
        <td>{{ publication.publicationHeader }}</td>
        <td>{{ publication.description }}</td>
        <td>{{ publication.gameDate }}</td>
        <td>{{ publication.imageUrl }}</td>
        <td>{{ publication.gameLocation }}</td>
        <td>{{ publication.playersAmount }}</td>
        <td>
          <router-link :to="{ name: 'EditPublication', params: { id: publication.id } }">Edit</router-link> |
          <router-link :to="{ name: 'DeletePublication', params: {id: publication.id} }">Delete</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

