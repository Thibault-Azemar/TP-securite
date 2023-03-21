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
                    <th>Regardé</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="show in SortedShows" :key="show.id">
                    <td>{{ show.type }}</td>
                    <td v-html="highlightMatches(show.title)"></td>
                    <td v-html="highlightMatches(show.directorString)"></td>
                    <td>{{ show.castString }}</td>
                    <td v-html="highlightMatches(show.description)"></td>
                    <td v-html="highlightMatches(show.country)"></td>
                    <td v-html="highlightMatches(show.releasedate)"></td>
                    <td>{{ show.duration }}</td>
                    <td v-html="highlightMatches(show.typeshow)"></td>
                    <td>{{ show.ratingStars }}</td>
                    <td @click="changeWish(show)">{{ show.wishlist }}</td>
                    <td @click="changeSeen(show)">{{ show.seen }}</td>
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
import { getFirestore, getDocs, collection , doc, setDoc} from "firebase/firestore";
import AddShowModal from '../components/Home/AddShowModal.vue';
import { getAuth } from 'firebase/auth';

export default {
  components: { AddShowModal },
  data() {
    const shows=[];
    const auth = getAuth();
    let db = getFirestore();
    const usershows = collection(db, "usershows");

    return {
      showModal: false,
      shows : shows,
      auth,
      usershows,
      searchText: '',
      currentSort:'name',
      currentSortDir:'asc',
      pageSize:2,
      currentPage:1
    }
  },
  methods:{
    changeSeen(show) {
      console.log(this.auth.currentUser.uid)
      console.log(show)
      if (show.seen === "✅") {
        show.seen = "❌";

      } else {
        setDoc(doc(this.usershows), {
          userid: this.auth.currentUser.uid,
          showlist: show.id.split(","),
          wishlist: false,
        });
        show.seen = "✅";
      }
    },
    changeWish(show) {
      console.log(this.auth.currentUser.uid)
      console.log(show)
      if (show.wishlist === "❤️") {
        show.wishlist = "🤍";
      } else {
        show.wishlist = "❤️";
      }
    },
    highlightMatches(text) {
            const matchExists = text.toLowerCase().includes(this.searchText.toLowerCase());
            if (!matchExists) return text;

            const re = new RegExp(this.searchText, 'ig');
            return text.replace(re, matchedText => `<strong>${matchedText}</strong>`);
        },
    getShows: async function () {
            const db = getFirestore();
            const showsRef = collection(db, "shows");
            const querySnapshot = await getDocs(showsRef);
            querySnapshot.forEach((doc) => {
                this.shows.push(doc.data());
                this.shows[this.shows.length - 1].id = doc.id;
            });
            this.shows.forEach((show) => {
                show.castString = show.cast.join(',').replaceAll(',', ', ');
                show.directorString = show.director.join(',').replaceAll(',', ', ');

                if (show.seen) {
                    show.seen = "✅";
                } else {
                    show.seen = "❌";
                }
                if (show.wishlist) {
                    show.wishlist = "❤️";
                } else {
                    show.wishlist = "🤍";
                }
                show.ratingStars = "";
                for (let i = 0; i < show.note; i++) {
                    show.ratingStars += "⭐";
                }
            });

            // accéder à une table firestore identifé par l'identifiant mail utilisateur ou en créer une nouvelle si elle n'existe pas
            const usershowsRef = collection(db, "usershows");
            const querySnapshot2 = await getDocs(usershowsRef, this.auth.currentUser.uid);
            if (querySnapshot2.empty) {
              setDoc(doc(usershowsRef, this.auth.currentUser.uid), {
                userid: this.auth.currentUser.uid,
                showlist: "test3",
                wishlist: "test3",
              });
            }
            else {
              querySnapshot2.forEach((doc) => {
                console.log(doc.data());
              });
            }
            
        },
    search: function() {

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
    },

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
      }).filter(row => {
        const title = row.title.toLowerCase();
        const directorString = row.directorString.toLowerCase();
        const description = row.description.toLowerCase();
        const country = row.country.toLowerCase();
        const releasedate = row.releasedate.toLowerCase();
        const typeshow = row.typeshow.toLowerCase();

        return title.includes(this.searchText.toLowerCase()) || 
        directorString.includes(this.searchText.toLowerCase()) || 
        description.includes(this.searchText.toLowerCase()) || 
        country.includes(this.searchText.toLowerCase()) || 
        releasedate.includes(this.searchText.toLowerCase()) || 
        typeshow.includes(this.searchText.toLowerCase());
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    }
  }
}


</script>