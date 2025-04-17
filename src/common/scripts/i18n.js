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

// 初始化国际化功能
function initI18n() {
    // 加载语言选择器
    const languageSelector = document.getElementById('language');
    if (!languageSelector) {
        console.warn('Language selector not found, using default language (en)');
    }
    
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
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        
        // 添加事件监听器，在语言改变时更新页面
        languageSelector.addEventListener('change', function(e) {
            currentLanguage = e.target.value;
            localStorage.setItem('language', currentLanguage);
            
            // 应用新的语言设置
            applyTranslations();
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
    
    // 检查元素本身是否有data-i18n属性
    if (element.hasAttribute('data-i18n')) {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (translation) {
            element.textContent = translation;
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
    
    // 加载英文翻译（默认）
    loadScript('../common/i18n/en.js', function() {
        // 加载中文翻译
        loadScript('../common/i18n/zh.js', function() {
            // 所有翻译加载完成后应用翻译
            translations = window.i18n;
            translationLoaded = true;
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

// 翻译当前页面内容
function applyTranslations() {
    // 检查是否已经加载了翻译
    if (!translations || !translations[currentLanguage]) {
        console.error('Translations not loaded or current language not supported');
        return;
    }

    // 更新HTML语言属性
    document.documentElement.lang = currentLanguage;

    // 更新页面标题
    updatePageTitle();

    // 翻译所有带data-i18n属性的元素
    translateAllElements();

    // 检测当前页面类型并应用特定页面的翻译
    applyPageSpecificTranslations();

    console.log(`Applied translations for ${currentLanguage}`);
}

// 更新页面标题
function updatePageTitle() {
    // 检测当前页面类型
    const path = window.location.pathname;
    const pageName = path.substring(path.lastIndexOf('/') + 1);
    
    // 根据页面类型设置标题
    if (path.endsWith('index.html') || path.endsWith('/')) {
        if (translations[currentLanguage].home && translations[currentLanguage].home.pageTitle) {
            document.title = translations[currentLanguage].home.pageTitle;
        }
    } else if (pageName === 'learning.html') {
        if (translations[currentLanguage].learning && translations[currentLanguage].learning.pageTitle) {
            document.title = translations[currentLanguage].learning.pageTitle;
        }
    } else if (pageName === 'game.html') {
        if (translations[currentLanguage].game && translations[currentLanguage].game.pageTitle) {
            document.title = translations[currentLanguage].game.pageTitle;
        }
    } else if (pageName === 'test.html') {
        if (translations[currentLanguage].test && translations[currentLanguage].test.pageTitle) {
            document.title = translations[currentLanguage].test.pageTitle;
        }
    } else if (pageName === 'community.html') {
        if (translations[currentLanguage].community && translations[currentLanguage].community.pageTitle) {
            document.title = translations[currentLanguage].community.pageTitle;
        }
    }
}

// 翻译所有带data-i18n属性的元素
function translateAllElements() {
    // 查找所有带data-i18n属性的元素
    const elements = document.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-value]');
    
    // 对每个元素应用翻译
    elements.forEach(element => {
        translateElement(element);
    });
    
    // 更新导航链接
    updateNavigation();
    
    // 更新通用UI元素
    updateCommonElements();
}

// 更新导航链接
function updateNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const text = link.textContent.trim();
        // 根据文本内容查找对应的导航项翻译
        if (translations[currentLanguage].nav) {
            if (text === 'Home' && translations[currentLanguage].nav.home) {
                link.textContent = translations[currentLanguage].nav.home;
            } else if (text === 'Learning' && translations[currentLanguage].nav.learning) {
                link.textContent = translations[currentLanguage].nav.learning;
            } else if (text === 'Games' && translations[currentLanguage].nav.game) {
                link.textContent = translations[currentLanguage].nav.game;
            } else if (text === 'Tests' && translations[currentLanguage].nav.test) {
                link.textContent = translations[currentLanguage].nav.test;
            } else if (text === 'Community' && translations[currentLanguage].nav.community) {
                link.textContent = translations[currentLanguage].nav.community;
            }
        }
    });
    
    // 更新面包屑
    const breadcrumbSpan = document.querySelector('.breadcrumb span');
    if (breadcrumbSpan) {
        const text = breadcrumbSpan.textContent.trim();
        // 根据当前页面类型更新面包屑
        const path = window.location.pathname;
        const pageName = path.substring(path.lastIndexOf('/') + 1);
        
        if (pageName === 'learning.html' && translations[currentLanguage].nav.learning) {
            breadcrumbSpan.textContent = translations[currentLanguage].nav.learning;
        } else if (pageName === 'game.html' && translations[currentLanguage].nav.game) {
            breadcrumbSpan.textContent = translations[currentLanguage].nav.game;
        } else if (pageName === 'test.html' && translations[currentLanguage].nav.test) {
            breadcrumbSpan.textContent = translations[currentLanguage].nav.test;
        } else if (pageName === 'community.html' && translations[currentLanguage].nav.community) {
            breadcrumbSpan.textContent = translations[currentLanguage].nav.community;
        }
    }
}

// 更新通用UI元素
function updateCommonElements() {
    // 更新暗黑模式按钮
    const darkModeBtn = document.getElementById('dark-mode-btn');
    if (darkModeBtn && translations[currentLanguage].common) {
        // 根据当前按钮文本判断是切换到暗黑模式还是亮色模式
        const isDarkMode = document.body.classList.contains('dark-mode');
        darkModeBtn.textContent = isDarkMode 
            ? translations[currentLanguage].common.lightMode 
            : translations[currentLanguage].common.darkMode;
    }
    
    // 更新页脚联系信息
    const contactTitle = document.querySelector('.footer-contact h3');
    if (contactTitle && translations[currentLanguage].common && translations[currentLanguage].common.contact) {
        contactTitle.textContent = translations[currentLanguage].common.contact;
    }
    
    const contactEmail = document.querySelector('.footer-contact p');
    if (contactEmail && translations[currentLanguage].common && translations[currentLanguage].common.email) {
        contactEmail.textContent = translations[currentLanguage].common.email;
    }
    
    // 更新版权信息
    const copyrightInfo = document.querySelector('.footer-bottom p:first-child');
    if (copyrightInfo && translations[currentLanguage].common && translations[currentLanguage].common.copyright) {
        copyrightInfo.textContent = translations[currentLanguage].common.copyright;
    }
    
    // 更新隐私政策和使用条款链接
    const privacyLink = document.querySelector('.footer-bottom a[href*="privacy"]');
    if (privacyLink && translations[currentLanguage].common && translations[currentLanguage].common.privacy) {
        privacyLink.textContent = translations[currentLanguage].common.privacy;
    }
    
    const termsLink = document.querySelector('.footer-bottom a[href*="terms"]');
    if (termsLink && translations[currentLanguage].common && translations[currentLanguage].common.terms) {
        termsLink.textContent = translations[currentLanguage].common.terms;
    }
}

// 应用页面特定的翻译
function applyPageSpecificTranslations() {
    // 检测当前页面类型
    const path = window.location.pathname;
    const pageName = path.substring(path.lastIndexOf('/') + 1);

    // 更新首页内容
    if (path.endsWith('index.html') || path.endsWith('/')) {
        updateHomePage();
    }
    // 更新学习页面内容
    else if (pageName === 'learning.html') {
        updateLearningPage();
    }
    // 更新游戏页面内容
    else if (pageName === 'game.html') {
        updateGamePage();
    }
    // 更新测试页面内容
    else if (pageName === 'test.html') {
        updateTestPage();
    }
    // 更新社区页面内容
    else if (pageName === 'community.html') {
        updateCommunityPage();
    }
}

// 更新学习页面内容
function updateLearningPage() {
    if (!translations[currentLanguage].learning) return;
    
    // 更新介绍区域
    const introTitle = document.querySelector('.intro-section h2');
    if (introTitle && translations[currentLanguage].learning.intro && translations[currentLanguage].learning.intro.title) {
        introTitle.textContent = translations[currentLanguage].learning.intro.title;
    }
    
    const introParas = document.querySelectorAll('.intro-text p');
    if (introParas.length >= 2 && translations[currentLanguage].learning.intro) {
        if (translations[currentLanguage].learning.intro.description1) {
            introParas[0].textContent = translations[currentLanguage].learning.intro.description1;
        }
        if (translations[currentLanguage].learning.intro.description2 && introParas[1]) {
            introParas[1].textContent = translations[currentLanguage].learning.intro.description2;
        }
    }
    
    // 更新模块选择区域标题
    const moduleSectionTitle = document.querySelector('.module-selection h2');
    if (moduleSectionTitle && translations[currentLanguage].learning.modules && translations[currentLanguage].learning.modules.title) {
        moduleSectionTitle.textContent = translations[currentLanguage].learning.modules.title;
    }
    
    // 更新模块卡片内容
    updateModuleCard('basic-concepts', 'basicConcepts');
    updateModuleCard('coefficients', 'coefficients');
    updateModuleCard('graph-transformations', 'transformations');
    updateModuleCard('practical-applications', 'applications');
    
    // 更新资源区域
    const resourcesTitle = document.querySelector('.resources h2');
    if (resourcesTitle && translations[currentLanguage].learning.resources && translations[currentLanguage].learning.resources.title) {
        resourcesTitle.textContent = translations[currentLanguage].learning.resources.title;
    }
    
    // 更新侧边导航
    const sidebarTitle = document.querySelector('.sidebar-nav h3');
    if (sidebarTitle && translations[currentLanguage].learning.sidebar && translations[currentLanguage].learning.sidebar.title) {
        sidebarTitle.textContent = translations[currentLanguage].learning.sidebar.title;
    }
    
    // 更新"返回顶部"链接
    const backToTopLink = document.querySelector('.back-to-top');
    if (backToTopLink && translations[currentLanguage].common && translations[currentLanguage].common.backToTop) {
        backToTopLink.textContent = translations[currentLanguage].common.backToTop;
    }
}

// 更新模块卡片
function updateModuleCard(cardId, translationKey) {
    const card = document.getElementById(cardId);
    if (!card) return;
    
    const titleElem = card.querySelector('h3');
    const descElem = card.querySelector('p');
    const btnElem = card.querySelector('.module-btn');
    
    if (translations[currentLanguage].learning && 
        translations[currentLanguage].learning.modules && 
        translations[currentLanguage].learning.modules[translationKey]) {
        
        const module = translations[currentLanguage].learning.modules[translationKey];
        
        if (titleElem && module.title) {
            titleElem.textContent = module.title;
        }
        
        if (descElem && module.description) {
            descElem.textContent = module.description;
        }
        
        if (btnElem && module.button) {
            btnElem.textContent = module.button;
        }
    }
}

// 更新游戏页面内容
function updateGamePage() {
    if (!translations[currentLanguage].game) return;
    
    // 更新游戏部分的标题和描述
    const gameSelectionTitle = document.querySelector('.game-selection h2');
    const gameSelectionDesc = document.querySelector('.game-selection .section-description');
    
    if (gameSelectionTitle && translations[currentLanguage].game.title) {
        gameSelectionTitle.textContent = translations[currentLanguage].game.title;
    }
    
    if (gameSelectionDesc && translations[currentLanguage].game.description) {
        gameSelectionDesc.textContent = translations[currentLanguage].game.description;
    }
    
    // 更新游戏卡片
    updateGameCard('parabola-shooter', 'parabolaShooter');
    updateGameCard('equation-matching', 'equationMatching');
    updateGameCard('vertex-hunter', 'vertexHunter');
    
    // 更新游戏控制面板
    const currentTitle = document.getElementById('current-game-title');
    if (currentTitle) {
        // 确定当前显示的游戏
        const activeGame = document.querySelector('.game-content:not(.hidden)');
        if (activeGame) {
            const gameId = activeGame.id;
            if (gameId === 'parabola-shooter-game' && translations[currentLanguage].game.parabolaShooter) {
                currentTitle.textContent = translations[currentLanguage].game.parabolaShooter.title;
            } else if (gameId === 'equation-matching-game' && translations[currentLanguage].game.equationMatching) {
                currentTitle.textContent = translations[currentLanguage].game.equationMatching.title;
            } else if (gameId === 'vertex-hunter-game' && translations[currentLanguage].game.vertexHunter) {
                currentTitle.textContent = translations[currentLanguage].game.vertexHunter.title;
            }
        }
    }
    
    // 更新游戏控制按钮
    updateGameControls();
    
    // 更新排行榜
    const leaderboardTitle = document.querySelector('.leaderboard h2');
    if (leaderboardTitle && translations[currentLanguage].game.leaderboard && translations[currentLanguage].game.leaderboard.title) {
        leaderboardTitle.textContent = translations[currentLanguage].game.leaderboard.title;
    }
    
    // 更新排行榜表头
    const leaderboardHeaders = document.querySelectorAll('.leaderboard-table th');
    if (leaderboardHeaders.length >= 4 && translations[currentLanguage].game.leaderboard) {
        const headers = translations[currentLanguage].game.leaderboard;
        if (headers.rank) leaderboardHeaders[0].textContent = headers.rank;
        if (headers.player) leaderboardHeaders[1].textContent = headers.player;
        if (headers.score) leaderboardHeaders[2].textContent = headers.score;
        if (headers.date) leaderboardHeaders[3].textContent = headers.date;
    }
}

// 更新游戏卡片
function updateGameCard(cardId, translationKey) {
    const card = document.getElementById(cardId);
    if (!card) return;
    
    const titleElem = card.querySelector('h3');
    const descElem = card.querySelector('p');
    const difficultyElem = card.querySelector('.difficulty');
    const btnElem = card.querySelector('.play-btn');
    
    if (translations[currentLanguage].game && translations[currentLanguage].game[translationKey]) {
        const game = translations[currentLanguage].game[translationKey];
        
        if (titleElem && game.title) {
            titleElem.textContent = game.title;
        }
        
        if (descElem && game.description) {
            descElem.textContent = game.description;
        }
        
        if (difficultyElem && game.difficulty) {
            difficultyElem.textContent = game.difficulty;
        }
        
        if (btnElem && game.button) {
            btnElem.textContent = game.button;
        }
    }
}

// 更新游戏控制按钮
function updateGameControls() {
    if (!translations[currentLanguage].game || !translations[currentLanguage].game.controls) return;
    
    const controls = translations[currentLanguage].game.controls;
    
    // 更新分数和时间显示标签
    const scoreLabel = document.querySelector('.score-display span:first-child');
    if (scoreLabel && controls.score) {
        scoreLabel.textContent = controls.score;
    }
    
    const timeLabel = document.querySelector('.timer span:first-child');
    if (timeLabel && controls.time) {
        timeLabel.textContent = controls.time;
    }
    
    const timeUnit = document.querySelector('.timer').lastChild;
    if (timeUnit && timeUnit.nodeType === Node.TEXT_NODE && controls.seconds) {
        timeUnit.textContent = ' ' + controls.seconds;
    }
    
    // 更新按钮文本
    const restartBtn = document.getElementById('restart-game');
    if (restartBtn && controls.restart) {
        restartBtn.textContent = controls.restart;
    }
    
    const backBtn = document.getElementById('back-to-selection');
    if (backBtn && controls.back) {
        backBtn.textContent = controls.back;
    }
}

// 更新测试页面内容
function updateTestPage() {
    // 实现测试页面的翻译更新
    // ...（根据测试页面的实际结构实现）
}

// 更新社区页面内容
function updateCommunityPage() {
    if (!translations[currentLanguage].community) return;
    
    // 更新欢迎区域
    const welcomeTitle = document.querySelector('.community-welcome h2');
    if (welcomeTitle && translations[currentLanguage].community.welcome && translations[currentLanguage].community.welcome.title) {
        welcomeTitle.textContent = translations[currentLanguage].community.welcome.title;
    }
    
    const welcomeDesc = document.querySelector('.community-welcome > p');
    if (welcomeDesc && translations[currentLanguage].community.welcome && translations[currentLanguage].community.welcome.description) {
        welcomeDesc.textContent = translations[currentLanguage].community.welcome.description;
    }
    
    // 更新统计数据标签
    const statLabels = document.querySelectorAll('.stat-item .stat-label');
    if (statLabels.length >= 3 && translations[currentLanguage].community.stats) {
        const stats = translations[currentLanguage].community.stats;
        if (stats.members) statLabels[0].textContent = stats.members;
        if (stats.active) statLabels[1].textContent = stats.active;
        if (stats.topics) statLabels[2].textContent = stats.topics;
    }
    
    // 更新侧边栏标题
    const hotTopicsTitle = document.querySelector('.hot-topics h3');
    if (hotTopicsTitle && translations[currentLanguage].community.hotTopics && translations[currentLanguage].community.hotTopics.title) {
        hotTopicsTitle.textContent = translations[currentLanguage].community.hotTopics.title;
    }
    
    const rulesTitle = document.querySelector('.community-rules h3');
    if (rulesTitle && translations[currentLanguage].community.rules && translations[currentLanguage].community.rules.title) {
        rulesTitle.textContent = translations[currentLanguage].community.rules.title;
    }
    
    // 更新社区规则链接
    const rulesLink = document.querySelector('.rules-link');
    if (rulesLink && translations[currentLanguage].community.rules && translations[currentLanguage].community.rules.viewAll) {
        rulesLink.textContent = translations[currentLanguage].community.rules.viewAll;
    }
    
    // 更新分类按钮
    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns.length >= 5 && translations[currentLanguage].community.categories) {
        const categories = translations[currentLanguage].community.categories;
        
        categoryBtns.forEach(btn => {
            const category = btn.getAttribute('data-category');
            if (category === 'all' && categories.all) {
                btn.textContent = categories.all;
            } else if (category === 'question' && categories.questions) {
                btn.textContent = categories.questions;
            } else if (category === 'share' && categories.experiences) {
                btn.textContent = categories.experiences;
            } else if (category === 'discuss' && categories.discussions) {
                btn.textContent = categories.discussions;
            } else if (category === 'resource' && categories.resources) {
                btn.textContent = categories.resources;
            }
        });
    }
    
    // 更新搜索框
    const searchInput = document.getElementById('community-search');
    if (searchInput && translations[currentLanguage].community.search && translations[currentLanguage].community.search.placeholder) {
        searchInput.placeholder = translations[currentLanguage].community.search.placeholder;
    }
    
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn && translations[currentLanguage].community.search && translations[currentLanguage].community.search.button) {
        searchBtn.textContent = translations[currentLanguage].community.search.button;
    }
}

// 获取翻译的辅助函数
function getTranslation(key) {
    if (!key || !translations || !translations[currentLanguage]) return null;
    
    // 解析键路径 (例如: "game.leaderboard.title")
    const keyParts = key.split('.');
    let value = translations[currentLanguage];
    
    // 逐级深入获取值
    for (const part of keyParts) {
        if (value && value[part] !== undefined) {
            value = value[part];
        } else {
            return null; // 键不存在
        }
    }
    
    return value;
}

// 对指定元素应用翻译
function updateTextContent(element, translationKey) {
    if (!element || !translationKey) return;
    
    const translation = getTranslation(translationKey);
    if (translation) {
        element.textContent = translation;
    }
}

// 导出方法，供其他脚本使用
window.i18nUtils = {
    translate: getTranslation,
    updateText: updateTextContent,
    getCurrentLanguage: function() {
        return currentLanguage;
    },
    setLanguage: function(lang) {
        if (lang === 'en' || lang === 'zh') {
            currentLanguage = lang;
            localStorage.setItem('language', currentLanguage);
            applyTranslations();
            return true;
        }
        return false;
    }
};