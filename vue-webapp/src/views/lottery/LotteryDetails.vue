<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import LotteryService from "@/services/LotteryService";
import type {IParticipants} from "@/types/IParticipants";

const authStore = useAuthStore();
const router = useRouter();
const participants = ref<IParticipants[]>([]);

const getParticipants = async () => {
  try {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id')!;
    const response = await LotteryService.getParticipants(authStore.jwt, id);
    if (response.data) {
      participants.value = response.data;
    } else if (response.errors) {
      console.error("Error fetching publications:", response.errors);
    }
  } catch (error) {
    console.error("Error fetching publications:", error);
  }
}




onMounted(() => {
  getParticipants();
});
</script>


<template>
  <div>
    <h1>Participants</h1>
    <table class="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Score</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="participant in participants" :key="participant.id">
        <td>{{ participant.name}}</td>
        <td>{{ participant.email }}</td>
        <td>{{ participant.score }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

