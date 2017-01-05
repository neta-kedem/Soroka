<template>
    <div class="header">
        <img class="headerIcon" src="./assets/img/greenIcon01.svg" alt="">
        <span class="cornerClock" ref="cornerClock"></span>
        <span class="headerText">C - בניין יולדות</span>
    </div>

</template>
<style scoped>
    .header{
        position: absolute;
        background: linear-gradient(to right, rgb(15, 63, 133) , rgb(54, 126, 187), rgb(15, 63, 133));
        margin: 0 auto;
        width: 100%;
        min-height: 5vh;
        height: 5%;
        display: flex;
        box-shadow: 5px 5px 5px 0px;

    }
    .cornerClock{
        display: block;
        color: white;
        font-size: 4vh;
        font-weight: bold;
        margin-top:auto;
        margin-bottom:auto;
        padding-left: 20px;
    }
    .headerIcon{
        max-height: 5vh;
        display: block;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 3%;
    }
    .headerText{
        line-height: inherit;
        color: white;
        font-size: 4vh;
        font-weight: bold;
        margin: auto;
        margin-right: 10px;
    }

</style>
<script>
    import getTime from './utils';
    export default{
        data(){
            return{
            }
        },
        components:{
        },
        mounted(){
            let that = this;
            //running the clock!
            let clockEl = that.$refs.cornerClock;
            clockEl.innerHTML= getTime();
            setInterval(()=>clockEl.innerHTML=getTime(),1000);
        }
    }

</script>
