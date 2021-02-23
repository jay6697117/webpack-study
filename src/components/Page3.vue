<template>
  <div class="home">
    <div class="page">Page3: <span class="res">{{res}}</span></div>
  </div>
</template>

<script>
import sum from '@@/utils/sum';
import { smallImgDom, bigImgDom } from '@@/utils/addImage';

// console.log('sum :>> ', sum);
// console.log('smallImgDom :>> ', smallImgDom);
// console.log('bigImgDom :>> ', bigImgDom);

export default {
  //首页
  name: 'Page3',
  data() {
    return {
      res: undefined
    };
  },
  mounted() {
    console.log('sum(1001, 2002)结果 :>> ', sum(111, 222));
    this.res = sum(111, 222);
    document.querySelector('.home').appendChild(smallImgDom);
    document.querySelector('.home').appendChild(bigImgDom);
  }
};
</script>
