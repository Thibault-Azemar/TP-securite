<template>
<div class="modal-overlay"  @click="$emit('close-modal')">
    <div class="modal-new">
    <h6>Connecté !</h6>
    <p>Heureux de vous revoir !</p>
    <button>Go Home</button>
    </div>
    <div class="close" @click="$emit('close-modal')">
    <p> Fermer </p>
    </div>
</div>
</template>

<script>
export default {
}
</script>

<style scoped>
@import "../../assets/css/modal.css";
</style>
