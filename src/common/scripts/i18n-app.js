// 国际化脚本 - 应用主页版本
document.addEventListener('DOMContentLoaded', function() {
    console.log('I18n应用初始化');
    
    // 延迟应用翻译，确保Canvas元素已初始化
    setTimeout(function() {
        console.log('延迟应用I18n翻译...');
        // 获取用户语言偏好
        const savedLang = localStorage.getItem('language') || 'en';
        const langSelect = document.getElementById('language');
        
        // 设置选择器为当前语言
        if (langSelect) {
            langSelect.value = savedLang;
            console.log('设置语言选择器为:', savedLang);
        }
        
        // 立即应用语言
        window.i18n.setLang(savedLang);
        
        // 监听语言选择变化
        if (langSelect) {
            langSelect.addEventListener('change', function() {
                window.i18n.setLang(this.value);
                localStorage.setItem('language', this.value);
            });
        }
    }, 1000); // 延迟1秒应用翻译
});

// 语言对象，将在语言文件加载后填充
let currentLanguage = 'en'; // 默认为英文
let translations = {};
let elementCache = {}; // 缓存翻译过的元素

// 初始化国际化功能
function initI18n() {
    // 加载语言选择器
    const languageSelector = document.getElementById('language');
    if (!languageSelector) return;
    
    // 先从localStorage获取用户的语言偏好
    const savedLanguage = localStorage.getItem('language');
    
    // 如果有保存的偏好，使用它；否则，使用英文作为默认语言
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    } else {
        // 默认使用英文
        currentLanguage = 'en';
        
        // 保存到localStorage
        localStorage.setItem('language', currentLanguage);
    }
    
    // 设置语言选择器的初始值
    languageSelector.value = currentLanguage;
    
    // 添加事件监听器，在语言改变时更新页面
    languageSelector.addEventListener('change', function(e) {
        currentLanguage = e.target.value;
        localStorage.setItem('language', currentLanguage);
        
        // 应用新的语言设置
        applyTranslations();
        
        // 语言切换后刷新页面以完全应用所有翻译
        window.location.reload();
    });
    
    // 加载并应用翻译
    loadTranslations();
}

// 加载翻译文件
function loadTranslations() {
    // 确保i18n对象初始化
    window.i18n = window.i18n || {};
    
    // 主页面的路径不同，需要调整
    // 加载英文翻译（默认）
    loadScript('src/common/i18n/en.js', function() {
        // 加载中文翻译
        loadScript('src/common/i18n/zh.js', function() {
            // 所有翻译加载完成后应用翻译
            translations = window.i18n;
            applyTranslations();
            
            // 确保HTML语言标签与当前语言一致
            document.documentElement.lang = currentLanguage;
        });
    });
}

// 动态加载脚本
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}

// 应用翻译到页面
function applyTranslations() {
    if (!translations || !translations[currentLanguage]) {
        console.error('翻译数据未加载或语言不支持:', currentLanguage);
        return;
    }
    
    // 确保HTML语言标签与当前语言一致
    document.documentElement.lang = currentLanguage;
    
    // 应用页面标题翻译
    updatePageTitle();
    
    // 应用导航链接翻译
    updateNavigation();
    
    // 应用暗黑模式按钮翻译
    updateDarkModeButton();
    
    // 更新通用元素
    updateCommonElements();
    
    // 应用页脚翻译
    updateFooter();
    
    // 主页面只需要更新主页内容
    updateHomePageContent();
    
    console.log(`已应用${currentLanguage}语言翻译`);
}

// 更新页面标题
function updatePageTitle() {
    // 根据页面URL确定当前页面，并更新相应的标题
    const currentPath = window.location.pathname;
    let pageKey = 'home';
    
    if (currentPath.includes('/learning.html')) {
        pageKey = 'learning';
    } else if (currentPath.includes('/game.html')) {
        pageKey = 'game';
    } else if (currentPath.includes('/test.html')) {
        pageKey = 'test';
    } else if (currentPath.includes('/community.html')) {
        pageKey = 'community';
    }
    
    // 更新页面的标题标签
    document.title = getTranslation(`${pageKey}.pageTitle`) || document.title;
}

// 更新导航
function updateNavigation() {
    // 选择导航链接
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // 根据链接确定导航项
        if (href.includes('index.html') || href === './' || href === '/') {
            updateTextContent(link, 'nav.home');
        } else if (href.includes('learning.html')) {
            updateTextContent(link, 'nav.learning');
        } else if (href.includes('game.html')) {
            updateTextContent(link, 'nav.game');
        } else if (href.includes('test.html')) {
            updateTextContent(link, 'nav.test');
        } else if (href.includes('community.html')) {
            updateTextContent(link, 'nav.community');
        }
    });
    
    // 更新面包屑导航（如果存在）
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        const breadcrumbLinks = breadcrumb.querySelectorAll('a');
        breadcrumbLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.includes('index.html') || href === './' || href === '/') {
                updateTextContent(link, 'nav.home');
            }
        });
        
        // 更新当前页面的面包屑文本
        const currentPageSpan = breadcrumb.querySelector('span');
        if (currentPageSpan) {
            const currentPath = window.location.pathname;
            
            if (currentPath.includes('/learning.html')) {
                updateTextContent(currentPageSpan, 'learning.breadcrumb');
            } else if (currentPath.includes('/game.html')) {
                updateTextContent(currentPageSpan, 'game.breadcrumb');
            } else if (currentPath.includes('/test.html')) {
                updateTextContent(currentPageSpan, 'test.breadcrumb');
            } else if (currentPath.includes('/community.html')) {
                updateTextContent(currentPageSpan, 'community.breadcrumb');
            }
        }
    }
}

// 更新暗黑模式按钮
function updateDarkModeButton() {
    const darkModeBtn = document.getElementById('dark-mode-btn');
    if (darkModeBtn) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        updateTextContent(darkModeBtn, isDarkMode ? 'common.lightMode' : 'common.darkMode');
    }
}

// 更新页面内容
function updatePageContent() {
    const currentPath = window.location.pathname;
    
    // 首页内容
    if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
        updateHomePageContent();
    }
    // 学习页面内容
    else if (currentPath.includes('/learning.html')) {
        updateLearningPageContent();
    }
    // 游戏页面内容
    else if (currentPath.includes('/game.html')) {
        updateGamePageContent();
    }
    // 测试页面内容
    else if (currentPath.includes('/test.html')) {
        updateTestPageContent();
    }
    // 社区页面内容
    else if (currentPath.includes('/community.html')) {
        updateCommunityPageContent();
    }
}

// 更新首页内容
function updateHomePageContent() {
    // 英雄区域
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) updateTextContent(heroTitle, 'home.hero.title');
    
    const heroDescription = document.querySelector('.hero-content p');
    if (heroDescription) updateTextContent(heroDescription, 'home.hero.description');
    
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) updateTextContent(ctaButton, 'home.hero.cta');
    
    // 特色区域
    const featuresTitle = document.querySelector('.features h2');
    if (featuresTitle) updateTextContent(featuresTitle, 'home.features.title');
    
    // 特色卡片
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        
        if (index === 0) {
            if (title) updateTextContent(title, 'home.features.interactive.title');
            if (description) updateTextContent(description, 'home.features.interactive.description');
        } else if (index === 1) {
            if (title) updateTextContent(title, 'home.features.games.title');
            if (description) updateTextContent(description, 'home.features.games.description');
        } else if (index === 2) {
            if (title) updateTextContent(title, 'home.features.tests.title');
            if (description) updateTextContent(description, 'home.features.tests.description');
        } else if (index === 3) {
            if (title) updateTextContent(title, 'home.features.community.title');
            if (description) updateTextContent(description, 'home.features.community.description');
        }
    });
}

// 更新学习页面内容
function updateLearningPageContent() {
    // 这里实现学习页面的翻译逻辑
}

// 更新游戏页面内容
function updateGamePageContent() {
    // 这里实现游戏页面的翻译逻辑
}

// 更新测试页面内容
function updateTestPageContent() {
    // 这里实现测试页面的翻译逻辑
}

// 更新社区页面内容
function updateCommunityPageContent() {
    // 这里实现社区页面的翻译逻辑
}

// 更新页脚
function updateFooter() {
    // 快速链接标题
    const quickLinksTitle = document.querySelector('.footer-links h3');
    if (quickLinksTitle) updateTextContent(quickLinksTitle, 'common.quickLinks');
    
    // 联系我们
    const contactTitle = document.querySelector('.footer-contact h3');
    if (contactTitle) updateTextContent(contactTitle, 'common.contact');
    
    const contactEmail = document.querySelector('.footer-contact p');
    if (contactEmail) updateTextContent(contactEmail, 'common.email');
    
    // 版权信息
    const copyright = document.querySelector('.footer-bottom p:first-child');
    if (copyright) updateTextContent(copyright, 'common.copyright');
    
    // 底部链接
    const privacyLink = document.querySelector('.footer-bottom a[href*="privacy"]');
    if (privacyLink) updateTextContent(privacyLink, 'common.privacy');
    
    const termsLink = document.querySelector('.footer-bottom a[href*="terms"]');
    if (termsLink) updateTextContent(termsLink, 'common.terms');
}

// 更新元素的文本内容
function updateTextContent(element, translationKey) {
    if (!element) return;
    
    // 使用缓存记录元素的原始文本
    if (!elementCache[element]) {
        elementCache[element] = {
            originalText: element.textContent,
            key: translationKey
        };
    }
    
    // 获取翻译并应用
    const translated = getTranslation(translationKey);
    if (translated) {
        element.textContent = translated;
    } else {
        // 如果没有找到翻译，使用原始文本
        element.textContent = elementCache[element].originalText;
    }
}

// 获取翻译文本
function getTranslation(key) {
    if (!translations || !translations[currentLanguage]) return null;
    
    // 支持点号分隔的嵌套键，如 'home.hero.title'
    const keys = key.split('.');
    let result = translations[currentLanguage];
    
    for (const k of keys) {
        if (!result[k]) return null;
        result = result[k];
    }
    
    return result;
}

// 扩展i18n对象
window.i18n = window.i18n || {};
window.i18n.getCurrentLanguage = function() {
    return currentLanguage;
};
window.i18n.setLanguage = function(lang) {
    if (lang === 'en' || lang === 'zh') {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        // 更新语言选择器
        const languageSelector = document.getElementById('language');
        if (languageSelector) {
            languageSelector.value = lang;
        }
        
        // 应用翻译
        applyTranslations();
        return true;
    }
    return false;
};