// Practical Applications Module interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Practical Applications module loaded');
    initPracticalApplicationsInteractive();
    initApplicationsQuiz();
});

// Initialize the Interactive Problem-Solver
function initPracticalApplicationsInteractive() {
    const problemSelect = document.getElementById('problem-select');
    const loadProblemBtn = document.getElementById('load-problem');
    const problemDescription = document.getElementById('problem-description');
    const problemVisualization = document.getElementById('problem-visualization');
    const problemControls = document.getElementById('problem-controls');
    const problemSolution = document.getElementById('problem-solution');
    
    // If elements don't exist, exit
    if (!problemSelect || !loadProblemBtn || !problemDescription || 
        !problemVisualization || !problemControls || !problemSolution) {
        console.log('Interactive Problem-Solver elements not found');
        return;
    }
    
    // Define problem library
    const problems = {
        projectile: {
            title: "Projectile Motion Problem",
            description: `A ball is thrown from a height of 1.5 meters above the ground with an initial velocity of 15 m/s at an angle of 30° to the horizontal. 
                          <br><br>
                          <strong>Questions:</strong>
                          <ol>
                            <li>What is the maximum height reached by the ball?</li>
                            <li>How long will the ball be in the air?</li>
                            <li>How far horizontally will the ball travel before hitting the ground?</li>
                          </ol>`,
            setupVisualization: function(container) {
                // Create canvas
                container.innerHTML = '';
                const canvas = document.createElement('canvas');
                canvas.width = container.clientWidth || 400;
                canvas.height = container.clientHeight || 250;
                container.appendChild(canvas);
                
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                
                // Draw background
                ctx.fillStyle = '#f0f8ff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Set scale and coordinate transform
                const scale = 10; // pixels/meter
                const originX = 50;
                const originY = canvas.height - 30;
                
                // Draw axes
                ctx.strokeStyle = '#000';
                ctx.beginPath();
                // x-axis
                ctx.moveTo(originX, originY);
                ctx.lineTo(canvas.width - 20, originY);
                // Arrow
                ctx.lineTo(canvas.width - 25, originY - 5);
                ctx.moveTo(canvas.width - 20, originY);
                ctx.lineTo(canvas.width - 25, originY + 5);
                // x-axis label
                ctx.fillStyle = '#000';
                ctx.font = '12px Arial';
                ctx.fillText('Distance (m)', canvas.width - 80, originY + 20);
                
                // y-axis
                ctx.moveTo(originX, originY);
                ctx.lineTo(originX, 20);
                // Arrow
                ctx.lineTo(originX - 5, 25);
                ctx.moveTo(originX, 20);
                ctx.lineTo(originX + 5, 25);
                // y-axis label
                ctx.fillText('Height (m)', originX - 40, 30);
                ctx.stroke();
                
                // Draw ground
                ctx.beginPath();
                ctx.moveTo(originX, originY);
                ctx.lineTo(canvas.width - 20, originY);
                ctx.strokeStyle = '#3a3';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.lineWidth = 1;
                
                // Initial parameters
                const v0 = 15; // Initial velocity, m/s
                const angle = 30 * Math.PI / 180; // Angle in radians
                const h0 = 1.5; // Initial height, m
                const g = 9.8; // Gravity acceleration, m/s²
                
                // Horizontal and vertical components
                const v0x = v0 * Math.cos(angle);
                const v0y = v0 * Math.sin(angle);
                
                // Calculate key time points
                const timeToHighest = v0y / g;
                const timeToGround = (v0y + Math.sqrt(v0y*v0y + 2*g*h0)) / g;
                
                // Calculate highest point and horizontal distance
                const highestPoint = h0 + v0y*v0y / (2*g);
                const horizontalDistance = v0x * timeToGround;
                
                // Draw parabola
                ctx.beginPath();
                ctx.strokeStyle = '#f00';
                ctx.lineWidth = 2;
                
                for (let t = 0; t <= timeToGround; t += 0.05) {
                    const x = v0x * t;
                    const y = h0 + v0y * t - 0.5 * g * t * t;
                    
                    const canvasX = originX + x * scale;
                    const canvasY = originY - y * scale;
                    
                    if (t === 0) {
                        ctx.moveTo(canvasX, canvasY);
                    } else {
                        ctx.lineTo(canvasX, canvasY);
                    }
                }
                ctx.stroke();
                
                // Mark key points
                // Starting point
                ctx.fillStyle = '#00f';
                ctx.beginPath();
                ctx.arc(originX, originY - h0 * scale, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillText('Start', originX + 8, originY - h0 * scale);
                
                // Highest point
                ctx.fillStyle = '#f00';
                ctx.beginPath();
                ctx.arc(originX + v0x * timeToHighest * scale, originY - highestPoint * scale, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillText('Highest Point', originX + v0x * timeToHighest * scale - 40, originY - highestPoint * scale - 10);
                
                // Landing point
                ctx.fillStyle = '#00f';
                ctx.beginPath();
                ctx.arc(originX + horizontalDistance * scale, originY, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillText('Landing', originX + horizontalDistance * scale - 20, originY + 20);
                
                // Store calculated results for later use
                container.dataset.highestPoint = highestPoint.toFixed(2);
                container.dataset.timeInAir = timeToGround.toFixed(2);
                container.dataset.horizontalDistance = horizontalDistance.toFixed(2);
            },
            setupControls: function(container) {
                container.innerHTML = `
                    <div class="control-group">
                        <button id="show-solution-projectile" class="btn">Show Solution</button>
                    </div>
                `;
                
                // Add event listener
                document.getElementById('show-solution-projectile').addEventListener('click', function() {
                    const highestPoint = problemVisualization.dataset.highestPoint;
                    const timeInAir = problemVisualization.dataset.timeInAir;
                    const horizontalDistance = problemVisualization.dataset.horizontalDistance;
                    
                    problemSolution.innerHTML = `
                        <h4>Solution:</h4>
                        <div class="solution-step">
                            <p><strong>Given:</strong></p>
                            <ul>
                                <li>Initial height (h₀) = 1.5 m</li>
                                <li>Initial velocity (v₀) = 15 m/s</li>
                                <li>Angle (θ) = 30°</li>
                                <li>Gravity (g) = 9.8 m/s²</li>
                            </ul>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 1:</strong> Find horizontal and vertical components of initial velocity</p>
                            <div class="formula">v₀ₓ = v₀·cos(θ) = 15·cos(30°) = 15·0.866 = 12.99 m/s</div>
                            <div class="formula">v₀ᵧ = v₀·sin(θ) = 15·sin(30°) = 15·0.5 = 7.5 m/s</div>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 2:</strong> The position functions in parametric form are:</p>
                            <div class="formula">x(t) = v₀ₓ·t = 12.99t</div>
                            <div class="formula">y(t) = h₀ + v₀ᵧ·t - ½·g·t² = 1.5 + 7.5t - 4.9t²</div>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 3:</strong> Find the maximum height (when vertical velocity = 0)</p>
                            <div class="formula">v₀ᵧ - g·t = 0</div>
                            <div class="formula">t = v₀ᵧ/g = 7.5/9.8 = 0.765 seconds</div>
                            <div class="formula">y(0.765) = 1.5 + 7.5(0.765) - 4.9(0.765)² = 4.37 meters</div>
                            <div class="formula">Maximum height = ${highestPoint} meters</div>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 4:</strong> Find when the ball hits the ground (y = 0)</p>
                            <div class="formula">1.5 + 7.5t - 4.9t² = 0</div>
                            <div class="formula">Using the quadratic formula:</div>
                            <div class="formula">t = (-7.5 ± √(7.5² - 4·(-4.9)·1.5)) / (2·(-4.9))</div>
                            <div class="formula">t = (-7.5 ± √(56.25 + 29.4)) / (-9.8)</div>
                            <div class="formula">t = (-7.5 ± √85.65) / (-9.8)</div>
                            <div class="formula">t = (-7.5 ± 9.255) / (-9.8)</div>
                            <div class="formula">t₁ = 0.18 seconds (not valid as it's before launch)</div>
                            <div class="formula">t₂ = 1.71 seconds</div>
                            <div class="formula">Time in air = ${timeInAir} seconds</div>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 5:</strong> Find the horizontal distance traveled</p>
                            <div class="formula">x(1.71) = 12.99 · 1.71 = 22.21 meters</div>
                            <div class="formula">Horizontal distance = ${horizontalDistance} meters</div>
                        </div>
                    `;
                });
            }
        },
        revenue: {
            title: "Revenue Optimization Problem",
            description: `A theater currently charges $15 for each ticket and sells 200 tickets per show. 
                          Market research indicates that for each $1 decrease in ticket price, the theater will sell 15 more tickets.
                          <br><br>
                          <strong>Questions:</strong>
                          <ol>
                            <li>What is the revenue function in terms of price decrease x?</li>
                            <li>What ticket price will maximize revenue?</li>
                            <li>What is the maximum revenue?</li>
                          </ol>`,
            setupVisualization: function(container) {
                // Create canvas
                container.innerHTML = '';
                const canvas = document.createElement('canvas');
                canvas.width = container.clientWidth || 400;
                canvas.height = container.clientHeight || 250;
                container.appendChild(canvas);
                
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                
                // Draw background
                ctx.fillStyle = '#f0f8ff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Set scale and coordinate transform
                const originX = 60;
                const originY = canvas.height - 40;
                const scaleX = 25; // pixels/dollar
                const scaleY = canvas.height / 4000; // pixels/dollar revenue
                
                // Draw axes
                ctx.strokeStyle = '#000';
                ctx.beginPath();
                // x-axis
                ctx.moveTo(originX, originY);
                ctx.lineTo(canvas.width - 20, originY);
                // Arrow
                ctx.lineTo(canvas.width - 25, originY - 5);
                ctx.moveTo(canvas.width - 20, originY);
                ctx.lineTo(canvas.width - 25, originY + 5);
                // x-axis label
                ctx.fillStyle = '#000';
                ctx.font = '12px Arial';
                ctx.fillText('Price Decrease ($)', canvas.width - 120, originY + 20);
                
                // y-axis
                ctx.moveTo(originX, originY);
                ctx.lineTo(originX, 20);
                // Arrow
                ctx.lineTo(originX - 5, 25);
                ctx.moveTo(originX, 20);
                ctx.lineTo(originX + 5, 25);
                // y-axis label
                ctx.fillText('Revenue ($)', originX - 50, 30);
                ctx.stroke();
                
                // Parameters
                const basePrice = 15;
                const baseTickets = 200;
                const ticketIncrease = 15;
                
                // Calculate revenue function
                function calculateRevenue(priceDecrease) {
                    const newPrice = basePrice - priceDecrease;
                    const ticketsSold = baseTickets + ticketIncrease * priceDecrease;
                    return newPrice * ticketsSold;
                }
                
                // Find optimal price point
                const optimalPriceDecrease = baseTickets / (2 * ticketIncrease);
                const optimalPrice = basePrice - optimalPriceDecrease;
                const maxRevenue = calculateRevenue(optimalPriceDecrease);
                
                // Draw revenue curve
                ctx.beginPath();
                ctx.strokeStyle = '#0066cc';
                ctx.lineWidth = 2;
                
                for (let x = 0; x <= 10; x += 0.1) {
                    const revenue = calculateRevenue(x);
                    const canvasX = originX + x * scaleX;
                    const canvasY = originY - revenue * scaleY;
                    
                    if (x === 0) {
                        ctx.moveTo(canvasX, canvasY);
                    } else {
                        ctx.lineTo(canvasX, canvasY);
                    }
                }
                ctx.stroke();
                
                // Mark key points
                // Initial point
                ctx.fillStyle = '#00f';
                ctx.beginPath();
                const initialRevenue = calculateRevenue(0);
                ctx.arc(originX, originY - initialRevenue * scaleY, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillText(`Current ($${initialRevenue})`, originX + 10, originY - initialRevenue * scaleY);
                
                // Optimal point
                ctx.fillStyle = '#f00';
                ctx.beginPath();
                ctx.arc(originX + optimalPriceDecrease * scaleX, originY - maxRevenue * scaleY, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillText(`Optimal ($${maxRevenue.toFixed(0)})`, originX + optimalPriceDecrease * scaleX - 40, originY - maxRevenue * scaleY - 10);
                
                // Mark x-axis ticks
                for (let x = 0; x <= 10; x += 2) {
                    ctx.strokeStyle = '#000';
                    ctx.beginPath();
                    ctx.moveTo(originX + x * scaleX, originY);
                    ctx.lineTo(originX + x * scaleX, originY + 5);
                    ctx.stroke();
                    ctx.fillText(x.toString(), originX + x * scaleX - 3, originY + 15);
                }
                
                // Mark y-axis ticks
                for (let y = 0; y <= 4000; y += 500) {
                    ctx.strokeStyle = '#000';
                    ctx.beginPath();
                    ctx.moveTo(originX, originY - y * scaleY);
                    ctx.lineTo(originX - 5, originY - y * scaleY);
                    ctx.stroke();
                    ctx.fillText(y.toString(), originX - 40, originY - y * scaleY + 3);
                }
                
                // Store calculated results for later use
                container.dataset.optimalPriceDecrease = optimalPriceDecrease.toFixed(2);
                container.dataset.optimalPrice = optimalPrice.toFixed(2);
                container.dataset.maxRevenue = maxRevenue.toFixed(2);
            },
            setupControls: function(container) {
                container.innerHTML = `
                    <div class="control-group">
                        <button id="show-solution-revenue" class="btn">Show Solution</button>
                    </div>
                `;
                
                // Add event listener
                document.getElementById('show-solution-revenue').addEventListener('click', function() {
                    const optimalPriceDecrease = problemVisualization.dataset.optimalPriceDecrease;
                    const optimalPrice = problemVisualization.dataset.optimalPrice;
                    const maxRevenue = problemVisualization.dataset.maxRevenue;
                    
                    problemSolution.innerHTML = `
                        <h4>Solution:</h4>
                        <div class="solution-step">
                            <p><strong>Given:</strong></p>
                            <ul>
                                <li>Current ticket price = $15</li>
                                <li>Current tickets sold = 200 per show</li>
                                <li>For each $1 decrease in price, 15 more tickets are sold</li>
                            </ul>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 1:</strong> Define variables</p>
                            <ul>
                                <li>Let x = the amount of price decrease (in dollars)</li>
                                <li>New price = 15 - x</li>
                                <li>Number of tickets sold = 200 + 15x</li>
                            </ul>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 2:</strong> Write the revenue function</p>
                            <div class="formula">R(x) = (New price) × (Number of tickets sold)</div>
                            <div class="formula">R(x) = (15 - x) × (200 + 15x)</div>
                            <div class="formula">R(x) = (15 - x)(200 + 15x)</div>
                            <div class="formula">R(x) = 3000 + 225x - 200x - 15x²</div>
                            <div class="formula">R(x) = 3000 + 25x - 15x²</div>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 3:</strong> Find the value of x that maximizes revenue by setting the derivative equal to zero</p>
                            <div class="formula">R'(x) = 25 - 30x</div>
                            <div class="formula">25 - 30x = 0</div>
                            <div class="formula">30x = 25</div>
                            <div class="formula">x = 25/30 = 5/6 ≈ 0.833</div>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 4:</strong> Calculate the optimal price</p>
                            <div class="formula">Optimal price = 15 - 0.833 = $14.17</div>
                            <div class="formula">Optimal price = $${optimalPrice}</div>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 5:</strong> Calculate the maximum revenue</p>
                            <div class="formula">Maximum revenue = R(0.833)</div>
                            <div class="formula">Maximum revenue = 3000 + 25(0.833) - 15(0.833)²</div>
                            <div class="formula">Maximum revenue = 3000 + 20.83 - 10.42</div>
                            <div class="formula">Maximum revenue = $3010.41</div>
                            <div class="formula">Maximum revenue = $${maxRevenue}</div>
                        </div>
                    `;
                });
            }
        },
        area: {
            title: "Area Maximization Problem",
            description: `A farmer has 200 meters of fencing and wants to create a rectangular enclosure along a river. 
                          No fence is needed along the river side.
                          <br><br>
                          <strong>Questions:</strong>
                          <ol>
                            <li>What dimensions will maximize the enclosed area?</li>
                            <li>What is the maximum area that can be enclosed?</li>
                          </ol>`,
            setupVisualization: function(container) {
                // Create canvas
                container.innerHTML = '';
                const canvas = document.createElement('canvas');
                canvas.width = container.clientWidth || 400;
                canvas.height = container.clientHeight || 250;
                container.appendChild(canvas);
                
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                
                // Draw background
                ctx.fillStyle = '#f0f8ff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Basic parameters
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const scale = 1; // pixels/meter
                
                // Draw river
                ctx.fillStyle = '#add8e6';
                ctx.fillRect(0, 40, canvas.width, 20);
                
                // Wave pattern
                ctx.strokeStyle = '#0066cc';
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x += 10) {
                    ctx.moveTo(x, 45);
                    ctx.quadraticCurveTo(x + 5, 50, x + 10, 45);
                }
                ctx.stroke();
                
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x += 10) {
                    ctx.moveTo(x, 55);
                    ctx.quadraticCurveTo(x + 5, 50, x + 10, 55);
                }
                ctx.stroke();
                
                // River label
                ctx.fillStyle = '#000';
                ctx.font = '14px Arial';
                ctx.fillText('River', centerX - 20, 35);
                
                // Calculate optimal dimensions
                const perimeter = 200; // Total fence length
                const width = perimeter / 2; // Optimal width
                const height = perimeter / 4; // Optimal height
                const maxArea = width * height; // Maximum area
                
                // Draw optimal rectangular fence
                const rectX = centerX - width * scale / 2;
                const rectY = 60;
                const rectWidth = width * scale;
                const rectHeight = height * scale;
                
                ctx.strokeStyle = '#3a3';
                ctx.lineWidth = 2;
                ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
                
                // Fill area
                ctx.fillStyle = 'rgba(50, 205, 50, 0.2)';
                ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
                
                // Label dimensions
                ctx.fillStyle = '#000';
                ctx.font = '12px Arial';
                
                // Width label
                ctx.fillText(`Width: ${width}m`, centerX - 25, rectY + rectHeight + 15);
                
                // Height label
                ctx.fillText(`Height: ${height}m`, rectX - 65, rectY + rectHeight / 2);
                
                // Area label
                ctx.fillStyle = '#3a3';
                ctx.font = '14px Arial';
                ctx.fillText(`Maximum Area: ${maxArea}m²`, centerX - 65, rectY + rectHeight / 2);
                
                // Width arrow annotation
                ctx.beginPath();
                ctx.moveTo(rectX, rectY + rectHeight + 5);
                ctx.lineTo(rectX + rectWidth, rectY + rectHeight + 5);
                ctx.stroke();
                
                // Height arrow annotation
                ctx.beginPath();
                ctx.moveTo(rectX - 5, rectY);
                ctx.lineTo(rectX - 5, rectY + rectHeight);
                ctx.stroke();
                
                // Store calculated results for later use
                container.dataset.optimalWidth = width.toFixed(0);
                container.dataset.optimalHeight = height.toFixed(0);
                container.dataset.maxArea = maxArea.toFixed(0);
            },
            setupControls: function(container) {
                container.innerHTML = `
                    <div class="control-group">
                        <button id="show-solution-area" class="btn">Show Solution</button>
                    </div>
                `;
                
                // Add event listener
                document.getElementById('show-solution-area').addEventListener('click', function() {
                    const optimalWidth = problemVisualization.dataset.optimalWidth;
                    const optimalHeight = problemVisualization.dataset.optimalHeight;
                    const maxArea = problemVisualization.dataset.maxArea;
                    
                    problemSolution.innerHTML = `
                        <h4>Solution:</h4>
                        <div class="solution-step">
                            <p><strong>Given:</strong></p>
                            <ul>
                                <li>Total fencing available: 200 meters</li>
                                <li>No fence needed along the river side</li>
                                <li>Need to maximize rectangular area</li>
                            </ul>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 1:</strong> Define variables</p>
                            <ul>
                                <li>Let x = width of the rectangle (parallel to river)</li>
                                <li>Let y = height of the rectangle (perpendicular to river)</li>
                            </ul>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 2:</strong> Write equation for the perimeter constraint</p>
                            <div class="formula">Length of fence used = x + 2y = 200</div>
                            <div class="formula">Solving for y: y = (200 - x)/2</div>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 3:</strong> Write the area function in terms of x</p>
                            <div class="formula">Area = x × y</div>
                            <div class="formula">Area = x × (200 - x)/2</div>
                            <div class="formula">Area = (200x - x²)/2</div>
                            <div class="formula">Area = 100x - x²/2</div>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 4:</strong> Find the value of x that maximizes area by setting the derivative equal to zero</p>
                            <div class="formula">A'(x) = 100 - x/2</div>
                            <div class="formula">100 - x/2 = 0</div>
                            <div class="formula">x/2 = 100</div>
                            <div class="formula">x = 200 meters</div>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 5:</strong> Calculate the corresponding height</p>
                            <div class="formula">y = (200 - x)/2 = (200 - 200)/2 = 0 meters</div>
                            <p>This doesn't make sense! Let's reconsider the problem.</p>
                            <p>We have three sides of fencing (two sides perpendicular to the river and one side parallel to the river).</p>
                            <div class="formula">x + 2y = 200</div>
                            <div class="formula">Solving for y: y = (200 - x)/2</div>
                            <div class="formula">Area = x × y = x × (200 - x)/2 = 100x - x²/2</div>
                            <div class="formula">A'(x) = 100 - x = 0</div>
                            <div class="formula">x = 100 meters</div>
                            <div class="formula">y = (200 - 100)/2 = 50 meters</div>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Step 6:</strong> Calculate the maximum area</p>
                            <div class="formula">Maximum area = x × y = 100 × 50 = 5,000 square meters</div>
                            <div class="formula">Maximum area = ${maxArea} square meters</div>
                        </div>
                        
                        <div class="solution-step">
                            <p><strong>Conclusion:</strong> The optimal dimensions are:</p>
                            <ul>
                                <li>Width (parallel to river) = ${optimalWidth} meters</li>
                                <li>Height (perpendicular to river) = ${optimalHeight} meters</li>
                                <li>Maximum area = ${maxArea} square meters</li>
                            </ul>
                        </div>
                    `;
                });
            }
        }
    };
    
    // Add click event to button
    loadProblemBtn.addEventListener('click', function() {
        const selectedProblem = problemSelect.value;
        
        if (problems[selectedProblem]) {
            const problem = problems[selectedProblem];
            
            // Update problem description
            problemDescription.innerHTML = `
                <h4>${problem.title}</h4>
                <p>${problem.description}</p>
            `;
            
            // Setup visualization
            if (typeof problem.setupVisualization === 'function') {
                problem.setupVisualization(problemVisualization);
            }
            
            // Setup controls
            if (typeof problem.setupControls === 'function') {
                problem.setupControls(problemControls);
            }
            
            // Clear solution area
            problemSolution.innerHTML = '';
        }
    });
    
    // Load first problem initially
    if (problemSelect.options.length > 0) {
        loadProblemBtn.click();
    }
}

// Initialize Applications Quiz
function initApplicationsQuiz() {
    const checkButton = document.getElementById('check-app-quiz');
    if (!checkButton) {
        console.log('Applications quiz button not found');
        return;
    }
    
    checkButton.addEventListener('click', function() {
        const questions = document.querySelectorAll('#module-practical-applications .quiz-question');
        let score = 0;
        let total = questions.length;
        
        questions.forEach(question => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            const feedback = question.querySelector('.quiz-feedback');
            const correctAnswer = feedback.getAttribute('data-correct');
            
            if (selectedOption) {
                if (selectedOption.value === correctAnswer) {
                    feedback.innerHTML = '✓ Correct!';
                    feedback.style.color = 'green';
                    score++;
                } else {
                    feedback.innerHTML = '✗ Incorrect. The correct answer is option ' + correctAnswer.toUpperCase() + '.';
                    feedback.style.color = 'red';
                }
                feedback.style.display = 'block';
            } else {
                feedback.innerHTML = 'Please select an answer.';
                feedback.style.color = 'orange';
                feedback.style.display = 'block';
            }
        });
        
        const resultsDiv = document.getElementById('app-quiz-results');
        if (resultsDiv) {
            resultsDiv.innerHTML = `<p>Your score: ${score}/${total}</p>`;
            
            if (score === total) {
                resultsDiv.innerHTML += '<p>Excellent work! You have a good understanding of practical applications of quadratic equations.</p>';
            } else if (score >= total/2) {
                resultsDiv.innerHTML += '<p>Good job! You understand most of the concepts, but there\'s still room for improvement.</p>';
            } else {
                resultsDiv.innerHTML += '<p>You might want to review the module again to strengthen your understanding of practical applications.</p>';
            }
        }
    });
} 