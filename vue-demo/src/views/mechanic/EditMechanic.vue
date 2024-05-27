<script setup lang="ts">

import {ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type {IMechanic} from "@/types/IMechanic";
import MechanicService from "@/services/MechanicService";

const MAX_HEADER_LENGTH = 128;



const mechanic = ref<IMechanic>();
const router = useRouter();
const authStore = useAuthStore();
const name = ref('');



const loadMechanic = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id')!;
  const response = await MechanicService.get(authStore.jwt, id);
  if (response.data) {
    mechanic.value = response.data;
    name.value = response.data.name;
  }
}
const  validateAndPublish = async () => {
  const response = await MechanicService.put(
      authStore.jwt, mechanic.value!.id,
      {
        id: mechanic.value!.id,
        name: name.value
      });

  if (response.errors && response.errors.length > 0) {
    console.log(response.errors[0]);
  } else {
    router.back();
  }
}

onMounted(loadMechanic);


</script>

<template>
  <div class="create-row">
    <div>
      <h2 class="main-header">Update Mechanic</h2>
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
      <button @click="validateAndPublish" class="w-100 btn btn-lg btn-primary">Update</button>
    </div>
  </div>
</template>

