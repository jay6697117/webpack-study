import smallImg from '../assets/images/small.jpeg';
import bigImg from '../assets/images/big.jpeg';
// console.log('smallImg :>> ', smallImg);
// console.log('bigImg :>> ', bigImg);

let smallImgDom = document.createElement('img');
let bigImgDom = document.createElement('img');

smallImgDom.src = smallImg;
bigImgDom.src = bigImg;

export { smallImgDom, bigImgDom };
