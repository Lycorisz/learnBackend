<template>
  <div class="login">
    <LoginHeader>
      <el-form :rules="rules"  ref="ruleForm" slot="container" :model="ruleForm" label-position="left" label-width="0px">
        <div class="title">
          <h3>账号密码登录</h3>
        </div>
        <!-- 账号-->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码">
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleClick" :loading="isLogin">登录</el-button>
          
        </el-form-item>
        <!-- 七天登录和忘记密码 -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">
          七天内自动登录</el-checkbox>
           <el-button type="text" class="forget" @click="$router.push('/password')">忘记密码？</el-button>
                    
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
</template>

<script lang="ts">
import LoginHeader from './LoginHeader.vue';
import {Component,Vue,Provide}from'vue-property-decorator'
@Component({
  components:{LoginHeader}
})

export default class Login extends Vue{
  @Provide() ruleForm:{
    username:String;
    pwd:String;
    autoLogin:boolean;
  }={
    username:'',
    pwd:'',
    autoLogin:true
  };

  @Provide() rules ={
    username:[{
      required:true,
      message:'请输入账号',
      trigger:'blur'
    }],
    pwd:[{
      required:true,
      message:'请输入密码',
      trigger:'blur'
    }],
  };
  @Provide() isLogin:boolean = false;
  handleClick():void{
    (this.$refs["ruleForm"] as any).validate((valid:boolean)=>{
      if(valid){
        console.log("校验通过");
        this.isLogin = true;
        (this as any).$axios.post("/api/users/login",this.ruleForm).then((res:any)=>{
          console.log(res);
          this.isLogin = false;
          localStorage.setItem('tsToken',res.data.token);
        }).catch(()=>{
          this.isLogin = false;
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .title{
    margin:0px auto 40px auto;
    text-align:center;
    color:#505458
  }
  i{
    font-size: 14px;
    margin-left: 7px;
  }
  .forget{
    float:right;
  }
</style>
