import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RepoView from "@/views/RepoView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
            props: (route) => ({ page: parseInt(route.query.page) || 1 })
        },
        // {
        //     path: '/repo/:name/:id',
        //     name: 'Repo',
        //     props: true,
        //     component: RepoView,
        //     children: [
                {
                    path: '/repo/:name',
                    name: 'SingleRepoView',
                    props: true,
                    component: () => import('../views/RepoView.vue')
                },
        //     ]
        // }
    ]
});

export default router;