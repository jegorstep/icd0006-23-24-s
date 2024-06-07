<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

import type {ITicket} from "@/types/ITicket";
import TicketService from "@/services/TicketService";

const authStore = useAuthStore();
const router = useRouter();
const tickets = ref<ITicket[]>([]);

const getTickets = async () => {
  try {
    const response = await TicketService.getAll(authStore.jwt);
    if (response.data) {
      tickets.value = response.data;
    } else if (response.errors) {
      console.error("Error fetching publications:", response.errors);
    }
  } catch (error) {
    console.error("Error fetching publications:", error);
  }
}


const handleTicket = async () => {
  try {
    const response = await TicketService.getTicket(authStore.jwt);
    if (response.data) {
      tickets.value = response.data;
    } else if (response.errors) {
      console.error("Error fetching publications:", response.errors);
    }
  } catch (error) {
    console.error("Error fetching publications:", error);
  }
}



onMounted(() => {
  getTickets();
});
</script>


<template>
  <div>
    <h1>Your Tickets</h1>
    <router-link :to="{ name: 'CreateActivities' }">Get Ticket</router-link>
    <table class="table">
      <thead>
      <tr>
        <th>Number</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="ticket in tickets" :key="ticket.id">
        <td>{{ ticket.number }}</td>
      </tr>
      <button class="delete-btn" @click="handleTicket">Get Ticket</button>
      </tbody>
    </table>
  </div>
</template>

