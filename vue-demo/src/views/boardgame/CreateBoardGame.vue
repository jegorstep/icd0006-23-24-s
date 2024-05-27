<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts';
import PublicationService from '@/services/PublicationService.ts';
import BoardGameService from '@/services/BoardGameService.ts';
import {c} from "vite/dist/node/types.d-aGj9QkWt";

const MAX_HEADER_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 300;
const MAX_LOCATION_LENGTH = 128;


  const router = useRouter();
  const authStore = useAuthStore();
  const name = ref('');
  const description = ref('');
  const maximumPlayers = ref('');
  const minimumPlayers = ref('');
  const complexity = ref('');



  const  validateAndPublish = async () => {
     const response = await BoardGameService.add(
          authStore.jwt,
         {
           id: "10000000-1000-4000-8000-100000000000",
           name: name.value,
           description: description.value,
           maximumPlayers: maximumPlayers.value,
           minimumPlayers: minimumPlayers.value,
           complexity: complexity.value,
           imageUrl: ""
         });

     router.push("/boardgame");

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
      <h2 class="main-header">Create Board Game</h2>
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
      <button @click="validateAndPublish" class="w-100 btn btn-lg btn-primary">Create</button>
    </div>
  </div>
</template>

