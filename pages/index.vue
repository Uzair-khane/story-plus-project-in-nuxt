<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Stories from '~/components/Stories.vue';
const router=useRouter()
onMounted(()=>{
  const checkdata=localStorage.getItem("loggedIn")
  console.log(checkdata);
  
  if(!checkdata){
    router.push("/signup")
  }
})
</script>

<template>
<div class="bg-center bg-cover h-[680px] sm:h-[450px] bg-[url('/hero.jpeg')] " > 
  <!-- header component -->
   <Header />
   <Hero />
  
</div>
<div>
  <Stories />
</div>
</template>
