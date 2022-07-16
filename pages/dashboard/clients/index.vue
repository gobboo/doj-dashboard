<template>
  <div class="w-full">
    <create-client class="absolute" ref="modal" @new-client="addClient" />
    <clients :clients="clientList" class="flex-grow" @create-client="modal.openModal()" />
  </div>
</template>


<script setup>
const { find } = useStrapi4()

const modal = ref()
const clientList = ref([])

onMounted(async () => {
  const { data } = await find('clients', {
    pagination: {
      pageSize: 12,
      page: 1,
    },
    populate: 'avatar'
  })

  clientList.value = data
})

definePageMeta({
  middleware: 'auth'
})

function addClient (client) {
  clientList.value.push(client)
}

</script>