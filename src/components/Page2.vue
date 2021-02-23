<template>
  <div class="home">
    <div class="page">Page2: <span class="res">{{res}}</span></div>
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
  name: 'Page2',
    data () {
    return {
      res: undefined,
    }
  },
  mounted() {
    console.log('sum(1001, 2002)结果 :>> ', sum(11, 22));
        this.res = sum(11, 22);
    document.querySelector('.home').appendChild(smallImgDom);
    document.querySelector('.home').appendChild(bigImgDom);
  }
};
</script>
