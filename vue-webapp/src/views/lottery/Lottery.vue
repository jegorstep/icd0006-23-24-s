<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import LotteryService from "@/services/LotteryService";
import type {ILottery} from "@/types/ILottery";

import MechanicService from "@/services/SportActivityService";

const authStore = useAuthStore();
const router = useRouter();
const lotteries = ref<ILottery[]>([]);

const getLotteries = async () => {
  try {
    const response = await LotteryService.getAll(authStore.jwt);
    if (response.data) {
      lotteries.value = response.data;
    } else if (response.errors) {
      console.error("Error fetching publications:", response.errors);
    }
  } catch (error) {
    console.error("Error fetching publications:", error);
  }
}


onMounted(() => {
  getLotteries();
});
</script>


<template>
  <div>
    <h1>Lotteries</h1>
    <table class="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Prize Type</th>
        <th>Number Of Prizes</th>
        <th>Condition</th>
        <th>Condition Time</th>
        <th>Winning Number</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="lottery in lotteries" :key="lottery.id">
        <td>{{ lottery.name }}</td>
        <td>{{ lottery.prizeType }}</td>
        <td>{{ lottery.numberOfPrizes }}</td>
        <td>{{ lottery.condition }}</td>
        <td>{{ lottery.conditionTime }}</td>
        <td>{{lottery.winningNumber}}</td>
        <div>
          <router-link :to="{ name: 'ParticipateLottery', params: { id: lottery.id } }">Participate</router-link> |
          <router-link :to="{name: 'LotteryDetails', params: {id: lottery.id}}">Watch Participants</router-link>
        </div>
      </tr>
      </tbody>
    </table>
  </div>
</template>

