/*
  JavaScript for Laos Travel Guide
  - Handles: loading screen, hamburger menu, smooth scrolling,
    parallax, scroll animations, stats counter, dark mode toggle,
    scroll-to-top button
*/

document.addEventListener('DOMContentLoaded', function(){
  // Loading screen
  const loading = document.getElementById('loading-screen');
  setTimeout(() => { loading.style.opacity = '0'; loading.style.pointerEvents='none'; setTimeout(()=>loading.remove(),600); }, 700);

  // Hamburger menu (mobile)
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', ()=>{
    nav.classList.toggle('open');
    if(nav.classList.contains('open')){
      nav.style.display = 'block';
    } else {
      nav.style.display = '';
    }
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          window.scrollTo({top: target.offsetTop - 72, behavior:'smooth'});
          // close mobile nav after click
          if(nav.classList.contains('open')){ nav.classList.remove('open'); nav.style.display=''; }
        }
      }
    });
  });

  // Parallax effect for hero background
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', ()=>{
    const sc = window.scrollY;
    if(heroBg) heroBg.style.transform = `translateY(${sc * 0.2}px)`; // subtle parallax
  });

  // Scroll animations using IntersectionObserver
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  },{threshold:0.15});
  document.querySelectorAll('.card, .section-title, .food-card, .profile-card, .stat').forEach(el=>observer.observe(el));

  // Animated stats count-up
  const statEls = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target; const target = +el.dataset.target;
        let start = 0; const duration = 1800; const step = (timestamp)=>{
          const progress = Math.min((timestamp || 0)/duration,1);
          el.textContent = Math.floor(progress * target).toLocaleString();
          if(progress<1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  },{threshold:0.2});
  statEls.forEach(e=>statObserver.observe(e));

  // Scroll to top
  const toTop = document.getElementById('to-top');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY>600) toTop.style.display='block'; else toTop.style.display='none';
  });
  toTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Header flag (static) - no dark mode toggle
  // kept for future enhancement if needed

  // Simple reveal animation via class additions
  const animated = document.querySelectorAll('.card, .section-title, .food-card, .profile-card');
  animated.forEach((el,i)=>{ el.style.transition = 'all 650ms cubic-bezier(.2,.9,.2,1)'; el.style.opacity=0; el.style.transform='translateY(18px)'; });
  const revealObserver = new IntersectionObserver((entries, o)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.opacity=1; entry.target.style.transform='translateY(0)'; o.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  animated.forEach(el=>revealObserver.observe(el));

});
