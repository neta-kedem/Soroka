<template>
  <div id="app">
      <header-app></header-app>
      <main-search v-if="!answerToShow" @answerClicked="showAnswer"></main-search>
      <Answer v-else :answerToShow="answerToShow" @backHome="answerToShow=null"></Answer>
      <footer-app></footer-app>
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
import mainSearch from './Search.vue';
import Answer from './Answer.vue';
export default {
    name: 'app',
    data(){
        return{
            answerToShow: null
        }
    },
    components:{
        'header-app':Header,
        'footer-app':Footer,
        mainSearch,
        Answer:Answer
    },
    methods:{
        showAnswer(chosenAnswer){
            console.log('chosenAnswer', chosenAnswer);
            this.answerToShow = chosenAnswer;
        }
    },
    mounted(){
        console.log('answerToShow', this.answerToShow);
    }
}
</script>

<style>
    html {
        height: 100%;
        margin: 0;
    }
    body {
        /*background-image: url("./001.svg");*/
        background-color: blue;
        background: url(./assets/img/backroundModelAns03.jpg) no-repeat top left;
        /*display: flex;*/
        margin: 0;
        /*direction: rtl;*/
        background-size: cover;
    }
</style>
