<template>
  <div>
    <!-- Put this part before </body> tag -->
    <input v-model="isOpen" type="checkbox" id="client-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Client Management</h3>

        <form ref="form" @submit.prevent="createClient">
          <div class="flex gap-4">
            <div class="form-control flex-grow mr-1">
              <label class="label">
                <span class="label-text">First Name</span>
              </label>
              <input name="firstName" type="text" placeholder="Joel" class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control flex-grow">
              <label class="label">
                <span class="label-text">Last Name</span>
              </label>
              <input name="lastName" type="text" placeholder="Conry" class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control flex-grow">
              <label class="label">
                <span class="label-text">Citizen ID </span>
              </label>
              <input name="citizenId" type="number" placeholder="00000" class="input input-bordered w-full max-w-xs" />
            </div>
          </div>
          <div class="flex gap-4">
            <div class="form-control flex-grow mr-1">
              <label class="label">
                <span class="label-text">Phone Number</span>
              </label>
              <input name="phoneNumber"  type="number" placeholder="1010101010" class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control flex-grow">
              <label class="label">
                <span class="label-text">E-Mail (Discord)</span>
              </label>
              <input name="email" type="text" placeholder="Gobbo#1857" class="input input-bordered w-full max-w-xs" />
            </div>
          </div>

          <div class="my-4">
            <label class="inline-block mb-2 text-gray-500">Personal Picture</label>
            <div class="flex items-center justify-center w-full">
              <label
                class="flex flex-col w-full h-32 border-4 border-purple-300 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div class="flex flex-col items-center justify-center pt-7">
                  <Icon icon="far fa-cloud-arrow-up" class="w-8 h-8 text-gray-400 group-hover:text-gray-600" />
                  <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    {{ avatarName || 'Attach an image' }}
                  </p>
                </div>
                <input ref="avatar" @change="changeImage" type="file" accept="image/*" class="opacity-0" />
              </label>
            </div>
          </div>

            <div class="modal-action">
              <button class="btn normal-case btn-sm" @click="isOpen = false" type="button">Cancel</button>
              <button :class="`btn btn-primary normal-case btn-sm ${isLoading ? 'loading' : ''}`" type="submit" :disabled="isLoading">Create</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'

const client = useStrapiClient()
const toast = useToast()
const emit = defineEmits(['newClient'])

const isLoading = ref(false)
const isOpen = ref(false)
const openModal = () => { isOpen.value = true }

const form = ref(null)
const avatarName = ref('')
const avatar = ref(null)


// Function to convert bytes to closest KB/MB/GB/TB
const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  if (i === 0) return bytes + ' ' + sizes[i]
  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}

function changeImage () {
  avatarName.value = `${avatar.value.files[0].name} ${bytesToSize(avatar.value.files[0].size)}`
}

async function createClient () {
  try {
    isLoading.value = true
    const formData = new FormData()
    formData.append('files.avatar', avatar.value.files[0])
    formData.append('data', JSON.stringify(Object.fromEntries(new FormData(form.value))))

    const { data } = await client(`/clients`, {
      method: 'POST',
      body: formData
    })

    // Success Toast
    toast.success('Successfully created a new client, please refresh the page to see the changes.', {
      timeout: 5000
    })

    form.value.reset()
    isOpen.value = false
    emit('newClient', data)
  } catch(e) {
    console.log(e)
    toast.error(e.message, {
      timeout: 5000
    })
  }

  isLoading.value = false
}


defineExpose({
  openModal
})
</script>
