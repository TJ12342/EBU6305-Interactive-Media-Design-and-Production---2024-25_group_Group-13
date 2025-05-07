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
    
    // 初始化删除确认功能
    initDeleteConfirmation();
    
    // 初始化个人资料编辑功能
    initProfileEdit();
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

// 初始化删除确认功能
function initDeleteConfirmation() {
    // 获取删除按钮 (这里使用后添加的删除按钮)
    const deleteButtons = document.querySelectorAll('.delete-topic-btn, .delete-comment-btn');
    const deleteConfirmModal = document.getElementById('delete-confirm-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    
    let itemToDelete = null; // 存储要删除的元素
    
    // 为所有删除按钮添加事件监听
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 记录要删除的元素
            itemToDelete = this.closest('.topic-item') || this.closest('.comment-item');
            
            // 显示确认对话框
            deleteConfirmModal.classList.remove('hidden');
        });
    });
    
    // 取消删除
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', function() {
            deleteConfirmModal.classList.add('hidden');
            itemToDelete = null;
        });
    }
    
    // 确认删除
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            if (itemToDelete) {
                // 执行删除操作
                itemToDelete.remove();
                
                // 关闭对话框
                deleteConfirmModal.classList.add('hidden');
                itemToDelete = null;
                
                // 显示删除成功消息
                alert('Content has been deleted successfully.');
            }
        });
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === deleteConfirmModal) {
            deleteConfirmModal.classList.add('hidden');
            itemToDelete = null;
        }
    });
}

// 初始化个人资料编辑功能
function initProfileEdit() {
    const profileEditForm = document.getElementById('profile-edit-form');
    const genderSelect = document.getElementById('edit-gender');
    const genderOther = document.getElementById('edit-gender-other');
    const pronounsSelect = document.getElementById('edit-pronouns');
    const pronounsOther = document.getElementById('edit-pronouns-other');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    
    // 打开个人资料编辑模态框
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            document.getElementById('profile-edit-modal').classList.remove('hidden');
        });
    }
    
    // 如果个人资料编辑表单存在
    if (profileEditForm) {
        // 处理性别选择变化
        if (genderSelect && genderOther) {
            genderSelect.addEventListener('change', function() {
                if (this.value === 'other') {
                    genderOther.classList.remove('hidden');
                } else {
                    genderOther.classList.add('hidden');
                }
            });
        }
        
        // 处理代词选择变化
        if (pronounsSelect && pronounsOther) {
            pronounsSelect.addEventListener('change', function() {
                if (this.value === 'other') {
                    pronounsOther.classList.remove('hidden');
                } else {
                    pronounsOther.classList.add('hidden');
                }
            });
        }
        
        // 编辑个人资料表单提交
        profileEditForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const username = document.getElementById('edit-username').value;
            const bio = document.getElementById('edit-bio').value;
            const interests = document.getElementById('edit-interests').value;
            const avatar = document.getElementById('edit-avatar').value;
            
            // 获取性别数据（包括自定义选项）
            let gender = genderSelect.value;
            if (gender === 'other' && !genderOther.classList.contains('hidden')) {
                gender = genderOther.value;
            }
            
            // 获取代词数据（包括自定义选项）
            let pronouns = pronounsSelect.value;
            if (pronouns === 'other' && !pronounsOther.classList.contains('hidden')) {
                pronouns = pronounsOther.value;
            }
            
            // 获取隐私设置
            const showGender = document.getElementById('edit-show-gender').checked;
            const showPronouns = document.getElementById('edit-show-pronouns').checked;
            
            // 在这里可以保存数据（示例中只是打印）
            console.log('Profile data:', {
                username,
                bio,
                interests,
                avatar,
                gender,
                pronouns,
                privacy: {
                    showGender,
                    showPronouns
                }
            });
            
            // 关闭模态框
            document.getElementById('profile-edit-modal').classList.add('hidden');
            
            // 显示成功消息
            alert('Profile updated successfully!');
        });
    }
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'topic-item';
    postDiv.dataset.postId = post.id;
    
    // 根据分类设置图标
    let icon = '💬';
    if (post.category === 'question') icon = '❓';
    else if (post.category === 'share') icon = '📝';
    else if (post.category === 'resource') icon = '📚';
    
    // 判断当前用户是否可以删除该帖子
    const currentUsername = currentUser ? currentUser.username : null;
    const canDelete = currentUsername && (currentUsername === post.author || currentUsername === 'Admin');
    const deleteButton = canDelete ? 
        `<button class="delete-topic-btn" data-i18n="community.actions.delete">Delete</button>` : '';
    
    postDiv.innerHTML = `
        <div class="topic-icon">${icon}</div>
        <div class="topic-content">
            <h3 class="topic-title"><a href="#">${post.title}</a></h3>
            <div class="topic-meta">
                <span class="topic-category ${post.category}">${getCategoryName(post.category)}</span>
                <span class="topic-author">Author: ${post.author}</span>
                <span class="topic-time">${post.date}</span>
                <span class="topic-actions">
                    <button class="reply-btn" data-i18n="community.actions.reply">Reply</button>
                    ${deleteButton}
                </span>
            </div>
            <p class="topic-preview">${post.content.substring(0, 200)}${post.content.length > 200 ? '...' : ''}</p>
            <div class="topic-stats">
                <span class="views">👁️ ${post.views}</span>
                <span class="replies">💬 ${post.replies ? post.replies.length : 0}</span>
                <span class="likes" style="cursor:pointer;">❤️ ${post.likes}</span>
            </div>
        </div>
    `;
    
    return postDiv;
} 