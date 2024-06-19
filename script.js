console.log("Welcome To Spotify");
//store all required elements
let songIndex = 0;
let audioElement=new Audio('song/Cartoon, Jéja - On & On (feat. Daniel Levi) [NCS Release].mp3');
let bar = document.getElementById("myProgressBar");
let masterPlay = document.querySelector("#masterPlay");
let currentSong=document.querySelectorAll(".songitem");
let playIcon=document.querySelectorAll(".playicon");
let songs=[
    {songName: "Cartoon, Jéja - On & On (feat. Daniel Levi)",songlink: "song/Cartoon, Jéja - On & On (feat. Daniel Levi) [NCS Release].mp3", cover: "covers/onandon.jpg"},
    {songName: "Cafe Disko & Ella Rosa - Red Lights",songlink: "song/Cafe Disko & Ella Rosa - Red Lights [NCS Release].mp3", cover: "covers/redlight.jpg"},
    {songName: "DJ FKU - DELTA",songlink: "song/DJ FKU - DELTA [NCS Release].mp3", cover: "covers/delta.jpg"},
    {songName: "Janji & Johnning - Nostalgia",songlink: "song/Janji & Johnning - Nostalgia [NCS Release].mp3", cover: "covers/nostalgia.jpg"},
    {songName: "Rex Hooligan - You Get Me High",songlink: "song/Rex Hooligan - You Get Me High [NCS Release].mp3", cover: "covers/yougetmehigh.png"},
    {songName: "RIOT - Pushing On",songlink: "song/RIOT - Pushing On [NCS Release].mp3", cover: "covers/pushingon.jpg"},
    {songName: "Ripple - Stuck",songlink: "song/Ripple - Stuck [NCS Release].mp3", cover: "covers/stuck.jpg"},
    {songName: "Skybreak & Keepsake - Comet",songlink: "song/Skybreak & Keepsake - Comet [NCS Release].mp3", cover: "covers/comet.jpg"},
    {songName: "Youth In Circles & LUVIUM - The Right Time",songlink: "song/Youth In Circles & LUVIUM - The Right Time [NCS Release].mp3", cover: "covers/righttime.jpg"},
    {songName: "Zushi & Vanko - Underrated (Feat. Sunny Lukas)",songlink: "song/Zushi & Vanko - Underrated (Feat. Sunny Lukas) [NCS Release].mp3", cover: "covers/underrated.jpg"}
]
let songItem=document.querySelectorAll('.songitem'); 
songItem.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src= songs[i].cover;
    element.getElementsByClassName('songName')[0].innerText= songs[i].songName;
});


masterPlay.addEventListener("click", playaudio);
    function playaudio()
    {
    if (audioElement.paused || audioElement.currentTime <= 0) 
        {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        currentSong[songIndex].classList.add("active");
        playIcon[songIndex].classList.remove("fa-circle-play");
        playIcon[songIndex].classList.add("fa-circle-pause");
    } 
    else 
    {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        currentSong[songIndex].classList.remove("active");
        playIcon[songIndex].classList.remove("fa-circle-pause");
        playIcon[songIndex].classList.add("fa-circle-play");
    }
};
audioElement.addEventListener('timeupdate',()=>{
    var progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    bar.value= progress;
});
bar.addEventListener('change',()=>{
    console.log(bar.value);
    audioElement.currentTime =(bar.value * audioElement.duration)/100;
    });

 document.addEventListener("keydown", function(){
    if(event.code ==="Space")
        {
           playaudio();
        }
        if(event.code ==='ArrowRight')
            {
                audioElement.currentTime=audioElement.currentTime+10;
                bar.value=(audioElement.currentTime/audioElement.duration)*100;
            }
            if(event.code ==='ArrowLeft')
                {
                    audioElement.currentTime=audioElement.currentTime-10;
                    bar.value=(audioElement.currentTime/audioElement.duration)*100;
                }
        
    });
    function makeAllPlays()
    {
        document.querySelectorAll('.playicon').forEach((element)=>{
          element.classList.remove('fa-circle-pause');
          element.classList.add('fa-circle-play');
          currentSong[songIndex].classList.remove("active");

        });
    }
    Array.from(document.getElementsByClassName('playicon')).forEach((element,i)=>{
        element.addEventListener('click',(e)=>{
            makeAllPlays();
            console.log(e.target,i);
            if (audioElement.paused || audioElement.currentTime <= 0) 
                {
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src=songs[i].songlink;
            audioElement.currentTime=0;
            songIndex=i;
            playaudio();
                }
                else{
                    playaudio();
                    e.target.classList.add('fa-circle-play');
                    e.target.classList.remove('fa-circle-pause');
                }
        });
    });
    var next=document.getElementById('next');
    var prev=document.getElementById('prev');
    next.addEventListener('click',()=>{
        makeAllPlays();
        
        if(songIndex==9)
            {
                songIndex=0;
            }
            else{
                songIndex++;
            }
            audioElement.src=songs[songIndex].songlink;
            playaudio();
    });
    prev.addEventListener('click',()=>{
        makeAllPlays();
        if(songIndex==0)
            {
                songIndex=9;
            }
            else{songIndex--;}
            
            audioElement.src=songs[songIndex].songlink;
            playaudio();
    });