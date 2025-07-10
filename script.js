document.addEventListener('DOMContentLoaded', function() {
    // Dropdown меню
    const dropdownBtn = document.getElementById('dropdown-btn');
    const dropdown = document.querySelector('.dropdown');
    let isDropdownOpen = false;
    
    // Автоматическое подчёркивание активной страницы
    function setActiveNav() {
        const navLinks = document.querySelectorAll('.main-nav a');
        const currentPath = window.location.pathname;
        
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            const linkPath = link.getAttribute('href');
            
            const cleanCurrentPath = currentPath.replace(/\/$/, '').split('/').pop() || 'index.html';
            const cleanLinkPath = linkPath.replace(/^\.?\//, '').replace(/\/$/, '');
            
            if (cleanLinkPath === cleanCurrentPath || 
                (cleanCurrentPath === 'index.html' && cleanLinkPath === '') ||
                (cleanCurrentPath === '' && cleanLinkPath === 'index.html')) {
                link.classList.add('active-nav');
            }
        });
    }

    dropdownBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        isDropdownOpen = !isDropdownOpen;
        dropdown.classList.toggle('active', isDropdownOpen);
    });

    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && isDropdownOpen) {
            dropdown.classList.remove('active');
            isDropdownOpen = false;
        }
    });

    // Анимация разделителя
    setTimeout(() => {
        const separator = document.querySelector('.separator');
        if (separator) {
            separator.style.opacity = '1';
        }
    }, 300);

    function setupBlurBallEffect(boxId, ballId) {
        const featureBox = document.getElementById(boxId);
        const blurBall = document.getElementById(ballId);
        
        if (featureBox && blurBall) {
            featureBox.addEventListener('mousemove', function(e) {
                const rect = featureBox.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
                
                blurBall.style.left = x + 'px';
                blurBall.style.top = y + 'px';
                blurBall.style.opacity = '1';
            });
            
            featureBox.addEventListener('mouseleave', function() {
                blurBall.style.opacity = '0';
            });
        }
    }

    // Настройка эффектов для всех плашек (только на главной)
    if (document.getElementById('feature-box1')) {
        setupBlurBallEffect('feature-box1', 'blur-ball1');
        setupBlurBallEffect('feature-box2', 'blur-ball2');
        setupBlurBallEffect('feature-box3', 'blur-ball3');
    }

    // Анимация печатающегося текста
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const phrases = [
            "Очень вам рады!",
            "Добро пожаловать!",
            "Присоединяйтесь к нам!",
            "А ты правила то читал?",
            "Здарова!",
            "А мы точно прилетели туда?",
            "Открытие точно скоро?",
            ""
        ];
        
        let currentPhraseIndex = 0;
        let isDeleting = false;
        let text = '';
        let typingSpeed = 150;
        let pauseDuration = 3000;
        let nextPhraseDelay = 1000;

        function getRandomPhrase() {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * phrases.length);
            } while (newIndex === currentPhraseIndex && phrases.length > 1);
            
            currentPhraseIndex = newIndex;
            return phrases[currentPhraseIndex];
        }

        function typeWriter() {
            const fullText = phrases[currentPhraseIndex];
            
            if (!isDeleting && text.length < fullText.length) {
                text = fullText.substring(0, text.length + 1);
                typingText.textContent = text + '_';
                setTimeout(typeWriter, typingSpeed);
            } else if (!isDeleting && text.length === fullText.length) {
                isDeleting = true;
                typingText.textContent = text;
                setTimeout(typeWriter, pauseDuration);
            } else if (isDeleting && text.length > 0) {
                text = text.substring(0, text.length - 1);
                typingText.textContent = text + '_';
                setTimeout(typeWriter, typingSpeed / 2);
            } else {
                isDeleting = false;
                typingText.textContent = '_';
                getRandomPhrase();
                setTimeout(typeWriter, nextPhraseDelay);
            }
        }

        setTimeout(typeWriter, 1000);
    }

    // Анимация при скролле
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
        let lastScrollTop = 0;
        let isScrolling = false;

        window.addEventListener('scroll', function() {
            if (isScrolling) return;
            
            isScrolling = true;
            
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScroll > lastScrollTop) {
                scrollContainer.classList.remove('hide-up');
                scrollContainer.classList.add('hide-down');
                
                setTimeout(() => {
                    scrollContainer.classList.remove('hide-down');
                    isScrolling = false;
                }, 600);
            } else {
                scrollContainer.classList.remove('hide-down');
                scrollContainer.classList.add('hide-up');
                
                setTimeout(() => {
                    scrollContainer.classList.remove('hide-up');
                    isScrolling = false;
                }, 600);
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }, { passive: true });

        // Анимация при загрузке
        setTimeout(() => {
            scrollContainer.style.opacity = '1';
            scrollContainer.style.transform = 'translateY(0)';
        }, 100);
    }

    // Анимация для страницы команды
    if (document.querySelector('.team-container')) {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach((member, index) => {
            member.style.opacity = '0';
            member.style.transform = 'translateY(20px)';
            member.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                member.style.opacity = '1';
                member.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
    }

    // Вызываем при загрузке страницы
    setActiveNav();

    // Обработчик для плавных переходов между страницами
    document.querySelectorAll('nav a').forEach(link => {
        if (link.href && !link.href.includes('#')) {
            link.addEventListener('click', function(e) {
                if (this.classList.contains('active-nav')) {
                    e.preventDefault();
                    return;
                }
                
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            });
        }
    });
});

// Закрытие при клике вне меню
document.addEventListener('click', function() {
    const activeDropdown = document.querySelector('.dropdown.active');
    if (activeDropdown) {
        activeDropdown.classList.remove('active');
    }
});