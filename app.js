const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xValue = 0, 
yValue = 0;
let rotatedegre=0;

function update(cursorPosition)
{
    parallax_el.forEach((el) => {
        let speedx =el.dataset.speedx;
        let speedy =el.dataset.speedy;
        let isIntLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth/2? 1:-1;
        let zValue =(cursorPosition - parseFloat(getComputedStyle(el).left))*isIntLeft*0.1;
        el.style.transform = `translateX(calc(-50% + ${xValue*speedx}px))  translateY(calc(-50% + ${yValue*speedy}px)) perspective(2300px) translateZ(${zValue}px) rotateY(${rotatedegre*.2}deg)`;
    });
}

update(0);
window.addEventListener("mousemove",(e) =>{

    if(timeline.isActive())return;

    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotatedegre=(xValue/(window.innerWidth/2))*20;
    update(e.clientX)
   
});

if(window.innerWidth>=725){
    main.style.maxHeight =`$(window.innerwidth * 0.6)px`;
}else{
    main.style.maxHeight =`$(window.innerwidth * 1.6)px`;
}

/* GSAP*/
let timeline = gsap.timeline();

parallax_el
.forEach(el => {
    timeline.from(
        el,
        {
        top:`${el.offsetHeight / 2 + +el.dataset.distance}px`,
        duration:3.5,
        ease:"power3.Out"
    },
    ""
    );

})

timeline.from(".text h2",{
    y:window.innerHeight - document.querySelector(".text h2").getBoundingClientRect().top +200,
    duration: 2,
},"1.7")
.from(
    ".text h1",{
        y:-150,
        opacity:0,
        duration: 1.5,
    },"2.7"
).from(".hide",{
    opacity:0,
    duration: 1.5,
},"2")
