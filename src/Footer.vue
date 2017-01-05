<template>
    <div class="footer">
        <span class="footerText">סורוקה מרכז רפואי אוניברסיטאי - נשמח לעזור, פשוט חייגו 1800-800-800</span>
        <img class="phoneIcon" src="./assets/img/phoneIcon01.svg">
    </div>
</template>
<style scoped>

.footerText{
    text-align: center;
    line-height: inherit;
    color: white;
    font-size: 3VW;
    margin: auto;
}
.footer{
    position: absolute;
    background: linear-gradient(to right, rgb(15, 63, 133) , rgb(54, 126, 187), rgb(15, 63, 133));
    margin: auto;
    width: 100%;
    min-height: 5vh;
    display: flex;
    padding-bottom: 0;
    bottom: 0px;
}
.phoneIcon{
    height: 2vh;
    margin-top: 1.5vh;
    padding-right: 2vw;
}
</style>
<script>
    export default{
    }
</script>
