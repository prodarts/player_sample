document.addEventListener('DOMContentLoaded', () => {

  // 画像ギャラリーの横スクロール機能
  const track = document.getElementById('gallery-track');
  const leftArrow = document.getElementById('gallery-left');
  const rightArrow = document.getElementById('gallery-right');

  if (track && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => { track.scrollBy({ left: -215, behavior: 'smooth' }); });
    rightArrow.addEventListener('click', () => { track.scrollBy({ left: 215, behavior: 'smooth' }); });
  }

  // ***** ヘッダー背景画像とコンテンツアニメーション制御 *****
  const header = document.querySelector('header');
  const headerContent = document.querySelector('.header-content'); 

  // 金子様のギャラリー画像ファイル名リスト
  const galleryImages = ['img_1.jpg', 'img_2.jpg', 'img_3.jpg', 'img_4.jpg', 'img_5.jpg'];
  let currentMobileBgIndex = 0;
  let mobileBgInterval = null;

  function updateHeaderBackground() {
    if (window.innerWidth > 768) {
      // PCの場合
      if (mobileBgInterval) {
        clearInterval(mobileBgInterval);
        mobileBgInterval = null;
      }
      header.classList.add('pc-bg-image');
      
      // ▼▼▼【ここを修正しました】▼▼▼
      // PC版の背景をogp.jpgに指定
      header.style.backgroundImage = `url('ogp.jpg')`;
      // ▲▲▲【ここまで修正】▲▲▲

      header.style.backgroundAttachment = 'fixed';
    } else {
      // モバイルの場合: ギャラリー画像を背景に、自動切り替え
      header.classList.remove('pc-bg-image');
      header.style.backgroundAttachment = 'scroll';

      if (!mobileBgInterval) {
        // 初回設定
        header.style.backgroundImage = `url('${galleryImages[currentMobileBgIndex]}')`;
        mobileBgInterval = setInterval(() => {
          currentMobileBgIndex = (currentMobileBgIndex + 1) % galleryImages.length;
          header.style.backgroundImage = `url('${galleryImages[currentMobileBgIndex]}')`;
        }, 3000);
      }
    }
  }

  // ページ読み込み時とリサイズ時にヘッダー背景を更新
  updateHeaderBackground();
  window.addEventListener('resize', updateHeaderBackground);

  // ヘッダーコンテンツのアニメーションをトリガー
  if (headerContent) {
    setTimeout(() => {
      headerContent.classList.add('is-visible');
    }, 100);
  }

  // ***** スクロールアニメーション機能 *****
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        section.classList.add('is-visible');

        const title = section.querySelector('.section-title');
        if (title) {
          title.classList.add('is-visible');
        }
        
        const textElements = section.querySelectorAll('.anim-text');
        textElements.forEach((el, index) => {
          el.style.transitionDelay = `${0.2 + (index * 0.05)}s`;
          el.classList.add('is-visible');
        });
        
        observer.unobserve(section);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.querySelectorAll('p, span:not(.hearts), li, b, a.sponsor-btn, .item-label, .item-detail, .contact-description, .contact-note, .store-testimonial, .stats-summary, .price-note, .ok-list h3, .ng-list h3, ul.faq-list b, ul.faq-list li, .catch, .subcatch').forEach(el => {
      el.classList.add('anim-text');
    });
    observer.observe(section);
  });
});

// お問い合わせテンプレートをコピーする機能
function copyContactTemplate() {
  const contactTemplate = document.getElementById('contact-template');
  const copyAlert = document.getElementById('copy-alert');
  contactTemplate.select();
  contactTemplate.setSelectionRange(0, 99999);
  if (navigator.clipboard) {
    navigator.clipboard.writeText(contactTemplate.value).then(() => {
      copyAlert.style.display = 'block';
      setTimeout(() => { copyAlert.style.display = 'none'; }, 1700);
    });
  }
}