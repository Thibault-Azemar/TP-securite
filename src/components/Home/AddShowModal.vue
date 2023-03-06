<template>
    <div class="modal-overlay"  @click="$emit('close-modal')">
    <div class="box modal-new" @click.stop>
        <p> Ajouter un film ou une série</p>
        <div class="control">
            <label class="radio">
                <input type="radio" name="answer" value="film" v-model="picked">Film
            </label>
            <label class="radio">
                <input type="radio" name="answer" value="serie" v-model="picked">Serie
            </label>
        </div>
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Titre du film" v-model="title">
        </div>
        </div>
        <div class="field">
        <div class="control">
            <textarea class="textarea" placeholder="Description" v-model="description"></textarea>
        </div>
        </div>
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Nom du/des réalisateurs" v-model="director">
        </div>
        </div>
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Nom du/des acteurs" v-model="cast">
        </div>
        </div>
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Pays de réalisation" v-model="country">
        </div>
        </div>
        <div class="field">
            <label class="label">Date de sortie</label>
        <div class="control">
            <input class="input" type="month" placeholder="Date de sortie" v-model="releasedate">
        </div>
        </div>
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Durée du film" v-model="duration">
        </div>
        </div>
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Type du film" v-model="typeshow">
        </div>
        </div>
        <div class="field">
            <label class="label">Note</label>
        <div class="control">
            <input class="rating" max="5" step="0.5" type="range" value="1">
        </div>
        </div>
        <p><button class="button is-primary">Submit</button></p>
    </div>
    <div class="modal-close is-large" @click="$emit('close-modal')">
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
    