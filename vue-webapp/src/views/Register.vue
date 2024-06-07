<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AccountService from '@/services/AccountService';
import {useAuthStore} from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref('admin@eesti.ee');
const pwd = ref('Kala.maja1');
const firstName = ref('Jegor');
const lastName = ref('Stepanov');
const country = ref('Eesti');
const sex = ref('');
const  nickname = ref('Boss')

const emailValidationError = ref('');
const pwdValidationError = ref('');
const firstNameValidationError = ref('');
const lastNameValidationError = ref('');
const countryValidationError = ref('');
const sexValidationError = ref('');

const errors = ref("");

const isError = ref(false);

const validateAndRegister = async () => {
  isError.value = false;

  if (email.value.length < 5) {
    emailValidationError.value = 'Invalid email length';
    isError.value = true;
  } else {
    emailValidationError.value = '';
  }

  if (pwd.value.length < 6) {
    pwdValidationError.value = 'Invalid pwd length';
    isError.value = true;
  } else {
    pwdValidationError.value = '';
  }

  if (firstName.value.length < 1) {
    firstNameValidationError.value = 'Must be at least one character long first name!';
    isError.value = true;
  } else {
    firstNameValidationError.value = '';
  }

  if (lastName.value.length < 1) {
    lastNameValidationError.value = 'Must be at least one character long last name!';
    isError.value = true;
  } else {
    lastNameValidationError.value = '';
  }

  if (country.value.length < 1) {
    countryValidationError.value = 'Country name must be at least one character long!';
    isError.value = true;
  } else {
    countryValidationError.value = '';
  }

  if (sex.value.length === 0) {
    sexValidationError.value = 'Choose your sex!';
    isError.value = true;
  } else {
    sexValidationError.value = '';
  }

  if (!isError.value) {
    const response = await AccountService.register(email.value, pwd.value, firstName.value, lastName.value, country.value, sex.value, nickname.value);
    if (response.data) {
      authStore.jwt = response.data.token;
      authStore.refreshToken = response.data.refreshToken;
      authStore.userName = response.data.firstName + " " + response.data.lastName;
      authStore.isAuthenticated = true;
      router.push('/');
    } else if (response.errors && response.errors.length > 0) {
      emailValidationError.value = 'Email already exists!';
      errors.value = response.errors;
    }
  }
};
</script>

<style scoped>
.error-input {
  visibility: hidden;
}
.error-input.visible {
  visibility: visible;
}
</style>

<template>
  <div class="row">
    <div class="col-md-5">
      <h2>Registration</h2>
      <hr />
      <div v-if="emailValidationError" class="text-danger error-input" role="alert">{{ emailValidationError }}</div>
      <div class="form-floating mb-3">
        <input
            v-model="email"
            type="email"
            id="email"
            class="form-control"
            autocomplete="email"
            placeholder="name@example.com"
        />
        <label for="email" class="form-label">Email</label>
      </div>
      <div v-if="pwdValidationError" class="text-danger error-input" role="alert">{{ pwdValidationError }}</div>
      <div class="form-floating mb-3">
        <input
            v-model="pwd"
            type="password"
            id="password"
            class="form-control"
            autocomplete="current-password"
            placeholder="password"
        />
        <label for="password" class="form-label">Password</label>
      </div>
      <div v-if="firstNameValidationError" class="text-danger error-input" role="alert">{{ firstNameValidationError }}</div>
      <div class="form-floating mb-3">
        <input
            v-model="firstName"
            type="text"
            id="firstName"
            class="form-control"
            autocomplete="name"
            placeholder="Tamm"
        />
        <label for="firstName" class="form-label">First Name</label>
      </div>
      <div v-if="lastNameValidationError" class="text-danger error-input" role="alert">{{ lastNameValidationError }}</div>
      <div class="form-floating mb-3">
        <input
            v-model="lastName"
            type="text"
            id="lastName"
            class="form-control"
            autocomplete="family-name"
            placeholder="Saar">
        <label for="lastName" class="form-label">Last Name</label>
      </div>
        <div class="form-floating mb-3">
          <input
              v-model="nickname"
              type="text"
              id="nickname"
              class="form-control"
              autocomplete="family-name"
              placeholder="Boss"
          />
          <label for="nickname" class="form-label">NickName</label>
      </div>
      <div v-if="countryValidationError" class="text-danger error-input" role="alert">{{ countryValidationError }}</div>
      <div class="form-floating mb-3">
        <input
            v-model="country"
            type="text"
            id="country"
            class="form-control"
            autocomplete="country"
            placeholder="Estonia"
        />
        <label for="country" class="form-label">Country</label>
      </div>
      <div v-if="sexValidationError" class="text-danger error-input" role="alert">{{ sexValidationError }}</div>
      <div class="form-floating mb-3">
        <select id="sex" class="form-select" v-model="sex">
          <option value=""></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <label for="sex" class="form-label">Sex</label>
      </div>
      <div>
        <button @click="validateAndRegister" class="w-100 btn btn-lg btn-primary">Register</button>
      </div>
    </div>
  </div>
  {{errors}}
</template>
