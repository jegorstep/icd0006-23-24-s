<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import type {IMechanic} from "@/types/IMechanic";
import MechanicService from "@/services/MechanicService";

const authStore = useAuthStore();
const router = useRouter();
const mechanics = ref<IMechanic[]>([]);

const getMechanics = async () => {
  try {
    const response = await MechanicService.getAll(authStore.jwt);
    if (response.data) {
      mechanics.value = response.data;
    } else if (response.errors) {
      console.error("Error fetching publications:", response.errors);
    }
  } catch (error) {
    console.error("Error fetching publications:", error);
  }
}


onMounted(() => {
  getMechanics();
});
</script>


<template>
  <div>
    <h1>Mechanics</h1>
    <router-link :to="{ name: 'CreateMechanic' }">Create</router-link>
    <table class="table">
      <thead>
      <tr>
        <th>Name</th>

        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="mechanic in mechanics" :key="mechanic.id">
        <td>{{ mechanic.name }}</td>
        <td>
          <router-link :to="{ name: 'EditMechanic', params: { id: mechanic.id } }">Edit</router-link> |
          <router-link :to="{ name: 'DeleteMechanic', params: {id: mechanic.id} }">Delete</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

