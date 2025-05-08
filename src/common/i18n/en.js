// English language pack
window.i18n = window.i18n || {};
window.i18n.en = {
    // Navigation elements
    nav: {
        home: "Home",
        learning: "Learning",
        game: "Games",
        test: "Tests",
        community: "Community"
    },
    
    // Common elements
    common: {
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        language: "Language",
        english: "English",
        chinese: "Chinese",
        selectLanguage: "Select Language",
        backToTop: "Back to Top",
        contact: "Contact Us",
        email: "parabola@math-learning.com",
        copyright: "© 2024 ParabolaMaster All Rights Reserved",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        cookies: {
            title: "Cookie Notice",
            message: "We use cookies to enhance your experience on our website. By continuing to use this site, you consent to our use of cookies in accordance with our Privacy Policy.",
            acceptAll: "Accept All",
            customize: "Customize"
        }
    },
    
    // Home page
    home: {
        pageTitle: "ParabolaMaster - Interactive Quadratic Equations Learning",
        hero: {
            title: "Welcome to ParabolaMaster",
            subtitle: "Master Quadratic Equations Through Interactive Learning",
            getStarted: "Get Started"
        },
        features: {
            title: "Featured Functions",
            interactive: {
                title: "Interactive Learning",
                description: "Understand complex concepts through intuitive visualizations and interactive exercises"
            },
            games: {
                title: "Educational Games",
                description: "Test and improve your skills through fun challenges"
            },
            test: {
                title: "Knowledge Test",
                description: "Test your understanding of quadratic equations"
            },
            community: {
                title: "Learning Community",
                description: "Join the community to ask questions and share your experiences"
            }
        },
        about: {
            title: "About ParabolaMaster",
            description: "ParabolaMaster is a platform designed for students and teachers to make learning quadratic equations and parabolas easier through interactive content and visual aids. Our goal is to make mathematics fun, intuitive, and easy to understand."
        },
        testimonials: {
            title: "User Testimonials",
            testimonial1: {
                text: "ParabolaMaster helped me understand quadratic equations, which I had always found difficult before. Now I can even help my classmates!",
                author: "Mike, High School Student"
            },
            testimonial2: {
                text: "As a teacher, I find ParabolaMaster to be an excellent tool for teaching quadratic equations. The interactivity helps students grasp the concepts better.",
                author: "Mrs. Johnson, High School Math Teacher"
            }
        }
    },
    
    // Learning page
    learning: {
        pageTitle: "Learn Quadratic Equations and Parabolas | ParabolaMaster",
        intro: {
            title: "Parabolas and Quadratic Equations",
            description1: "Quadratic equations and parabolas are fundamental concepts in mathematics, but they can be challenging for many students. Through interactive learning, we can understand these important concepts more intuitively.",
            description2: "In the modules below, you will learn about the basics of quadratic equations, coefficient effects, graph transformations, and practical applications, all presented in an interactive way to help you master them better."
        },
        modules: {
            title: "Learning Modules",
            basicConcepts: {
                title: "Basic Concepts",
                description: "Learn about the standard form, vertex form, and general form of quadratic equations and parabolas",
                button: "Start Learning"
            },
            coefficients: {
                title: "Coefficient Effects",
                description: "Explore how different coefficients affect the shape and position of parabolas",
                button: "Start Learning"
            },
            transformations: {
                title: "Graph Transformations",
                description: "Learn about translations, stretching, and compression effects on parabolas",
                button: "Start Learning"
            },
            applications: {
                title: "Practical Applications",
                description: "Discover how quadratic equations are applied in the real world, such as in physics and economics",
                button: "Start Learning"
            }
        },
        resources: {
            title: "Additional Resources",
            resource1: {
                title: "Video Tutorials",
                description: "Watch video tutorials explaining quadratic equation concepts in detail",
                button: "Watch Videos"
            },
            resource2: {
                title: "Practice Problems",
                description: "Download additional practice problems with solutions",
                button: "Download Problems"
            },
            resource3: {
                title: "Cheat Sheet",
                description: "Get a quick reference guide for quadratic equation formulas and tips",
                button: "Get Cheat Sheet"
            }
        },
        sidebar: {
            title: "Navigation Directory",
            intro: "Introduction",
            basicConcepts: "Basic Concepts",
            standardForm: "Standard Form",
            vertexForm: "Vertex Form",
            factorizedForm: "Factorized Form",
            coefficients: "Coefficient Effects",
            transformations: "Graph Transformations",
            applications: "Practical Applications",
            resources: "Additional Resources"
        },
        // Detailed module content
        content: {
            basicConcepts: {
                title: "Quadratic Equations Basic Concepts",
                intro: "A quadratic equation is a polynomial equation with the highest degree of 2. It is represented as a parabola on the coordinate plane.",
                standardForm: {
                    title: "Standard Form",
                    description: "The standard form of a quadratic equation is y = ax² + bx + c, where a, b, c are constants, and a ≠ 0."
                },
                vertexForm: {
                    title: "Vertex Form",
                    description: "The vertex form is y = a(x - h)² + k, where (h, k) is the vertex of the parabola."
                },
                factorizedForm: {
                    title: "Factorized Form",
                    description: "When the equation has real roots, it can be represented as y = a(x - r₁)(x - r₂), where r₁ and r₂ are the roots of the equation."
                },
                formula1: "ax² + bx + c = 0, where a ≠ 0",
                linearNote: "When a = 0, the equation simplifies to a linear equation.",
                functionDefinition: "A quadratic function is defined as:",
                formula2: "f(x) = ax² + bx + c, where a ≠ 0",
                parabolaNote: "The graph of a quadratic function is a parabola.",
                keyPoints: {
                    vertex: "Vertex: The point on the parabola where the y-value reaches a maximum or minimum. For the function f(x) = ax² + bx + c, the x-coordinate of the vertex is -b/(2a), and the y-coordinate can be found by substituting this x-value into the function.",
                    axis: "Axis of Symmetry: A vertical line through the vertex about which the parabola is symmetric. The equation of the axis of symmetry is x = -b/(2a).",
                    direction: "Opening Direction: When a > 0, the parabola opens upward; when a < 0, the parabola opens downward.",
                    zeros: "Zeros (Roots): The points where the graph intersects the x-axis, which are the solutions to f(x) = 0."
                },
                interactive: {
                    title: "Interactive Demonstration",
                    aLabel: "a: <span id=\"a-value\">1</span>",
                    bLabel: "b: <span id=\"b-value\">0</span>",
                    cLabel: "c: <span id=\"c-value\">0</span>",
                    equationLabel: "Equation:",
                    vertexLabel: "Vertex:",
                    axisLabel: "Axis of Symmetry:",
                    directionLabel: "Direction:"
                }
            },
            coefficients: {
                intro: "The coefficients a, b, and c in a quadratic function (f(x) = ax² + bx + c) each have unique effects on the shape and position of the parabola. Understanding these effects is crucial for analyzing and manipulating quadratic functions.",
                a: {
                    title: "The Effect of Coefficient 'a'",
                    description: "The coefficient 'a' determines the width and direction of the parabola:",
                    point1: "When |a| increases, the parabola becomes narrower",
                    point2: "When |a| decreases, the parabola becomes wider",
                    point3: "When a > 0, the parabola opens upward",
                    point4: "When a < 0, the parabola opens downward"
                },
                b: {
                    title: "The Effect of Coefficient 'b'",
                    description: "The coefficient 'b' affects the horizontal position of the vertex and the axis of symmetry:",
                    point1: "The x-coordinate of the vertex is given by x = -b/(2a)",
                    point2: "When b increases, the parabola shifts to the left",
                    point3: "When b decreases, the parabola shifts to the right",
                    point4: "When b = 0, the axis of symmetry passes through the y-axis (x = 0)"
                },
                c: {
                    title: "The Effect of Coefficient 'c'",
                    description: "The coefficient 'c' represents the y-intercept and affects the vertical position of the entire parabola:",
                    point1: "When c increases, the entire parabola shifts upward",
                    point2: "When c decreases, the entire parabola shifts downward",
                    point3: "The y-intercept is always at the point (0, c)"
                },
                interactive: {
                    title: "Interactive Demonstration",
                    description: "Adjust the sliders to see how each coefficient affects the parabola's shape and position.",
                    a: "a:",
                    b: "b:",
                    c: "c:",
                    aDesc: "Controls width and direction",
                    bDesc: "Controls horizontal position",
                    cDesc: "Controls vertical position",
                    vertex: "Vertex:",
                    axis: "Axis of Symmetry:",
                    direction: "Direction:",
                    yIntercept: "Y-Intercept:"
                },
                applications: {
                    title: "Applications of Coefficient Analysis",
                    description: "Understanding how coefficients affect parabolas is essential for various applications:",
                    example1: {
                        title: "Physics: Projectile Motion",
                        description: "In projectile motion, the path of an object follows a parabolic trajectory described by y = -0.5g·t² + v₀·sin(θ)·t + h₀, where g is gravity, v₀ is initial velocity, θ is the angle, and h₀ is initial height."
                    },
                    example2: {
                        title: "Engineering: Suspension Bridges",
                        description: "The cables of suspension bridges form parabolas. Engineers adjust the \"a\" coefficient to control the height and tension of the cables."
                    },
                    example3: {
                        title: "Economics: Supply and Demand",
                        description: "In some economic models, quadratic functions model cost functions where the coefficient \"a\" represents how quickly marginal costs increase with production."
                    }
                },
                quiz: {
                    title: "Quick Check",
                    instruction: "Test your understanding of coefficient effects:",
                    q1: "If you want to make a parabola narrower, what should you do?",
                    q1a: "Increase |a|",
                    q1b: "Decrease |a|",
                    q1c: "Increase |b|",
                    q1d: "Increase |c|",
                    q2: "What determines the direction (upward or downward) of a parabola?",
                    q2a: "The sign of a",
                    q2b: "The sign of b",
                    q2c: "The sign of c",
                    q2d: "The value of b²-4ac",
                    q3: "If c = 3, where does the parabola intersect the y-axis?",
                    q3a: "(3, 0)",
                    q3b: "(0, 3)",
                    q3c: "(0, -3)",
                    q3d: "It depends on a and b",
                    checkButton: "Check Answers"
                }
            },
            transformations: {
                title: "Graph Transformations",
                intro: "A quadratic function can be transformed in various ways to shift, stretch, compress, or reflect its graph. Understanding these transformations helps in analyzing and manipulating parabolas.",
                forms: {
                    title: "Standard Form vs. Vertex Form",
                    description: "To better understand transformations, we need to compare the standard form and vertex form of quadratic functions:",
                    standard: "Standard Form: f(x) = ax² + bx + c",
                    vertex: "Vertex Form: f(x) = a(x - h)² + k, where (h, k) is the vertex",
                    usefulness: "The vertex form is particularly useful for understanding transformations, as it directly shows how the parabola has been shifted from the origin.",
                    conversion: "Converting from standard form to vertex form:\nf(x) = ax² + bx + c = a(x - h)² + k, where h = -b/(2a) and k = c - b²/(4a)"
                },
                horizontal: {
                    title: "Horizontal Translations",
                    description: "The graph of f(x) = a(x - h)² + k is shifted h units horizontally from the basic parabola f(x) = ax²:",
                    right: "If h > 0, the parabola shifts h units to the right",
                    left: "If h < 0, the parabola shifts |h| units to the left"
                },
                vertical: {
                    title: "Vertical Translations",
                    description: "The graph of f(x) = a(x - h)² + k is shifted k units vertically from the basic parabola f(x) = ax²:",
                    up: "If k > 0, the parabola shifts k units upward",
                    down: "If k < 0, the parabola shifts |k| units downward"
                },
                stretching: {
                    title: "Vertical Stretching and Compression",
                    description: "The coefficient 'a' in f(x) = a(x - h)² + k affects the vertical stretching or compression of the parabola:",
                    wider: "If |a| > 1, the parabola is stretched vertically (becomes narrower)",
                    narrower: "If 0 < |a| < 1, the parabola is compressed vertically (becomes wider)",
                    reflection: "If a < 0, the parabola is also reflected across the x-axis (opens downward)"
                },
                reflections: {
                    title: "Reflections",
                    description: "Parabolas can be reflected across the x-axis or y-axis:",
                    xaxis: "Replace f(x) with -f(x)",
                    yaxis: "Replace x with -x in the function"
                },
                sequence: {
                    title: "Sequence of Transformations",
                    description: "When applying multiple transformations, the order matters. The conventional order is:",
                    step1: "Stretching/compression (multiplication by a)",
                    step2: "Reflection (if applicable)",
                    step3: "Horizontal translation (replace x with x - h)",
                    step4: "Vertical translation (add k)",
                    example: {
                        title: "Example: Transform f(x) = x² into g(x) = -2(x - 3)² + 4",
                        description: "This involves:",
                        step1: "Stretching by a factor of 2",
                        step2: "Reflection across the x-axis (negative sign)",
                        step3: "Horizontal shift 3 units to the right",
                        step4: "Vertical shift 4 units upward"
                    }
                },
                interactive: {
                    title: "Interactive Transformation Explorer",
                    description: "Adjust the sliders to see how different transformations affect the parabola.",
                    a: "a:",
                    aDesc: "Stretching/compression & reflection",
                    h: "h:",
                    hDesc: "Horizontal shift",
                    k: "k:",
                    kDesc: "Vertical shift",
                    vertex: "Vertex:",
                    direction: "Direction:",
                    transformations: "Applied Transformations:",
                    equation: "Equation:"
                },
                applications: {
                    title: "Applications of Transformations",
                    description: "Understanding parabola transformations has practical applications:",
                    example1: {
                        title: "Architecture",
                        description: "Arches and domes often follow parabolic shapes. Engineers can transform basic parabolas to achieve specific heights, widths, and structural properties."
                    },
                    example2: {
                        title: "Optics",
                        description: "Parabolic mirrors and lenses use transformed parabolas to focus light. The precise shape determines the focal point's position."
                    },
                    example3: {
                        title: "Physics",
                        description: "Projectile motion equations can be rewritten in vertex form to easily determine maximum height, distance traveled, and time in air."
                    }
                },
                quiz: {
                    title: "Quick Check",
                    instruction: "Test your understanding of parabola transformations:",
                    q1: "What is the vertex of the parabola f(x) = 2(x - 3)² + 4?",
                    q1a: "(3, 4)",
                    q1b: "(-3, 4)",
                    q1c: "(3, -4)",
                    q1d: "(4, 3)",
                    q2: "How would you transform the basic parabola f(x) = x² to get g(x) = -3(x + 2)² - 5?",
                    q2a: "Stretch by 3, reflect, shift 2 right, shift 5 up",
                    q2b: "Stretch by 3, reflect, shift 2 left, shift 5 down",
                    q2c: "Compress by 3, shift 2 left, shift 5 down",
                    q2d: "Reflect, stretch by 3, shift 2 right, shift 5 down",
                    q3: "If a parabola has vertex at (-2, 3) and opens downward with a vertical stretch of 4, what is its equation in vertex form?",
                    q3a: "f(x) = 4(x + 2)² + 3",
                    q3b: "f(x) = -4(x + 2)² + 3",
                    q3c: "f(x) = 4(x - 2)² + 3",
                    q3d: "f(x) = -4(x - 2)² + 3",
                    checkButton: "Check Answers"
                }
            },
            applications: {
                intro: "Quadratic equations and parabolas aren't just mathematical abstractions—they appear frequently in the real world. This module explores how quadratic functions model and solve problems in various fields including physics, engineering, architecture, economics, and everyday life.",
                physics: {
                    title: "Applications in Physics",
                    description: "Quadratic equations are fundamental in describing various physical phenomena:",
                    projectile: {
                        title: "Projectile Motion",
                        description: "When an object is thrown or launched, its vertical position follows a quadratic function of time:"
                    },
                    freefall: {
                        title: "Free Fall Motion",
                        description: "When an object falls under the influence of gravity, its position follows a quadratic equation:"
                    }
                },
                engineering: {
                    title: "Applications in Engineering and Architecture",
                    description: "Parabolic shapes appear frequently in engineering structures and designs:",
                    bridges: {
                        title: "Suspension Bridges",
                        description: "The cables of suspension bridges form parabolas when the weight of the roadway is uniformly distributed horizontally. This shape distributes forces efficiently."
                    },
                    arches: {
                        title: "Arches and Domes",
                        description: "Parabolic arches are structurally efficient and distribute weight evenly. They're used in architecture for bridges, entryways, and domes."
                    },
                    optics: {
                        title: "Parabolic Reflectors",
                        description: "Parabolic shapes are crucial in optics and signal technology:"
                    }
                },
                economics: {
                    title: "Applications in Economics and Business",
                    description: "Quadratic functions model many economic relationships:",
                    revenue: {
                        title: "Revenue Optimization",
                        description: "The relationship between price and demand often follows a linear function, which leads to a quadratic revenue function:"
                    },
                    profit: {
                        title: "Profit Maximization",
                        description: "Profit functions frequently take quadratic form when revenue and cost functions are considered:"
                    },
                    production: {
                        title: "Production and Cost",
                        description: "In manufacturing, the marginal cost often increases with production volume, leading to quadratic cost functions:"
                    }
                },
                environmental: {
                    title: "Environmental and Biological Applications",
                    description: "Quadratic relationships occur naturally in many biological and environmental systems:",
                    population: {
                        title: "Population Growth",
                        description: "While exponential models are common for population growth, quadratic models can represent populations with resource constraints:"
                    },
                    reaction: {
                        title: "Chemical Reactions",
                        description: "Some chemical reactions follow second-order kinetics, which can be modeled using quadratic equations."
                    }
                },
                interactive: {
                    title: "Interactive Problem-Solver",
                    description: "Explore how to apply quadratic equations to solve real-world problems:"
                },
                quiz: {
                    title: "Quick Check",
                    instruction: "Test your understanding of practical applications:",
                    q1: "A ball is thrown upward from a height of 1.5 meters with an initial velocity of 19.6 m/s. Which equation represents its height h (in meters) after t seconds?",
                    q1a: "h(t) = -4.9t² + 19.6t + 1.5",
                    q1b: "h(t) = -9.8t² + 19.6t + 1.5",
                    q1c: "h(t) = 4.9t² + 19.6t + 1.5",
                    q1d: "h(t) = -4.9t² + 1.5t + 19.6",
                    q2: "A company finds that when they price their product at $p dollars, they sell q = 1000 - 25p units. Which price maximizes their revenue?",
                    q2a: "$20",
                    q2b: "$25",
                    q2c: "$30",
                    q2d: "$40",
                    q3: "Which of the following real-world structures most clearly demonstrates parabolic shapes?",
                    q3a: "Radio tower",
                    q3b: "Satellite dish",
                    q3c: "Spiral staircase",
                    q3d: "Pyramid",
                    checkButton: "Check Answers"
                },
                casestudies: {
                    title: "Case Studies",
                    description: "Explore these in-depth examples of how quadratic equations solve real-world problems:",
                    case1: {
                        title: "Golden Gate Bridge Design",
                        description: "How engineers used quadratic equations to model the suspension cables of the Golden Gate Bridge, accounting for weight distribution, wind forces, and tension.",
                        button: "Read Case Study"
                    },
                    case2: {
                        title: "Solar Farm Optimization",
                        description: "How a renewable energy company used quadratic functions to determine optimal spacing of solar panels to maximize energy collection while minimizing land use.",
                        button: "Read Case Study"
                    },
                    case3: {
                        title: "Smartphone App Pricing Strategy",
                        description: "How a mobile app developer used a quadratic revenue model to determine the optimal price point for premium features, balancing quantity and price.",
                        button: "Read Case Study"
                    }
                }
            }
        }
    },
    
    // Game page
    game: {
        pageTitle: "Interactive Quadratic Equation Games | ParabolaMaster",
        title: "Fun Math Games",
        description: "Test and improve your understanding of quadratic equations through these interactive games. Choose a game to get started!",
        
        // Game details
        parabolaShooter: {
            title: "Parabola Shooter",
            description: "Use parabolic trajectories to aim at targets, testing your understanding of quadratic equations.",
            difficulty: "Difficulty: Easy",
            button: "Play Now",
            instructions: "Adjust the parameters of the quadratic equation to create the correct parabolic trajectory to hit the target. You have 60 seconds to score as many points as possible."
        },
        
        equationMatching: {
            title: "Equation Matching",
            description: "Match equations with their corresponding graphs, improving your visual recognition skills.",
            difficulty: "Difficulty: Medium",
            button: "Play Now",
            instructions: "Look at the parabola graph displayed and select the correct equation from the options. The faster you match, the higher your score."
        },
        
        vertexHunter: {
            title: "Vertex Hunter",
            description: "Quickly find the vertex of parabolas, testing your calculation speed.",
            difficulty: "Difficulty: Hard",
            button: "Play Now",
            instructions: "Given a quadratic equation, find the vertex of the parabola as quickly as possible by converting the equation to vertex form."
        },
        
        // Game controls
        controls: {
            score: "Score:",
            time: "Time:",
            seconds: "seconds",
            start: "Start",
            restart: "Restart",
            pause: "Pause",
            resume: "Resume",
            back: "Back to Selection",
            gameOver: "Game Over",
            finalScore: "Final Score",
            newHighScore: "New High Score!",
            tryAgain: "Try Again",
            mainMenu: "Main Menu",
            submit: "Submit"
        },
        
        // Leaderboard
        leaderboard: {
            title: "Leaderboard",
            rank: "Rank",
            player: "Player",
            score: "Score",
            date: "Date",
            game: "Game",
            noRecords: "No records yet"
        },
        
        // Game interface elements
        interface: {
            graphs: "Graphs",
            equations: "Equations",
            currentFunction: "Current Function:",
            vertexCoordinates: {
                x: "Vertex X-coordinate:",
                y: "Vertex Y-coordinate:"
            }
        }
    },
    
    // Test page
    test: {
        pageTitle: "Quadratic Equation Tests | ParabolaMaster",
        intro: {
            title: "Knowledge Assessment",
            description: "Test your understanding of quadratic equations and parabolas. This assessment includes various question types and will provide detailed analysis and recommendations upon completion."
        },
        difficulty: {
            title: "Select Difficulty",
            easy: "Easy",
            medium: "Medium",
            hard: "Hard"
        },
        start: "Begin Test",
        
        // Test interface
        interface: {
            question: "Question",
            of: "/",
            timeRemaining: "Time remaining",
            questionNavigation: "Question Navigation",
            previous: "Previous",
            next: "Next",
            submit: "Submit Test",
            restart: "Restart Test"
        },
        
        // Results page
        results: {
            title: "Test Results",
            score: "Score",
            timeUsed: "Time used",
            performanceSummary: "Performance Summary",
            detailedAnalysis: "Detailed Analysis",
            questionNumber: "Q#",
            type: "Type",
            difficulty: "Difficulty",
            result: "Result",
            explanation: "Explanation",
            knowledgeMastery: "Knowledge Mastery",
            topics: {
                basicConcepts: "Basic Concepts",
                graphTransformations: "Graph Transformations",
                equationSolving: "Equation Solving",
                appliedProblems: "Applied Problems"
            },
            recommendations: "Learning Recommendations",
            reviewTest: "Review Questions & Answers",
            retryTest: "Retake Test",
            shareResults: "Share Results"
        },
        
        // Question types
        questionTypes: {
            multipleChoice: "Multiple Choice",
            fillInBlank: "Fill in the Blank",
            graphQuestion: "Graph Question"
        },
        
        // Feedback
        feedback: {
            correct: "Correct",
            incorrect: "Incorrect",
            unanswered: "Unanswered",
            correctAnswer: "Correct answer"
        },
        
        // Notifications
        notification: {
            resumed: "Test resumed",
            saved: "Test progress saved",
            timeWarning: "5 minutes remaining",
            timeAlmostUp: "1 minute remaining",
            timeUp: "Time's up"
        },
        
        // Performance summary text
        summary: {
            excellent: "Excellent! You have a deep understanding of quadratic equations and parabolas.",
            good: "Well done! You have a good grasp of quadratic equations and parabolas.",
            average: "You have a basic understanding of quadratic equations and parabolas, but there's room for improvement.",
            needsImprovement: "You need more practice to strengthen your understanding of quadratic equations and parabolas.",
            strengthWeakness: "You excel in {strength}, but need to work on {weakness}."
        },
        
        // Difficulty level results descriptions
        difficultyResults: {
            easy: {
                excellent: "At the easy level, your performance was outstanding! You've mastered the basics of quadratic equations. Consider trying the medium difficulty test.",
                good: "At the easy level, you performed well. Continue practicing to further solidify your basic knowledge.",
                average: "At the easy level, your performance met the basic requirements. Reviewing the basic concepts would be helpful.",
                needsImprovement: "At the easy level, you need to strengthen your basic knowledge. We recommend reviewing the basic concepts section in the learning module."
            },
            medium: {
                excellent: "At the medium level, your performance was exceptional! You have a strong understanding and application of quadratic equations. You can try the hard level test now.",
                good: "At the medium level, you performed well. You have a good grasp of most concepts, with just a few areas needing small improvements.",
                average: "At the medium level, your performance was average. Targeted practice on your weaker areas can help improve your overall performance.",
                needsImprovement: "At the medium level, you need more practice. We recommend revisiting the relevant concepts before trying again."
            },
            hard: {
                excellent: "At the hard level, your performance was impressive! You have a deep and comprehensive understanding of quadratic equations. You've mastered advanced knowledge of this topic.",
                good: "At the hard level, you performed quite well! You have a good understanding of complex problems, with just a few details to improve upon.",
                average: "At the hard level, your performance was acceptable. More practice with complex problems will help improve your problem-solving abilities.",
                needsImprovement: "At the hard level, you encountered some challenges. We recommend mastering the medium level content before returning to the hard level."
            }
        },
        
        // Topic names
        topic: {
            basic: "Basic Concepts",
            transformation: "Graph Transformations",
            equation: "Equation Solving",
            application: "Applied Problems"
        },
        
        // Input placeholders
        placeholder: {
            xCoordinate: "x-coordinate",
            yCoordinate: "y-coordinate"
        }
    },
    
    // Community page
    community: {
        pageTitle: "Quadratic Equation Learning Community | ParabolaMaster",
        welcome: {
            title: "Welcome to Our Learning Community",
            description: "Here, you can share experiences, ask questions, and discuss topics related to quadratic equations with other learners."
        },
        
        // Statistics information
        stats: {
            members: "Community Members",
            active: "Active Users",
            topics: "Discussion Topics",
            posts: "Total Posts",
            online: "Users Online"
        },
        
        // Hot topics
        hotTopics: {
            title: "Hot Topics",
            viewAll: "View All"
        },
        
        // Community rules
        rules: {
            title: "Community Rules",
            viewAll: "View All Rules",
            rule1: "Respect all community members",
            rule2: "No spam or advertising content",
            rule3: "Search for similar questions before posting",
            rule4: "Provide detailed explanations when sharing solutions"
        },
        
        // Categories
        categories: {
            all: "All",
            questions: "Questions",
            experiences: "Experiences",
            discussions: "Discussions",
            resources: "Resources"
        },
        
        // Search
        search: {
            placeholder: "Search Community...",
            button: "Search"
        },
        
        // Post interactions
        interactions: {
            reply: "Reply",
            share: "Share",
            save: "Save",
            report: "Report",
            like: "Like",
            liked: "Liked",
            posted: "Posted on",
            replies: "Replies"
        },
        
        // Posting related
        posting: {
            newPost: "Create New Post",
            title: "Title",
            category: "Category",
            content: "Content",
            attachFiles: "Attach Files",
            tags: "Tags (separate with commas)",
            post: "Post",
            cancel: "Cancel"
        }
    },
    
    // Privacy Policy page
    privacy: {
        pageTitle: "Privacy Policy | Quadratic Equations & Parabolas Interactive Learning",
        title: "Privacy Policy",
        lastUpdated: "Last Updated: May, 2024",
        introduction: "Thank you for visiting Quadratic Equations & Parabolas Interactive Learning. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.",
        
        information: {
            title: "Information We Collect",
            personal: {
                title: "Personal Information",
                text: "We may collect personal information that you voluntarily provide to us when you:",
                item1: "Register for an account",
                item2: "Sign up for our newsletter",
                item3: "Participate in community discussions",
                item4: "Contact us with inquiries or feedback",
                examples: "The personal information we may collect includes your name, email address, and profile information."
            },
            nonpersonal: {
                title: "Non-Personal Information",
                text: "When you visit our website, we may automatically collect certain information about your device, including:",
                item1: "IP address",
                item2: "Browser type",
                item3: "Operating system",
                item4: "Pages visited",
                item5: "Time spent on pages",
                item6: "Referring website"
            }
        },
        
        cookies: {
            title: "Use of Cookies",
            text1: "Our website uses cookies to enhance your browsing experience. Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us recognize your device and remember certain information about your visit.",
            text2: "We use the following types of cookies:",
            type1: "Essential Cookies: These cookies are necessary for the website to function properly and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.",
            type2: "Analytical/Performance Cookies: These cookies allow us to recognize and count the number of visitors and see how visitors move around our website. This helps us improve the way our website works, for example, by ensuring that users find what they are looking for easily.",
            type3: "Functional Cookies: These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.",
            type4: "Targeting Cookies: These cookies record your visit to our website, the pages you have visited, and the links you have followed. We may use this information to make our website and the advertising displayed on it more relevant to your interests.",
            manage: "You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly."
        },
        
        use: {
            title: "How We Use Your Information",
            text: "We may use the information we collect for various purposes, including to:",
            item1: "Provide, maintain, and improve our website",
            item2: "Create and manage your account",
            item3: "Track and analyze usage patterns",
            item4: "Personalize your experience",
            item5: "Communicate with you about updates, features, or educational content",
            item6: "Respond to your inquiries and provide support",
            item7: "Protect against unauthorized access and activities"
        },
        
        sharing: {
            title: "Information Sharing",
            text: "We may share your information in the following situations:",
            item1: "With Service Providers: We may share your information with third-party vendors who provide services on our behalf, such as hosting, analytics, and customer service.",
            item2: "For Legal Reasons: We may disclose your information if required to do so by law or in response to valid requests by public authorities.",
            item3: "With Your Consent: We may share your information with third parties when you have given us your consent to do so.",
            notsell: "We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties."
        },
        
        security: {
            title: "Data Security",
            text: "We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission or storage of information can be guaranteed to be 100% secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our website."
        },
        
        children: {
            title: "Children's Privacy",
            text: "Our website is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us. If we become aware that we have collected personal information from a child under the age of 13 without verification of parental consent, we will take steps to remove that information from our servers."
        },
        
        rights: {
            title: "Your Rights",
            text: "Depending on your location, you may have certain rights regarding your personal information, including:",
            item1: "The right to access personal information we hold about you",
            item2: "The right to request correction of inaccurate information",
            item3: "The right to request deletion of your personal information",
            item4: "The right to object to processing of your personal information",
            item5: "The right to data portability",
            item6: "The right to withdraw consent",
            exercise: "To exercise these rights, please contact us using the information provided in the \"Contact Us\" section below."
        },
        
        changes: {
            title: "Changes to this Privacy Policy",
            text: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last Updated\" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page."
        },
        
        contact: {
            title: "Contact Us",
            text: "If you have any questions about this Privacy Policy, please contact us at contact@quadraticlearning.com."
        },
        
        footer: "This document was last updated on May 15, 2024.",
        returnToHome: "Return to Home"
    }
}; 