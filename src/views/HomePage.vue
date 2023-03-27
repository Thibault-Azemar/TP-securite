<template>
    <main>
        <h1 class="title">Films and Series</h1>
    </main>
    <div v-if="isLoggedIn">
      <button class="button" @click="addShow()">Add show</button>
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
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="show in SortedShows" :key="show.id">
                      <td>{{ show.type }}</td>
                      <td v-html="highlightMatches(show.title)"></td>
                      <td v-html="highlightMatches(show.directorString)"></td>
                      <td>{{ show.castString }}</td>
                      <td v-html="highlightMatches(show.description)"></td>
                      <td v-html="highlightMatches(show.countryString)"></td>
                      <td v-html="highlightMatches(show.releasedate)"></td>
                      <td>{{ show.duration }}</td>
                      <td v-html="highlightMatches(show.typeshowString)"></td>
                      <td>{{ show.ratingStars }}</td>
                      <td @click="changeWish(show)">{{ show.wishlist }}</td>
                      <td @click="changeSeen(show)">{{ show.seen }}</td>
                      <td>
                          <button class="button is-small is-danger" @click="deleteShow(show)">Delete</button>
                          <button class="button is-small is-warning" @click="editShow(show)">Edit</button>
                      </td>
                  </tr>
              </tbody>
          </table>
          <p>
            <button @click="prevPage">Previous</button> 
            <button @click="nextPage">Next</button>
          </p>
          debug: sort={{currentSort}}, dir={{currentSortDir}}
      </div>
      <AddShowModal v-show="showModal" :show="isShow" @close-modal="showModal = false"/>
  </div>
  <div v-else>
    <p>Vous devez être connecté pour accéder à cette page</p>
  </div>
</template>
<script>
import { getFirestore, getDocs, collection , doc, setDoc, updateDoc} from "firebase/firestore";
import AddShowModal from '../components/Home/AddShowModal.vue';
import { getAuth } from 'firebase/auth';

export default {
  components: { AddShowModal },
  data() {
    const shows=[];
    const seenList = [];
    const wishList = [];
    const auth = getAuth();
    const db = getFirestore();
    const usershows = collection(db, "usershows");
    let isShow = [] | undefined;
    let isLoggedIn = true;
    const wish = false;

    return {
      showModal: false,
      shows : shows,
      seenList : seenList,
      wishList : wishList,
      db : db,
      auth,
      usershows,
      searchText: '',
      currentSort:'name',
      currentSortDir:'asc',
      pageSize:10,
      currentPage:1,
      isShow : isShow,
      isLoggedIn : isLoggedIn,
      wish : wish
    }
  },
  methods:{
    changeSeen(show) {
      console.log(this.seenList)
      if (show.seen === "✅") {
        this.seenList.splice(this.seenList.indexOf(show.id), 1);
        show.seen = "❌";
      } else {
        this.seenList.push(show.id);
        show.seen = "✅";
      }

      const usershowsRef = collection(this.db, "usershows");
      
      updateDoc(doc(usershowsRef, this.auth.currentUser.uid), {
        seenlist: this.seenList,
      }, { merge: true });
      console.log(this.seenList)
    },
    changeWish(show) {
      console.log(this.wishList)
      if (show.wishlist === "❤️") {
        this.wishList.splice(this.wishList.indexOf(show.id), 1);
        show.wishlist = "🤍";
      } else {
        this.wishList.push(show.id);
        show.wishlist = "❤️";
      }

      const usershowsRef = collection(this.db, "usershows");
      updateDoc(doc(usershowsRef, this.auth.currentUser.uid), {
        wishlist: this.wishList,
      }, { merge: true });
      console.log(this.wishList)

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

            // accéder à une table firestore identifé par l'identifiant mail utilisateur ou en créer une nouvelle si elle n'existe pas
            const usershowsRef = collection(db, "usershows");
            const querySnapshot2 = await getDocs(usershowsRef, this.auth.currentUser.uid);
            if (querySnapshot2.empty) {
              setDoc(doc(usershowsRef, this.auth.currentUser.uid), {
                userid: this.auth.currentUser.uid,
                seenlist: this.seenList,
                wishlist: this.wishList,
              });
            }
            else {
              querySnapshot2.forEach((doc) => {
                this.seenList = doc.data().seenlist;
                this.wishList = doc.data().wishlist;
              });
            }

            // récupérer les données de la table firestore
            
            querySnapshot.forEach((doc) => {
                this.shows.push(doc.data());
                this.shows[this.shows.length - 1].id = doc.id;
            });
            this.shows.forEach((show) => {
                show.castString = show.cast.join(',').replaceAll(',', ', ');
                show.directorString = show.director.join(',').replaceAll(',', ', ');
                show.countryString = show.country.join(',').replaceAll(',', ', ');
                show.typeshowString = show.typeshow.join(',').replaceAll(',', ', ');
                console.log(show.id)


                if (this.seenList.includes(show.id)) {
                    show.seen = "✅";
                    console.log("vu")
                } else {
                    show.seen = "❌";
                    console.log("non vu")
                }

                if (!this.wish)
                {
                  if (this.wishList.includes(show.id)) {
                    show.wishlist = "❤️";
                  } else {
                      show.wishlist = "🤍";
                  }
                } else {
                  if (this.wishList.includes(show.id)) {
                    show.wishlist = "❤️";
                  } else {
                      this.shows = this.shows.filter(item => item.id !== show.id);
                  }
                }
                



                show.ratingStars = "";
                for (let i = 0; i < show.note; i++) {
                    show.ratingStars += "⭐";
                }
            });
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
    editShow:function(show) {
      this.isShow = show;
      this.showModal = true;
    },
    addShow:function() {
      this.isShow = null;
      this.showModal = true;
    },
    deleteShow:function() {

    }

  },
  beforeMount() {
    if (window.location.href.includes("wishlist")) {
      this.wish = true;
    }
    else {
      this.wish = false;
    }
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
        const country = row.countryString.toLowerCase();
        const releasedate = row.releasedate.toLowerCase();
        const typeshow = row.typeshowString.toLowerCase();

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