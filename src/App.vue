<template>
  <div id="app">
    <el-select v-model="selectValue" @change="langChange" placeholder="请选择">-->
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
    </el-select>
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                selectValue:'',
                options:[
                    {
                        value: 'cn',
                        label: '中文'
                    }, {
                        value: 'en',
                        label: 'English'
                    }
                ]
            }
        },
        methods: {
            langChange(e){
                localStorage.setItem('lang',e);
                this.$i18n.locale = e;
            }
        }
    }
</script>

<style>

</style>
