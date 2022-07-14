<template>
  <div class="flex flex-col gap-2 w-1/4 max-w-md bg-gray-200 shadow-lg px-2 py-3 rounded-md mt-10">
    <a v-for="(route, index) in routes" :key="index" :class="`btn ${isActive(route.route) ? 'btn-primary' : 'btn-ghost'} btn-md normal-case text-md justify-start`" :href="route.route">
      {{ route.name }}
    </a>
  </div>
</template>

<script setup>
const user = useStrapi4();
const route = useRoute();

// Check if current route is active
const isActive = (name) => {
  console.log(route.path)
  return route.path === name;
}

const routes = [
  { name: 'Dashboard', route: '/dashboard' },
  { name: 'Clients', route: '/dashboard/clients' },
  { name: 'Account', route: '/dashboard/account' },
]

</script>
