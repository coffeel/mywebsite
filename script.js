// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Update aria-expanded attribute for accessibility
            const isExpanded = navMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Search functionality
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    // Open search overlay
    if (searchToggle) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchOverlay.classList.add('active');
            searchOverlay.setAttribute('aria-hidden', 'false');
            searchToggle.setAttribute('aria-expanded', 'true');
            searchInput.focus();
        });
    }

    // Close search overlay
    if (searchClose) {
        searchClose.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            searchOverlay.setAttribute('aria-hidden', 'true');
            searchToggle.setAttribute('aria-expanded', 'false');
        });
    }

    // Close search overlay when clicking outside
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            searchOverlay.setAttribute('aria-hidden', 'true');
            searchToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close search overlay with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchOverlay.setAttribute('aria-hidden', 'true');
            searchToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle suggestion tags
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchTerm = this.getAttribute('data-search');
            searchInput.value = searchTerm;
            searchForm.submit();
        });
    });

    // Handle search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const query = searchInput.value.trim();
            if (query) {
                // The form will automatically submit to Bing
                // No need to prevent default or handle manually
            }
        });
    }

    // DeepSeek AI Chat functionality
    const deepseekToggle = document.getElementById('deepseek-toggle');
    const deepseekOverlay = document.getElementById('deepseek-overlay');
    const deepseekClose = document.getElementById('deepseek-close');
    const chatInput = document.getElementById('chat-input');
    const chatForm = document.getElementById('chat-form');
    const chatMessages = document.getElementById('chat-messages');

    // Open DeepSeek chat overlay
    if (deepseekToggle) {
        deepseekToggle.addEventListener('click', function(e) {
            e.preventDefault();
            deepseekOverlay.classList.add('active');
            deepseekOverlay.setAttribute('aria-hidden', 'false');
            deepseekToggle.setAttribute('aria-expanded', 'true');
            chatInput.focus();
        });
    }

    // Close DeepSeek chat overlay
    if (deepseekClose) {
        deepseekClose.addEventListener('click', function() {
            deepseekOverlay.classList.remove('active');
            deepseekOverlay.setAttribute('aria-hidden', 'true');
            deepseekToggle.setAttribute('aria-expanded', 'false');
        });
    }

    // Close DeepSeek chat overlay when clicking outside
    deepseekOverlay.addEventListener('click', function(e) {
        if (e.target === deepseekOverlay) {
            deepseekOverlay.classList.remove('active');
            deepseekOverlay.setAttribute('aria-hidden', 'true');
            deepseekToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close DeepSeek chat overlay with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && deepseekOverlay.classList.contains('active')) {
            deepseekOverlay.classList.remove('active');
            deepseekOverlay.setAttribute('aria-hidden', 'true');
            deepseekToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle chat form submission
    if (chatForm) {
        chatForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                addUserMessage(message);
                chatInput.value = '';
                
                // Show typing indicator
                showTypingIndicator();
                
                try {
                    // Call DeepSeek API
                    const aiResponse = await generateAIResponse(message);
                    hideTypingIndicator();
                    addAIMessage(aiResponse);
                } catch (error) {
                    console.error('Error getting AI response:', error);
                    hideTypingIndicator();
                    addAIMessage('Sorry, I\'m having trouble connecting right now. Please try again in a moment.');
                }
            }
        });
    }

    // Add user message to chat
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>
            <div class="message-content">
                <p>${escapeHtml(message)}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Add AI message to chat
    function addAIMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
            </div>
            <div class="message-content">
                <p>${escapeHtml(message)}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // DeepSeek API integration
    let conversationHistory = [
        {
            role: "system",
            content: "You are DeepSeek AI, a helpful assistant specializing in web development, coding, design, and technical topics. You provide clear, practical advice and code examples when appropriate. Keep responses concise but informative."
        }
    ];

    // Call DeepSeek API
    async function callDeepSeekAPI(userMessage) {
        try {
            // Add user message to conversation history
            conversationHistory.push({
                role: "user",
                content: userMessage
            });

            const response = await fetch(DEEPSEEK_CONFIG.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DEEPSEEK_CONFIG.API_KEY}`
                },
                body: JSON.stringify({
                    model: DEEPSEEK_CONFIG.MODEL,
                    messages: conversationHistory,
                    ...DEEPSEEK_CONFIG.DEFAULT_PARAMS
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.choices && data.choices[0] && data.choices[0].message) {
                const aiResponse = data.choices[0].message.content;
                
                // Add AI response to conversation history
                conversationHistory.push({
                    role: "assistant",
                    content: aiResponse
                });

                return aiResponse;
            } else {
                throw new Error('Invalid response format from DeepSeek API');
            }

        } catch (error) {
            console.error('DeepSeek API Error:', error);
            
            // Fallback responses if API fails
            const fallbackResponses = {
                'hello': 'Hello! How can I help you with web development, coding, or design today?',
                'help': 'I can help you with web development, coding, design, and technical questions. What would you like to know?',
                'web development': 'I can assist you with HTML, CSS, JavaScript, responsive design, and modern web development practices. What specific area would you like to explore?',
                'css': 'CSS is great for styling! I can help with layouts, animations, responsive design, and modern CSS techniques like Grid and Flexbox.',
                'javascript': 'JavaScript is powerful for web interactivity! I can help with DOM manipulation, events, async programming, and modern JS features.',
                'responsive': 'Responsive design is crucial! I can help with mobile-first approaches, media queries, flexible layouts, and testing across devices.',
                'readwithme': 'ReadWithMe platform development! I can help with reading applications, user experience design, and digital reading features.',
                'default': 'I\'m experiencing a temporary connection issue. I can help you with web development, coding, design, and technical topics. Could you tell me more about what you\'re working on?'
            };

            const lowerMessage = userMessage.toLowerCase();
            
            for (const [key, response] of Object.entries(fallbackResponses)) {
                if (lowerMessage.includes(key)) {
                    return response;
                }
            }
            
            return fallbackResponses.default;
        }
    }

    // Generate AI response using DeepSeek API
    async function generateAIResponse(userMessage) {
        return await callDeepSeekAPI(userMessage);
    }
});
