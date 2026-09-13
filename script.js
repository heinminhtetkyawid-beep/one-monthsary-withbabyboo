/* =========================================
   LANDING PAGE FIREWORKS
========================================= */

const canvas = document.getElementById("fireworks");

if (canvas) {

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    let particles = [];
    let rockets = [];

    class Rocket {

        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.45 + 50;
            this.speed = 8;
            this.exploded = false;
        }

        update() {

            this.y -= this.speed;

            if (this.y <= this.targetY) {
                this.explode();
                return true;
            }

            return false;
        }

        explode() {

            for (let i = 0; i < 70; i++) {

                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 2;

                particles.push({
                    x: this.x,
                    y: this.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 100
                });
            }

            // Scatter hearts when fireworks explode
            createExplosionHearts(this.x, this.y);
        }
    }

    function createExplosionHearts(x, y) {

        for (let i = 0; i < 15; i++) {

            const heart = document.createElement("div");

            heart.innerHTML = "♥";
            heart.style.position = "fixed";
            heart.style.left = x + "px";
            heart.style.top = y + "px";
            heart.style.color = "rgba(255,120,180,0.8)";
            heart.style.fontSize = (Math.random() * 20 + 10) + "px";
            heart.style.pointerEvents = "none";
            heart.style.zIndex = "20";

            document.body.appendChild(heart);

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 180 + 50;

            heart.animate([
                {
                    transform: "translate(0,0) scale(1)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(${Math.cos(angle) * distance}px,
                        ${Math.sin(angle) * distance}px)
                        scale(0.3)`,
                    opacity: 0
                }
            ], {
                duration: 1800,
                easing: "ease-out"
            });

            setTimeout(() => heart.remove(), 1800);
        }
    }

    function animateFireworks() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.025) {
            rockets.push(new Rocket());
        }

        rockets = rockets.filter(rocket => {

            return !rocket.update();

        });

        particles.forEach((p, index) => {

            p.x += p.vx;
            p.y += p.vy;

            p.vy += 0.04;
            p.life--;

            ctx.globalAlpha = p.life / 100;

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                2,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "white";
            ctx.fill();

            if (p.life <= 0) {
                particles.splice(index, 1);
            }
        });

        ctx.globalAlpha = 1;

        requestAnimationFrame(animateFireworks);
    }

    animateFireworks();
}


/* =========================================
   FLOATING HEARTS — LETTER PAGE
========================================= */

const floatingHearts = document.getElementById("floating-hearts");

if (floatingHearts) {

    function createFloatingHeart() {

        const heart = document.createElement("div");

        heart.className = "floating-heart";
        heart.innerHTML = "♥";

        heart.style.left = Math.random() * 100 + "vw";

        heart.style.fontSize =
            Math.random() * 30 + 15 + "px";

        const duration =
            Math.random() * 7 + 6;

        heart.style.animationDuration =
            duration + "s";

        floatingHearts.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    setInterval(createFloatingHeart, 450);

}


/* =========================================
   REASONS PAGE
========================================= */

const reasons = document.querySelectorAll(".reason");

if (reasons.length > 0) {

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    reasons.forEach(reason => {
        observer.observe(reason);
    });

}


/* =========================================
   HEARTS ON REASONS PAGE
========================================= */

const reasonHearts = document.getElementById("reason-hearts");

if (reasonHearts) {

    function createReasonHeart() {

        const heart = document.createElement("div");

        heart.className = "reason-heart";
        heart.innerHTML = "♥";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            Math.random() * 30 + 10 + "px";

        const duration =
            Math.random() * 10 + 8;

        heart.style.animationDuration =
            duration + "s";

        reasonHearts.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    setInterval(createReasonHeart, 300);

}


/* =========================================
   MUSIC
========================================= */
const music = document.getElementById("backgroundMusic");
const clickMe = document.getElementById("clickMe");

if (music && clickMe) {

    clickMe.addEventListener("click", function(event) {

        event.preventDefault();

        music.volume = 0.25;

        music.play()
            .then(function() {

                console.log("Music started!");

                setTimeout(function() {
                    window.location.href = "letter.html";
                }, 500);

            })
            .catch(function(error) {

                console.log("Music error:", error);

            });

    });

}