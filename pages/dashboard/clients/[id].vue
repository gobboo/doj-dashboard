<template>
  <div class="w-full">
    <create-document class="absolute" ref="createModal" @new-document="addDocument" />
    <documents :client="curClient" :documents="documentList" @create-document="createModal.openModal()" @edit-document="" @remove-document="removeDocument" />
  </div>
</template>

<script lang="ts" setup>
const { find, findOne } = useStrapi4()
const route = useRoute()

const curClient = ref(null)
const documentList = ref([])

const createModal = ref(null)

onMounted(async () => {
  // Fetch client
  const { id } = route.params
  const { data: client } = await findOne('clients', parseInt(id as string))

  curClient.value = client

  const { data } = await find('documents', {
    filters: {
      clients: {
        id: {
          $contains: id
        }
      },
    },
    pagination: {
      pageSize: 12,
      page: 1,
    }
  })

  documentList.value = data
})

definePageMeta({
  middleware: 'auth'
})

function addDocument (client) {
  documentList.value.push({ id: client.id, attributes: { ...client } })
}

function removeDocument (id) {
  documentList.value = documentList.value.filter(doc => doc.id !== id)
}
</script>