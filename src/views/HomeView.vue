<script setup>
import api from '@/services/api';
import { ref, onMounted, reactive, computed } from 'vue';
import RepoPagination from '../components/RepoPagination.vue'

const props = defineProps(['page']);
const currentPage = computed(() => props.page)

const github = reactive({
  user: null,
  repos: [],
  total_pages: 0,
  currentPage: 1
});
const maxPage = computed(() => Math.ceil(github.total_pages / 10))

const fetchRepos = (page) => {
  if (page < 1) {
  page = maxPage.value;
} else if (page > maxPage.value) {
  page = 1;
}
  api.getRepos({ page }).then((repos) => {
    // console.log(maxPage.value)
    github.repos = repos.data
    github.currentPage = page
  })
}

onMounted(() => {
  api.getRepos({ page: currentPage }).then((repos) => {
    github.repos = repos.data
    // github.total_pages = github.repos.length
  });
  api.getUser().then((user) => {
    github.user = user.data;
    github.total_pages = user.data.public_repos
    console.log(github.total_pages)
  })
})
</script>

<template>
  <main>
    <div class="container">
      <div class="content">
        <div class="avatar">
          <img :src="github.user?.avatar_url" alt="User-Avatar"/>
        </div>
        <div class="details">
          <p class="big-text">{{ github.user?.name }}</p>
          <p class="user-bio">{{ github.user?.bio }}</p>
          <div class="stats">
            <span class="followers">Followers: {{github.user?.followers}}</span>
            <span class="following">Following: {{github.user?.following}}</span>
          </div>
        </div>
      </div>
    </div>
    <h3>{{ github.user?.name ? `${github.user?.name}'s Repositories` : '' }}</h3>

    <!--  -->
    <p v-if="github.repos.length === 0">Loading...</p>
    <ul>
      <li class="repo-list" v-for="repo in github.repos" :key="repo.id">
        <div key={repo.id} class="repo-container">
    <h1 class="repo-title">{{repo.name}}</h1>
    <div>
        <router-link class="repo-link" :to="{ name: 'SingleRepoView', params: { name: repo.name}}">Check Details</router-link>
        <a class="repo-link" :href="repo.html_url">Visit Repository</a>
    </div>
</div>

        <!--  -->
        <!-- <div class="list-div">
          <router-link :to="{ name: 'SingleRepoView', params: { name: repo.name}}">{{ repo.name }}</router-link>
        </div> -->
      </li>
    </ul>

    <div class="button-div">
      <button class="btn" @click="fetchRepos(github.currentPage - 1)">Prev</button>
      <RepoPagination :totalPages="github.total_pages" @getRepos="(n) => fetchRepos(n)"/>
      <button class="btn" @click="fetchRepos(github.currentPage + 1)">Next</button>
      <!-- <router-link :to="{ name: 'Home', query: { page: github.currentPage + 1 } }">Next</router-link> -->
    </div>
  </main>
</template>

<style scoped>
/* styles.css */

/* styles.css */

.repo-container {
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 3px 0 rgba(75, 85, 99, 0.4); 
    background-color: #475569; 
    width: 50%;
    align-items: center;
    justify-content: center;
    margin: 1.25rem auto;
    padding-bottom: 1.25rem;
  }

.repo-title {
    color: white;
    font-size: 1.875rem;
    margin: 2.5rem 0;
    font-family: sans-serif;
}

.repo-link {
    user-select: none;
    border-radius: 0.5rem;
    background-color: #64748b;
    padding: 0.75rem 1.5rem;
    margin: 2.5rem 2.5rem 2.5rem 2.5rem;
    text-align: center;
    vertical-align: middle;
    font-family: sans-serif;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    box-shadow: 0 1px 3px 0 rgba(75, 85, 99, 0.2);
    transition: all 0.2s ease-in-out;
}

.repo-link:hover {
    background-color: #1e293b;
    box-shadow: 0 4px 6px -1px rgba(75, 85, 99, 0.4);
}

.repo-link:focus, .repo-link:active {
    opacity: 0.85;
    box-shadow: none;
}

.repo-link:disabled {
    pointer-events: none;
    opacity: 0.5;
    box-shadow: none;
}

.button-div {
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: auto
}

.btn {
  border: none;
  border-radius: 0.3em;
  padding: 10px;
  background-color: #374151;
  margin: 10px;
  cursor: pointer;
  color: #fff;
  width: 100px;
}

.container {
    width: 100%;
    background-color: #374151;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    justify-content: space-around;
    overflow-y: visible;
}

.content {
    background-color: #374151;
    width: 75%;
    margin: 0 auto;
    padding: 1rem 1.25rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem 2.5rem;
    border-bottom: 4px solid #6b7280;
    color: white;
}

.avatar {
    width: 3.75rem;
    height: 3.75rem;
    margin-right: 2.5rem;
}

.details {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-width: fit-content;
    align-items: center;
    margin-left: -15rem;
}

.name {
    font-size: 1.875rem;
}

.bio {
    text-align: left;
    width: 50%;
}

.stats {
    width: 50%;
    font-weight: bold;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
}

.big-text {
  font-size: 28px;
}

img {
  width: 150px;
  /* border: 1px solid red; */
  /* margin-right: 0 */
}

.repo-list {
  list-style: none;
  padding: 0;
  margin: 10px 0px;
}

.user-section {
  display: flex;
  gap: 10px;
  background-color: blanchedalmond;
  width: 80%;
  margin: auto;
  margin-top: 10px;
  /* justify-content: space-between; */
}

.user-details {
  margin-left: 0
}

.user-bio {
  width: 500px;
}

.follows {
  display: flex;
  gap: 20px;
}
</style>