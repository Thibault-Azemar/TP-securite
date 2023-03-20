<template>
    <main>
        <h1 class="title">Films and Series</h1>
    </main>
    <button class="button" @click="showModal = true">Add show</button>
    <input type="text" id="search" v-model="searchText" @input="search">
    <div>
        <table class="table is-striped is-fullwidth is-hoverable">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Cast</th>
                    <th>Description</th>
                    <th>Country</th>
                    <th>Release date</th>
                    <th>Duration</th>
                    <th>Genre</th>
                    <th>Note</th>
                    <th>Wishlist</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="show in shows" :key="show.id">
                    <td>{{ show.type }}</td>
                    <td>{{ show.title }}</td>
                    <td>{{ show.directorString }}</td>
                    <td>{{ show.castString }}</td>
                    <td>{{ show.description }}</td>
                    <td>{{ show.country }}</td>
                    <td>{{ show.releasedate }}</td>
                    <td>{{ show.duration }}</td>
                    <td>{{ show.typeshow }}</td>
                    <td>{{ show.note }}</td>
                    <td>{{ show.wishlist }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <AddShowModal v-show="showModal" @close-modal="showModal = false"/>
</template>
<script>
import { getFirestore, getDocs, collection } from "firebase/firestore";
import AddShowModal from '../components/Home/AddShowModal.vue';
import Fuse from 'fuse.js'

export default {
  components: { AddShowModal },
  data() {
    const shows=[];
    const fuse = new Fuse(shows, {
     keys: ['title', 'director', 'cast', 'description', 'country', 'releasedate', 'duration', 'typeshow', 'note', 'wishlist']
      })

    return {
      showModal: false,
      shows : shows,
      searchText: '',
      fuse : fuse
    }
  },
  methods:{
    getShows: async function () {
            const db = getFirestore();
            const showsRef = collection(db, "shows");
            const querySnapshot = await getDocs(showsRef);
            querySnapshot.forEach((doc) => {
                this.shows.push(doc.data());
            });
            this.shows.forEach((show) => {
                show.castString = show.cast.join(',').replaceAll(',', ', ');
                show.directorString = show.director.join(',').replaceAll(',', ', ');
            });
            console.log(this.shows)
            console.log(this.fuse.search('Among'))
        },
    search() {
      const searchRegex = new RegExp(this.searchText, 'i');
      this.shows = this.shows.filter(show => searchRegex.test(show.title));
    },

  },
  beforeMount() {
    this.getShows();
  }
}


</script>