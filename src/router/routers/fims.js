import Film from "@/views/Films/films.vue"
import Newpaw from "@/views/Films/newpaw.vue"
import Com from "@/views/Films/comming.vue"
import Detail from "@/views/Films/detail.vue"


const fiimsrouter = [{
    path: '/films', 
    component:Film,
    redirect: "/films/newpaw",
    children:[
        {path:"newpaw",component:Newpaw},
        {path:"comming",component:Com}
    ]
},
{path:"/film/:id",component:Detail}
]
export default fiimsrouter;
