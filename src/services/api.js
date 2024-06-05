import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: import.meta.env.VITE_GITHUB_TOKEN ? `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` : undefined
    }
});

export default {
    getUser() {
        return api.get('/users/AOIshola');
    },

    getRepos(options = {}) {
        const repos = api.get('/users/AOIshola/repos',
            {
                params: {
                    sort: 'updated',
                    direction: 'desc',
                    per_page: 10,
                    ...options
                }
            }
        );
        return repos;
    },

    getSingleRepo(name) {
        return api.get(`/repos/AOIshola/${name}`)
    }
}