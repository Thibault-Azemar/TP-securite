<template>
    <div class="modal-overlay"  @click="$emit('close-modal')">
    <div class="modal-new">
    <p> Ajouter un film ou une série</p>
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
    