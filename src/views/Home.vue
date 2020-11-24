<template>
  <div class="home">
    home  
    <el-button type="primary" style="width:100%;" @click.native.prevent="handleClick">登录</el-button>

  </div>
</template>
<script lang="ts">
import {Component,Vue} from 'vue-property-decorator'
@Component({
  components:{}
})

export default class Home extends Vue {
  handleClick():void{
    let param = new URLSearchParams();
        param.append('page', '1');
        param.append('rows','10');
    (this as any).$axios.post("/api/login/exit",{}).then((res:any)=>{
      console.log(res);
      localStorage.removeItem('token');
      this.$router.push("/login");
    }).catch(()=>{
      
    })
  }
}
</script>
<style>

</style>
