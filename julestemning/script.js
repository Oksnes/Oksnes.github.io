document.addEventListener('DOMContentLoaded', ()=>{
    const santaEl = document.getElementById('santa');
    const sceneEl = document.getElementById('scene');
    const groundEl = document.getElementById('ground');

    let sceneW = sceneEl.clientWidth;
    let sceneH = sceneEl.clientHeight;
    let groundH = groundEl.clientHeight;

    const S = {
        width: 128,
        height: 128,
        x: 40,
        y: 0,
        vx: 0,
        vy: 0,
        onGround: false
    };

const GRAVITY = 0.9;
let MOVE_SPEED = 5.2; // start litt lavere
let JUMP_SPEED = 18;  // start litt lavere

    const keys = {left:false,right:false,jump:false};

    // platform elements (refreshed on resize / generation)
    let platforms = [];

    const prizeEl = document.getElementById('prize');
    const prize = { x:0, y:0, width:128, height:128, collected:false };

    const snowEl = document.getElementById('snow');
    let snowInterval = null;

    function createFlake(){
        if(!snowEl) return;
        const flake = document.createElement('div');
        flake.className = 'flake';

        // randomized size, horizontal start, horizontal drift, duration
        const size = Math.round(6 + Math.random() * 22); // px
        const left = Math.random() * 100; // %
        const duration = (8 + Math.random() * 28); // seconds
        const sway = Math.round(10 + Math.random() * 100); // px
        const dx = Math.round((Math.random() - 0.5) * 80); // final horizontal offset

        // inline styles for per-flake variance
        flake.style.left = left + '%';
        flake.style.width = size + 'px';
        flake.style.height = size + 'px';
        flake.style.borderRadius = '50%';
        flake.style.background = 'rgba(255,255,255,0.95)';
        flake.style.opacity = (0.6 + Math.random()*0.4).toFixed(2);
        flake.style.transform = `translate3d(0, -10vh, 0)`;
        flake.style.setProperty('--sway', sway + 'px');
        flake.style.setProperty('--dx', dx + 'px');

        const inner = document.createElement('div');
        inner.className = 'flake-inner';
        inner.style.height = '100%';
        inner.style.width = '100%';
        // combine two animations: fall (vertical) and sway (horizontal) via different elements
        inner.style.animationDuration = (duration * 0.9).toFixed(2) + 's';
        inner.style.animationDelay = '0s';
        inner.style.animationTimingFunction = 'ease-in-out';

        // fall animation applied to outer flake for rotation/vertical
        flake.style.animation = `fall ${duration}s linear forwards`;
        // sway animation on inner element
        inner.style.animation = `sway ${Math.max(3, duration/2).toFixed(2)}s ease-in-out infinite`;

        flake.appendChild(inner);
        snowEl.appendChild(flake);

        // remove when done to keep DOM small
        setTimeout(()=>{ flake.remove(); }, (duration + 0.5) * 1000);
    }
    function startSnow(){
        if(snowInterval) clearInterval(snowInterval);
        // spawn rate based on viewport size
        const rate = Math.max(60, Math.round((sceneW * sceneH) / 40000)); // flakes per minute approx
        const spawnMs = Math.max(120, Math.round(60000 / rate));
        snowInterval = setInterval(createFlake, spawnMs);
        // create a few immediately
        for(let i=0;i<8;i++) setTimeout(createFlake, i*150);
    }

    function stopSnow(){
        if(snowInterval) clearInterval(snowInterval);
        snowInterval = null;
        if(snowEl) snowEl.innerHTML = '';
    }

    // compute max jump height from current JUMP_SPEED
    function getMaxJumpHeight(){
        return (JUMP_SPEED * JUMP_SPEED) / (2 * GRAVITY); // ~ u^2 / (2g)
    }

    function generatePlatforms(){
        // remove existing platforms in DOM
        document.querySelectorAll('.platform').forEach(p => p.remove());

        // recompute scene / ground
        sceneW = sceneEl.clientWidth;
        sceneH = sceneEl.clientHeight;
        groundH = groundEl.clientHeight;
        const groundY = sceneH - groundH;

        // recompute jump reach based on current jump speed
        const MAX_JUMP_HEIGHT = getMaxJumpHeight();

        // determine number of platforms based on scene height
        const count = Math.max(4, Math.round(sceneH / 120)); // reasonable density

        // vertical spacing so platforms cover area above ground
        const topMargin = 40;
        const usableHeight = Math.max(120, groundY - topMargin - 80);
        const baseSpacing = usableHeight / count;

        platforms = [];

        for(let i = 0; i < count; i++){
            const plat = document.createElement('div');
            plat.className = 'platform';

            // width relative to scene
            const minW = Math.max(60, Math.round(sceneW * 0.10));
            const maxW = Math.max(minW + 40, Math.round(sceneW * 0.25));
            const width = Math.round(minW + Math.random() * (maxW - minW));

            // Prefer vertical positions that are reachable from below (<= MAX_JUMP_HEIGHT * 0.9)
            // Spread platforms upward: lower index = closer to ground
            const idealY = groundY - (i + 1) * baseSpacing;
            const jitterY = (Math.random() - 0.5) * baseSpacing * 0.6; // +/- jitter
            let top = Math.round(idealY + jitterY);

            // clamp top so platform stays inside scene and above topMargin
            top = Math.max(topMargin, Math.min(groundY - 60, top));

            // ensure platform vertical separation roughly within jump reach
            // if the platform ended up higher than what a player can realistically reach from the next lower one,
            // nudge it down a bit (this keeps level playable on small screens)
            if(i > 0){
                const prevTop = parseInt(platforms[i-1].style.top,10);
                const gap = prevTop - top;
                const maxGap = Math.max( (MAX_JUMP_HEIGHT * 0.9), baseSpacing * 1.4 );
                if(gap > maxGap){
                    top = Math.round(prevTop - maxGap);
                }
            }

            // choose left ensuring platform inside scene
            const left = Math.round(20 + Math.random() * Math.max(0, sceneW - width - 40));

            plat.style.left = left + 'px';
            plat.style.top = top + 'px';
            plat.style.width = width + 'px';
            // optional: vary height slightly
            const ph = 12 + Math.round(Math.random()*6);
            plat.style.height = ph + 'px';

            sceneEl.appendChild(plat);
            platforms.push(plat);
        }

        // keep at least one platform near the start
        if(platforms.length){
            const p0 = platforms[0];
            p0.style.left = Math.min(40, sceneW - parseInt(p0.style.width) - 20) + 'px';
            p0.style.top = (sceneH - groundH - 150) + 'px';
        }
    }
    function resize(){
        sceneW = sceneEl.clientWidth;
        sceneH = sceneEl.clientHeight;
        groundH = groundEl.clientHeight;

        startSnow();

        // scale santa size relative to screen width (so hitbox matches view)
        const santaBase = Math.round(Math.max(64, Math.min(160, sceneW * 0.12)));
        santaEl.style.width = santaBase + 'px';
        santaEl.style.height = santaBase + 'px';

        // adjust movement and jump speeds based on screen size
        // tweak these formulas to taste
        MOVE_SPEED = Math.max(3.5, Math.min(14, sceneW * 0.006));      // wider screens -> faster horizontal speed
        JUMP_SPEED = Math.max(12, Math.min(40, sceneH * 0.024));     // taller screens -> stronger jump

        // regenerate platforms for new size (uses updated JUMP_SPEED internally)
        generatePlatforms();

        const prizeSize = Math.round(Math.max(32, Math.min(88, sceneW * 0.06)));
        prize.width = prizeSize;
        prize.height = prizeSize;
        prize.collected = false;
        prizeEl.classList.remove('collected');
        prizeEl.style.width = prizeSize + 'px';
        prizeEl.style.height = prizeSize + 'px';
        prizeEl.style.fontSize = Math.round(prizeSize * 0.7) + 'px';
        // place prize centered near top margin used for platforms
        const topMargin = 40;
        prize.x = Math.round((sceneW - prizeSize) / 2);
        prize.y = topMargin + 8;
        prizeEl.style.left = prize.x + 'px';
        prizeEl.style.top = prize.y + 'px';

        // sync hitbox to the actual element size
        S.width = santaEl.clientWidth;
        S.height = santaEl.clientHeight;

        // place santa on ground if initial
        if (S.y === 0) {
            S.y = sceneH - groundH - S.height;
        } else {
            // make sure santa isn't off-screen after resize
            S.x = Math.max(0, Math.min(sceneW - S.width, S.x));
            S.y = Math.min(S.y, sceneH - groundH - S.height);
        }

        clampX();
        render();
    }

    function rectsIntersect(a, b){
        return !(a.x + a.width < b.x || a.x > b.x + b.width || a.y + a.height < b.y || a.y > b.y + b.height);
    }

    function clampX(){
        S.x = Math.max(0, Math.min(sceneW - S.width, S.x));
    }

    function render(){
        santaEl.style.transform = `translate(${Math.round(S.x)}px, ${Math.round(S.y)}px) scaleX(${S.vx<0?-1:1})`;
        santaEl.classList.toggle('jumping', !S.onGround);
    }

    function loop(){
        // horizontal movement
        if(keys.left && !keys.right) S.vx = -MOVE_SPEED;
        else if(keys.right && !keys.left) S.vx = MOVE_SPEED;
        else S.vx = 0;

        // physics
        S.vy += GRAVITY;
        S.x += S.vx;

        // store previous Y to detect platform crossing
        const prevY = S.y;
        S.y += S.vy;

        const groundY = sceneH - groundH;
        let landed = false;

        // Use scene bounding rect so platform rects are in same coordinate space as S.x/S.y
        const sceneRect = sceneEl.getBoundingClientRect();

        // platform collision (only land when falling through top)
        if (S.vy >= 0) {
            const H_INSET = Math.max(4, Math.round(S.width * 0.08)); // inset so edges don't count
            for (const p of platforms) {
                const pRect = p.getBoundingClientRect();
                const platLeft = pRect.left - sceneRect.left;
                const platTop = pRect.top - sceneRect.top;
                const platRight = platLeft + pRect.width;

                const santaBottomPrev = prevY + S.height;
                const santaBottom = S.y + S.height;

                const horizontallyOverlaps = (S.x + S.width - H_INSET > platLeft) && (S.x + H_INSET < platRight);

                // Check if santa passed through the platform top this frame and is horizontally over it
                if (santaBottomPrev <= platTop && santaBottom >= platTop && horizontallyOverlaps) {
                    // land on platform
                    S.y = platTop - S.height;
                    S.vy = 0;
                    S.onGround = true;
                    landed = true;
                    break;
                }
            }
        }

        // ground collision if not landed on a platform
        if(!landed && S.y + S.height >= groundY){
            S.y = groundY - S.height;
            S.vy = 0;
            S.onGround = true;
            landed = true;
        }

        // if not on any support, not on ground
        if(!landed){
            S.onGround = false;
        }

                // prize collision (collect)
        if(!prize.collected){
            const prizeBox = { x: prize.x, y: prize.y, width: prize.width, height: prize.height };
            const santaBox = { x: S.x, y: S.y, width: S.width, height: S.height };
            if(rectsIntersect(santaBox, prizeBox)){
                prize.collected = true;
                prizeEl.classList.add('collected');
                const instructions = document.getElementById('instructions');
                if(instructions) instructions.textContent = 'Du fant gaven! 🎉';
                // remove after animation
                setTimeout(()=>{ if(prizeEl && prizeEl.parentNode) prizeEl.parentNode.removeChild(prizeEl); }, 420);
            }
        }

        clampX();
        render();
        requestAnimationFrame(loop);
    }

    // Controls
    window.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
        if(e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
        if(e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W'){
            // jump
            if(S.onGround){
                S.vy = -JUMP_SPEED;
                S.onGround = false;
            }
            e.preventDefault();
        }
    });
    window.addEventListener('keyup', (e)=>{
        if(e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
        if(e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
    });

    // Touch / mouse controls
    const leftBtn = document.getElementById('left');
    const rightBtn = document.getElementById('right');
    const jumpBtn = document.getElementById('jump');

    function bindControl(btn, onDown, onUp){
        if(!btn) return;
        btn.addEventListener('pointerdown', (e)=>{ e.preventDefault(); onDown(); });
        btn.addEventListener('pointerup', (e)=>{ e.preventDefault(); onUp(); });
        btn.addEventListener('pointercancel', (e)=>{ e.preventDefault(); onUp(); });
        btn.addEventListener('pointerleave', (e)=>{ e.preventDefault(); onUp(); });
    }

    bindControl(leftBtn, ()=>{ keys.left = true; }, ()=>{ keys.left = false; });
    bindControl(rightBtn, ()=>{ keys.right = true; }, ()=>{ keys.right = false; });
    bindControl(jumpBtn, ()=>{ if(S.onGround){ S.vy = -JUMP_SPEED; S.onGround=false; } }, ()=>{});

    window.addEventListener('resize', resize);

    // Kick off
    resize();
    startSnow();
    requestAnimationFrame(loop);
});