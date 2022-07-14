<template>
  <div class="overflow-x-auto w-full">
    <h3 class="text-2xl font-bold mb-2">
      Clients
    </h3>
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <th>Name</th>
          <th>Contact</th>
          <th>Documents</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="({ attributes }, index) in clients" :key="index">
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-10 h-10">
                  <img :src="attributes.avatar ? attributes.avatar : unknown" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ attributes.firstName }} {{ attributes.lastName }}</div>
                <div class="text-sm opacity-50">{{ attributes.citizenId }}</div>
              </div>
            </div>
          </td>
          <td>
            📞 {{ attributes.phoneNumber }}
            <br>
            <span class="badge badge-ghost badge-sm">{{ attributes.email }}</span>
          </td>
          <td>3</td>
          <th>
            <button class="btn btn-primary btn-circle btn-xs mr-2">
              <f-icon icon="fas fa-folders" class="text-white w-4 h-4" />
            </button>
            <button class="btn btn-info btn-circle btn-xs p-1 mr-2">
              <f-icon icon="fas fa-pen" class="text-white w-4 h-4" />
            </button>
            <button class="btn btn-error btn-circle btn-xs">
              <f-icon icon="fas fa-ban" class="text-white w-4 h-4" />
            </button>
          </th>
        </tr>
        <!-- row 2 -->
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
const { find } = useStrapi4()

const unknown = 'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg'
const clients = ref([])

onMounted(async () => {
  const { data } = await find('clients', {
    pagination: {
      pageSize: 12,
      page: 1
    }
  })

  clients.value = data
})

</script>
