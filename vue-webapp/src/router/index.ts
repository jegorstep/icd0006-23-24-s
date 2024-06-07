import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Register from "@/views/Register.vue";
import Logout from "@/views/Logout.vue";
import ValidateParticipation from "@/views/lottery/ValidateParticipation.vue";
import Lottery from "@/views/lottery/Lottery.vue";
import * as path from "path";
import MyLotteries from "@/views/lottery/MyLotteries.vue";
import LotteryDetails from "@/views/lottery/LotteryDetails.vue";
import Activity from "@/views/sportActivity/Activity.vue";
import EditActivity from "@/views/sportActivity/EditActivity.vue";
import CreateActivity from "@/views/sportActivity/CreateActivity.vue";
import DeleteActivity from "@/views/sportActivity/DeleteActivity.vue";
import Tickets from "@/views/tickets/Tickets.vue";
import Prizes from "@/views/prizes/Prizes.vue";

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
      path: '/lottery/participate?id=:id', name:'ParticipateLottery', component: ValidateParticipation, props: true
    },
    {
      path: '/lottery/all', name:'Lottery', component: Lottery, props: true
    },
    {
      path: '/lottery/my', name: 'MyLotteries', component: MyLotteries, props: true
    },
    {
      path: '/lottery?id=:id', name:'LotteryDetails', component: LotteryDetails, props:true
    },
    {
      path: '/sportActivity', name: 'Activity', component: Activity, props: true
    },
    {
      path: '/sportActivity/edit?id=:id', name: 'EditActivity', component: EditActivity, props: true
    },
    {
      path: '/sportActivity/create', name: 'CreateActivities', component: CreateActivity, props:true
    },
    {
      path: '/sportActivity/delete?id=:id', name:'DeleteActivity', component: DeleteActivity, props: true
    },
    {
      path: '/tickets', name: 'Tickets', component: Tickets, props: true
    },
    {
      path: '/prizes', name: 'Prizes', component: Prizes, props: true
    }
  ]
})

export default router
