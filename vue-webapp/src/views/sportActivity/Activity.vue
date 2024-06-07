<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

import SportActivityService from "@/services/SportActivityService";
import type {ISportActivity} from "@/types/ISportActivity";

const authStore = useAuthStore();
const total = ref(0);
const router = useRouter();
const activities = ref<ISportActivity[]>([]);

const getActivities = async () => {
  try {
    const response = await SportActivityService.getAll(authStore.jwt);
    if (response.data) {
      activities.value = response.data;
    } else if (response.errors) {
      console.error("Error fetching publications:", response.errors);
    }
  } catch (error) {
    console.error("Error fetching publications:", error);
  }
}

const getTotalScore = async () => {
  try {
    const response = await SportActivityService.getScore(authStore.jwt);
    if (response.data) {
      total.value = response.data;
    } else if (response.errors) {
      console.error("Error fetching publications:", response.errors);
    }
  } catch (error) {
    console.error("Error fetching publications:", error);
  }
}


onMounted(() => {
  getActivities();
  getTotalScore();
});
</script>


<template>
  <div>
    <h1>Your Activities</h1>
    <router-link :to="{ name: 'CreateActivities' }">Create</router-link>
    <table class="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Time in Minutes</th>
        <th>Total Score: {{total}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="activity in activities" :key="activity.id">
        <td>{{ activity.name }}</td>
        <td>{{activity.time}}</td>
        <td>
          <router-link :to="{ name: 'EditActivity', params: { id: activity.id } }">Edit</router-link> |
          <router-link :to="{ name: 'DeleteActivity', params: {id: activity.id} }">Delete</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

