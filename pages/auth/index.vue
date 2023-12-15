<template>
  <div class="w-full mt-20 flex justify-center align-center">
    <div class="px-8 py-8 rounded-lg h-1/5">

      <form class="form-control w-full max-w-xs" @submit.prevent="authenticate">
        <label class="label">
          <span class="label-text">Citizen ID</span>
        </label>
        <input v-model="id" type="text" placeholder="14637" min="5" max="5" class="input input-bordered w-full max-w-xs" />
        <label class="label mt-2">
          <span class="label-text">Password</span>
        </label>
        <input v-model="password" type="password" placeholder="14637"  class="input input-bordered w-full max-w-xs" />

        <button type="submit" class="btn btn-primary normal-case btn-md mt-6">
          Sign In
        </button>
        <span class="text-xs text-title justify-center mt-1 flex align-center">
          Secured by SecuroServ
          <img src="/img/logos/securoserv.webp" class="ml-1 h-4 w-4 shadow-lg" />
        </span>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { login } = useStrapiAuth()

const router = useRouter();

const id: Ref<string> = ref('');
const password: Ref<string> = ref('');

async function authenticate () {
  await login({ identifier: id.value, password: password.value })
    .then(() => {
      router.push('/');
    })
    .catch((err) => {
      console.log(err)
    });
}

</script>