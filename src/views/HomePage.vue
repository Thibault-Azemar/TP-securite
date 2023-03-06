<template>
    <main>
        <h1 class="title">Films and Series</h1>
    </main>
    <div class="save-btn">
        <button @click="showModal = true">Save</button>
    </div>
    <AddShowModal v-show="showModal" @close-modal="showModal = false"/>
</template>
<script>

import AddShowModal from '../components/Home/AddShowModal.vue'

export default {
  components: { AddShowModal },
  data() {
    return {
      showModal: false,
    }
  },
}

</script>