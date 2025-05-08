// 国际化脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化国际化功能
    initI18n();
});

// 语言对象，将在语言文件加载后填充
let currentLanguage = 'en'; // 默认为英文
let translations = {};
let elementCache = {}; // 缓存翻译过的元素
let translationLoaded = false; // 追踪翻译是否已加载

// 应用语言设置时，触发语言变化事件
function notifyLanguageChanged() {
    // 创建并派发语言变化事件
    const event = new CustomEvent('languageChanged', { 
        detail: { language: currentLanguage } 
    });
    document.dispatchEvent(event);
}

// 初始化国际化功能
function initI18n() {
    console.log('初始化国际化功能...');
    
    // 先从localStorage获取用户的语言偏好
    const savedLanguage = localStorage.getItem('language');
    
    // 如果有保存的偏好，使用它；否则，使用英文作为默认语言
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        console.log('从localStorage加载语言设置:', currentLanguage);
    } else {
        // 默认使用英文
        currentLanguage = 'en';
        
        // 保存到localStorage
        localStorage.setItem('language', currentLanguage);
        console.log('使用默认语言:', currentLanguage);
    }
    
    // 加载语言选择器
    const languageSelector = document.getElementById('language');
    if (!languageSelector) {
        console.warn('未找到语言选择器，使用默认语言:', currentLanguage);
    } else {
    // 设置语言选择器的初始值
        languageSelector.value = currentLanguage;
        
        // 添加事件监听器，在语言改变时更新页面
        languageSelector.addEventListener('change', function(e) {
            currentLanguage = e.target.value;
            console.log('语言已更改为:', currentLanguage);
            
            // 保存到localStorage
            localStorage.setItem('language', currentLanguage);
            
            // 应用新的语言设置
            applyTranslations();
            
            // 通知语言变化
            notifyLanguageChanged();
        });
    }
    
    // 加载并应用翻译
    loadTranslations();

    // 设置MutationObserver来监听动态添加的元素
    setupMutationObserver();
}

// 设置MutationObserver来监视DOM变化
function setupMutationObserver() {
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // 检查是否有添加新节点
            if (mutation.addedNodes.length > 0) {
                // 遍历添加的节点
                mutation.addedNodes.forEach(function(node) {
                    // 检查节点是否是元素节点
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // 检查新添加的元素及其子元素中是否有需要翻译的元素
                        translateElement(node);
                    }
                });
            }
        });
    });

    // 配置观察选项:
    const config = { 
        childList: true, // 观察目标子节点的变动
        subtree: true // 观察所有后代节点的变动
    };

    // 开始观察document.body的变动:
    observer.observe(document.body, config);
}

// 翻译单个元素及其子元素
function translateElement(element) {
    // 如果翻译尚未加载完成，返回
    if (!translationLoaded) return;
    
    // 特殊处理：网站Logo标题始终保持为"Quadratic Equations & Parabolas"
    if (element.tagName === 'H1' && element.parentElement && element.parentElement.classList.contains('logo')) {
        element.textContent = "Quadratic Equations & Parabolas";
        return; // 直接返回，不应用翻译
    }
    
    // 检查元素本身是否有data-i18n属性
    if (element.hasAttribute('data-i18n')) {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        
        // 特殊处理暗黑模式按钮，不修改其图标
        if (element.id === 'dark-mode-btn') {
            // 暗黑模式按钮应该保持🌓图标，只更新aria-label
            if (element.textContent.trim() !== '🌓') {
                element.textContent = '🌓';
            }
            
            // 更新aria-label属性（如果存在）
            if (element.hasAttribute('aria-label') && translation) {
                element.setAttribute('aria-label', translation);
            }
        } 
        // 普通元素正常更新文本内容
        else if (translation) {
            // 确保特定的测试页面元素能正确翻译
            element.textContent = translation;
            
            // 在控制台记录特定元素的翻译情况
            if (key === 'test.intro.title' || key === 'test.intro.description') {
                console.log(`翻译 ${key} 为: ${translation}`);
            }
        }
    }
    
    // 处理元素的placeholder属性（用于输入框）
    if (element.hasAttribute('data-i18n-placeholder')) {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getTranslation(key);
        if (translation) {
            element.placeholder = translation;
        }
    }
    
    // 处理元素的title属性（用于提示）
    if (element.hasAttribute('data-i18n-title')) {
        const key = element.getAttribute('data-i18n-title');
        const translation = getTranslation(key);
        if (translation) {
            element.title = translation;
        }
    }
    
    // 处理元素的value属性（用于按钮等）
    if (element.hasAttribute('data-i18n-value')) {
        const key = element.getAttribute('data-i18n-value');
        const translation = getTranslation(key);
        if (translation) {
            element.value = translation;
        }
    }
    
    // 如果元素有子元素，递归处理子元素
    const children = element.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-value]');
    children.forEach(child => {
        translateElement(child);
    });
}

// 加载翻译文件
function loadTranslations() {
    // 确保i18n对象初始化
    window.i18n = window.i18n || {};
    
    // 检测当前路径
    const path = window.location.pathname;
    
    // 检测是否为首页 (根路径或index.html)
    const isIndex = path.endsWith('index.html') || path.endsWith('/') || path === '';
    
    // 根据路径选择正确的翻译文件路径
    const basePath = isIndex ? 'src/common/i18n/' : '../common/i18n/';
    
    console.log('加载翻译文件，基础路径:', basePath);
    
    // 加载英文翻译（默认）
    loadScript(basePath + 'en.js', function() {
        console.log('英文翻译已加载');
        // 加载中文翻译
        loadScript(basePath + 'zh.js', function() {
            console.log('中文翻译已加载');
            // 所有翻译加载完成后应用翻译
            translations = window.i18n;
            translationLoaded = true;
            
            // 应用翻译
            applyTranslations();
            
            // 确保HTML语言标签与当前语言一致
            document.documentElement.lang = currentLanguage;
            
            // 触发语言变化事件，通知可能的监听器
            notifyLanguageChanged();
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

// 翻译当前页面内容
function applyTranslations() {
    // 检查是否已经加载了翻译
    if (!translations || !translations[currentLanguage]) {
        console.error('翻译未加载或当前语言不支持:', currentLanguage);
        return;
    }

    // 更新HTML语言属性
    document.documentElement.lang = currentLanguage;

    // 确保logo标题始终为"Quadratic Equations & Parabolas"
    const logoTitle = document.querySelector('.logo h1');
    if (logoTitle) {
        logoTitle.textContent = "Quadratic Equations & Parabolas";
    }

    // 更新页面标题
    updatePageTitle();

    // 翻译所有带data-i18n属性的元素
    translateAllElements();

    // 检测当前页面类型并应用特定页面的翻译
    applyPageSpecificTranslations();

    // 更新语言选择器显示
    updateLanguageSelector();

    console.log(`已应用${currentLanguage}语言翻译`);
}

// 更新语言选择器显示
function updateLanguageSelector() {
    const languageSelector = document.getElementById('language');
    if (languageSelector) {
        // 设置选择器值为当前语言
        languageSelector.value = currentLanguage;
    }
}

// 翻译所有带data-i18n属性的元素
function translateAllElements() {
    // 获取所有带data-i18n属性的元素 - 确保更深层次的嵌套元素也被选中
    const elements = document.querySelectorAll('[data-i18n]');
    
    console.log('找到需要翻译的元素数量:', elements.length);
    
    // 遍历每个元素并翻译
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        
        // 在控制台记录特定元素的翻译情况
        if (key.includes('features.') || key.includes('hero.')) {
            console.log(`翻译元素 "${key}": "${element.textContent}" => "${translation}"`);
        }
        
        // 特殊处理logo标题
        if (element.tagName === 'H1' && element.parentElement && element.parentElement.classList.contains('logo')) {
            element.textContent = "Quadratic Equations & Parabolas";
        } 
        // 特殊处理暗黑模式按钮，不修改其图标
        else if (element.id === 'dark-mode-btn') {
            // 保持🌓图标，只更新aria-label
            if (element.textContent.trim() !== '🌓') {
                element.textContent = '🌓';
            }
            // 更新aria-label属性
            if (element.hasAttribute('aria-label') && translation) {
                element.setAttribute('aria-label', translation);
            }
        }
        // 普通元素正常更新文本内容
        else if (translation) {
            element.textContent = translation;
        }
    });
    
    // 特别检查首页中的特色功能卡片
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        console.log('找到特色功能卡片:', featureCards.length);
        featureCards.forEach(card => {
            const title = card.querySelector('h3[data-i18n]');
            const description = card.querySelector('p[data-i18n]');
            
            if (title) {
                const key = title.getAttribute('data-i18n');
                const translation = getTranslation(key);
                if (translation) {
                    console.log(`翻译特色卡片标题 "${key}": "${title.textContent}" => "${translation}"`);
                    title.textContent = translation;
                }
            }
            
            if (description) {
                const key = description.getAttribute('data-i18n');
                const translation = getTranslation(key);
                if (translation) {
                    console.log(`翻译特色卡片描述 "${key}": "${description.textContent}" => "${translation}"`);
                    description.textContent = translation;
                }
            }
        });
    }
}

// 更新导航元素
function updateNavigation() {
    // 翻译顶部导航链接
    const navItems = document.querySelectorAll('nav a');
    navItems.forEach(item => {
        const href = item.getAttribute('href') || '';
        
        if (href.includes('index.html') || href === '/' || href === '') {
            updateTextContent(item, 'nav.home');
        } else if (href.includes('learning.html')) {
            updateTextContent(item, 'nav.learning');
        } else if (href.includes('game.html')) {
            updateTextContent(item, 'nav.game');
        } else if (href.includes('test.html')) {
            updateTextContent(item, 'nav.test');
        } else if (href.includes('community.html')) {
            updateTextContent(item, 'nav.community');
        }
    });
    
    // 翻译面包屑导航
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        const links = breadcrumb.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href') || '';
            if (href.includes('index.html') || href === '/' || href === '') {
                updateTextContent(link, 'nav.home');
            }
        });
        
        const span = breadcrumb.querySelector('span');
        if (span) {
            const path = window.location.pathname;
            if (path.includes('learning.html')) {
                updateTextContent(span, 'nav.learning');
            } else if (path.includes('game.html')) {
                updateTextContent(span, 'nav.game');
            } else if (path.includes('test.html')) {
                updateTextContent(span, 'nav.test');
            } else if (path.includes('community.html')) {
                updateTextContent(span, 'nav.community');
            }
        }
    }
}

// 更新通用元素
function updateCommonElements() {
    // 更新导航
    updateNavigation();
    
    // 更新暗黑模式按钮
    const darkModeBtn = document.getElementById('dark-mode-btn');
    if (darkModeBtn) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const key = isDarkMode ? 'common.lightMode' : 'common.darkMode';
        
        // 暗黑模式按钮应该保持为🌓图标，只更新aria-label
        if (darkModeBtn.textContent.trim() !== '🌓') {
            darkModeBtn.textContent = '🌓';
        }
        
        // 更新按钮的aria-label属性
        const label = getTranslation(key);
        if (label) {
            darkModeBtn.setAttribute('aria-label', label);
        }
    }
    
    // 更新语言选择标签
    const languageLabel = document.querySelector('.language-selector label');
    if (languageLabel) {
        updateTextContent(languageLabel, 'common.selectLanguage');
    }
    
    // 更新语言选项
    const englishOption = document.querySelector('.language-selector option[value="en"]');
    const chineseOption = document.querySelector('.language-selector option[value="zh"]');
    
    if (englishOption) {
        updateTextContent(englishOption, 'common.english');
    }
    
    if (chineseOption) {
        updateTextContent(chineseOption, 'common.chinese');
    }
    
    // 更新页脚
    const footerContact = document.querySelector('.footer-contact h3');
    if (footerContact) {
        updateTextContent(footerContact, 'common.contact');
    }
    
    const footerEmail = document.querySelector('.footer-contact p');
    if (footerEmail) {
        updateTextContent(footerEmail, 'common.email');
    }
    
    const footerCopyright = document.querySelector('.footer-bottom p:first-child');
    if (footerCopyright) {
        updateTextContent(footerCopyright, 'common.copyright');
    }
    
    const privacyLink = document.querySelector('.footer-bottom a[href*="privacy.html"]');
    if (privacyLink) {
        updateTextContent(privacyLink, 'common.privacy');
    }
    
    const termsLink = document.querySelector('.footer-bottom a[href*="terms.html"]');
    if (termsLink) {
        updateTextContent(termsLink, 'common.terms');
    }
}

// 应用特定页面的翻译
function applyPageSpecificTranslations() {
    const path = window.location.pathname;
    
    if (path.endsWith('index.html') || path.endsWith('/') || path === '') {
        updateHomePageContent();
    } else if (path.includes('learning.html')) {
        updateLearningPageContent();
    } else if (path.includes('game.html')) {
        updateGamePageContent();
    } else if (path.includes('test.html')) {
        updateTestPageContent();
    } else if (path.includes('community.html')) {
        updateCommunityPageContent();
    }
}

// 更新页面标题
function updatePageTitle() {
    const path = window.location.pathname;
    
    if (path.endsWith('index.html') || path.endsWith('/') || path === '') {
        document.title = getTranslation('home.pageTitle') || document.title;
    } else if (path.includes('learning.html')) {
        document.title = getTranslation('learning.pageTitle') || document.title;
    } else if (path.includes('game.html')) {
        document.title = getTranslation('game.pageTitle') || document.title;
    } else if (path.includes('test.html')) {
        document.title = getTranslation('test.pageTitle') || document.title;
    } else if (path.includes('community.html')) {
        document.title = getTranslation('community.pageTitle') || document.title;
    }
}

// 更新首页内容
function updateHomePageContent() {
    // 首页特定元素的翻译
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        updateTextContent(heroTitle, 'home.hero.title');
    }
    
    const heroSubtitle = document.querySelector('.hero-content p');
    if (heroSubtitle) {
        updateTextContent(heroSubtitle, 'home.hero.subtitle');
    }
    
    const ctaButton = document.querySelector('.hero-content .cta-button');
    if (ctaButton) {
        updateTextContent(ctaButton, 'home.hero.getStarted');
    }
    
    // 特性部分
    const featuresTitle = document.querySelector('.features h2');
    if (featuresTitle) {
        updateTextContent(featuresTitle, 'home.features.title');
    }
    
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        // 互动学习
        const interactiveTitle = featureCards[0].querySelector('h3');
        const interactiveDesc = featureCards[0].querySelector('p');
        if (interactiveTitle) updateTextContent(interactiveTitle, 'home.features.interactive.title');
        if (interactiveDesc) updateTextContent(interactiveDesc, 'home.features.interactive.description');
        
        // 游戏
        if (featureCards.length > 1) {
            const gamesTitle = featureCards[1].querySelector('h3');
            const gamesDesc = featureCards[1].querySelector('p');
            if (gamesTitle) updateTextContent(gamesTitle, 'home.features.games.title');
            if (gamesDesc) updateTextContent(gamesDesc, 'home.features.games.description');
        }
        
        // 测试
        if (featureCards.length > 2) {
            const testTitle = featureCards[2].querySelector('h3');
            const testDesc = featureCards[2].querySelector('p');
            if (testTitle) updateTextContent(testTitle, 'home.features.test.title');
            if (testDesc) updateTextContent(testDesc, 'home.features.test.description');
        }
        
        // 社区
        if (featureCards.length > 3) {
            const communityTitle = featureCards[3].querySelector('h3');
            const communityDesc = featureCards[3].querySelector('p');
            if (communityTitle) updateTextContent(communityTitle, 'home.features.community.title');
            if (communityDesc) updateTextContent(communityDesc, 'home.features.community.description');
        }
    }
}

// 更新学习页面内容
function updateLearningPageContent() {
    // 学习页面特定元素的翻译
    console.log('翻译学习页面内容');
}

// 更新游戏页面内容
function updateGamePageContent() {
    // 游戏页面特定元素的翻译
    console.log('翻译游戏页面内容');
}

// 更新测试页面内容
function updateTestPageContent() {
    // 测试页面特定元素的翻译
    console.log('翻译测试页面内容');
}

// 更新社区页面内容
function updateCommunityPageContent() {
    // 社区页面特定元素的翻译
    console.log('翻译社区页面内容');
}

// 获取翻译文本
function getTranslation(key) {
    if (!translations || !translations[currentLanguage]) {
        return null;
    }
    
    // 分解键路径，例如 'nav.home' => ['nav', 'home']
    const parts = key.split('.');
    
    // 从translations对象中按路径获取翻译值
    let value = translations[currentLanguage];
    for (const part of parts) {
        if (value && typeof value === 'object' && part in value) {
            value = value[part];
        } else {
            return null;
        }
    }
    
    return value;
}

// 更新元素文本内容
function updateTextContent(element, translationKey) {
    if (!element) return;
    
    const translation = getTranslation(translationKey);
    if (translation) {
        element.textContent = translation;
    }
}

// 导出方法，供其他脚本使用
window.i18n = window.i18n || {};

// 获取翻译的方法
window.i18n.getTranslation = getTranslation;

// 获取当前语言的方法
window.i18n.getCurrentLanguage = function() {
        return currentLanguage;
};

// 设置语言的方法
window.i18n.setLanguage = function(lang) {
        if (lang === 'en' || lang === 'zh') {
            currentLanguage = lang;
            localStorage.setItem('language', currentLanguage);
        
        // 更新语言选择器
        const languageSelector = document.getElementById('language');
        if (languageSelector) {
            languageSelector.value = lang;
        }
        
        // 应用翻译
            applyTranslations();
        
        // 通知语言变化
        notifyLanguageChanged();
        
            return true;
        }
        return false;
};