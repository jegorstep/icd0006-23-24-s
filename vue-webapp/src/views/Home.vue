<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  Home
  {{authStore.userName}}
</template>
