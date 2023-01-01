<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">사용자 정보</h3>

    <div class="mt-8">
      <h4 class="text-gray-600">사용자 정보</h4>

      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Account settings
          </h2>
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label class="text-gray-700" for="username">Username</label>
              <input
                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="text"
                v-model="user.username" />
            </div>
            <div>
              <label class="text-gray-700" for="emailAddress">Email Address</label>
              <input
                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="email"
                v-model="user.email" />
            </div>
            <div>
              <label class="text-gray-700" for="password">Password</label>
              <input
                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="password"
                v-model="user.password" />
            </div>
            <div>
              <label class="text-gray-700" for="passwordConfirmation"> Password Confirmation </label>
              <input
                class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                type="password"
                v-model="user.confirm" />
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button type="button" class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700" >
              Save
            </button>
            <button type="button" class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none" @click="router.back()">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRouter } from "vue-router";

interface User {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

export default defineComponent({
  setup() {
    console.log("setup");
    const router = useRouter();
    const user = ref<User>({
      username: "",
      email: "",
      password: "",
      confirm: "",
    });

    const register = () => {
      const data = JSON.parse(JSON.stringify(user.value));
      console.log("Registered: ", data);
    };

    return {
      user,
      router,
      register,
    };
  },
});
</script>
