<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LotteryService from "@/services/LotteryService";
import type {ILottery} from "@/types/ILottery";


const router = useRouter();


const authStore = useAuthStore();

const lottery = ref<ILottery>();
const errors = ref("");

const isAnonymous = ref(false);

const loadData = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id')!;
  const response = await LotteryService.get(authStore.jwt, id);
  if (response.data) {
    lottery.value = response.data;
  } else if (response.errors) {
    errors.value = response.errors[0];
  }
};


const handleParticipation = async () => {
  if (lottery.value) {
    const response = await LotteryService.participate(authStore.jwt, lottery.value!.id, isAnonymous.value);
    if (!response.errors) {
      router.back();
    } else if (response.errors) {
      errors.value = "You are already participate!"
    }
  }
};

onMounted(loadData);
</script>

<template>
  <div>
    <h1 class="main-header">Accept, if you want to participate!</h1>
    <div v-if="lottery" class="details">
      <h2>Details:</h2>
      <div>
        <p>Name: {{ lottery.name }}</p>
      </div>
      <div>
        <p>Condition: {{ lottery.condition }}</p>
      </div>
      <div>
        <p>Prize: {{ lottery.prizeType }}</p>
      </div>
      <div>
        <p>Activity minutes required: {{ lottery.conditionTime }}</p>
      </div>
      <div>
        <input type="checkbox" id="anonymous" v-model="isAnonymous" />
        <label for="anonymous">Participate anonymously</label>
      </div>
      </div>
      <button class="btn" @click="handleParticipation">Participate</button>  {{errors}}
      </div>
  <div>
  </div>
</template>



