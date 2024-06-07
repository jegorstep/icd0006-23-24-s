<script setup lang="ts">

import {ref} from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts';
import SportActivityService from "@/services/SportActivityService";

const MAX_HEADER_LENGTH = 128;



const router = useRouter();
const authStore = useAuthStore();
const name = ref('');
const time = ref('');
const isPublic = ref(false);
const errors = ref('');

const  validateAndPublish = async () => {
  const response = await SportActivityService.add(
      authStore.jwt,
      {
        id: "10000000-1000-4000-8000-100000000000",
        userId: "10000000-1000-4000-8010-100000000000",
        name: name.value,
        time: time.value,
        isPublic: isPublic.value
      });

  if (response.errors && response.errors.length > 0) {
    errors.value = response.errors;
  } else {
    router.back();
  }
}



</script>

<template>
  <div class="create-row">
    <div>
      <h2 class="main-header">Add Sport Activity</h2>
    </div>
    <div>
    </div>
    <div>
      <div class="form-floating mb-3">
        <input type="text" id="name" class="form-control" placeholder="name" v-model="name" />
        <label for="name" class="form-label">
          Name
        </label>
        <small>{{ name.length }}/{{ MAX_HEADER_LENGTH }}</small>
      </div>
      <div class="form-floating mb-3">
        <input type="text" id="time" class="form-control" placeholder="time" v-model="time" />
        <label for="time" class="form-label">
          Time
        </label>
        <small>{{ time.length }}/{{ MAX_HEADER_LENGTH }}</small>
      </div>
      <input class="form-check-input" type="checkbox" id="public" v-model="isPublic" />
      <label for="public">Make public (TODO!)</label>
    </div>
    <div>
      <button @click="validateAndPublish" class="w-100 btn btn-lg btn-primary">Create</button>
    </div>
  </div>
  {{errors}}
</template>

