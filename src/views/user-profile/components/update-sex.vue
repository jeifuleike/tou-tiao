<template>
  <van-picker show-toolbar :columns="columns" @cancel="$emit('offUpdateSex')" @confirm="onConfirm" />
</template>

<script>
export default {
    name:'updateSex',
    data(){
        return{
            columns:['男','女']
        }
    },
    methods:{
        onConfirm(value){
            this.$emit('setAutSex',{gender:value === '男'?0:1})
            console.log(value)
        }
    }
}
</script>

<style lang="less" scoped>

</style>