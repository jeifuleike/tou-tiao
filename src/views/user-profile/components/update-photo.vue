<template>
  <div class="update-photo">
    <vueCropper class="img" ref="cropper" :canMoveBox="false" :autoCrop="true" :centerBox="true" :img="img"
      :fixedBox="true"></vueCropper>
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import { setPhotoAPI } from '@/api'
export default {
  name: 'updatePhoto',
  props: {
    img: {
      type: [Object, String],
      required: true
    }
  },
  components: {
    VueCropper
  },
  methods: {
    //上传处理好的数据
    onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        this.$refs.cropper.getCropBlob(async blob => {
          //如果接口要求是Content-Type就直接传普通JavaScript对象
          //如果要求是Countent- Type就得传FormData对象
          const formData = new FormData()
          formData.append('photo', blob)
          const { data } = await setPhotoAPI(formData)
          this.$emit('offPhoto',data.data.photo)
          this.$toast('更新成功！')
        })
      } catch (err) {
        this.$toast('更新失败请稍后重试')
      }

    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;

  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.img {
  display: block;
  max-width: 100%;
  background: none;
}
</style>