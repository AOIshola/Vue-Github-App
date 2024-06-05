<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api'

const route = useRoute()
const props = defineProps(['name']);
const repoData = ref(null);

onMounted(() => {
    const name = route.params.name
    console.log(name)
    api.getSingleRepo(name).then((repo) => {
        repoData.value = repo.data
        console.log(repoData.value)
    })
})
</script>

<template>
    <div v-if="repoData">
        <div class="container">
            <div class="header">
                <p>Repository Details</p>
            </div>
            <div class="content">
                <h5 class="title">Repository Name: {{ repoData.name }}</h5>
                <p>Repository ID: {{repoData.id}}</p>
                <p>Date Created: {{ repoData.created_at.split('T')[0] }}</p>
                <p>Language: {{repoData.language}}</p>
                <p>Description: {{ !repoData.description ? 'No description' : repoData.description }}</p>
            </div>
            <div class="button-container">
                <router-link to='..'  data-ripple-light="true" type="button" class="button">
                    Back
                </router-link>
            </div>
        </div>
        <!--  -->
        <!-- <h3>Repository Name: {{ repoData.name }}</h3>
        <p>Languages: {{ repoData.language }}</p>
        <p>Description: {{ !repoData.description ? 'No description' : repoData.description }}</p> -->
    </div>
    <p v-else>Loading...</p>
</template>

<style>
.container {
    position: relative;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    width: 60%;
    border-radius: 1rem;
    background-color: white;
    color: #4b5563;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin: 2.5rem auto 0 auto;
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 1rem -1.5rem 1rem;
    height: 10rem;
    overflow: hidden;
    border-radius: 1rem;
    background: linear-gradient(to right, #64748b, #94a3b8, #475569);
    color: white;
    box-shadow: 0 4px 6px -1px rgba(75, 85, 99, 0.4);
}

.header p {
    background: linear-gradient(to right, #b8bec7, #94a3b8, #bfc7d2);
    border-radius: 5px;
    padding: 5px;
    color: black;
    font-size: 25px;
    font-weight: bolder;
}

.content {
    padding: 1.5rem;
}

.title {
    margin-bottom: 0.5rem;
    display: block;
    font-family: sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.25;
    color: #1f2937;
}

.description {
    display: block;
    font-family: sans-serif;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.625;
    color: inherit;
}

.button-container {
    padding: 1.5rem;
    padding-top: 0;
}

.button {
    user-select: none;
    border-radius: 0.5rem;
    background-color: #64748b;
    padding: 0.75rem 1.5rem;
    text-align: center;
    vertical-align: middle;
    font-family: sans-serif;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    box-shadow: 0 1px 3px rgba(59, 130, 246, 0.2);
    transition: all 0.2s ease-in-out;
}

.button:hover {
    box-shadow: 0 4px 6px rgba(75, 85, 99, 0.4);
}

.button:focus,
.button:active {
    opacity: 0.85;
    box-shadow: none;
}

.button:disabled {
    pointer-events: none;
    opacity: 0.5;
    box-shadow: none;
}
</style>