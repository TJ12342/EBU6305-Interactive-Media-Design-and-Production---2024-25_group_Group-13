// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 初始化暗黑模式
    initDarkMode();
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
        darkModeBtn.textContent = '切换亮色模式';
    }
    
    // 添加点击事件监听器
    darkModeBtn.addEventListener('click', function() {
        // 切换暗黑模式
        const isDarkModeEnabled = document.body.classList.toggle('dark-mode');
        
        // 更新按钮文本
        darkModeBtn.textContent = isDarkModeEnabled ? '切换亮色模式' : '切换暗黑模式';
        
        // 保存设置到本地存储
        localStorage.setItem('darkMode', isDarkModeEnabled);
        
        console.log(`暗黑模式: ${isDarkModeEnabled ? '已启用' : '已禁用'}`);
    });
    
    // 检测系统偏好
    checkSystemPreference();
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
                    document.getElementById('dark-mode-btn').textContent = '切换亮色模式';
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
                        document.getElementById('dark-mode-btn').textContent = '切换亮色模式';
                    }
                } else {
                    document.body.classList.remove('dark-mode');
                    if (document.getElementById('dark-mode-btn')) {
                        document.getElementById('dark-mode-btn').textContent = '切换暗黑模式';
                    }
                }
            }
        });
    }
} 