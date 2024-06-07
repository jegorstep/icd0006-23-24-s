import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Register from "@/views/Register.vue";
import Logout from "@/views/Logout.vue";
import Publication from "@/views/publication/Publication.vue";
import EditPublication from "@/views/publication/EditPublication.vue";
import CreatePublication from "@/views/publication/CreatePublication.vue";
import DeletePublication from "@/views/publication/DeletePublication.vue";
import BoardGame from "@/views/boardgame/BoardGame.vue";
import EditBoardGame from "@/views/boardgame/EditBoardGame.vue";
import CreateBoardGame from "@/views/boardgame/CreateBoardGame.vue";
import DeleteBoardGame from "@/views/boardgame/DeleteBoardGame.vue";
import Mechanic from "@/views/mechanic/Mechanic.vue";
import EditMechanic from "@/views/mechanic/EditMechanic.vue";
import CreateMechanic from "@/views/mechanic/CreateMechanic.vue";
import DeleteMechanic from "@/views/mechanic/DeleteMechanic.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', name: 'Home', component: Home
    },
    {
      path: '/login', name: 'Login', component: Login
    },
    {
      path: '/register', name: 'Register', component: Register
    },
    {
      path: '/logout', name: 'Logout', component: Logout
    },
    {
      path: '/publication', name: 'Publication', component: Publication
    },
    {
      path: '/publication/edit?id=:id', name: 'EditPublication', component: EditPublication, props: true
    },
    {
      path: '/publication/create', name: 'CreatePublication', component: CreatePublication
    },
    {
      path: '/publication/delete?id=:id', name:'DeletePublication', component: DeletePublication, props: true
    },
    {
      path: '/boardgame', name: 'BoardGame', component: BoardGame
    },
    {
      path: '/boardgame/edit?id=:id', name: 'EditBoardGame', component: EditBoardGame, props: true
    },
    {
      path: '/boardgame/create', name: 'CreateBoardGame', component: CreateBoardGame
    },
    {
      path: '/boardgame/delete?id=:id', name:'DeleteBoardGame', component: DeleteBoardGame, props: true
    },
    {
      path: '/mechanic', name: 'Mechanic', component: Mechanic
    },
    {
      path: '/mechanic/edit?id=:id', name: 'EditMechanic', component: EditMechanic, props: true
    },
    {
      path: '/mechanic/create', name: 'CreateMechanic', component: CreateMechanic
    },
    {
      path: '/mechanic/delete?id=:id', name:'DeleteMechanic', component: DeleteMechanic, props: true
    }
  ]

})

export default router
