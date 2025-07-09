
// Theme Toggle Script
document.addEventListener('DOMContentLoaded', () => {
const heroSection = document.getElementById('hero');
const logoContainer = document.getElementById('logo-container');
if (logoContainer) {
    logoContainer.addEventListener('click', () => {
    heroSection.classList.toggle('light-mode');
    });
}
});

// Section Fade-in Animation Script
const sections = document.querySelectorAll('main > section');
const observerOptions = { root: null, rootMargin: "0px 0px -50px 0px", threshold: 0.1 };
const observer = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('opacity-100', 'translate-y-0');
    entry.target.classList.remove('opacity-0', 'translate-y-10');
    observer.unobserve(entry.target);
});
}, observerOptions);
sections.forEach(section => {
section.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
observer.observe(section);
});

var swiper = new Swiper(".mySwiper", {
slidesPerView: 1.3,
spaceBetween: 30,
centeredSlides: true,
rewind: true,
speed: 1000,
pagination: {
    el: ".swiper-pagination",
    clickable: true,
},
navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
},
breakpoints: {
    768: {
    slidesPerView: 2.5,
    spaceBetween: 40
    }
}
});

document.addEventListener('DOMContentLoaded', () => {
const modal = document.getElementById('project-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalCloseBtn = document.getElementById('modal-close-btn');
const body = document.body;

// モーダルに表示する要素
const modalMedia = document.getElementById('modal-media');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPoints = document.getElementById('modal-points');
const modalTags = document.getElementById('modal-tags');
const modalLinks = document.getElementById('modal-links');

const slides = document.querySelectorAll('.swiper-slide img');
let modalSwiper = null; // モーダル内のSwiperインスタンスを保持する変数

// モーダルを開く関数
const openModal = (el) => {
    const dataset = el.dataset;
    
    // メディアコンテナをクリア
    modalMedia.innerHTML = '';

    if (dataset.imageUrls) {
        // --- 複数画像のスライドショーを生成 ---
        const imageUrls = dataset.imageUrls.split(',').map(url => url.trim());
        const swiperHtml = `
            <div class="swiper-container modal-swiper">
                <div class="swiper-wrapper">
                    ${imageUrls.map(url => `<div class="swiper-slide"><img src="${url}" alt="プロジェクトのスクリーンショット"></div>`).join('')}
                </div>
                <div class="swiper-pagination modal-swiper-pagination"></div>
                <div class="swiper-button-next modal-swiper-button-next"></div>
                <div class="swiper-button-prev modal-swiper-button-prev"></div>
            </div>
        `;
        modalMedia.innerHTML = swiperHtml;

        // モーダル用のSwiperを初期化
        modalSwiper = new Swiper('.modal-swiper', {
            loop: true,
            pagination: {
                el: '.modal-swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.modal-swiper-button-next',
                prevEl: '.modal-swiper-button-prev',
            },
        });

    } else if (dataset.videoUrl) {
        // --- 動画を生成 ---
        const videoId = new URL(dataset.videoUrl).searchParams.get('v');
        if (videoId) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            modalMedia.appendChild(iframe);
        }
    } else {
        // --- 単一の画像を生成 ---
        const img = document.createElement('img');
        img.src = el.src;
        img.alt = el.alt;
        modalMedia.appendChild(img);
    }
    
    // その他の情報をセット
    modalTitle.textContent = dataset.title || '';
    modalDescription.textContent = dataset.description || '';
    modalPoints.innerHTML = dataset.pointsHtml || '';
    modalTags.innerHTML = dataset.tagsHtml || '';
    modalLinks.innerHTML = dataset.linksHtml || '';

    modal.classList.add('is-open');
    body.classList.add('modal-open');
};

// モーダルを閉じる関数
const closeModal = () => {
    modal.classList.remove('is-open');
    body.classList.remove('modal-open');
    
    // Swiperインスタンスが存在すれば破棄する
    if (modalSwiper) {
        modalSwiper.destroy(true, true);
        modalSwiper = null;
    }

    // メディアコンテナを空にする
    modalMedia.innerHTML = '';
};

slides.forEach(slide => {
    slide.addEventListener('click', () => {
        openModal(slide);
    });
});

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && modal.classList.contains('is-open')) {
        closeModal();
    }
});
});
// Page Top Button Visibility Script
const pageTopBtn = document.getElementById('page-top-btn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 900) {
    pageTopBtn.classList.add('visible');
    } else {
    pageTopBtn.classList.remove('visible');
    }
});
// Nav-Icon Flash on Page Top Click Script
document.addEventListener('DOMContentLoaded', () => {
    const pageTopBtn = document.getElementById('page-top-btn');
    const navIcon = document.getElementById('nav-icon');

    if (pageTopBtn && navIcon) {
    pageTopBtn.addEventListener('click', (e) => {
        // アニメーションクラスを追加
        navIcon.classList.add('flashing-icon');

        // アニメーションが終わったらクラスを削除（連続で押せるようにするため）
        setTimeout(() => {
        navIcon.classList.remove('flashing-icon');
        }, 6500); // 
    });
    }
});