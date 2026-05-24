/* ==========================================================================
   ROSHNI PETER PORTFOLIO JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initSkillsFilter();
    initTerminalSandbox();
    initContactForm();
    initBackToTop();
});

/* ==========================================================================
   1. LIGHT / DARK THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        // Default to dark theme as planned
        body.className = 'dark-theme';
        localStorage.setItem('portfolio-theme', 'dark-theme');
    }
    
    themeBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('portfolio-theme', 'light-theme');
            showToast('Switched to Light Theme!', 'success');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('portfolio-theme', 'dark-theme');
            showToast('Switched to Dark Theme!', 'success');
        }
    });
}

/* ==========================================================================
   2. MOBILE NAV MENU
   ========================================================================== */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta-mobile');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
    
    // Header shadow on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = 'var(--shadow-md)';
            navbar.style.padding = '5px 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '0';
        }
    });
}

/* ==========================================================================
   3. SKILLS CATEGORY FILTER
   ========================================================================== */
function initSkillsFilter() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked tab
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            
            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    // Reset animations
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   4. INTERACTIVE MOCK TERMINAL CLI SANDBOX
   ========================================================================== */
function initTerminalSandbox() {
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const terminalSendBtn = document.getElementById('terminal-send-btn');
    const presetBtns = document.querySelectorAll('.preset-btn');
    
    // Command response database
    const commandResponses = {
        '/help': [
            { type: 'system', text: 'Available commands:' },
            { type: 'success', text: '  /experience     - Summarizes Roshni\'s professional roles & milestones' },
            { type: 'success', text: '  /skills         - Lists tech stack structured by categories' },
            { type: 'success', text: '  /certifications - Lists certified skillsets and credentials' },
            { type: 'success', text: '  /metrics        - Shows high-impact optimizations and outcomes' },
            { type: 'success', text: '  /clear          - Clears the terminal output log' }
        ],
        '/experience': [
            { type: 'title', text: '== PROFESSIONAL CHRONICLES ==' },
            { type: 'system', text: '1. Senior Software Engineer @ Shopalyst Technologies (May 2019 - Present)' },
            { type: 'bullet', text: '- Built DV360 optimization engines, cutting manual ad-ops by ~90%' },
            { type: 'bullet', text: '- Designed and built containerized media invoicing system reducing turnaround to seconds' },
            { type: 'bullet', text: '- Domain: E-commerce and Digital Marketing' },
            { type: 'system', text: '2. IoT Developer @ Tata Consultancy Services (Jan 2017 - May 2019)' },
            { type: 'bullet', text: '- Developed MATLAB state machines & HMI screen code for in-vehicle systems' },
            { type: 'bullet', text: '- Domain: Automotive, Infotainment' }
        ],
        '/skills': [
            { type: 'title', text: '== TECH STACK MATRIX ==' },
            { type: 'system', text: '* Languages: Python, Node.js, TypeScript, C++' },
            { type: 'system', text: '* Tools: DV360, Meta Ads, TikTok Ads, Docker, AWS/Azure, Git' },
            { type: 'system', text: '* Analytics: SQL, Pandas, Kibana, ElasticSearch, Solr' },
            { type: 'system', text: '* AI Systems: Claude Code, AntiGravity, Cursor, Prompting Essentials' }
        ],
        '/certifications': [
            { type: 'title', text: '== VERIFIED CREDENTIALS ==' },
            { type: 'success', text: '[✓] Google Prompting Essentials (Coursera)' },
            { type: 'success', text: '[✓] Data Structures & Algorithms in Python (Udemy)' },
            { type: 'success', text: '[✓] The Data Science Course 2022: Bootcamp (Udemy)' }
        ],
        '/metrics': [
            { type: 'title', text: '== KEY METRICS & WORKFLOW HIGHLIGHTS ==' },
            { type: 'success', text: '• Manual Effort Cut: 90% via custom DV360 campaign adjustments engine.' },
            { type: 'success', text: '• Invoice Parsing Speed: Reduced from hours to seconds per document.' },
            { type: 'success', text: '• Experience Scale: 8+ years building enterprise ad-tech and IoT systems.' }
        ]
    };
    
    // Command executor
    function executeCommand(cmdText) {
        const cleanCmd = cmdText.trim();
        if (!cleanCmd) return;
        
        // Echo input command
        appendTerminalLine(`guest@roshni.dev:~$ ${cleanCmd}`, 'cmd-echo');
        
        // Command check
        const lowerCmd = cleanCmd.toLowerCase();
        if (lowerCmd === '/clear') {
            terminalBody.innerHTML = '';
            appendTerminalLine('Terminal buffer cleared. Ready.', 'system');
        } else if (commandResponses[lowerCmd]) {
            const responses = commandResponses[lowerCmd];
            responses.forEach((resp, index) => {
                setTimeout(() => {
                    appendTerminalLine(resp.text, resp.type);
                }, index * 100);
            });
        } else if (lowerCmd.startsWith('/') || lowerCmd === 'help' || lowerCmd === 'hello' || lowerCmd === 'hi') {
            // Suggest help if command is unknown
            setTimeout(() => {
                appendTerminalLine(`Command or text query '${cleanCmd}' not recognized.`, 'error-response');
                appendTerminalLine('Type "/help" or click a preset below to query the agent.', 'system');
            }, 100);
        } else {
            // General question matcher (Simple QA model simulation)
            setTimeout(() => {
                const answer = simulateQAMatcher(cleanCmd);
                appendTerminalLine(answer.text, answer.type);
            }, 200);
        }
        
        terminalInput.value = '';
        scrollTerminal();
    }
    
    // Simulates an AI QA model answering plain queries
    function simulateQAMatcher(query) {
        const text = query.toLowerCase();
        if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('hire')) {
            return { type: 'success', text: 'Contact info: Email roshni.mpeter@gmail.com or call +91949703566. Drop a message in the form below!' };
        }
        if (text.includes('antigravity') || text.includes('claude') || text.includes('agent') || text.includes('ai')) {
            return { type: 'success', text: 'AI Developer tools listed in my resume include AntiGravity, Claude Code, and Cursor. I hold a Google Prompting Essentials certification and design customized automated AI pipelines.' };
        }
        if (text.includes('meta') || text.includes('tiktok') || text.includes('dv360') || text.includes('ad api') || text.includes('marketing api') || text.includes('dcm')) {
            return { type: 'success', text: 'I have extensive experience integrating marketing APIs, specifically Google DV360, Meta Ads, and TikTok Ads. I build automated systems to programmatically configure campaigns, manage custom audiences, adjust bids, and query performance metrics.' };
        }
        if (text.includes('shopalyst') || text.includes('work') || text.includes('current')) {
            return { type: 'success', text: 'I am currently a Senior Software Engineer at Shopalyst Technologies. I build programmatic optimization engines (DV360, Meta Ads API, and TikTok Ads API), automated media invoicing systems, and cloud integration platforms.' };
        }
        if (text.includes('tcs') || text.includes('tata') || text.includes('iot')) {
            return { type: 'success', text: 'Before Shopalyst, I worked as an IoT Developer at TCS (2017-2019) creating IVI infotainment systems middleware and simulator state machines.' };
        }
        if (text.includes('education') || text.includes('college') || text.includes('degree')) {
            return { type: 'success', text: 'I graduated in 2016 with a B.E. degree in Computer Science & Engineering (73.4%) from Government College of Engineering, Kannur.' };
        }
        
        return { 
            type: 'system', 
            text: `Roshni's Agent: "I parsed your query: '${query}'. To view structured resume information, please click one of the shortcut commands below or type '/help'."` 
        };
    }
    
    function appendTerminalLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = text;
        terminalBody.appendChild(line);
        scrollTerminal();
    }
    
    function scrollTerminal() {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    // Input Event handlers
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand(terminalInput.value);
        }
    });
    
    terminalSendBtn.addEventListener('click', () => {
        executeCommand(terminalInput.value);
    });
    
    // Preset buttons clicks
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const command = btn.getAttribute('data-command');
            executeCommand(command);
        });
    });
}

/* ==========================================================================
   5. CONTACT FORM VALIDATION & FEEDBACK
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const submitBtn = document.getElementById('form-submit-btn');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate name
        if (!nameInput.value.trim()) {
            setError(nameInput, true);
            isValid = false;
        } else {
            setError(nameInput, false);
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            setError(emailInput, true);
            isValid = false;
        } else {
            setError(emailInput, false);
        }
        
        // Validate subject
        if (!subjectInput.value.trim()) {
            setError(subjectInput, true);
            isValid = false;
        } else {
            setError(subjectInput, false);
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            setError(messageInput, true);
            isValid = false;
        } else {
            setError(messageInput, false);
        }
        
        if (isValid) {
            // Simulated sending states
            submitBtn.disabled = true;
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                // Success feedback
                showToast('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        } else {
            showToast('Please correct the validation errors in the form.', 'error');
        }
    });
    
    function setError(input, hasError) {
        const group = input.parentElement;
        if (hasError) {
            group.classList.add('error');
        } else {
            group.classList.remove('error');
        }
    }
}

/* ==========================================================================
   6. TOAST NOTIFICATION UTILITIES
   ========================================================================== */
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Choose icon
    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-circle-exclamation';
    
    toast.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Automatic removal after 4 seconds
    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 4000);
}

/* ==========================================================================
   7. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
            backToTopBtn.style.transform = 'translateY(10px)';
        }
    });
    
    // Set initial styling for transitions
    backToTopBtn.style.transition = 'opacity 0.3s, transform 0.3s, border-color 0.2s, color 0.2s';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.pointerEvents = 'none';
    backToTopBtn.style.transform = 'translateY(10px)';
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
