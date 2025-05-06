// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 确保i18n已经初始化后再初始化暗黑模式
    // 添加一个小延迟，确保翻译系统已经处理完DOM
    setTimeout(function() {
        // 强制确保暗黑模式按钮是图标
        const darkModeBtn = document.getElementById('dark-mode-btn');
        if (darkModeBtn && darkModeBtn.textContent.trim() !== '🌓') {
            darkModeBtn.textContent = '🌓';
        }
        
        // 初始化暗黑模式
        initDarkMode();
    }, 10);
});

// 暗黑模式初始化和切换
function initDarkMode() {
    const darkModeBtn = document.getElementById('dark-mode-btn');
    if (!darkModeBtn) return;
    
    // 检查本地存储中的暗黑模式设置
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // 根据存储的设置应用暗黑模式
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        // 使用i18n更新按钮文本，或使用直接文本
        updateDarkModeButtonText(darkModeBtn, true);
    }
    
    // 添加点击事件监听器
    darkModeBtn.addEventListener('click', function() {
        // 切换暗黑模式
        const isDarkModeEnabled = document.body.classList.toggle('dark-mode');
        
        // 更新按钮文本
        updateDarkModeButtonText(darkModeBtn, isDarkModeEnabled);
        
        // 保存设置到本地存储
        localStorage.setItem('darkMode', isDarkModeEnabled);
        
        console.log(`暗黑模式: ${isDarkModeEnabled ? '已启用' : '已禁用'}`);
    });
    
    // 检测系统偏好
    checkSystemPreference();
}

// 更新暗黑模式按钮文本
function updateDarkModeButtonText(button, isDarkMode) {
    // 设置为统一的图标模式 (🌓)
    if (button.textContent.trim() !== '🌓') {
        button.textContent = '🌓';
    }
    
    // 更新data-i18n属性（用于辅助工具和语音阅读器）
    if (window.i18n && typeof window.i18n.setLang === 'function') {
        // 使用i18n系统
        if (button.hasAttribute('data-i18n')) {
            button.setAttribute('data-i18n', isDarkMode ? 'common.lightMode' : 'common.darkMode');
            // 不再更新文本内容
        }
    }
    
    // 更新无障碍标签
    if (button.hasAttribute('aria-label')) {
        if (window.i18n && typeof window.getTranslation === 'function') {
            const label = window.getTranslation(isDarkMode ? 'common.lightMode' : 'common.darkMode');
            if (label) {
                button.setAttribute('aria-label', label);
                return;
            }
        }
        button.setAttribute('aria-label', isDarkMode ? '切换亮色模式' : '切换暗黑模式');
    }
}

// 设置按钮的默认状态
function setDefaultButtonState(button, isDarkMode) {
    // 我们现在统一使用图标，不需要再处理文本模式
    if (button.textContent.trim() !== '🌓') {
        button.textContent = '🌓';
    }
}

// 检测系统颜色方案偏好
function checkSystemPreference() {
    // 检查浏览器是否支持媒体查询
    if (window.matchMedia) {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        
        // 如果用户没有手动设置过，则使用系统偏好
        if (localStorage.getItem('darkMode') === null) {
            if (prefersDarkMode.matches) {
                document.body.classList.add('dark-mode');
                if (document.getElementById('dark-mode-btn')) {
                    updateDarkModeButtonText(document.getElementById('dark-mode-btn'), true);
                }
            }
        }
        
        // 监听系统偏好变化
        prefersDarkMode.addEventListener('change', function(e) {
            // 只有当用户没有手动设置过，才随系统变化
            if (localStorage.getItem('darkMode') === null) {
                if (e.matches) {
                    document.body.classList.add('dark-mode');
                    if (document.getElementById('dark-mode-btn')) {
                        updateDarkModeButtonText(document.getElementById('dark-mode-btn'), true);
                    }
                } else {
                    document.body.classList.remove('dark-mode');
                    if (document.getElementById('dark-mode-btn')) {
                        updateDarkModeButtonText(document.getElementById('dark-mode-btn'), false);
                    }
                }
            }
        });
    }
} 