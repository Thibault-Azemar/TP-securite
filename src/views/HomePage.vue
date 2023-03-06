<template>
    <main>
        <h1 class="title">Hello world!</h1>
    </main>
</template>
<script setup>
import {getFirestore, getDoc, doc} from "firebase/firestore";
let db = getFirestore();

console.log(db);

async function getUser() {
    const docRef = doc(db, "user", "ULBnRERZnCKtXgvCr2Pq");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', docSnap.data());
    }
}

getUser();

</script>