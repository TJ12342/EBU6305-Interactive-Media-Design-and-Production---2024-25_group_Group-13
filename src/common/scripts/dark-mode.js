// 暗黑模式切换功能
document.addEventListener('DOMContentLoaded', function() {
    const darkModeBtn = document.getElementById('dark-mode-btn');
    
    // 检查是否有本地存储的暗黑模式首选项
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // 根据存储的首选项应用初始模式
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // 切换暗黑模式
    darkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // 更新本地存储
        const currentDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', currentDarkMode);
    });
}); 