<script setup lang="ts">

import {ref} from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts';
import type {IMechanic} from "@/types/IMechanic";
import MechanicService from "@/services/MechanicService";

const MAX_HEADER_LENGTH = 128;



const mechanic = ref<IMechanic>();
const router = useRouter();
const authStore = useAuthStore();
const name = ref('');

const  validateAndPublish = async () => {
  const response = await MechanicService.add(
      authStore.jwt,
      {
        id: "10000000-1000-4000-8000-100000000000",
        name: name.value
      });

  if (response.errors && response.errors.length > 0) {
    console.log(response.errors[0]);
  } else {
    router.back();
  }
}



</script>

<template>
  <div class="create-row">
    <div>
      <h2 class="main-header">Create Mechanic</h2>
    </div>
    <div>
    </div>
    <div>
      <div class="form-floating mb-3">
        <input type="text" id="name" class="form-control" placeholder="name" v-model="name" />
        <label for="publicationHeader" class="form-label">
          Name
        </label>
        <small>{{ name.length }}/{{ MAX_HEADER_LENGTH }}</small>
      </div>
    </div>
    <div>
      <button @click="validateAndPublish" class="w-100 btn btn-lg btn-primary">Create</button>
    </div>
  </div>
</template>

