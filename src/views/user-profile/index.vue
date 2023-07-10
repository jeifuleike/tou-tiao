<template>
    <div class="user-profile">
        <!-- 导航栏 -->
        <van-nav-bar class="lanNav" title="个人信息" left-arrow @click-left="$router.back()" />
        <!-- /导航栏 -->
        <input type="file" hidden ref="file" @change="onFileChage()">
        <!-- 个人信息 -->
        <van-cell is-link title="头像" center @click="$refs.file.click()">
            <van-image class="avatar" :src="profileIndex.photo" fit="cover" round />
        </van-cell>
        <van-cell is-link title="昵称" :value="profileIndex.name" @click="isUpdateNameShow = true" />
        <van-cell is-link title="性别" :value="profileIndex.gender === undefined ? '' : (profileIndex.gender === 0 ? '男' : '女')" @click="isUpdateSexShow = true" />
        <van-cell is-link title="生日" :value="profileIndex.birthday" @click="isUpdateBirthdayShow = true"/>
        <!-- /个人信息 -->

        <!-- 编辑昵称 -->
        <van-popup v-model="isUpdateNameShow" style="height: 100%; width: 100%;" position="bottom">
            <UpdateName @offIsUpdate="isUpdateNameShow = false" v-if="isUpdateNameShow" @setName="setAut"
                :name='profileIndex.name'></UpdateName>
        </van-popup>
        <!-- /编辑昵称 -->
        <!-- 编辑性别 -->
        <van-popup v-model="isUpdateSexShow" round position="bottom">
            <updateSex @offUpdateSex='isUpdateSexShow = false' v-if="isUpdateSexShow" @setAutSex="setAut"></updateSex>
        </van-popup>
        <!-- /编辑性别 -->
        <!-- 编辑生日 -->
        <van-popup v-model="isUpdateBirthdayShow" round position="bottom">
            <updateBirthdayVue @offUpdateBirthday='isUpdateBirthdayShow = false' :birthdayDate = "profileIndex.birthday" v-if="isUpdateBirthdayShow" @setBirthday="setAut"></updateBirthdayVue>
        </van-popup>
        <!-- /编辑生日 -->
        <!-- 编辑头像 -->
        <van-popup v-model="isUpdatePhotoShow" position="bottom" style="height: 100%;">
            <updatePhotoVue :img = img @close = "isUpdatePhotoShow = false" @offPhoto = "funPhoto"></updatePhotoVue>
        </van-popup>
        <!-- /编辑头像 -->
    </div>
</template>

<script>
import { getProfileAPI, setProfileAPI } from '@/api'
import UpdateName from './components/update-name.vue'
import updateSex from './components/update-sex.vue'
import updateBirthdayVue from './components/update-birthday.vue'
import updatePhotoVue from './components/update-photo.vue'
export default {
    name: 'UserProfile',
    data() {
        return {
            profileIndex: {},
            isUpdateNameShow: false,
            isUpdateSexShow: false,
            isUpdateBirthdayShow:false,
            isUpdatePhotoShow:false,
            img: null
        }
    },
    components: {
        UpdateName,
        updateSex,
        updateBirthdayVue,
        updatePhotoVue
    },
    created() {
        this.onloadProfile()
    },
    methods: {
        //获取用户信息
        async onloadProfile() {
            try {
                const { data } = await getProfileAPI()
                this.profileIndex = data.data
                console.log(this.profileIndex)
            } catch (err) {
                this.$$toast('获取用户信息失败，请稍后重试')
                this.$router.back()
            }
        },
        //向后端修改用户信息
        async setAut(value) {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true,
                duration: 0
            })
            try {
                await setProfileAPI(value)
                const key = Object.keys(value)[0]
                this.profileIndex[key] = value[key]
                this.isUpdateNameShow = false
                this.isUpdateSexShow = false
                this.isUpdateBirthdayShow = false
                this.$toast.success('修改成功')
            } catch (err) {
                this.$toast('修改失败，请稍后重试')
            }
        },
        //获取用户选择的图片
        onFileChage(){
            const file = this.$refs.file.files[0]
            this.img = window.URL.createObjectURL(file)
            this.isUpdatePhotoShow = true
            //file-input如果选了同一个文件不会触发chage事件
            //解决办法就是每次使用完毕就把它的value清空
            this.$refs.file.value = ''
        },
        funPhoto(value){
            this.isUpdatePhotoShow = false
            this.profileIndex.photo = value
        }
    }
}
</script>

<style scoped lang="less">
.user-profile {
    .avatar {
        width: 60px;
        height: 60px;
    }
}

.van-popup {
    background-color: #f5f7f9;
}
</style>