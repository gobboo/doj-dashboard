<template>
  <div>
    <!-- Put this part before </body> tag -->
    <input v-model="isOpen" type="checkbox" id="document-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Document Management</h3>

        <form ref="form" @submit.prevent="createDocument">
          <div class="form-control min-w-full w-full mr-1">
            <label class="label">
              <span class="label-text">Document URL</span>
            </label>
            <input name="docUrl" type="text" placeholder="https://docs.google.com/..." class="input input-bordered min-w-full w-full" />
          </div>

          <div class="flex gap-4">
            <div class="form-control flex-grow mr-1">
              <label class="label">
                <span class="label-text">Document Title</span>
              </label>
              <input name="title" type="text" placeholder="Joel Conry - Expungement" class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control max-w-xs">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <select name="category" class="select select-bordered w-full max-w-xs">
                <option disabled selected>Select Category</option>
                <option>Arbitration Agreement</option>
                <option>Adult Adoption</option>
                <option>Background Check Form</option>
                <option>Bail Bond Form</option>
                <option>Charge Appeal Form</option>
                <option>Civil Case</option>
                <option>Contract</option>
                <option>Court Summons</option>
                <option>Divorce Proceedings</option>
                <option>DOJ / PD Complaint Form</option>
                <option>Event Permit Request Form</option>
                <option>Expungement</option>
                <option>Intent To Press Charges</option>
                <option>Intent To Sue</option>
                <option>Living Will</option>
                <option>Marriage Licence</option>
                <option>Motion For Dismissal</option>
                <option>Name Change</option>
                <option>Ordination Request</option>
                <option>Plea Deal</option>
                <option>PreNup</option>
                <option>Private Real Estate Sale Form</option>
                <option>Restraining Order </option>
                <option>Settlement Agreement</option>
                <option>Search & Seizure Warrant</option>
                <option>Subpoena</option>
              </select>
            </div>
          </div>

          <input type="hidden" name="client" :value="route.params.id" />

          <div class="modal-action">
            <button class="btn normal-case btn-sm" @click="isOpen = false" type="button" :disabled="isLoading">Cancel</button>
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
const route = useRoute()
const emit = defineEmits(['newClient'])

const isLoading = ref(false)
const isOpen = ref(false)
const openModal = () => { isOpen.value = true }

const form = ref(null)

async function createDocument () {
  try {
    isLoading.value = true

    const formData = new FormData()
    formData.append('data', JSON.stringify(Object.fromEntries(new FormData(form.value))))

    const { data } = await client(`/documents`, {
      method: 'POST',
      body: formData
    })

    // Success Toast
    toast.success('Successfully created a new Document for this client.', {
      timeout: 5000
    })

    isOpen.value = false
    emit('newDocument', data)
  } catch(e) {
    toast.error(e.message || e, {
      timeout: 5000
    })
  }

  isLoading.value = false
}


defineExpose({
  openModal
})
</script>
