<template>
  <div class="overflow-x-none w-full">
    <div class="flex justify-between">
      <h3 class="text-2xl font-bold mb-2">
        {{ client ? client.attributes.firstName : 'John' }} {{ client ? client.attributes.lastName : 'Doe' }}
      </h3>

      <button class="btn btn-primary normal-case btn-sm text-white" @click="$emit('createDocument')">
        <Icon name="fa6-solid:plus" class="w-4 h-4 mr-1" />
        Create
      </button>
    </div>
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <th>ID</th>
          <th>Category</th>
          <th>Submitted</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <TransitionGroup name="table">
          <tr v-for="({ id, attributes }, index) in documents" :key="index">
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <td>
              <div class="flex items-center space-x-3">
                <div class="font-bold">{{ id }}</div>
              </div>
            </td>
            <td>
              {{ attributes.category }}
            </td>
            <td v-if="attributes.submissionDate">
              {{ attributes.submissionDate.split('-')[2] }}/{{ attributes.submissionDate.split('-')[1] }}/{{ attributes.submissionDate.split('-')[0] }}
            </td>
            <th>
              <a class="btn btn-primary btn-circle btn-xs mr-2" :href="attributes.docUrl" target="_blank">
                <Icon name="fa6-solid:arrow-up-right-from-square" class="text-white w-4 h-4" />
              </a>
              <button class="btn btn-info btn-circle btn-xs p-1 mr-2">
                <Icon name="fa6-solid:pen" class="text-white w-4 h-4" />
              </button>
              <button class="btn btn-error btn-circle btn-xs" @click="deleteDocument(id)">
                <Icon name="fa6-solid:ban" class="text-white w-4 h-4" />
              </button>
            </th>
          </tr>
        </TransitionGroup>
      </tbody>
    </table>

    <p v-if="documents.length === 0" class="text-center mt-12 font-medium">
      This Client does not have any Documents attached.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification';

const { delete: _delete } = useStrapi4()
const toast = useToast()

const emit = defineEmits(['createDocument', 'removeDocument'])
defineProps(['client', 'documents'])

async function deleteDocument (id) {
  await _delete('documents', id)
    .then(() => {
      // Success Toast
      toast.success('Document Deleted Successfully')
      emit('removeDocument', id)
    })
}

</script>

<style>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
