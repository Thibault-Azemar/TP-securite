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
                    <th @click="sort('type')">Type</th>
                    <th @click="sort('title')">Title</th>
                    <th @click="sort('director')">Director</th>
                    <th @click="sort('cast')">Cast</th>
                    <th @click="sort('description')">Description</th>
                    <th @click="sort('country')">Country</th>
                    <th @click="sort('releasedate')">Release date</th>
                    <th @click="sort('duration')">Duration</th>
                    <th @click="sort('typeshow')">Genre</th>
                    <th @click="sort('wishlist')">Note</th>
                    <th>Wishlist</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="show in SortedShows" :key="show.id">
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
        <p>
          <button @click="prevPage">Previous</button> 
          <button @click="nextPage">Next</button>
        </p>
        debug: sort={{currentSort}}, dir={{currentSortDir}}
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
      fuse : fuse,
      currentSort:'name',
      currentSortDir:'asc',
      pageSize:2,
      currentPage:1
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
        },
    search() {
      this.shows = this.fuse.search(this.searchText);
    },
    sort:function(s) {
    //if s == current sort, reverse
    if(s === this.currentSort) {
      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
    }
    this.currentSort = s;
    },
    nextPage:function() {
    if((this.currentPage*this.pageSize) < this.shows.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    }
  },
  beforeMount() {
    this.getShows();
  },
  computed: {
    SortedShows:function() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.shows.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    }
  }
}


</script>