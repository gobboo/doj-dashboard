<template>
  <div class="container mx-auto px-32 pt-6">
    <Head>
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <Link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
    </Head>
    <Navbar />
    <div class="flex mt-8 gap-8">
      <DashboardNav class="flex-grow" v-if="user" v-show="route.path.includes('/dashboard')" />
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
// Fetch user
const user = useStrapiUser()
const route = useRoute()

// If router includes /dashboard route, show dashboard nav
</script>

<style>
</style>