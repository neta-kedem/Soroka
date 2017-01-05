export default function getTime() {
    let now     = new Date();
    let hour    = now.getHours();
    let minute  = now.getMinutes();
    // add padding if needed
    if(minute < 10) return hour + ':0' + minute;
    else return hour + ':' + minute;
}