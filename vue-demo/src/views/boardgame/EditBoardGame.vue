<script setup lang="ts">

import {ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts';
import BoardGameService from '@/services/BoardGameService.ts';
import type {IBoardGame} from "@/types/IBoardGame";

const MAX_HEADER_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 300;


const boardGame = ref<IBoardGame>();
const router = useRouter();
const authStore = useAuthStore();
const name = ref('');
const description = ref('');
const maximumPlayers = ref('');
const minimumPlayers = ref('');
const complexity = ref('');


const loadBG = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id')!;
  const response = await BoardGameService.get(authStore.jwt, id);
  if (response.data) {
    boardGame.value = response.data;
    name.value = response.data.name;
    description.value = response.data.description;
    maximumPlayers.value = response.data.maximumPlayers;
    minimumPlayers.value = response.data.minimumPlayers;
    complexity.value = response.data.complexity;
  }
}
const  validateAndPublish = async () => {
  const response = await BoardGameService.put(
      authStore.jwt, boardGame.value!.id,
      {
        id: boardGame.value!.id,
        name: name.value,
        description: description.value,
        maximumPlayers: maximumPlayers.value,
        minimumPlayers: minimumPlayers.value,
        complexity: complexity.value,
        imageUrl: ""
      });

  if (response.errors && response.errors.length > 0) {
    console.log(response.errors[0]);
  } else {
    router.back();
  }
}

onMounted(loadBG);


</script>

<template>
  <div class="create-row">
    <div>
      <h2 class="main-header">Update Board Game</h2>
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
      <div class="form-floating mb-3">
        <textarea id="description" class="form-control" placeholder="Description" v-model="description"></textarea>
        <label for="description" class="form-label">
          Description
        </label>
        <small>{{ description.length }}/{{ MAX_DESCRIPTION_LENGTH }}</small>
      </div>
    </div>
    <div>
      <div class="form-floating mb-3">
        <input type="number" id="minimumPlayers" class="form-control" placeholder="minimumPlayers" v-model="minimumPlayers" />
        <label for="minimumPlayers" class="form-label">
          Minimum Players
        </label>
      </div>
    </div>
    <div>
      <div class="form-floating mb-3">
        <input type="number" id="maximumPlayers" class="form-control" placeholder="maximumPlayers" v-model="maximumPlayers" />
        <label for="maximumPlayers" class="form-label">
          Maximum Players
        </label>
      </div>
    </div>
    <div>
      <div class="form-floating mb-3">
        <input type="text" id="complexity" class="form-control" placeholder="complexity" v-model="complexity" />
        <label for="complexity" class="form-label">
          Complexity
        </label>
      </div>
    </div>
    <div>
      <button @click="validateAndPublish" class="w-100 btn btn-lg btn-primary">Update</button>
    </div>
  </div>
</template>

