<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AccountService from "@/services/AccountService";
import {onBeforeMount, ref} from "vue";

const router = useRouter();
const data = ref("");
const error = ref("");


const logout = async () => {
  const authStore = useAuthStore();
  const response = await AccountService.logout(authStore.jwt, authStore.refreshToken);
  if (response.data) {
    authStore.userName = null;
    authStore.jwt = null;
    authStore.refreshToken = null;
    authStore.isAuthenticated = false;
    router.push('/');
  }
  data.value = response.data;
  error.value = response.errors;
}
logout();

</script>

<template>
  Logging Out
  {{data}}
  {{error}}
</template>

<style scoped>
</style>
