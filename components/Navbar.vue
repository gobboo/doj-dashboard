<template>
  <div class="navbar bg-base-100 text-neutral-content px-0 py-4">
    <div class="flex-1">
      <NuxtLink class="text-title text-2xl font-bold select-none" to="/">
        DDOJ
      </NuxtLink>
    </div>

    <div class="flex-none">
      <a v-for="(route, index) in routes" :key="index" :href="route.route" class="text-title font-medium px-6">
        {{ route.name }}
      </a>

      <NuxtLink v-if="user" to="/dashboard">
        <button class="btn btn-primary ml-14 rounded-full px-6 text-white normal-case">
          Dashboard
        </button>
      </NuxtLink>
      <NuxtLink v-else to="/auth">
        <button class="btn btn-primary ml-14 rounded-full px-6 text-white normal-case">
          Sign In
        </button>
      </NuxtLink>
    </div>

  </div>
</template>

<script setup>
const user = useStrapiUser()

const routes = [
  { name: 'About', route: '/loans' },
  { name: 'Pricing', route: '/about' },
  { name: 'Contact', route: '/contact' }
]

</script>