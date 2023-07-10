<template>
    <div class="channel-edit">
        <van-cell :border="false">
            <div slot="title" class="title-text">我的频道</div>
            <van-button type="danger" class="edit-btn" plain round size="small" @click="isbj?isbj=false:isbj=true">{{ !isbj? '编辑':'完成' }}</van-button>
        </van-cell>
        <van-grid class="my-grid" :gutter="10">
            <van-grid-item v-for="(value,index) in userList" :key="index" class="grid-item" @click="removeChannel(value.id,index)">
                <van-icon slot="icon" name="clear" v-if="isbj&&isFiexd(index)" ></van-icon>
                <span class="my-text" slot="text" :class="{ myActive :index === myActive}">{{ value.name }}</span>
            </van-grid-item>
        </van-grid>
        <van-cell :border="false">
            <div slot="title" class="title-text">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10" class="recommend-grid">
            <van-grid-item v-for="value in recommendChannels " :key="value.id" class="grid-item" icon="plus" :text="value.name" @click="onAddChannel(value)"/>
        </van-grid>
    </div>
</template>

<script>
import { AllChannelsAPI } from '@/api'
import {mapState} from 'vuex'
export default {
    props: {
    myActive:{
        type: Number,
        required:true
    }
  },
  data(){
    return{
        allList:[],
        isbj:false,
        fiexdChannels:[0,1,2,3]
    }
  },
  async created(){
    try{
        const {data} = await AllChannelsAPI() 
    this.allList = data.data.channels
    }catch(err){
        console.log(err)
    }
  },
  computed:{
    ...mapState(['userList']),
    recommendChannels(){
        // let list = []
        // this.allList.forEach(element => {
        //     let isNum = true
        //    this.userList.forEach(item =>{
        //     if(element.name == item.name){
        //         isNum = false
        //     }
        //    }) 
        //    if(isNum){
        //    list.push(element)
        //    }
        // });
        // return list
        return this.allList.filter(item => !this.userList.find(value => value.id ===item.id))
    },
  },
  methods:{
    onAddChannel(value){
        this.$store.commit("AddUserList",value)
    },
    async removeChannel(id,index){
        if(this.isbj){
            if(this.isFiexd(index)){
                try{
                    await this.$store.commit("removeUserList",id)
                }catch(err){
                    this.$toast('保存失败请稍后再试')
                }
                this.$emit('changeActive',index)
            }
        }else{
            this.$emit('changeChannel',index)
        }
    },
    isFiexd(value){
        const isNum = this.fiexdChannels.includes(value)
        return !isNum;
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
    padding: 85px 0;
    .title-text{
        font-size: 32px;
        color: #333;
    }
    .edit-btn{
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border:  1px solid #f85959;
    }
    /deep/.grid-item{
        width: 160px;
        height: 86px;
        .van-grid-item__content{
            white-space: nowrap;
            background-color: #f4f5f6 ;
            .van-grid-item__text, .my-text{
                font-size: 28px;
                color: #222;
            }
            .myActive{
                color: red;
            }
            .van-grid-item__icon-wrapper{
                position: unset;
            }
           
        }
    }

    /deep/ .my-grid{
        .grid-item{
            .van-icon-clear{
                position: absolute;
                right: -10px;
                top: -10px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;
            }
        }
        
    }
    /deep/.recommend-grid{
        .grid-item{
            .van-grid-item__content{
                flex-direction: row;
                .van-icon-plus{
                    font-size: 28px;
                    margin-right: 6px;
                }
                .van-grid-item__text{
                    margin-top: 0px;
                }
            }
        }
    }

}

</style>