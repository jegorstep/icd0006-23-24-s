<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

import TicketService from "@/services/TicketService";
import type {Prize} from "@/types/Prize";
import PrizeService from "@/services/PrizeService";

const authStore = useAuthStore();
const router = useRouter();
const prizes = ref<Prize[]>([]);

const getPrizes = async () => {
  try {
    const response = await PrizeService.getAll(authStore.jwt);
    if (response.data) {
      prizes.value = response.data;
    } else if (response.errors) {
      console.error("Error fetching publications:", response.errors);
    }
  } catch (error) {
    console.error("Error fetching publications:", error);
  }
}



onMounted(() => {
  getPrizes();
});
</script>


<template>
  <div>
    <h1>Your Prizes</h1>
    <table class="table">
      <thead>
      <tr>
        <th>Prize</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="prize in prizes" :key="prize.id">
        <td>{{ prize.name }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

