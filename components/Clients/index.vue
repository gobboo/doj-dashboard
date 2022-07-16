<template>
  <div class="overflow-x-none w-full">
    <div class="flex justify-between">
      <h3 class="text-2xl font-bold mb-2">
        Clients
      </h3>

      <button class="btn btn-primary normal-case btn-sm text-white" @click="$emit('createClient')">
        <f-icon icon="fas fa-plus" class="w-4 h-4 mr-1" />
        Create
      </button>
    </div>
    <table class="table w-full">
      <!-- head -->
      <thead class="bg-white text-left">
        <Transition name="fade">
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Documents</th>
            <th></th>
          </tr>
        </Transition>
      </thead>
      <tbody>
        <!-- row 1 -->
        <TransitionGroup name="table">
          <tr v-for="({ id, attributes }, index) in clients" :key="index">
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <td>{{ id }}</td>
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-10 h-10">
                    <img :src="getFileUrl(attributes.avatar)" alt="Avatar" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{{ attributes.firstName }} {{ attributes.lastName }}</div>
                  <div class="text-sm opacity-50">{{ attributes.citizenId }}</div>
                </div>
              </div>
            </td>
            <td>
              <span class="flex gap-1 items-center">
                <f-icon icon="fas fa-phone" class="w-4 h-4" />
                {{ attributes.phoneNumber }}
              </span>
              <span class="badge badge-ghost badge-sm">{{ attributes.email }}</span>
            </td>
            <td>3</td>
            <th>
              <NuxtLink class="btn btn-primary btn-circle btn-xs mr-2" :to="`/dashboard/clients/${id}`">
                <f-icon icon="fas fa-folders" class="text-white w-4 h-4" />
              </NuxtLink>
              <button class="btn btn-info btn-circle btn-xs p-1 mr-2">
                <f-icon icon="fas fa-pen" class="text-white w-4 h-4" />
              </button>
              <button class="btn btn-error btn-circle btn-xs" @click="deleteClient(id)">
                <f-icon icon="fas fa-ban" class="text-white w-4 h-4" />
              </button>
            </th>
          </tr>
        </TransitionGroup>
        <!-- row 2 -->
      </tbody>
    </table>

    <p v-if="clients.length === 0" class="text-center mt-12 font-medium">
      You currently don't have any clients, click Create above to create one.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification';

const url = useStrapiUrl()
const toast = useToast()
const { delete: _delete } = useStrapi4()

const emit = defineEmits(['createClient', 'removeClient'])

interface Client {
  id: string
  attributes: {
    firstName: string
    lastName: string
    citizenId: string
    phoneNumber: string
    email: string
    avatar: string
  }
}

async function deleteClient (id) {
  await _delete('clients', id)
    .then(() => {
      // Success Toast
      toast.success('Client Deleted Successfully')
      emit('removeClient', id)
    })
}

defineProps({
  clients: {
    type: Array<Client>,
    default: () => [],
  },
})

// Fetch uploaded file url from strapi
const unknown = 'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'
const getFileUrl = (file) => {
  if (file.data) {
    return url.replace('/api', '') + file.data.attributes.url
  }
  return unknown
}

</script>

<style>
.table-enter-active,
.table-leave-active {
  transition: all 0.5s ease;
}
.table-enter-from,
.table-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
