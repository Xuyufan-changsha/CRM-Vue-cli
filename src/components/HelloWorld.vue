<!-- i18n -->
<template>
  <div>
    <span>{{$t('message.text')}}</span> //使用方式1
    <p>{{title}}</p>
    <span v-text="$t('message.text')"></span>//使用方式2
    <el-select @change="langChange" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                title:this.$t('message.text'),//使用方式3，需刷新起效
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
            //语言切换
            langChange(e){
                localStorage.setItem('lang',e);
                this.$i18n.locale = e;
                window.location.reload()
            }
        }
    }
</script>
