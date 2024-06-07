<script setup lang="ts">

import {ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import SportActivityService from "@/services/SportActivityService";
import type {ISportActivity} from "@/types/ISportActivity";

const MAX_HEADER_LENGTH = 128;



const activity = ref<ISportActivity>();
const router = useRouter();
const authStore = useAuthStore();
const name = ref('');
const time = ref('');
const isPublic = ref(false);

const loadActivity = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id')!;
  const response = await SportActivityService.get(authStore.jwt, id);
  if (response.data) {
    activity.value = response.data;
    name.value = response.data.name;
    time.value = response.data.time;
    isPublic.value = response.data.isPublic;
  }
}
const  validateAndPublish = async () => {
  const response = await SportActivityService.put(
      authStore.jwt, activity.value!.id,
      {
        id: activity.value!.id,
        userId: activity.value!.userId,
        name: name.value,
        time: time.value,

      });

  if (response.errors && response.errors.length > 0) {
    console.log(response.errors[0]);
  } else {
    router.back();
  }
}

onMounted(loadActivity);


</script>

<template>
  <div class="create-row">
    <div>
      <h2 class="main-header">Update Activity</h2>
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
      <input type="checkbox" id="public" v-model="isPublic" />
      <label for="isPublic">Make Public</label>
    </div>
    <div>
      <button @click="validateAndPublish" class="w-100 btn btn-lg btn-primary">Update</button>
    </div>
  </div>
</template>

