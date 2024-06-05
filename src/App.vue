<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import { useCounterStore } from '@/stores/counter'
// import { ref, reactive, onMounted, computed, } from 'vue';
</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{path: '/'}">Home</RouterLink>
      <!-- <RouterLink to="/Repo">Repo</RouterLink> -->
    </nav>
   
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  background-color: rgb(206, 137, 7);
  padding: 0 auto;
  max-width: 100%;
  height: 50px;
  margin: 5px auto;
}

/* .list-div {
  border: 1px solid red;
  color: black;
}

ol {
  padding: 0;
  width: max-content
}

.repo-list {
  list-style: none;
  padding: 0;
  margin: 10px 0px;
} */

nav {
  display: flex;
  align-items: center;
  height: 100%;
  width: fit-content;
  /* justify-content: space-around; */
}

/* .nav-link {
  color: green;
} */

nav a.router-link-exact-active {
  color: black;
}

/* nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

nav a {
  padding: 0px 10px;
}

nav a:hover {
  background-color: rgba(255, 234, 134, 0.5)
}
</style>
