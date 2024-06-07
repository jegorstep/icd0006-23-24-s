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
const errors = ref("");

const getLotteries = async () => {
  try {
    const response = await LotteryService.getUserLotteries(authStore.jwt);
    if (response.data) {
      lotteries.value = response.data;
    } else if (response.errors) {
      errors.value = response.errors;
    }
  } catch (error) {
    console.error("Error fetching publications:", error);
  }
}

const handleParticipation = async (id: string) => {
    const response = await LotteryService.stopParticipate(authStore.jwt, id);
    if (!response.errors) {
      router.push('/lottery/all');
    } else if (response.errors) {
      errors.value = response.errors[0];
    }

};


onMounted(() => {
  getLotteries();
});
</script>


<template>
  <div>
    <h1>My Lotteries</h1>
    <table class="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Prize Type</th>
        <th>Number Of Prizes</th>
        <th>Condition</th>
        <th>Condition Time</th>
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
        <div>
          <button class="btn" @click="handleParticipation(lottery.id)">Stop Participate</button>
        </div>
      </tr>
      </tbody>
    </table>
  </div>
  {{errors}}
</template>

