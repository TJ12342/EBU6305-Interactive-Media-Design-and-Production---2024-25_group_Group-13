// 社区页面基本脚本
document.addEventListener('DOMContentLoaded', function() {
    console.log('Community page loaded');
    
    // 简单的页面初始化
    function initPage() {
        const createButton = document.querySelector('.topic-placeholder button');
        
        // 为禁用的按钮添加点击提示
        if (createButton) {
            createButton.addEventListener('click', function() {
                alert('This feature is coming soon in future updates!');
            });
        }
    }
    
    initPage();
}); 