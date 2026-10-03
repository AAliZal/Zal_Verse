

// ================================
// PROFILE MODAL
// ================================

const profileModal = document.getElementById("profileModal");

const logo = document.querySelector(".logo-fixed");
const closeBtn = document.querySelector(".close-btn");


if(logo){

logo.onclick = () => {

    profileModal.style.display = "flex";

};

}


if(closeBtn){

closeBtn.onclick = () => {

    profileModal.style.display = "none";

};

}


window.addEventListener("click",e=>{

    if(e.target === profileModal){

        profileModal.style.display="none";

    }

});


// ================================
// IMAGE GALLERY ZOOM
// ================================


const gallery = document.getElementById("GG");


if(gallery){

gallery.addEventListener("click",function(e){


if(e.target.tagName !== "IMG") return;



let overlay=document.createElement("div");


overlay.style.cssText=`

position:fixed;
inset:0;
background:rgba(0,0,0,.95);
display:flex;
justify-content:center;
align-items:center;
z-index:999999;

`;



let img=document.createElement("img");


img.src=e.target.src;


img.style.cssText=`

max-width:95%;
max-height:95%;
object-fit:contain;

`;



let close=document.createElement("button");


close.innerHTML="✕";


close.style.cssText=`

position:absolute;
top:15px;
right:15px;
width:45px;
height:45px;
border:none;
border-radius:50%;
font-size:24px;
cursor:pointer;
background:white;
color:black;

`;



close.onclick=()=>{

document.body.removeChild(overlay);

};



overlay.onclick=(event)=>{


if(event.target===overlay){

document.body.removeChild(overlay);

}


};



overlay.append(img,close);

document.body.appendChild(overlay);

if(localStorage.getItem("mission_teacher")!=="done"){


checkMission("teacher");

showAchievement(
"ماموریت انجام شد!",
"🖼 مشاهده تصاویر استاد",
20
);


}

});


}



// ================================
// THEME SYSTEM
// ================================


const themeBtn=document.getElementById("themeBtn");



function updateThemeIcon(){


if(!themeBtn) return;



if(document.body.getAttribute("data-theme")==="dark"){

document.body.classList.add("night");
themeBtn.innerHTML="☀️";


}else{


themeBtn.innerHTML="🌓";


}


}



function toggleTheme(){


if(document.body.getAttribute("data-theme")==="dark"){


document.body.removeAttribute("data-theme");

document.body.classList.remove("night");

localStorage.setItem("theme","light");


}else{


document.body.setAttribute("data-theme","dark");

document.body.classList.add("night");

localStorage.setItem("theme","dark");


}


updateThemeIcon();

updateRobotTheme();

}

if(themeBtn){

themeBtn.onclick=toggleTheme;

}




const savedTheme=localStorage.getItem("theme");



if(savedTheme==="dark"){


document.body.setAttribute("data-theme","dark");


}



updateThemeIcon();
// ================================
// SEARCH SYSTEM
// ================================

let currentCategory = "all";
function setCategory(category,btn){

    currentCategory=category;

    document.querySelectorAll(".category-btn")
    .forEach(b=>b.classList.remove("active"));

    btn.classList.add("active");

    filterCards();

}
function filterCards(){


const input=document
.getElementById("searchInput")
.value
.trim()
.toLowerCase();



const cards=document.querySelectorAll(".card");


cards.forEach(card=>{

let categoryMatch =
currentCategory === "all" ||
card.dataset.category === currentCategory;

const title=card.querySelector("h3")?.innerText.toLowerCase() || "";

const desc=card.querySelector("p")?.innerText.toLowerCase() || "";


const keywords=(card.dataset.keywords || "")
.toLowerCase();



const allText =
title + " " +
desc + " " +
keywords;



if(allText.includes(input) && categoryMatch){

card.classList.remove("hidden");


}else{


card.classList.add("hidden");


}



});



}




// اتصال جستجو

const searchInput=document.getElementById("searchInput");


if(searchInput){


searchInput.addEventListener("keyup",filterCards);


}





// ================================
// FOCUS SEARCH
// ================================


function focusSearch(){


const input=document.getElementById("searchInput");



if(!input) return;



input.focus();



input.scrollIntoView({

behavior:"smooth",

block:"center"

});


}





// ================================
// POPUP MODALS
// ================================


function openAbout(){


const modal=document.getElementById("profileModal");


if(modal){

modal.style.display="flex";

}


}

function openHelp(){


const modal=document.getElementById("helpModal");


if(modal){

modal.style.display="flex";


robotSpeak(
"اینجا می‌توانی نحوه استفاده از امکانات زال‌ورس را یاد بگیری 📚",
"راهنما"
);


}


checkMission("help");

}



function openNews(){


const modal=document.getElementById("newsModal");


if(modal){

modal.style.display="flex";

}

robotSpeak(
"چند قابلیت جدید به زال‌ورس اضافه شده! 🚀",
"مشتاق"
);


checkMission("news");
}



function openSupport(){


const modal=document.getElementById("supportModal");


if(modal){

modal.style.display="flex";

}

robotSpeak(
"اگر مشکلی دیدی یا پیشنهادی داشتی، خوشحال می‌شوم کمک کنم 🤖",
"دوستانه"
);
}





// ================================
// CLOSE MODAL
// ================================


function closeModal(id){


const modal=document.getElementById(id);



if(modal){


modal.style.display="none";


}


}





// ================================
// CLOSE POPUP BY CLICK OUTSIDE
// ================================


window.addEventListener("click",e=>{


document.querySelectorAll(".popup-modal")
.forEach(modal=>{


if(e.target===modal){


modal.style.display="none";


}


});



});






// ================================
// ESC KEY CLOSE
// ================================


document.addEventListener("keydown",e=>{


if(e.key==="Escape"){



document.querySelectorAll(".popup-modal")
.forEach(modal=>{


modal.style.display="none";


});



if(profileModal){


profileModal.style.display="none";


}



}



});





// ================================
// RANDOM SIMULATOR
// ================================


function randomSimulator(){



const cards=[
...document.querySelectorAll(".card")
];



if(cards.length===0) return;



const card=
cards[
Math.floor(Math.random()*cards.length)
];



card.scrollIntoView({


behavior:"smooth",

block:"center"


});



card.style.transform="scale(1.05)";


card.style.boxShadow=
"0 0 35px rgba(10,132,255,.45)";



setTimeout(()=>{


card.style.transform="";

card.style.boxShadow="";



},1500);



}
 // ================================
// SITE STATISTICS
// ================================


const cardCount =
document.querySelectorAll(".card").length;



const statsText =
document.getElementById("statsText");



if(statsText){


statsText.innerHTML = `

این سایت از 

<span class="highlight">
${cardCount} کارت
</span>

و بیش از

<span class="highlight">
22000 خط کد
</span>

تشکیل شده است.

`;


}





// ================================
// PAGE LOAD SETTINGS
// ================================


window.addEventListener("load",()=>{


// بروزرسانی آیکون تم

updateThemeIcon();



// حذف حالت اضافه هنگام لود

document.body.style.opacity="1";



});






// ================================
// NAVBAR SUPPORT
// ================================


// رفتن به بخش اصلی

function goHome(){


window.scrollTo({

top:0,

behavior:"smooth"

});


}





// رفتن به جستجو

function goSearch(){


const search =
document.getElementById("searchInput");



if(search){


search.focus();



search.scrollIntoView({

behavior:"smooth",

block:"center"

});


}



}







// ================================
// PREVENT ERRORS
// ================================


// اگر بعضی مودال ها وجود نداشتند
// سایت خطا ندهد


const safeElements=[

"profileModal",

"helpModal",

"newsModal",

"supportModal",

"themeBtn",

"searchInput",

"statsText"

];



safeElements.forEach(id=>{


const element=document.getElementById(id);



if(!element){


console.log(
"Element not found:",
id
);


}



});






// ================================
// CARD HOVER EFFECT
// ================================


document.querySelectorAll(".card")
.forEach(card=>{



card.addEventListener("mouseenter",()=>{


card.style.zIndex="5";


});




card.addEventListener("mouseleave",()=>{


card.style.zIndex="";


});



});






// ================================
// INITIALIZE
// ================================



document.addEventListener("DOMContentLoaded",()=>{


updateThemeIcon();


});




// =============================
// علاقه مندی ها
// =============================
let originalOrder = [...document.querySelectorAll(".card")];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


// ساخت ستاره برای کارت ها

document.querySelectorAll(".card").forEach(card => {


    let star = document.createElement("span");

    star.className = "favorite-star";

    star.innerHTML = "☆";


    let link = card.getAttribute("href");


    // بررسی ذخیره قبلی

    if(favorites.includes(link)){

        star.innerHTML = "★";

        star.classList.add("active");

    }



    star.onclick = function(e){

        e.preventDefault();
        e.stopPropagation();

        toggleFavorite(card, star);

    };


    card.appendChild(star);


});





function toggleFavorite(card, star){

    let link = card.getAttribute("href");


    if(favorites.includes(link)){

        favorites = favorites.filter(item => item !== link);

        star.innerHTML = "☆";
        star.classList.remove("active");

        sessionStorage.setItem("scrollY", window.scrollY);
        location.reload();
    }
    else{

        favorites.push(link);

        star.innerHTML = "★";
        star.classList.add("active");

    }
    checkMission("favorite");

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );


// فقط وقتی ستاره اضافه شد کارت را بالا بیاور
if(favorites.includes(link)){
    setTimeout(()=>{
        moveFavoritesTop();
    },10);
}

}




// آوردن علاقه مندی ها به اول
function moveFavoritesTop(){

    let grid = document.getElementById("mainGrid");

    let cards = [...grid.querySelectorAll(".card")];


    cards.sort((a,b)=>{

        let aFav = favorites.includes(a.getAttribute("href"));
        let bFav = favorites.includes(b.getAttribute("href"));


        return Number(bFav) - Number(aFav);

    });


    cards.forEach(card=>{
        grid.appendChild(card);
    });

}
moveFavoritesTop();
window.addEventListener("load", () => {

    const y = sessionStorage.getItem("scrollY");

    if (y !== null) {
        window.scrollTo(0, Number(y));
        sessionStorage.removeItem("scrollY");
    }

});
// =============================
// SKY EFFECTS
// ستاره ها و شهاب
// =============================


// ساخت ستاره ها

const starsBox = document.getElementById("stars");


if(starsBox){


for(let i = 0; i < 120; i++){


    let star = document.createElement("span");


    star.className = "star";


    // بعضی ستاره ها بزرگ تر باشند

    if(Math.random() > 0.85){

        star.classList.add("big");

    }



    star.style.left =
    Math.random()*100 + "%";


    star.style.top =
    Math.random()*100 + "%";



    // سرعت چشمک تصادفی

    star.style.animationDelay =
    Math.random()*3 + "s";



    starsBox.appendChild(star);


}


}





// =============================
// ساخت شهاب
// =============================


function createMeteor(){


    let meteor =
    document.getElementById("meteor");


    if(!meteor) return;



    meteor.style.left =
    (Math.random()*80 + 20) + "%";


    meteor.style.top =
    (Math.random()*40) + "%";



    meteor.style.animation =
    "none";


    setTimeout(()=>{


        meteor.style.animation =
        "meteorMove 1.5s linear";


    },50);



}



// هر چند وقت یک شهاب

setInterval(()=>{


    if(document.body.classList.contains("night")){


        createMeteor();


    }


},12000);

// =============================
// SKY ON / OFF
// =============================


function toggleSky(mode){


if(mode==="simple"){

document.body.classList.add("simple-sky");

localStorage.setItem(
"skyMode",
"simple"
);


}
else{


document.body.classList.remove("simple-sky");


localStorage.setItem(
"skyMode",
"dynamic"
);


}


}



// ذخیره حالت قبلی

if(localStorage.getItem("skyMode")==="off"){

document.body.classList.add("simple-sky");


let btn =
document.getElementById("skyBtn");


if(btn){

btn.innerHTML="🌄";

}

}




            // =============================
            //           ZALBOT
            // =============================
let robotCurrentState = "آرام";
const robotSettings = {

    talkDelay: Number(
        JSON.parse(localStorage.getItem("zalbotSettings"))?.talkDelay
    ) || 90000,


    messageDuration: Number(
        JSON.parse(localStorage.getItem("zalbotSettings"))?.messageDuration
    ) || 8000,


    autoTalk:
    JSON.parse(localStorage.getItem("zalbotSettings"))?.autoTalk
    ?? true

};



// عناصر ربات
let robotTheme =
localStorage.getItem("robotTheme") || "day";
const zalbotImage = document.getElementById("zalbot-image");
const zalbotMessage = document.getElementById("zalbot-message");



// تشخیص تم

function getRobotTime(){

    if(document.body.getAttribute("data-theme") === "dark"){

        return "شب";

    }
    else{

        return "روز";

    }

}



function changeRobot(state){

    let time = getRobotTime();

    if(!zalbotImage) return;

    zalbotImage.src =
    `Web files/Robot img/${state} - ${time}.png`;

}
setInterval(()=>{

    changeRobot(robotCurrentState);

},1000);

// نمایش پیام
let robotMessageTimer = null;


function robotSpeak(text,state="دوستانه"){

    robotCurrentState = state;


    changeRobot(state);


    if(zalbotMessage){

        zalbotMessage.innerHTML = text;

        zalbotMessage.style.display="block";

    }



    // حذف تایمر قبلی
    clearTimeout(robotMessageTimer);



    robotMessageTimer = setTimeout(()=>{


        if(zalbotMessage){

            zalbotMessage.style.display="none";

        }


        // فقط اگر هنوز همین حالت فعال است آرام شود
        if(robotCurrentState === state){

            robotCurrentState="آرام";

            changeRobot("آرام");

        }


    },robotSettings.messageDuration);



}


// کلیک روی خود ربات

document
.getElementById("zalbot-container")
.onclick=function(){

    checkMission("robot");

    openUserProfile();

};
// =============================
// خوش آمدگویی روزانه زال‌بات
// =============================


function dailyWelcome(){


    let today = new Date().toLocaleDateString("fa-IR");


    let lastWelcome =
    localStorage.getItem("zalbotWelcome");



    if(lastWelcome !== today){


        setTimeout(()=>{


            robotSpeak(
            "سلام! دوباره خوش آمدی 🤖<br>آماده‌ای امروز چیزهای جدیدی کشف کنیم؟ 🔬",
            "خوش آمد گو"
            );


            localStorage.setItem(
            "zalbotWelcome",
            today
            );


        },1500);


    }


}



// اجرای خوش آمدگویی

dailyWelcome();





// =============================
// پیام های خودکار
// =============================
const robotMessages = [


/* =====================
   دانستنی های علمی
===================== */

{
type:"fact",
text:"آیا می‌دانستی قلب انسان در هر روز حدود ۱۰۰ هزار بار می‌تپد؟ ❤️",
state:"کنجکاو"
},

{
type:"fact",
text:"بدن انسان از میلیاردها سلول ساخته شده است 🧬",
state:"کنجکاو"
},

{
type:"fact",
text:"DNA اطلاعات ساخت و عملکرد موجودات زنده را ذخیره می‌کند 🧬",
state:"متفکر"
},

{
type:"fact",
text:"نور خورشید حدود ۸ دقیقه و ۲۰ ثانیه طول می‌کشد تا به زمین برسد ☀️",
state:"کنجکاو"
},

{
type:"fact",
text:"بیشتر سطح زمین را آب پوشانده، اما بیشتر این آب شور است 🌊",
state:"کنجکاو"
},

{
type:"fact",
text:"مغز انسان میلیاردها سلول عصبی دارد و یکی از پیچیده‌ترین بخش‌های بدن است 🧠",
state:"متفکر"
},

{
type:"fact",
text:"کوچک‌ترین واحد زنده بدن، سلول است و هر سلول وظیفه خاصی دارد 🔬",
state:"آرام"
},

{
type:"fact",
text:"گیاهان با کمک نور خورشید غذا تولید می‌کنند؛ این فرایند فتوسنتز نام دارد 🌱",
state:"کنجکاو"
},

{
type:"fact",
text:"برخی فلزها وقتی با هم ترکیب شوند، آلیاژهایی با ویژگی‌های جدید می‌سازند ⚙️",
state:"مشتاق"
},

{
type:"fact",
text:"آتشفشان‌ها می‌توانند مواد درون زمین را به سطح آن بیاورند 🌋",
state:"کنجکاو"
},



/* =====================
   معرفی سایت
===================== */

{
type:"site",
text:"در زال‌ورس می‌توانی شبیه‌سازهای مختلف را امتحان کنی و فقط با خواندن یاد نگیری، بلکه آزمایش هم انجام بدهی 🔬",
state:"راهنما"
},

{
type:"site",
text:"می‌توانی کارت‌های مورد علاقه‌ات را با ستاره ⭐ علامت بزنی تا همیشه بالاتر نمایش داده شوند.",
state:"راهنما"
},

{
type:"site",
text:"با کلیک روی من 🤖 می‌توانی پروفایل خودت، امتیازها، سطح و ماموریت‌های روزانه را ببینی.",
state:"دوستانه"
},

{
type:"site",
text:"اگر دنبال موضوع خاصی هستی، از بخش جستجو استفاده کن تا سریع‌تر پیدایش کنی 🔎",
state:"راهنما"
},

{
type:"site",
text:"می‌توانی از دسته‌بندی‌های زیست، شیمی، فیزیک و زمین و فضا برای پیدا کردن شبیه‌سازها استفاده کنی 🌍",
state:"راهنما"
},



/* =====================
   سوال های تعاملی
===================== */

{
type:"question",
text:"تا حالا امتحان کردی ببینی یک آلیاژ جدید چه ویژگی‌هایی دارد؟ ⚙️",
state:"مشتاق"
},

{
type:"question",
text:"به نظرت اگر فشار زیر زمین زیاد شود چه اتفاقی برای آتشفشان می‌افتد؟ 🌋",
state:"کنجکاو"
},

{
type:"question",
text:"اگر جای یک دانشمند بودی، اول کدام شبیه‌ساز را آزمایش می‌کردی؟ 🔬",
state:"دوستانه"
},

{
type:"question",
text:"فکر می‌کنی قلب انسان چگونه بدون توقف سال‌ها کار می‌کند؟ ❤️",
state:"متفکر"
},



/* =====================
   پیشنهاد ها
===================== */

{
type:"suggest",
text:"اگر دنبال یک آزمایش جالب هستی، یکی از شبیه‌سازهای علمی را امتحان کن 🔬",
state:"پیشنهاد دهنده"
},

{
type:"suggest",
text:"فکر کنم امروز شبیه‌ساز قلب را دوست داشته باشی ❤️",
state:"پیشنهاد دهنده"
},

{
type:"suggest",
text:"شاید ساخت یک مدار الکتریکی و روشن کردن لامپ برایت جالب باشد ⚡",
state:"پیشنهاد دهنده"
},

{
type:"suggest",
text:"اگر به کشف بدن انسان علاقه داری، شبیه‌ساز شُش و گوارش را امتحان کن 🫁",
state:"پیشنهاد دهنده"
},



/* =====================
   انگیزشی
===================== */

{
type:"motivation",
text:"یک کشف علمی جدید همیشه با یک سؤال کوچک شروع می‌شود 🤔",
state:"متفکر"
},

{
type:"motivation",
text:"عالی پیش می‌روی! هر آزمایش یک قدم به دانشمند شدن نزدیک‌ترت می‌کند 🚀",
state:"مشتاق"
},

{
type:"motivation",
text:"یادگیری علوم وقتی جذاب‌تر می‌شود که خودت تجربه‌اش کنی ✨",
state:"دوستانه"
},



/* =====================
   نکته های آموزشی
===================== */

{
type:"tip",
text:"برای یادگیری بهتر، فقط توضیحات را نخوان؛ با شبیه‌سازها آزمایش هم انجام بده 🧪",
state:"راهنما"
},

{
type:"tip",
text:"هر کارت سایت یک موضوع علمی متفاوت دارد؛ شاید موضوع مورد علاقه‌ات را پیدا کنی 🌟",
state:"دوستانه"
},

{
type:"tip",
text:"اشتباه کردن در آزمایش‌ها بخشی از یادگیری و کشف کردن است 🧪",
state:"مشتاق"
}

];


function getFavoriteCategory(){

    let interests =
    JSON.parse(localStorage.getItem("robotInterests")) || {};


    let categories =
    Object.keys(interests);


    if(categories.length===0)
    return null;



    return categories.sort(
        (a,b)=>interests[b]-interests[a]
    )[0];


}

function robotRandomTalk(){


    if(!robotSettings.autoTalk)
    return;


    let favorite =
    getFavoriteCategory();



    if(favorite && Math.random()<0.3){


    let suggestions = {


    bio:
    "فکر کنم امروز از یکی از شبیه‌سازهای زیست خوشت بیاد 🧬",


    chem:
    "امروز دوست داری یک آزمایش شیمی انجام بدی؟ ⚗️",


    physics:
    "یک آزمایش فیزیک جالب منتظر توست ⚡",


    earth:
    "شاید امروز سفر به زمین و فضا برات جذاب باشد 🌍",


    other:
    "فکر کنم یک سر به بخش فایل‌ها و مطالب آموزشی بزنی 📚"


    };



    robotSpeak(
    suggestions[favorite],
    "پیشنهاد دهنده"
    );



    setTimeout(
    robotRandomTalk,
    robotSettings.talkDelay
    );


    return;


    }

    let random =
    robotMessages[
    Math.floor(
    Math.random()*robotMessages.length
    )
    ];



    robotSpeak(
    random.text,
    random.state
    );



    setTimeout(
    robotRandomTalk,
    robotSettings.talkDelay
    );


}





// شروع پیام های خودکار

let robotTalkTimer;


function startRobotTalkTimer(){

    clearTimeout(robotTalkTimer);


    robotTalkTimer = setTimeout(()=>{

        robotRandomTalk();

    }, robotSettings.talkDelay);

}


startRobotTalkTimer();

// =============================
// واکنش زال‌بات به کارت‌ها (نسخه اصلاح شده)
// =============================

document.querySelectorAll(".card").forEach(card => {


    let timer = null;


    card.addEventListener("mouseenter", ()=>{


        // اگر تایمر قبلی وجود دارد حذف شود
        clearTimeout(timer);


        timer = setTimeout(()=>{


            // اگر هنوز موس روی کارت است ادامه بده
            if(!card.matches(":hover"))
            return;



            let messages =
            JSON.parse(card.dataset.robot || "[]");



            if(messages.length === 0)
            return;



            let text =
            messages[
                Math.floor(
                    Math.random()*messages.length
                )
            ];



            let randomState =
            robotStates[
                Math.floor(
                    Math.random()*robotStates.length
                )
            ];



            robotSpeak(
                text,
                randomState
            );


        },1000);



    });



    card.addEventListener("mouseleave", ()=>{


        clearTimeout(timer);

        timer = null;


    });


});
// =============================
// حالت های رندوم زال بات
// =============================

const robotStates = [

    "آرام",
    "دوستانه",
    "کنجکاو",
    "متفکر",
    "مشتاق",
    "پیشنهاد دهنده",
    "راهنما",
    "جدی"

];
// =============================
// هماهنگ کردن ربات با تم
// =============================

function updateRobotTheme(){


if(!zalbotImage)
return;



let state =
robotCurrentState || "آرام";



let dark =
document.body.getAttribute("data-theme")==="dark";



if(robotTheme==="day"){


zalbotImage.src =
`Web files/Robot img/${state} - روز.png`;


}



else if(robotTheme==="night"){


zalbotImage.src =
`Web files/Robot img/${state} - شب.png`;


}



else if(robotTheme==="auto"){


if(dark){


zalbotImage.src =
`Web files/Robot img/${state} - شب.png`;


}
else{


zalbotImage.src =
`Web files/Robot img/${state} - روز.png`;


}


}


else if(robotTheme==="image"){


/*
فعلا همان حالت خودکار
تا عکس های تعامل ساخته شوند
*/


if(dark){


zalbotImage.src =
`Web files/Robot img/${state} - شب.png`;


}
else{


zalbotImage.src =
`Web files/Robot img/${state} - روز.png`;


}


}


}


// =============================
// تنظیمات زال‌بات
// =============================


function openRobotSettings(){


document.getElementById(
"robotSettings"
).style.display="flex";


}



function closeRobotSettings(){


document.getElementById(
"robotSettings"
).style.display="none";


}


// روشن خاموش ربات

document.getElementById("robotEnable").onchange=function(){


    if(this.checked){

        document.getElementById(
        "zalbot-container"
        ).style.display="block";

    }

    else{

        document.getElementById(
        "zalbot-container"
        ).style.display="none";

    }


    saveRobotSettings();

};




// روشن خاموش پیام های خودکار

document.getElementById("robotAutoTalk").onchange=function(){


    robotSettings.autoTalk =
    this.checked;


    saveRobotSettings();


};




// زمان پیام های خودکار

document.getElementById("robotTalkTime").onchange=function(){


    robotSettings.talkDelay =
    Number(this.value);


    saveRobotSettings();


    startRobotTalkTimer();


};




// مدت نمایش پیام

document.getElementById("robotMessageTime").onchange=function(){


    robotSettings.messageDuration =
    Number(this.value);


    saveRobotSettings();


};




// اندازه ربات

document.getElementById("robotSize").onchange=function(){


    let img =
    document.getElementById(
    "zalbot-image"
    );


    if(this.value==="small"){

        img.style.width="120px";

    }


    if(this.value==="medium"){

        img.style.width="170px";

    }


    if(this.value==="large"){

        img.style.width="230px";

    }


    saveRobotSettings();


};




// پس زمینه ربات

document.getElementById("robotBackground").onchange=function(){


    if(this.value==="dynamic"){

        document.body.classList.remove(
        "simple-sky"
        );


        localStorage.setItem(
        "skyMode",
        "dynamic"
        );

    }



    if(this.value==="simple"){

        document.body.classList.add(
        "simple-sky"
        );


        localStorage.setItem(
        "skyMode",
        "simple"
        );

    }


    saveRobotSettings();


};



// زمان ارسال پیام رندوم

document.getElementById("robotTalkTime")
.onchange=function(){

    robotSettings.talkDelay = Number(this.value);

    localStorage.setItem(
        "zalbotSettings",
        JSON.stringify({
            ...JSON.parse(localStorage.getItem("zalbotSettings") || "{}"),
            talkDelay: robotSettings.talkDelay
        })
    );

    startRobotTalkTimer();

};


// مدت نمایش پیام

document.getElementById("robotMessageTime")
.onchange=function(){

    robotSettings.messageDuration =
    Number(this.value);


    saveRobotSettings();

};



// اندازه ربات

document.getElementById("robotSize")
.onchange=function(){


let img =
document.getElementById(
"zalbot-image"
);



if(this.value==="small"){

img.style.width="120px";

}


if(this.value==="medium"){

img.style.width="170px";

}


if(this.value==="large"){

img.style.width="230px";

}
saveRobotSettings();


};
document.getElementById("robotBackground").onchange=function(){

    if(this.value==="dynamic"){

        document.body.classList.remove("simple-sky");

        localStorage.setItem(
            "skyMode",
            "dynamic"
        );

    }


    if(this.value==="simple"){

        document.body.classList.add("simple-sky");

        localStorage.setItem(
            "skyMode",
            "simple"
        );

    }


    saveRobotSettings();

};

// =============================
// ذخیره تنظیمات زال بات
// =============================


function saveRobotSettings(){

    let settings = {

        enabled:
        document.getElementById("robotEnable").checked,


        size:
        document.getElementById("robotSize").value,


        background:
        document.getElementById("robotBackground").value,


        autoTalk:
        document.getElementById("robotAutoTalk").checked,


        talkDelay:
        Number(document.getElementById("robotTalkTime").value),


        messageDuration:
        Number(document.getElementById("robotMessageTime").value)

    };


    localStorage.setItem(
        "zalbotSettings",
        JSON.stringify(settings)
    );

}
function loadRobotSettings(){

    let saved = JSON.parse(
        localStorage.getItem("zalbotSettings")
    );


    if(!saved) return;



    // روشن / خاموش بودن ربات
    let enable =
    document.getElementById("robotEnable");

    enable.checked = saved.enabled;


    if(saved.enabled){

        document.getElementById(
        "zalbot-container"
        ).style.display="block";

    }
    else{

        document.getElementById(
        "zalbot-container"
        ).style.display="none";

    }



    // اندازه ربات
    let size =
    document.getElementById("robotSize");

    size.value = saved.size;

    let img =
    document.getElementById("zalbot-image");


    if(saved.size==="small"){

        img.style.width="120px";

    }


    if(saved.size==="medium"){

        img.style.width="170px";

    }


    if(saved.size==="large"){

        img.style.width="230px";

    }

    // پس زمینه
    let background =
    document.getElementById("robotBackground");

    background.value = saved.background;


    if(saved.background==="simple"){

        document.body.classList.add("simple-sky");

    }
    else{

        document.body.classList.remove("simple-sky");

    }


    // پیام های خودکار

    let autoTalk =
    document.getElementById("robotAutoTalk");

    if(saved.autoTalk !== undefined){

        autoTalk.checked = saved.autoTalk;

        robotSettings.autoTalk = saved.autoTalk;

    }



    // زمان پیام ها

    let talkTime =
    document.getElementById("robotTalkTime");



    // مدت نمایش پیام

    let messageTime =
    document.getElementById("robotMessageTime");

if(saved.talkDelay !== undefined){

    talkTime.value = saved.talkDelay;

    robotSettings.talkDelay = saved.talkDelay;

}



if(saved.messageDuration !== undefined){

    messageTime.value = saved.messageDuration;

    robotSettings.messageDuration = saved.messageDuration;

}
}

let savedSky =
localStorage.getItem("skyMode");


if(savedSky==="true"){

skyEnabled=true;

toggleSky();

}
window.addEventListener("load",()=>{

    loadRobotSettings();


    let savedSky =
    localStorage.getItem("skyMode");


    let background =
    document.getElementById("robotBackground");



    if(savedSky === "simple"){


        document.body.classList.add("simple-sky");


        if(background){

            background.value="simple";

        }


    }
    else{


        document.body.classList.remove("simple-sky");


        if(background){

            background.value="dynamic";

        }


    }



});
document.querySelectorAll(".card")
.forEach(card=>{


card.addEventListener("click",()=>{


checkMission("card");


let category =
card.dataset.category;



if(category==="bio")
checkMission("bio");


if(category==="chem")
checkMission("chem");


if(category==="physics")
checkMission("physics");


if(category==="earth")
checkMission("earth");



// ذخیره علاقه کاربر
let interests =
JSON.parse(localStorage.getItem("robotInterests")) || {};


interests[category] =
(interests[category] || 0) + 1;


localStorage.setItem(
"robotInterests",
JSON.stringify(interests)
);



let name =
card.querySelector("h3").innerText;


visitCard(name);


});

});
// =============================
// USER PROFILE PANEL
// =============================


function openUserProfile(){


    let panel =
    document.getElementById(
        "userProfilePanel"
    );


    if(panel){

        panel.style.display="flex";

    }


    showUserProfile();

}



function closeUserProfile(){


    let panel =
    document.getElementById(
        "userProfilePanel"
    );


    if(panel){

        panel.style.display="none";

    }


}




function showUserProfile(){


    let box =
    document.getElementById(
        "userProfileContent"
    );


    if(!box) return;



    let level =
    getLevelData();



    let mission =
    getDailyMission();


const missions =
JSON.parse(localStorage.getItem("todayMissions")) || [];

box.innerHTML = `


<div class="level-card">

<h3>
🎖 سطح شما:
</h3>

<p>
<b>
${level.name}
</b>
</p>


<p>
🏆 امتیاز شما:
<b>
${zalUser.score}
</b>
</p>



<div class="level-bar">

<div 
class="level-progress"
style="
width:${getLevelPercent()}%
">
</div>

</div>


<p>
${getLevelPercent()}٪ تا سطح بعدی
</p>


</div>



${missions.map((m,index)=>`

<div class="mission-card">

<div class="mission-title">
🎯 ماموریت ${index+1}
</div>


<h4>
${m.title}
</h4>


<p>
${m.text}
</p>


<div class="mission-progress">

<div 
class="mission-progress-bar"
style="width:${
localStorage.getItem("mission_"+m.id)==="done"
?
"100"
:
"0"
}%">

</div>

</div>


<span>

${
localStorage.getItem("mission_"+m.id)==="done"
?
"1 از 1 انجام شده ✅"
:
"0 از 1 انجام شده"
}

</span>


</div>

`).join("")}




<hr>




<div class="profile-stat">

📅 اولین ورود شما:

<b>
${zalUser.firstJoin}
</b>

</div>




<div class="profile-stat">

⏰ ساعت اولین ورود:

<b>
${zalUser.firstJoinTime}
</b>

</div>




<div class="profile-stat">

🚀 اولین شبیه‌ساز کشف شده:

<b>
${zalUser.firstCard || "هنوز چیزی باز نشده"}
</b>

</div>




<div class="profile-stat">

🔭 آخرین شبیه‌ساز باز شده:

<b>
${zalUser.lastCard || "ندارد"}
</b>

</div>




<div class="profile-stat">

⭐ بیشترین بازدید:

<b>
${mostVisitedCard()}
</b>

<br>

تعداد مشاهده:

<b>
${mostVisitedCount()}
</b>

بار

</div>




<div class="profile-stat">

🧪 تعداد شبیه‌سازهای کشف شده:

<b>
${openedCardsCount()}
</b>

از

<b>
${document.querySelectorAll(".card").length}
</b>

</div>



`;
}
function showAchievement(title,text,score){

    let box=document.createElement("div");

    box.className="achievement-popup";


    box.innerHTML=`

    <h3>
    🏆 ${title}
    </h3>

    <p>
    ${text}
    </p>

    ${
    score ?
    `<strong>
    +${score} ⭐
    </strong>`
    :
    ""
    }

    `;


    document.body.appendChild(box);


    setTimeout(()=>{

        box.classList.add("show");

    },50);



    setTimeout(()=>{

        box.classList.remove("show");


        setTimeout(()=>{

            box.remove();

        },500);


    },4000);


}
// =============================
// DAILY MISSIONS SYSTEM
// =============================

const dailyMissions = [

{
title:"🖼 مشاهده تصاویر استاد",
text:"یکی از تصاویر استاد را مشاهده کن",
id:"teacher",
target:1,
reward:20
},

{
title:"🚀 دیدن تازه‌ها",
text:"بخش تازه‌های سایت را باز کن",
id:"news",
target:1,
reward:10
},

{
title:"❓ مطالعه راهنما",
text:"راهنمای سایت را باز کن",
id:"help",
target:1,
reward:10
},

{
title:"🤖 ملاقات با زال‌بات",
text:"روی ربات کلیک کن",
id:"robot",
target:1,
reward:10
},

{
title:"⭐ ساخت علاقه‌مندی",
text:"یک کارت را به علاقه‌مندی‌ها اضافه کن",
id:"favorite",
target:1,
reward:15
},

{
title:"🔬 آزمایش علمی",
text:"یک شبیه‌ساز را باز کن",
id:"card",
target:1,
reward:10
},

{
title:"🧬 زیست‌شناس",
text:"یک کارت زیست را باز کن",
id:"bio",
target:1,
reward:15
},

{
title:"⚗️ شیمیدان",
text:"یک کارت شیمی را باز کن",
id:"chem",
target:1,
reward:15
},

{
title:"⚡ فیزیک‌دان",
text:"یک کارت فیزیک را باز کن",
id:"physics",
target:1,
reward:15
},

{
title:"🌍 کاوشگر زمین",
text:"یک کارت زمین و فضا را باز کن",
id:"earth",
target:1,
reward:15
}

];
function generateDailyMissions(){


let today =
new Date().toLocaleDateString("fa-IR");


let oldDate =
localStorage.getItem("missionDate");



if(oldDate !== today){



// پاک کردن وضعیت ماموریت‌های قبلی
dailyMissions.forEach(m=>{

    localStorage.removeItem(
        "mission_"+m.id
    );

});



let missions =
[...dailyMissions]
.sort(()=>Math.random()-0.5)
.slice(0,2);



localStorage.setItem(
"todayMissions",
JSON.stringify(missions)
);



localStorage.setItem(
"missionDate",
today
);



}


}
generateDailyMissions();

function completeMission(id){

    let missions =
    JSON.parse(localStorage.getItem("todayMissions")) || [];


    let mission =
    missions.find(m => m.id === id);


    if(!mission) return;


    if(localStorage.getItem("mission_"+id)==="done")
    return;



    localStorage.setItem(
        "mission_"+id,
        "done"
    );


    zalUser.score += mission.reward;


    localStorage.setItem(
        "zalUser",
        JSON.stringify(zalUser)
    );


    showAchievement(
        "ماموریت انجام شد!",
        mission.title,
        mission.reward
    );


    showUserProfile();

}
function checkMission(id){

    let oldLevel =
    getLevelData().name;


    let missions =
    JSON.parse(localStorage.getItem("todayMissions")) || [];


    let mission =
    missions.find(m=>m.id===id);


    if(!mission) return;


    if(localStorage.getItem("mission_"+id)==="done")
    return;



    localStorage.setItem(
        "mission_"+id,
        "done"
    );



    zalUser.score += mission.reward;



    localStorage.setItem(
        "zalUser",
        JSON.stringify(zalUser)
    );



    let newLevel =
    getLevelData().name;



    showAchievement(
        "ماموریت انجام شد!",
        mission.title,
        mission.reward
    );



    if(oldLevel !== newLevel){


        setTimeout(()=>{


            showAchievement(
                "🎖 سطح جدید!",
                "تبریک! به سطح "+newLevel+" رسیدی 🚀",
                0
            );


        },500);


    }


}
