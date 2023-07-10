<template>
    <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate"
        @cancel="$emit('offUpdateBirthday')" @confirm="onConfirm()" />
</template>

<script>
import dayjs from 'dayjs';
export default {
    props:{
        birthdayDate:{
            type:String,
            required:true
        }
    },
    data() {
        return {
            minDate: new Date(1949, 0, 1),
            maxDate: new Date,
            currentDate: new Date(this.birthdayDate),
        };
    },
    methods: {
        onConfirm() {
            this.$emit('setBirthday',{birthday:dayjs(this.currentDate).format('YYYY-MM-DD')})
        }
    }
}
</script>

<style></style>