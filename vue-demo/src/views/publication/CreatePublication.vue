<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts';
import PublicationService from '@/services/PublicationService.ts';
import BoardGameService from '@/services/BoardGameService.ts';

const MAX_HEADER_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 300;
const MAX_LOCATION_LENGTH = 128;


  const router = useRouter();
  const authStore = useAuthStore();
  const boardGames = ref([]);
  const selectedGame = ref('');
  const header = ref('');
  const description = ref('');
  const location = ref('');
  const playerAmount = ref('');
  const gameDate = ref('');
  const headerValidationError = ref('');
  const descriptionValidationError = ref('');
  const locationValidationError = ref('');
  const playerAmountValidationError = ref('');


  const fetchBoardGames = async () => {
    const response = await BoardGameService.getAll(authStore.jwt);
    if (response.data) {
      boardGames.value = response.data;
    }
  }

  const  validateAndPublish = async () => {
     const response = await PublicationService.add(
          authStore.jwt,
         {
           id: "10000000-1000-4000-8000-100000000000",
           createdBy: "",
           createdAt: new Date().toISOString(),
           updatedBy: "",
           updatedAt: new Date().toISOString(),
           boardGameId: selectedGame.value,
           publicationHeader: header.value,
           description: description.value,
           gameDate: gameDate.value,
           imageUrl: "",
           gameLocation: location.value,
           playersAmount: playerAmount.value
         });

      if (response.errors && response.errors.length > 0) {
        console.log(response.errors[0]);
      } else {
        router.back();
      }
  }

  onMounted(async () => {
    await fetchBoardGames();
  });


</script>

<template>
  <div class="create-row">
    <div>
      <h2 class="main-header">Create Publication</h2>
    </div>
    <div>
    </div>
    <div class="form-floating mb-3">
      <select class="form-select" v-model="selectedGame">
        <option value=""></option>
        <option v-for="game in boardGames" :key="game.id" :value="game.id">{{ game.name }}</option>
      </select>
      <label>
        Select a Board Game
      </label>
    </div>
    <div>
      <div class="text-danger error-input" :class="{ visible: headerValidationError }" role="alert">
        {{ headerValidationError }}
      </div>
      <div class="form-floating mb-3">
        <input type="text" id="publicationHeader" class="form-control" placeholder="Header" v-model="header" />
        <label for="publicationHeader" class="form-label">
          Header
        </label>
        <small>{{ header.length }}/{{ MAX_HEADER_LENGTH }}</small>
      </div>
    </div>
    <div>
      <div class="text-danger error-input" :class="{ visible: descriptionValidationError }" role="alert">
        {{ descriptionValidationError }}
      </div>
      <div class="form-floating mb-3">
        <textarea id="description" class="form-control" placeholder="Description" v-model="description"></textarea>
        <label for="description" class="form-label">
          Description
        </label>
        <small>{{ description.length }}/{{ MAX_DESCRIPTION_LENGTH }}</small>
      </div>
    </div>
    <div>
      <div class="text-danger error-input" :class="{ visible: locationValidationError }" role="alert">
        {{ locationValidationError }}
      </div>
      <div class="form-floating mb-3">
        <input type="text" id="gameLocation" class="form-control" placeholder="Location" v-model="location" />
        <label for="gameLocation" class="form-label">
          Location
        </label>
        <small>{{ location.length }}/{{ MAX_LOCATION_LENGTH }}</small>
      </div>
    </div>
    <div>
      <div class="text-danger error-input" :class="{ visible: playerAmountValidationError }" role="alert">
        {{ playerAmountValidationError }}
      </div>
      <div class="form-floating mb-3">
        <input type="number" id="playersAmount" class="form-control" placeholder="Player Amount" v-model="playerAmount" />
        <label for="playersAmount" class="form-label">
          Player Amount
        </label>
      </div>
    </div>
    <div>
      <div class="form-floating mb-3">
        <input type="datetime-local" id="gameDate" class="form-control" placeholder="Game Date" v-model="gameDate" />
        <label for="gameDate" class="form-label">
          Game Date
        </label>
      </div>
    </div>
    <div>
      <button @click="validateAndPublish" class="w-100 btn btn-lg btn-primary">Create</button>
    </div>

  </div>
</template>

