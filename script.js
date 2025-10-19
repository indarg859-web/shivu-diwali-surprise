// --- Surprise Messages + Friendly Shayari ---
const surprises = [
    "🎆 Boom! Firecrackers! Enjoy the festival! 🎆",
    "🍫 Sweet chocolates for my amazing bestie! 🍫",
    "❤️ Shivu, your smile shines brighter than Diwali lights! ✨",
    "🎇 May your Diwali be full of fun and sparkles! 🎇",
    "📖 'Diwali ki raat, dosti ka saath, khushiyo ka baag!'",
    "🍬 Treats, smiles, and endless laughter! 😄"
];

function openGift(gift) {
    const randomIndex = Math.floor(Math.random() * surprises.length);
    const message = surprises[randomIndex];

    const surpriseDiv = document.getElementById('surprise');
    surpriseDiv.innerHTML = message;

    gift.style.transform = "scale(1.5) rotate(360deg)";
    setTimeout(()=>{gift.style.transform="scale(1) rotate(0deg)";},1000);

    // Trigger effects based on message
    if(message.includes("🎆")) fireworks();
    if(message.includes("🍫")) chocolateRain();
    if(message.includes("❤️") || message.includes("✨") || message.includes("📖")) heartsAndSparkles();
    confettiBurst();
}

// --- Canvas Setup ---
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const diyaCanvas = document.getElementById('diyaCanvas');
const dCtx = diyaCanvas.getContext('2d');
diyaCanvas.width = window.innerWidth;
diyaCanvas.height = window.innerHeight;

// --- Fireworks ---
function fireworks(){
    let particles=[];
    const colors=['#ff0000','#ff9900','#ffff00','#00ff00','#00ffff','#0000ff','#ff00ff'];
    for(let i=0;i<100;i++){
        particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height/2,radius:Math.random()*3+2,color:colors[Math.floor(Math.random()*colors.length)],dx:(Math.random()-0.5)*5,dy:(Math.random()-0.5)*5});
    }
    let count=0;
    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p=>{
            p.x+=p.dx; p.y+=p.dy;
            ctx.beginPath(); ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
            ctx.fillStyle=p.color; ctx.fill();
        });
        count++;
        if(count<30) requestAnimationFrame(animate);
    }
    animate();
}

// --- Chocolate Rain ---
function chocolateRain(){
    let chocolates=[];
    for(let i=0;i<30;i++){
        chocolates.push({x:Math.random()*canvas.width,y:Math.random()*-500,size:Math.random()*20+20});
    }
    let count=0;
    function animateChoco(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        chocolates.forEach(c=>{
            c.y+=5;
            ctx.fillText("🍫",c.x,c.y);
            if(c.y>canvas.height) c.y=-50;
        });
        count++;
        if(count<100) requestAnimationFrame(animateChoco);
    }
    ctx.font="30px Arial";
    animateChoco();
}

// --- Hearts and Sparkles ---
function heartsAndSparkles(){
    let hearts=[];
    for(let i=0;i<50;i++){
        hearts.push({x:Math.random()*canvas.width,y:canvas.height+Math.random()*100,dy:Math.random()*-3-1,size:Math.random()*20+10});
    }
    let count=0;
    function animateHearts(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        hearts.forEach(h=>{
            h.y+=h.dy;
            ctx.fillText("❤️",h.x,h.y);
            if(h.y<0) h.y=canvas.height+50;
        });
        count++;
        if(count<100) requestAnimationFrame(animateHearts);
    }
    ctx.font="30px Arial";
    animateHearts();
}

// --- Confetti Burst ---
function confettiBurst(){
    let confetti=[];
    for(let i=0;i<100;i++){
        confetti.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,dx:(Math.random()-0.5)*5,dy:(Math.random()-0.5)*5,size:Math.random()*6+4,color:`hsl(${Math.random()*360},100%,50%)`});
    }
    let count=0;
    function animateConfetti(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        confetti.forEach(c=>{
            c.x+=c.dx; c.y+=c.dy;
            ctx.fillStyle=c.color;
            ctx.fillRect(c.x,c.y,c.size,c.size);
        });
        count++;
        if(count<50) requestAnimationFrame(animateConfetti);
    }
    animateConfetti();
}

// --- Flickering Diyas Background ---
const diyas=[];
for(let i=0;i<30;i++){
    diyas.push({x:Math.random()*diyaCanvas.width,y:Math.random()*diyaCanvas.height, radius:Math.random()*3+2, glow: Math.random()*0.05+0.05});
}

function drawDiyas(){
    dCtx.clearRect(0,0,diyaCanvas.width,diyaCanvas.height);
    diyas.forEach(d=>{
        dCtx.beginPath();
        const flicker=Math.sin(Date.now()*d.glow)*2+3;
        dCtx.arc(d.x,d.y,flicker,0,2*Math.PI);
        dCtx.fillStyle="orange";
        dCtx.fill();
    });
    requestAnimationFrame(drawDiyas);
}
drawDiyas();

// Resize canvas dynamically
window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    diyaCanvas.width = window.innerWidth;
    diyaCanvas.height = window.innerHeight;
});
