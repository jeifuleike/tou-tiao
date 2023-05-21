// postcss.config.js
module.exports = {
    plugins: {
      // postcss-pxtorem 插件的版本需要 >= 5.0.0
      // postcss-pxtotem 的 REM 适配方案是吧一行分为十份
      // 如果设计稿是750就应该设置为 750/10=75
      // rootValue 支持两种类型处理:
      //    数字: 固定的数值
      //    函数：可以动态处理返回
      //          postcss-pxtorem 处理每个 css 文件的时候都会来调用这个函数
      'postcss-pxtorem': {
        rootValue({ file }) {
          return file.indexOf('vant') !== -1 ? 37.5 : 75;
        },
        //配置要转化的css属性(要改什么属性就写什么属性，列：['height'])
        //*表示所有
        propList: ['*'],
      },
    },
  };