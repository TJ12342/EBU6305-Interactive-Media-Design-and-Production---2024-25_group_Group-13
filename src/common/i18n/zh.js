// 中文语言包
window.i18n = window.i18n || {};
window.i18n.zh = {
    // 导航元素
    nav: {
        home: "首页",
        learning: "学习",
        game: "游戏",
        test: "测试",
        community: "社区"
    },
    
    // 通用元素
    common: {
        darkMode: "暗色模式",
        lightMode: "亮色模式",
        language: "语言",
        english: "英文",
        chinese: "中文",
        selectLanguage: "选择语言",
        backToTop: "返回顶部",
        contact: "联系我们",
        email: "parabola@math-learning.com",
        copyright: "© 2024 ParabolaMaster 版权所有",
        privacy: "隐私政策",
        terms: "使用条款"
    },
    
    // 首页
    home: {
        pageTitle: "ParabolaMaster - 互动学习二次方程",
        hero: {
            title: "欢迎来到 ParabolaMaster",
            subtitle: "通过交互式学习掌握二次方程",
            getStarted: "开始学习"
        },
        features: {
            title: "特色功能",
            interactive: {
                title: "互动学习",
                description: "通过直观的可视化和互动练习理解复杂概念"
            },
            games: {
                title: "教育游戏",
                description: "通过有趣的挑战来测试和提高你的技能"
            },
            test: {
                title: "知识测试",
                description: "测试你对二次方程的理解"
            },
            community: {
                title: "学习社区",
                description: "加入社区，提问和分享你的经验"
            }
        },
        about: {
            title: "关于 ParabolaMaster",
            description: "ParabolaMaster 是一个专为学生和教师设计的平台，旨在通过交互式内容和视觉效果使二次方程和抛物线的学习变得更容易。我们的目标是让数学变得有趣、直观且易于理解。"
        },
        testimonials: {
            title: "用户评价",
            testimonial1: {
                text: "ParabolaMaster 帮助我理解了二次方程，这在我之前一直觉得很困难。现在我甚至可以帮助我的同学们！",
                author: "李明，高中生"
            },
            testimonial2: {
                text: "作为一名教师，我发现 ParabolaMaster 是教授二次方程的绝佳工具。互动性质帮助学生更好地掌握概念。",
                author: "张老师，高中数学教师"
            }
        }
    },
    
    // 学习页面
    learning: {
        pageTitle: "学习二次方程和抛物线 | ParabolaMaster",
        intro: {
            title: "抛物线与二次方程",
            description1: "二次方程和抛物线是数学中的基础概念，但对许多学生来说可能具有挑战性。通过交互式学习，我们可以更直观地理解这些重要概念。",
            description2: "在下面的模块中，你将学习二次方程的基础知识、系数效应、图形变换以及实际应用，这些都以互动方式呈现，帮助你更好地掌握。"
        },
        modules: {
            title: "学习模块",
            basicConcepts: {
                title: "基础概念",
                description: "了解二次方程和抛物线的标准形式、顶点形式和一般形式",
                button: "开始学习"
            },
            coefficients: {
                title: "系数效应",
                description: "探索不同系数如何影响抛物线的形状和位置",
                button: "开始学习"
            },
            transformations: {
                title: "图形变换",
                description: "学习平移、拉伸和压缩对抛物线的影响",
                button: "开始学习"
            },
            applications: {
                title: "实际应用",
                description: "发现二次方程在现实世界中的应用，如物理和经济学",
                button: "开始学习"
            }
        },
        resources: {
            title: "补充资源",
            resource1: {
                title: "视频教程",
                description: "观看详细解释二次方程概念的视频教程",
                button: "观看视频"
            },
            resource2: {
                title: "练习题",
                description: "下载额外的练习题和解答",
                button: "下载练习题"
            },
            resource3: {
                title: "备忘单",
                description: "获取二次方程公式和技巧的快速参考指南",
                button: "获取备忘单"
            }
        },
        sidebar: {
            title: "导航目录",
            intro: "简介",
            basicConcepts: "基础概念",
            standardForm: "标准形式",
            vertexForm: "顶点形式",
            factorizedForm: "因式分解形式",
            coefficients: "系数效应",
            transformations: "图形变换",
            applications: "实际应用",
            resources: "补充资源"
        },
        // 详细的模块内容
        content: {
            basicConcepts: {
                title: "二次方程基础概念",
                intro: "二次方程是指最高幂次为2的多项式方程。它在坐标平面上表示为抛物线。",
                standardForm: {
                    title: "标准形式",
                    description: "二次方程的标准形式为 y = ax² + bx + c，其中 a、b、c 为常数，且 a ≠ 0。"
                },
                vertexForm: {
                    title: "顶点形式",
                    description: "顶点形式为 y = a(x - h)² + k，其中 (h, k) 是抛物线的顶点。"
                },
                factorizedForm: {
                    title: "因式分解形式",
                    description: "当方程有实数解时，可以表示为 y = a(x - r₁)(x - r₂)，其中 r₁ 和 r₂ 是方程的根。"
                },
                formula1: "ax² + bx + c = 0，其中 a ≠ 0",
                linearNote: "当a = 0时，方程简化为线性方程。",
                functionDefinition: "二次函数定义为：",
                formula2: "f(x) = ax² + bx + c，其中 a ≠ 0",
                parabolaNote: "二次函数的图像是一条抛物线。",
                keyPoints: {
                    vertex: "<strong>顶点：</strong>抛物线上y值达到最大或最小的点。对于函数f(x) = ax² + bx + c，顶点的x坐标是-b/(2a)，y坐标可以通过将此x值代入函数中得到。",
                    axis: "<strong>对称轴：</strong>通过顶点的垂直线，抛物线关于此线对称。对称轴的方程是x = -b/(2a)。",
                    direction: "<strong>开口方向：</strong>当a > 0时，抛物线向上开口；当a < 0时，抛物线向下开口。",
                    zeros: "<strong>零点（根）：</strong>图像与x轴相交的点，即f(x) = 0的解。"
                },
                interactive: {
                    title: "交互式演示",
                    aLabel: "a: <span id=\"a-value\">1</span>",
                    bLabel: "b: <span id=\"b-value\">0</span>",
                    cLabel: "c: <span id=\"c-value\">0</span>",
                    equationLabel: "方程：",
                    vertexLabel: "顶点：",
                    axisLabel: "对称轴：",
                    directionLabel: "方向："
                }
            },
            coefficients: {
                intro: "二次函数（f(x) = ax² + bx + c）中的系数a、b和c各自对抛物线的形状和位置有独特的影响。理解这些影响对于分析和操作二次函数至关重要。",
                a: {
                    title: "系数'a'的影响",
                    description: "系数'a'决定了抛物线的宽度和方向：",
                    point1: "当|a|增大时，抛物线变窄",
                    point2: "当|a|减小时，抛物线变宽",
                    point3: "当a > 0时，抛物线开口向上",
                    point4: "当a < 0时，抛物线开口向下"
                },
                b: {
                    title: "系数'b'的影响",
                    description: "系数'b'影响顶点的水平位置和对称轴：",
                    point1: "顶点的x坐标由公式 x = -b/(2a) 给出",
                    point2: "当b增大时，抛物线向左移动",
                    point3: "当b减小时，抛物线向右移动",
                    point4: "当b = 0时，对称轴经过y轴（x = 0）"
                },
                c: {
                    title: "系数'c'的影响",
                    description: "系数'c'表示y轴截距，影响整个抛物线的垂直位置：",
                    point1: "当c增大时，整个抛物线向上移动",
                    point2: "当c减小时，整个抛物线向下移动",
                    point3: "y轴截距始终位于点(0, c)"
                },
                interactive: {
                    title: "交互式演示",
                    description: "调整滑块，查看每个系数如何影响抛物线的形状和位置。",
                    a: "a：",
                    b: "b：",
                    c: "c：",
                    aDesc: "控制宽度和方向",
                    bDesc: "控制水平位置",
                    cDesc: "控制垂直位置",
                    vertex: "顶点：",
                    axis: "对称轴：",
                    direction: "方向：",
                    yIntercept: "Y轴截距："
                },
                applications: {
                    title: "系数分析的应用",
                    description: "理解系数如何影响抛物线对多种应用至关重要：",
                    example1: {
                        title: "物理学：抛体运动",
                        description: "在抛体运动中，物体的路径遵循抛物线轨迹，可由方程 y = -0.5g·t² + v₀·sin(θ)·t + h₀ 描述，其中g是重力加速度，v₀是初速度，θ是角度，h₀是初始高度。"
                    },
                    example2: {
                        title: "工程学：悬索桥",
                        description: "悬索桥的缆索形成抛物线。工程师通过调整,系数来控制缆索的高度和张力。"
                    },
                    example3: {
                        title: "经济学：供需关系",
                        description: "在某些经济模型中，二次函数用于建模成本函数，其中系数,表示边际成本随产量增加的速度。"
                    }
                },
                quiz: {
                    title: "快速检查",
                    instruction: "测试你对系数效应的理解：",
                    q1: "如果你想让抛物线变窄，应该怎么做？",
                    q1a: "增大|a|",
                    q1b: "减小|a|",
                    q1c: "增大|b|",
                    q1d: "增大|c|",
                    q2: "什么决定了抛物线的方向（向上或向下）？",
                    q2a: "a的符号",
                    q2b: "b的符号",
                    q2c: "c的符号",
                    q2d: "b²-4ac的值",
                    q3: "如果c = 3，抛物线在y轴上的交点是哪里？",
                    q3a: "(3, 0)",
                    q3b: "(0, 3)",
                    q3c: "(0, -3)",
                    q3d: "取决于a和b",
                    checkButton: "检查答案"
                }
            },
            transformations: {
                title: "图形变换",
                intro: "二次函数可以通过各种方式进行变换，如平移、拉伸、压缩或反射其图形。理解这些变换有助于分析和操作抛物线。",
                forms: {
                    title: "标准形式与顶点形式",
                    description: "为了更好地理解变换，我们需要比较二次函数的标准形式和顶点形式："
                },
                horizontal: {
                    title: "水平平移",
                    description: "函数f(x) = a(x - h)² + k的图像相对于基本抛物线f(x) = ax²水平移动h个单位："
                },
                vertical: {
                    title: "垂直平移",
                    description: "函数f(x) = a(x - h)² + k的图像相对于基本抛物线f(x) = ax²垂直移动k个单位："
                },
                stretching: {
                    title: "垂直拉伸和压缩",
                    description: "f(x) = a(x - h)² + k中的系数'a'影响抛物线的垂直拉伸或压缩："
                },
                reflections: {
                    title: "反射",
                    description: "抛物线可以相对于x轴或y轴进行反射："
                },
                sequence: {
                    title: "变换顺序",
                    description: "当应用多个变换时，顺序很重要。常规顺序是："
                },
                interactive: {
                    title: "交互式变换探索器",
                    description: "调整滑块，查看不同变换如何影响抛物线。",
                    a: "a：",
                    aDesc: "拉伸/压缩和反射",
                    h: "h：",
                    hDesc: "水平移动",
                    k: "k：",
                    kDesc: "垂直移动",
                    vertex: "顶点：",
                    direction: "方向：",
                    transformations: "应用的变换："
                },
                applications: {
                    title: "变换的应用",
                    description: "理解抛物线变换有实际应用：",
                    example1: {
                        title: "建筑学",
                        description: "拱门和穹顶通常遵循抛物线形状。工程师可以变换基本抛物线以达到特定的高度、宽度和结构特性。"
                    },
                    example2: {
                        title: "光学",
                        description: "抛物面镜和透镜使用变换后的抛物线聚焦光线。精确的形状决定了焦点的位置。"
                    },
                    example3: {
                        title: "物理学",
                        description: "抛射运动方程可以重写为顶点形式，轻松确定最大高度、行进距离和空中时间。"
                    }
                },
                quiz: {
                    title: "快速检查",
                    instruction: "测试你对抛物线变换的理解：",
                    q1: "抛物线f(x) = 2(x - 3)² + 4的顶点是什么？",
                    q1a: "(3, 4)",
                    q1b: "(-3, 4)",
                    q1c: "(3, -4)",
                    q1d: "(4, 3)",
                    q2: "如何将基本抛物线f(x) = x²变换为g(x) = -3(x + 2)² - 5？",
                    q2a: "拉伸3倍，反射，右移2个单位，上移5个单位",
                    q2b: "拉伸3倍，反射，左移2个单位，下移5个单位",
                    q2c: "压缩3倍，左移2个单位，下移5个单位",
                    q2d: "反射，拉伸3倍，右移2个单位，下移5个单位",
                    q3: "如果一个抛物线的顶点在(-2, 3)，向下开口，垂直拉伸4倍，其顶点形式的方程是什么？",
                    q3a: "f(x) = 4(x + 2)² + 3",
                    q3b: "f(x) = -4(x + 2)² + 3",
                    q3c: "f(x) = 4(x - 2)² + 3",
                    q3d: "f(x) = -4(x - 2)² + 3",
                    checkButton: "检查答案"
                }
            },
            applications: {
                title: "实际应用",
                intro: "二次方程和抛物线不仅仅是数学抽象概念——它们在现实世界中频繁出现。本模块探讨二次函数如何建模和解决包括物理学、工程学、建筑学、经济学和日常生活中的各种领域问题。",
                physics: {
                    title: "物理学应用",
                    description: "二次方程在描述各种物理现象中至关重要：",
                    projectile: {
                        title: "抛射运动",
                        description: "当物体被投掷或发射时，其垂直位置遵循时间的二次函数："
                    },
                    freefall: {
                        title: "自由落体运动",
                        description: "当物体在重力影响下下落时，其位置遵循二次方程："
                    }
                },
                engineering: {
                    title: "工程和建筑应用",
                    description: "抛物线形状在工程结构和设计中频繁出现：",
                    bridges: {
                        title: "悬索桥",
                        description: "当路面重量水平均匀分布时，悬索桥的缆索形成抛物线。这种形状有效分配力量。"
                    },
                    arches: {
                        title: "拱门和穹顶",
                        description: "抛物线拱具有结构效率，能均匀分配重量。它们被用于桥梁、入口和穹顶的建筑中。"
                    },
                    optics: {
                        title: "抛物面反射器",
                        description: "抛物线形状在光学和信号技术中至关重要："
                    }
                },
                economics: {
                    title: "经济和商业应用",
                    description: "二次函数建模许多经济关系：",
                    revenue: {
                        title: "收入优化",
                        description: "价格和需求之间的关系通常遵循线性函数，这导致二次收入函数："
                    },
                    profit: {
                        title: "利润最大化",
                        description: "当考虑收入和成本函数时，利润函数经常采取二次形式："
                    },
                    production: {
                        title: "生产和成本",
                        description: "在制造业中，边际成本通常随生产量增加而增加，导致二次成本函数："
                    }
                },
                environmental: {
                    title: "环境和生物应用",
                    description: "二次关系自然出现在许多生物和环境系统中：",
                    population: {
                        title: "种群增长",
                        description: "虽然指数模型常用于种群增长，但二次模型可以表示具有资源限制的种群："
                    },
                    reaction: {
                        title: "化学反应",
                        description: "一些化学反应遵循二阶动力学，可以使用二次方程建模。"
                    }
                },
                interactive: {
                    title: "交互式问题求解器",
                    description: "探索如何应用二次方程解决现实问题："
                },
                quiz: {
                    title: "快速检查",
                    instruction: "测试你对实际应用的理解：",
                    q1: "一个球从1.5米高处向上抛出，初速度为19.6米/秒。哪个方程表示t秒后的高度h（米）？",
                    q1a: "h(t) = -4.9t² + 19.6t + 1.5",
                    q1b: "h(t) = -9.8t² + 19.6t + 1.5",
                    q1c: "h(t) = 4.9t² + 19.6t + 1.5",
                    q1d: "h(t) = -4.9t² + 1.5t + 19.6",
                    q2: "一家公司发现当产品定价为$p美元时，他们能售出q = 1000 - 25p件。哪个价格能使收入最大化？",
                    q2a: "$20",
                    q2b: "$25",
                    q2c: "$30",
                    q2d: "$40",
                    q3: "以下哪种现实世界结构最明显地展示抛物线形状？",
                    q3a: "无线电塔",
                    q3b: "卫星天线",
                    q3c: "螺旋楼梯",
                    q3d: "金字塔",
                    checkButton: "检查答案"
                },
                casestudies: {
                    title: "案例研究",
                    description: "探索这些利用二次方程解决现实世界问题的深入示例：",
                    case1: {
                        title: "金门大桥设计",
                        description: "工程师如何使用二次方程模拟金门大桥的悬索，考虑重量分布、风力和张力。",
                        button: "阅读案例研究"
                    },
                    case2: {
                        title: "太阳能农场优化",
                        description: "一家可再生能源公司如何使用二次函数确定太阳能电池板的最佳间距，以最大化能量收集同时最小化土地使用。",
                        button: "阅读案例研究"
                    },
                    case3: {
                        title: "智能手机应用定价策略",
                        description: "一个移动应用开发者如何使用二次收入模型确定其高级功能的最佳价格点，平衡数量和价格。",
                        button: "阅读案例研究"
                    }
                }
            }
        }
    },
    
    // 游戏页面
    game: {
        pageTitle: "二次方程互动游戏 | ParabolaMaster",
        title: "互动数学游戏",
        description: "通过这些有趣的互动游戏来测试和提高你对二次方程的理解。选择一个游戏开始吧！",
        
        // 游戏详情
        parabolaShooter: {
            title: "抛物线射手",
            description: "使用抛物线轨迹瞄准目标，测试你对二次方程的理解。",
            difficulty: "简单",
            button: "开始游戏",
            instructions: "调整二次方程的参数，创建正确的抛物线轨迹击中目标。你有60秒的时间尽可能获得更多分数。"
        },
        
        equationMatching: {
            title: "方程匹配",
            description: "将方程与对应的图形匹配，提高你的视觉识别能力。",
            difficulty: "中等",
            button: "开始游戏",
            instructions: "查看显示的抛物线图形，并从选项中选择正确的方程。匹配得越快，得分越高。"
        },
        
        vertexHunter: {
            title: "顶点猎人",
            description: "快速找出抛物线的顶点，测试你的计算速度。",
            difficulty: "困难",
            button: "开始游戏",
            instructions: "给定一个二次方程，通过将方程转换为顶点形式尽快找到抛物线的顶点。"
        },
        
        // 游戏控制
        controls: {
            score: "得分：",
            time: "时间：",
            seconds: "秒",
            start: "开始",
            restart: "重新开始",
            pause: "暂停",
            resume: "继续",
            back: "返回选择",
            gameOver: "游戏结束",
            finalScore: "最终得分",
            newHighScore: "新高分！",
            tryAgain: "再试一次",
            mainMenu: "主菜单",
            submit: "提交"
        },
        
        // 游戏界面元素
        interface: {
            graphs: "图形",
            equations: "方程",
            currentFunction: "当前函数：",
            vertexCoordinates: {
                x: "顶点x坐标：",
                y: "顶点y坐标："
            }
        },
        
        // 排行榜
        leaderboard: {
            title: "排行榜",
            rank: "排名",
            player: "玩家",
            score: "得分",
            date: "日期",
            game: "游戏",
            noRecords: "暂无记录"
        }
    },
    
    // 测试页面
    test: {
        pageTitle: "二次方程测试 | ParabolaMaster",
        intro: {
            title: "知识评估",
            description: "测试你对二次方程和抛物线的理解。本测评包含各种题型，并将在完成后提供详细分析和建议。"
        },
        difficulty: {
            title: "选择难度",
            easy: "简单",
            medium: "中等",
            hard: "困难"
        },
        start: "开始测试",
        
        // 测试界面文本
        interface: {
            question: "问题",
            of: "/",
            timeRemaining: "剩余时间",
            questionNavigation: "问题导航",
            previous: "上一题",
            next: "下一题",
            submit: "提交测试",
            restart: "重新开始测试"
        },
        
        // 结果页面
        results: {
            title: "测试结果",
            score: "得分",
            timeUsed: "用时",
            performanceSummary: "表现总结",
            detailedAnalysis: "详细分析",
            questionNumber: "题号",
            type: "类型",
            difficulty: "难度",
            result: "结果",
            explanation: "解释",
            knowledgeMastery: "知识掌握度",
            topics: {
                basicConcepts: "基础概念",
                graphTransformations: "图形变换",
                equationSolving: "方程求解",
                appliedProblems: "应用问题"
            },
            recommendations: "学习建议",
            reviewTest: "查看题目与答案",
            retryTest: "重新测试",
            shareResults: "分享结果"
        },
        
        // 问题类型
        questionTypes: {
            multipleChoice: "选择题",
            fillInBlank: "填空题",
            graphQuestion: "图形题"
        },
        
        // 反馈信息
        feedback: {
            correct: "正确",
            incorrect: "错误"
        },
        
        // 通知消息
        notification: {
            resumed: "测试已恢复",
            saved: "测试进度已保存",
            timeWarning: "还剩5分钟",
            timeAlmostUp: "还剩1分钟",
            timeUp: "时间到"
        }
    },
    
    // 社区页面
    community: {
        pageTitle: "二次方程学习社区 | ParabolaMaster",
        welcome: {
            title: "欢迎来到我们的学习社区",
            description: "在这里，你可以与其他学习者分享经验、提出问题，并讨论与二次方程相关的主题。"
        },
        
        // 统计信息
        stats: {
            members: "社区成员",
            active: "今日活跃",
            topics: "讨论主题",
            posts: "总帖子数",
            online: "在线用户"
        },
        
        // 热门话题
        hotTopics: {
            title: "热门话题",
            viewAll: "查看全部"
        },
        
        // 社区规则
        rules: {
            title: "社区规则",
            viewAll: "查看全部规则",
            rule1: "尊重所有社区成员",
            rule2: "不发布垃圾信息或广告内容",
            rule3: "发帖前先搜索类似问题",
            rule4: "分享解决方案时提供详细解释"
        },
        
        // 分类
        categories: {
            all: "全部",
            questions: "问题",
            experiences: "经验分享",
            discussions: "讨论",
            resources: "资源"
        },
        
        // 搜索
        search: {
            placeholder: "搜索社区...",
            button: "搜索"
        },
        
        // 帖子互动
        interactions: {
            reply: "回复",
            share: "分享",
            report: "举报",
            comments: "评论"
        },
        
        // 用户提示
        tips: {
            askQuestion: "如何提出好问题？",
            tip1: "确保你的标题明确具体",
            tip2: "包含你尝试过的解决方法",
            tip3: "添加相关公式或图片",
            tip4: "检查拼写和格式"
        }
    }
}; 