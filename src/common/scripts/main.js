// 主要JavaScript文件，包含网站的通用功能

document.addEventListener('DOMContentLoaded', function() {
    console.log('网站初始化完成');
    
    // 初始化导航栏高亮
    initNavHighlight();
    
    // 初始化面包屑导航
    initBreadcrumbs();
    
    // 初始化页面滚动效果
    initSmoothScroll();
    
    // 初始化响应式设计
    initResponsiveDesign();
});

// 导航栏当前页面高亮
function initNavHighlight() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // 如果路径包含当前链接，添加active类
        if (currentPath.includes(linkPath) && linkPath !== '/' && linkPath !== '/index.html') {
            link.classList.add('active');
        } else if (currentPath === '/' || currentPath === '/index.html') {
            // 首页特殊处理
            if (linkPath === '/' || linkPath === '/index.html' || linkPath === 'index.html') {
                link.classList.add('active');
            }
        }
    });
}

// 面包屑导航
function initBreadcrumbs() {
    const breadcrumbs = document.querySelector('.breadcrumb');
    if (!breadcrumbs) return;
    
    // 可以在这里添加动态面包屑生成逻辑
    console.log('面包屑导航已初始化');
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 响应式设计相关
function initResponsiveDesign() {
    // 移动端菜单切换
    const menuToggleButton = document.querySelector('.mobile-menu-toggle');
    if (menuToggleButton) {
        menuToggleButton.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            if (nav) {
                nav.classList.toggle('active');
                this.classList.toggle('active');
            }
        });
    }
    
    // 窗口大小变化时的处理
    window.addEventListener('resize', function() {
        // 根据需要添加响应式逻辑
    });
}

// 通用工具函数
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
} 