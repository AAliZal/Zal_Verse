// =====================================
// ZAL USER SYSTEM
// =====================================


let zalUser = JSON.parse(
    localStorage.getItem("zalUser")
);


// اگر کاربر جدید بود بساز

if(!zalUser){

    let now = new Date();

    zalUser = {

        firstJoin:
        now.toLocaleDateString("fa-IR"),


        firstJoinTime:
        now.toLocaleTimeString("fa-IR"),


        score:0,


        firstCard:null,


        lastCard:null,


        cards:{}


    };


    saveUser();

}




// ذخیره کاربر

function saveUser(){

    localStorage.setItem(
        "zalUser",
        JSON.stringify(zalUser)
    );

}



// ===============================
// امتیاز و سطح
// ===============================


function getLevel(){


    let s = zalUser.score;



    if(s < 100)
        return "🌱 تازه وارد";


    if(s < 500)
        return "🔬 دانشمند کوچک";


    if(s < 1500)
        return "🧪 پژوهشگر";


    if(s < 3000)
        return "🚀 کاوشگر علوم";


    if(s < 6000)
        return "🧠 دانشمند";


    return "🏆 استاد علوم";


}



// ===============================
// ثبت بازدید کارت
// ===============================


function visitCard(name){



    // اولین کارت

    if(!zalUser.firstCard){

        zalUser.firstCard = name;

    }



    // آخرین کارت

    zalUser.lastCard = name;



    // اگر اولین بار است

    if(!zalUser.cards[name]){


        zalUser.cards[name]=1;


        // امتیاز کارت جدید

        zalUser.score += 50;


    }

    else{


        zalUser.cards[name]++;


        // بازدید دوباره

        zalUser.score += 5;


    }



    saveUser();


}





// ===============================
// تعداد کارت های دیده شده
// ===============================


function openedCardsCount(){


    return Object.keys(
        zalUser.cards
    ).length;


}



// ===============================
// بیشترین بازدید
// ===============================


function mostVisitedCard(){


    let max = 0;

    let result="ندارد";



    for(let card in zalUser.cards){


        if(zalUser.cards[card] > max){


            max =
            zalUser.cards[card];


            result = card;


        }


    }


    return result;

}
// =====================================
// LEVEL PROGRESS
// =====================================


function getLevelData(){


    let s = zalUser.score;


    if(s < 100){

        return {
            name:"🌱 تازه وارد",
            min:0,
            max:100
        };

    }


    if(s < 500){

        return {
            name:"🔬 دانشمند کوچک",
            min:100,
            max:500
        };

    }


    if(s < 1500){

        return {
            name:"🧪 پژوهشگر",
            min:500,
            max:1500
        };

    }


    if(s < 3000){

        return {
            name:"🚀 کاوشگر علوم",
            min:1500,
            max:3000
        };

    }


    if(s < 6000){

        return {
            name:"🧠 دانشمند",
            min:3000,
            max:6000
        };

    }


    return {

        name:"🏆 استاد علوم",
        min:6000,
        max:10000

    };


}




function getLevelPercent(){


    let level =
    getLevelData();


    let percent =
    ((zalUser.score-level.min) /
    (level.max-level.min))*100;


    return Math.min(
        100,
        Math.floor(percent)
    );


}
// =====================================
// DAILY MISSION
// =====================================


function getDailyMission(){


let today =
new Date().toLocaleDateString("fa-IR");



let missions =
JSON.parse(
localStorage.getItem("dailyMissions")
);



if(!missions || missions.date !== today){



let allMissions = [


{
text:"۳ شبیه‌ساز جدید کشف کن 🔬",
type:"open",
target:3,
reward:30
},


{
text:"۵ کارت مختلف را مشاهده کن 📚",
type:"open",
target:5,
reward:40
},


{
text:"۱۰ بار روی شبیه‌سازها بازدید کن 🚀",
type:"visit",
target:10,
reward:50
},


{
text:"یک شبیه‌ساز زیست‌شناسی باز کن 🧬",
type:"category",
category:"bio",
target:1,
reward:30
},


{
text:"یک شبیه‌ساز شیمی را امتحان کن ⚗️",
type:"category",
category:"chem",
target:1,
reward:30
},


{
text:"یک شبیه‌ساز فیزیک باز کن ⚡",
type:"category",
category:"physics",
target:1,
reward:30
},


{
text:"یک شبیه‌ساز زمین و فضا بررسی کن 🌍",
type:"category",
category:"earth",
target:1,
reward:30
},


{
text:"یک کارت را ۳ بار مشاهده کن ⭐",
type:"repeat",
target:3,
reward:35
},


{
text:"امروز ۱۰۰ امتیاز تجربه کسب کن 🏆",
type:"score",
target:100,
reward:50
},


{
text:"همه بخش‌های یک کارت را بررسی کن 🧪",
type:"open",
target:1,
reward:20
},

{
text:"یکی از تصاویر استاد را مشاهده کن 🖼️",
type:"teacher",
target:1,
reward:20
},


{
text:"بخش تازه‌ها را باز کن 🚀",
type:"news",
target:1,
reward:15
},


{
text:"راهنمای سایت را مطالعه کن 📚",
type:"help",
target:1,
reward:20
},


{
text:"بخش پشتیبانی را مشاهده کن 🛠️",
type:"support",
target:1,
reward:15
},


{
text:"از جستجوی سایت استفاده کن 🔍",
type:"search",
target:1,
reward:20
},


{
text:"به یک کارت علاقه‌مندی اضافه کن ⭐",
type:"favorite",
target:1,
reward:25
},


{
text:"حالت تاریک سایت را امتحان کن 🌙",
type:"theme",
target:1,
reward:15
},


{
text:"۳ دسته مختلف علمی را بررسی کن 🌍",
type:"category",
target:3,
reward:40
},


{
text:"امروز ۱۰ دقیقه در سایت بمان ⏰",
type:"time",
target:10,
reward:50
},


{
text:"۳ شبیه‌ساز مورد علاقه خود را دوباره ببین 🔁",
type:"repeat",
target:3,
reward:35
}
];



// مخلوط کردن ماموریت‌ها

allMissions.sort(
()=>Math.random()-0.5
);



// انتخاب ۳ عدد

let selected =
allMissions.slice(0,3);



missions={

date:today,

list:selected

};



localStorage.setItem(
"dailyMissions",
JSON.stringify(missions)

);



}



return missions;


}




function updateMission(){


if(mission.progress < mission.target){


mission.progress++;


}



if(mission.progress >= mission.target
&& !mission.done){


mission.done=true;


zalUser.score +=100;


saveUser();


}



localStorage.setItem(
"dailyMission",
JSON.stringify(mission)

);


}
function mostVisitedCount(){

    let max = 0;

    for(let card in zalUser.cards){

        if(zalUser.cards[card] > max){

            max = zalUser.cards[card];

        }

    }

    return max;

}