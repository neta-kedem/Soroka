<template>
    <div>
        <div class="wrapper">

            <div class="languagesIcon">
                <img src="./assets/img/rusFlag02.svg" @click="changeLanguage('ru')">
                <img src="./assets/img/engFlag02.svg" @click="changeLanguage('en-us')">
                <img src="./assets/img/heFlag02.svg" @click="changeLanguage('he')">
            </div>
            <div class="searchBarContainer">
                <div class="searchBar">
                    <div class="cancelSurround" @click="clearText">
                        <div class="cancelCircle">
                            <span>&#10006;</span>
                        </div>
                    </div>
                    <input class="searchBarInput" type="text" ref="searchBar" name="search" :placeholder="placeHolderSearchBar" v-model="speechElText" @keyup="showResults()">
                    <div class="micSurround" @click="toogleSpeechReco">
                        <i class="micIcon fa fa-microphone"></i>
                    </div>
                </div>
            </div>
            <section class="mainBody">
                <section v-show="resLength" ref="resultsSection">
                    <div class='resultsContainer'>
                        <div class='resultsList'>
                            <span class='resultHeaderText'>
                                בחרו אחת מתוך האופציות הבאות או חפשו שוב:
                            </span>
                            <br><br>
                            <div class="optionalResult" v-for="optionalAns in res" @click="showMap(optionalAns)"><br>
                                <img class ="optionalResLocationIcon" src="./assets/img/018.svg">
                                <img class ="optionalResPhoneIcon" src="./assets/img/019.svg">
                                <div class="optionalResText">
                                    <span class="optionalResultTitle">{{optionalAns.title}}</span><br>
                                    <span class="optionalResultBuilding">{{optionalAns.building}}</span>
                                    &nbsp|&nbsp
                                    <span class="optionalResultFloor">{{optionalAns.floor}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!--&lt;!&ndash;<section v-show="resLength" v-html="resultsSection"></section>&ndash;&gt;-->
                <!--<section v-show="!resLength" ref="keyboardSection"></section>-->
            </section>

        </div>
    </div>
</template>

<script>
    //import optionalAnswers from './user/optionalResults.vue'
    export default {
        data(){
            return{
                speechElText: '',
                recognition: new webkitSpeechRecognition(),
                gSpeechRecoStatus: false,
                mockDB: [{
                    id:1,
                    title:'מחלקת יולדות א',
                    building:'בניין יולדות א',
                    floor:'קומה 1',
                    instructions:'לפנות לאנשהו וכל זה',
                    hashTags:['יולדות','ילדות','נשים','לידה']
                }, {
                    id:2,
                    title:'מחלקת נשים ב',
                    building:'בניין יולדות ב',
                    floor:'קומה 3',
                    instructions:'לפנות לאנשהו וכל זה',
                    hashTags:['יולדות','נשים','לידה']
                }, {
                    id:3,
                    title:'מחלקת יולדות ג',
                    building:'בניין אחר לגמרי',
                    floor:'קומה 5',
                    instructions:'לפנות לאנשהו וכל זה',
                    hashTags:['יולדות','נשים','לידה']
                }],
                resLength:0,
                res: {},
                placeHolderSearchBar: 'חיפוש',
                searchPlaceHolder: {'he':'חיפוש', 'ru':'поиск', 'en-us':'Search'}
            }
        },
        watch:{
            speechElText(){
                console.log('input', this.speechElText)
            },
            res(){
                this.resLength = Object.keys(this.res).length;
            }
        },
        mounted(){
            let that = this;
            if (!('webkitSpeechRecognition' in window)) {
                console.log('webkitSpeechRecognition');
                upgrade();
            } else {
                this.recognition = new webkitSpeechRecognition();
                this.recognition.continuous = true;
                this.recognition.lang = 'he';
                this.recognition.interimResults = true;

                this.recognition.onstart = function() {
                    that.gSpeechRecoStatus = true;}
                this.recognition.onresult = function(event) {
                    let allText = '';
                    for(let res in event.results){
                        if(event.results[res][0]){
                            console.log('script', event.results[res][0].transcript)
                            allText += event.results[res][0].transcript;
                        }
                    }
                    console.log('allText', allText);
                    that.speechElText = allText;
                    that.showResults();
                }
                this.recognition.onerror = function(event) { console.log('onerror', event) }
                this.recognition.onend = function() { that.gSpeechRecoStatus = false;}
            }

        },
        computed:{
        },
        methods:{
            showResults(){
                console.log('showResults', this.speechElText);
                let searchTexts = this.speechElText.split(' ');
                this.res = {};
                console.log('this.mockDB', this.mockDB);

                searchTexts.forEach((searchText)=>{
                    this.mockDB.forEach((department)=>{
                        if(department.hashTags.includes(searchText)){
                            console.log('department', department);
                            this.res[department.id]=department
                        }
                    });
                });
                let listEl='';
            },
            toogleSpeechReco(){
                if(this.gSpeechRecoStatus) this.recognition.stop();
                else this.recognition.start();
            },
            changeLanguage(newLang) {
                console.log('newLang', newLang);
                this.placeHolderSearchBar = this.searchPlaceHolder[newLang];
                this.$refs.searchBar.style.direction='rtl';
                console.log('this.$refs.searchBar.style', this.$refs.searchBar.style.direction);
                this.recognition.stop();
                this.recognition.lang = newLang;
            },
            clearText(){
                console.log('deleteText');
                this.speechElText = '';
                this.recognition.stop();
                this.res='';
                console.log('this.speechElText', this.speechElText);

            },
            showMap(chosenAns){
                console.log('clicky', chosenAns);
                this.$emit('answerClicked', chosenAns)
            }
        }
    }
</script>
<style scoped>
    .wrapper {
        min-height: 100%;
    }
    .searchBar{
        display: flex;
        justify-content: space-between;
        border: 3px solid gray;
        border-radius: 10px;
        width: 80%;
        overflow: hidden;
        height: 7vh;
    }
    .micIcon{
        color: white;
        font-size: 4vh;
        top: 1.5vh;
        position: relative;
    }
    .micSurround{
        text-align: center;
        background: rgb(237,28,36);
        border-radius: 20%;
        line-height: 7vh;
        height: 7vh;
        width:7vh;
        border-left: 0;
    }
    .cancelSurround{
        text-align: center;
        border-radius: 20%;
        font-size: 4vh;
        color: white;
        width: 7vh;
        font-weight: bold;
    }
    .cancelCircle{
        background: lightGrey;
        border-radius: 50%;
        position: relative;
        margin: 0 auto;
        top: 1.5vh;
        height: 4vh;
        width: 4vh;
    }
    .searchBarInput{
        background: rgba(255,255,255,0.7);
        border:0;
        width: 80%;
        text-align: right;
        font-size: 4vh;
        padding: 0 20px;
        outline: none;
    }
    .speakingLine{
        position: absolute;
        width: 70%;
        margin-top: 2%;
        opacity: 0.5;
    }
    .searchBarContainer{
        position: absolute;
        width: 100%;
        top: 30%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
    }
    .speakingLineContainer{
        display: flex;
        justify-content: center;
        width: 100%;
        display: flex;
    }

    .keyboardContainer{
        position: absolute;
        display: flex;
        justify-content: center;
        width: 100%;
        bottom: 10%;
    }
    .languagesIcon{
        position: absolute;
        display: block;
        right: 5%;
        top: 8%
    }
    .resultsContainer{
        direction: rtl;
        width: 100%;
        height: 100%;
        margin: auto;
        display: flex;
        justify-content: center;
        flex: auto;
    }
    .resultsList{
        position: absolute;
        width: 80%;
        top: 40%;
        left: 10%;
        background: rgba(255,255,255,0.7);
        border-radius: 5%;
        border: 2px solid gray;
        direction: rtl;
        overflow-y: auto;
    }
    .resultHeaderText{
        margin-right: 20px;
        font-size: 2em;
    }
    .optionalResult{
        margin: auto 5px;
        background: rgb(255,255,255);
        padding-right: 5%;
        padding-left: 5%;
        font-size: 1.7em;
        margin-bottom: 3vh;
    }
    .optionalResLocationIcon{
        float: right;
        height: 50%;
        margin: auto 5px auto auto;
    }
    .optionalResPhoneIcon{
        float: left;
        height: 50%;
        margin: auto auto auto 5px;
    }
    .optionalResText{
        margin-right: 15%;
    }
    .optionalResText{
        font-size: larger;
    }
    .optionalResultTitle{
        font-weight: bold;
    }
</style>