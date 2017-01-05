<template>
    <div class="answer">
        <div class="innerAnswer">
            <div class="answerContainer">
                <div class="answerTitleContainer">
                    <span class="answerTitle">{{answerToShow.title}}</span><br>
                    <span class="answerBuildind">{{answerToShow.building}}</span>
                    &nbsp|&nbsp
                    <span class="answerFloor">{{answerToShow.floor}}</span>
                    <button class="backHomeButton" @click="backHome"><img src="./assets/img/backButton01.svg"></button>
                </div>
                <div class="mapContainer">
                    <img class="mapImg" src="./assets/img/buildings03.png">
                </div>
                <div class="instructionContainer">
                    <span class="instructionTitle">זוהי הדרך:</span><br>
                    <span class="instructionText">{{answerToShow.instructions}}</span>
                </div>
                <div class="sendSMSMegaContainer">
                    <div class="sendSMSContainer">
                        <img class="phoneKeyboardImg" src="./assets/img/smsKeyboard002.svg">
                        <input class="phoneNumInput" type="tel" name="sms">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .answer{
        position: absolute;
        left: 10%;
        top: 15%;
        width: 70%;
        height: 55%;
        direction: rtl;
        background: rgba(255,255,255,0.7);
        padding-top: 5%;
        padding-bottom: 5%;
        padding-left: 5%;
        padding-right: 5%;
        border: 3px solid gray;
        border-radius: 15px;
    }
    .innerAnswer{
        background: rgb(255,255,255);
        position: relative;
        width: 100%;
        height: 100%;
    }
    .answerContainer{
        padding-right: 5%;
    }
    .mapContainer{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
        margin: 0 auto;
    }
    .mapImg{
        position: absolute;
        /*top: 50%;*/
        max-width: 90%;
        margin: 0 auto;
    }
    .answerTitleContainer{
        font-size: 2em;
        position: relative;
        margin-bottom: 5%;
    }
    .instructionContainer{
        font-size: 2em;
        position: absolute;
        top: 65%;
    }
    .sendSMSContainer{
        display: flex;
        justify-content: flex-start;
    }
    .sendSMSMegaContainer{
        position: absolute;
        display: flex;
        justify-content: center;
        top: 80%;
        border: 3px solid gray;
        border-radius: 10px;
    }
    .answerTitle{
        font-weight:bolder;
    }
    .answerBuildind{
    }
    .answerFloor{
    }
    .backHomeButton{
        float: left;
        margin-left: 8%;
    }
    .instructionTitle{
        font-weight: bolder;
    }
    .phoneNumInput{
        background: rgba(255,255,255,0.7);
        border: 0;
        width: 70%;
        font-size: 4vh;
        padding: 0 20px;
        outline: none;
    }
    .phoneKeyboardImg{
    }
</style>
<script>
    export default{
        props:['answerToShow'],
        data(){
            return{
            }
        },
        methods:{
            backHome(){
                this.$emit('backHome');
            }
        }
    }
</script>
