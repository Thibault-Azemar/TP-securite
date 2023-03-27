<template>
    <div class="modal-overlay"  @click="$emit('close-modal')">
    <div class="box modal-new" @click.stop>
        <p v-if="!show"> Ajouter un film ou une série</p>
        <p v-else> Modifier un film ou une série</p>
        <div class="control">
            <label class="radio">
                <input type="radio" name="answer" value="Film" :checked="show ? show['type'] === 'film' ? true : false : false">Film
            </label>
            <label class="radio">
                <input type="radio" name="answer" value="Serie" :checked="show ? show['type'] === 'serie' ? true : false : false">Serie
            </label>
        </div>
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Titre du film" id="title" :value="show? show['title'] : ''">
        </div>
        </div>
        <div class="field">
        <div class="control">
            <textarea class="textarea" placeholder="Description" id = "description" :value="show? show['description'] : ''"></textarea>
        </div>
        </div>
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Nom du/des réalisateurs" id = "director" :value="show? show['director'] : ''">
        </div>
        </div>
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Nom du/des acteurs" id = "cast" :value="show? show['cast'] : ''">
        </div>
        </div>
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Pays de réalisation" id = "country" :value="show? show['country'] : ''">
        </div>
        </div>
        <div class="field">
            <label class="label">Date de sortie</label>
        <div class="control">
            <input class="input" type="text" placeholder="Date de sortie (année)" id = "releasedate" :value="show? show['releasedate'] : ''">
        </div>
        </div>
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Durée du film (en minutes)" id = "duration" :value="show? show['duration'] : ''">
        </div>
        </div>
        <div class="field">
        <div class="control">
            <input class="input" type="text" placeholder="Type du film" id = "typeshow" :value="show? show['typeshow'] : ''">
        </div>
        </div>
        <div class="field">
            <label class="label">Note</label>
        <div class="control">
            <input class="rating" max="5" step="0.5" type="range" id="note" :value="show? show['note'] : ''">
        </div>
        </div>
        <p><button class="button is-primary" @click="SaveShow">Submit</button></p>
    </div>
    <div class="modal-close is-large" @click="$emit('close-modal')">
    <p> Fermer </p>
    </div>
    </div>
    </template>
    
    <script>
    import { getFirestore , doc, setDoc, collection } from "firebase/firestore";

    export default {
        name: "NewShow",
        props: {
            show: Object,
        },
        methods: {
            SaveShow : SaveShow,
        },
    }

    let db = getFirestore();

    function SaveShow(){
        console.log("test")
        const picked = document.querySelector('input[name="answer"]:checked').value;
        const title = document.getElementById('title').value;
        const director = document.getElementById('director').value.split(',');
        const cast = document.getElementById('cast').value.split(',');
        const description = document.getElementById('description').value;
        const country = document.getElementById('country').value.split(',');
        const releasedate = document.getElementById('releasedate').value;
        const duration = document.getElementById('duration').value;
        const typeshow = document.getElementById('typeshow').value.split(',');
        const note = document.getElementById('note').value;

        const shows = collection(db, "shows");
        setDoc(doc(shows), {
            type : picked,
            title: title,
            director: director,
            cast: cast,
            description: description,
            country: country,
            releasedate: releasedate,
            duration: duration,
            typeshow: typeshow,
            note: note,
            dateAdded: new Date(),
        });

        this.$emit('close-modal');

    }

    </script>
    
    <style scoped>
    @import "../../assets/css/modal.css";
    </style>
    