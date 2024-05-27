<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import PublicationService from "@/services/PublicationService.js";
import type {IPublication} from "@/types/IPublication";
import type {IBoardGame} from "@/types/IBoardGame";
import BoardGameService from "@/services/BoardGameService";

const authStore = useAuthStore();
const router = useRouter();
const boardGames = ref<IBoardGame[]>([]);

const getBoardGames = async () => {
  try {
    const response = await BoardGameService.getAll(authStore.jwt);
    if (response.data) {
      boardGames.value = response.data;
    } else if (response.errors) {
      console.error("Error fetching publications:", response.errors);
    }
  } catch (error) {
    console.error("Error fetching publications:", error);
  }
}


onMounted(() => {
  getBoardGames();
});
</script>


<template>
  <div>
    <h1>Board Games</h1>
    <router-link :to="{ name: 'CreateBoardGame' }">Create</router-link>
    <table class="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Minimum Players</th>
        <th>Maximum Players</th>
        <th>Image URL</th>
        <th>Complexity</th>
        <th>Description</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="boardGame in boardGames" :key="boardGame.id">
        <td>{{ boardGame.name }}</td>
        <td>{{ boardGame.minimumPlayers }}</td>
        <td>{{ boardGame.maximumPlayers }}</td>
        <td>{{ boardGame.imageUrl }}</td>
        <td>{{ boardGame.complexity }}</td>
        <td>{{ boardGame.description }}</td>
        <td>
          <router-link :to="{ name: 'EditBoardGame', params: { id: boardGame.id } }">Edit</router-link> |
          <router-link :to="{ name: 'DeleteBoardGame', params: {id: boardGame.id} }">Delete</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

