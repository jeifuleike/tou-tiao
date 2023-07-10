<template>
  <div class="UpdateName">
    <!-- 导航栏 -->
    <van-nav-bar class="baiNav" title="昵称" left-text="取消" right-text="完成" @click-right="okName()"
      @click-left="$emit('offIsUpdate')" />
    <!-- 输入框 -->
    <van-field class="field-wrap" v-model.trim="message" rows="2" autosize type="textarea" maxlength="7"
      placeholder="请输入昵称" show-word-limit />
  </div>
</template>

<script>
export default {
  name: 'UpdateName',
  props:{
    name:{
      type:String,
      required:true
    }
  },
  data() {
    return {
      message: this.name
    }
  },
  methods: {
    okName() {
      if (this.message.length === 0) {
        this.$toast('昵称不能为空！')
      } else {
        this.$emit('setName', {name:this.message})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.baiNav {
  .van-nav-bar__content {
    background-color: #fff;

    .van-nav-bar__title {
      color: black !important;
    }
  }
}

.UpdateName {
  .field-wrap {
    margin: 20px !important;
    width: 95%;
  }
}
</style>