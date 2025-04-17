// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    console.log('社区页面已加载');
    
    // 初始化社区功能
    initCommunity();
});

// 初始化社区功能
function initCommunity() {
    // 初始化登录模态框
    initLoginModal();
    
    // 初始化新话题模态框
    initNewTopicModal();
    
    // 初始化分类筛选
    initCategoryFilter();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化分页功能
    initPagination();
}

// 初始化登录模态框
function initLoginModal() {
    const loginLink = document.getElementById('login-link');
    const loginModal = document.getElementById('login-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const loginForm = document.getElementById('login-form');
    
    if (loginLink && loginModal) {
        // 打开登录模态框
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
        
        // 关闭模态框
        closeModals.forEach(closeBtn => {
            closeBtn.addEventListener('click', function() {
                loginModal.style.display = 'none';
                document.getElementById('new-topic-modal').style.display = 'none';
            });
        });
        
        // 点击模态框外部关闭
        window.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
            if (e.target === document.getElementById('new-topic-modal')) {
                document.getElementById('new-topic-modal').style.display = 'none';
            }
        });
        
        // 提交登录表单
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                // 模拟登录功能（实际应用中应与后端交互）
                console.log(`尝试登录: 用户名=${username}, 密码=${password}`);
                
                // 登录成功后更新用户界面
                updateUserInterface(username);
                
                // 关闭模态框
                loginModal.style.display = 'none';
            });
        }
    }
}

// 更新用户界面（登录后）
function updateUserInterface(username) {
    // 更新用户信息卡片
    const userNameElement = document.querySelector('.user-name');
    const userStatusElement = document.querySelector('.user-status');
    const newPostBtn = document.getElementById('new-post-btn');
    
    if (userNameElement) {
        userNameElement.textContent = username;
    }
    
    if (userStatusElement) {
        userStatusElement.innerHTML = '<span class="user-badge">已登录</span>';
    }
    
    if (newPostBtn) {
        newPostBtn.disabled = false;
        
        // 为发布按钮添加事件监听
        newPostBtn.addEventListener('click', function() {
            document.getElementById('new-topic-modal').style.display = 'flex';
        });
    }
}

// 初始化新话题模态框
function initNewTopicModal() {
    const newTopicForm = document.getElementById('new-topic-form');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    if (newTopicForm) {
        newTopicForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('topic-title').value;
            const category = document.getElementById('topic-category-select').value;
            const content = document.getElementById('topic-content').value;
            
            // 模拟发布功能（实际应用中应与后端交互）
            console.log(`发布新话题: 标题=${title}, 分类=${category}, 内容长度=${content.length}`);
            
            // 发布成功后
            alert('话题发布成功！');
            document.getElementById('new-topic-modal').style.display = 'none';
            
            // 清空表单
            newTopicForm.reset();
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            document.getElementById('new-topic-modal').style.display = 'none';
        });
    }
}

// 初始化分类筛选
function initCategoryFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的活跃状态
                categoryBtns.forEach(b => b.classList.remove('active'));
                
                // 添加当前按钮的活跃状态
                this.classList.add('active');
                
                // 获取选中的分类
                const category = this.getAttribute('data-category');
                
                // 筛选话题（实际应用中可能需要与后端交互）
                filterTopics(category);
            });
        });
    }
}

// 筛选话题
function filterTopics(category) {
    const topicItems = document.querySelectorAll('.topic-item');
    
    if (category === 'all') {
        // 显示所有话题
        topicItems.forEach(item => {
            item.style.display = 'flex';
        });
    } else {
        // 筛选话题
        topicItems.forEach(item => {
            const topicCategory = item.querySelector('.topic-category');
            if (topicCategory && topicCategory.classList.contains(category)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// 初始化搜索功能
function initSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('community-search');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm === '') {
                return;
            }
            
            // 执行搜索
            searchTopics(searchTerm);
        });
        
        // 回车键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
}

// 搜索话题
function searchTopics(searchTerm) {
    console.log(`搜索: ${searchTerm}`);
    
    // 重置分类筛选
    const allCategoryBtn = document.querySelector('.category-btn[data-category="all"]');
    if (allCategoryBtn) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        allCategoryBtn.classList.add('active');
    }
    
    // 搜索逻辑（实际应用中可能需要与后端交互）
    const topicItems = document.querySelectorAll('.topic-item');
    
    let foundCount = 0;
    topicItems.forEach(item => {
        const title = item.querySelector('.topic-title').textContent.toLowerCase();
        const preview = item.querySelector('.topic-preview').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || preview.includes(searchTerm)) {
            item.style.display = 'flex';
            // 高亮匹配内容（可选）
            foundCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // 显示搜索结果
    alert(`搜索"${searchTerm}"找到了 ${foundCount} 个结果`);
}

// 初始化分页功能
function initPagination() {
    const pageBtns = document.querySelectorAll('.page-btn');
    
    if (pageBtns.length > 0) {
        pageBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 模拟分页功能（实际应用中应与后端交互）
                if (this.textContent === '...' || this.textContent.includes('下一页')) {
                    return;
                }
                
                // 移除所有按钮的活跃状态
                pageBtns.forEach(b => b.classList.remove('active'));
                
                // 添加当前按钮的活跃状态
                this.classList.add('active');
                
                // 获取页码
                const page = this.textContent;
                
                // 加载页面数据
                console.log(`加载第 ${page} 页数据`);
                
                // 模拟页面切换（滚动到顶部）
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }
} 