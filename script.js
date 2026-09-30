// 1. 사진 클릭 시 크게 보기 (모달)
function openPhoto(src) {
    document.getElementById('modal-img').src = src;
    document.getElementById('photo-modal').classList.remove('hidden');
}

// 2. 사진 크게 보기 닫기
function closePhoto() {
    document.getElementById('photo-modal').classList.add('hidden');
}

// 3. 갤러리 화살표 버튼 (한 번에 3장씩 이동)
function slideGallery(dir) {
    const track = document.getElementById('gallery-track');
    track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' });
}

// 4. 갤러리 가로 스크롤 (PC: 마우스 휠 + 드래그 / 폰: 손가락 스와이프는 기본으로 됨)
function initGalleryScroll() {
    const track = document.getElementById('gallery-track');
    if (!track) return;

    // 마우스 휠을 위아래로 굴리면 옆으로 넘어가게
    track.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
        const max = track.scrollWidth - track.clientWidth;
        const atStart = track.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = track.scrollLeft >= max - 1 && e.deltaY > 0;
        if (atStart || atEnd) return; // 끝에 닿으면 원래대로 페이지 스크롤
        e.preventDefault();
        track.scrollLeft += e.deltaY;
    }, { passive: false });

    // 마우스로 잡고 끌어서 넘기기
    let isDown = false, startX = 0, startScroll = 0, moved = false;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        moved = false;
        startX = e.pageX;
        startScroll = track.scrollLeft;
        track.style.scrollSnapType = 'none';
        track.classList.replace('cursor-grab', 'cursor-grabbing');
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const dx = e.pageX - startX;
        if (Math.abs(dx) > 5) moved = true;
        track.scrollLeft = startScroll - dx;
    });

    window.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        track.style.scrollSnapType = '';
        track.classList.replace('cursor-grabbing', 'cursor-grab');
    });

    // 드래그한 거면 사진 클릭(확대)으로 치지 않기
    track.addEventListener('click', (e) => {
        if (moved) {
            e.stopPropagation();
            e.preventDefault();
            moved = false;
        }
    }, true);
}

// 5. 1주년 카운트다운
function initCountdown() {
    const targetDate = new Date("2026-10-01T00:00:00").getTime();
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('cd-days').textContent = "00";
            document.getElementById('cd-hours').textContent = "00";
            document.getElementById('cd-minutes').textContent = "00";
            document.getElementById('cd-seconds').textContent = "00";
            document.getElementById('countdown-message').classList.remove('hidden');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('cd-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('cd-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('cd-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('cd-seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// 6. 배경 반짝이 효과
function createParticles() {
    const container = document.getElementById('particles');
    for(let i=0; i<15; i++) {
        let p = document.createElement('div');
        p.className = 'particle';
        p.style.width = p.style.height = `${Math.random() * 15 + 5}px`;
        p.style.left = `${Math.random() * 100}vw`;
        p.style.animationDelay = `${Math.random() * 10}s`;
        p.style.animationDuration = `${Math.random() * 10 + 10}s`;
        container.appendChild(p);
    }
}

// 페이지 로드 시 실행
window.onload = () => {
    initGalleryScroll();
    initCountdown();
    createParticles();
};