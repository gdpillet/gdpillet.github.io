/**
 * AI Chat Assistant for Gastón Pillet Portfolio
 * Provides context-aware responses about portfolio work and experience
 */

class ChatAssistant {
    constructor() {
        this.isOpen = false;
        this.messagesContainer = null;
        this.inputField = null;
        this.chatBubble = null;
        this.chatWindow = null;
        this.bounceInterval = null;
        this.bounceCount = 0;
        
        this.init();
    }

    init() {
        if (typeof document === 'undefined') return;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('Chat Assistant: Initializing...');
        this.chatBubble = document.getElementById('chatBubble');
        this.chatWindow = document.getElementById('chatWindow');
        this.messagesContainer = document.getElementById('chatMessages');
        this.inputField = document.getElementById('chatInput');
        const closeBtn = document.getElementById('closeChatBtn');
        const sendBtn = document.getElementById('sendChatBtn');

        if (!this.chatBubble || !this.chatWindow) {
            console.error('Chat Assistant: Required elements not found');
            return;
        }
        console.log('Chat Assistant: Successfully initialized');

        // Subtle bounce animation to catch attention
        this.startBounceAnimation();

        // Event listeners
        this.chatBubble.addEventListener('click', () => this.openChat());
        closeBtn?.addEventListener('click', () => this.closeChat());
        sendBtn?.addEventListener('click', () => this.sendMessage());
        
        this.inputField?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });

        // Initial greeting
        this.addInitialGreeting();
    }

    openChat() {
        this.isOpen = true;
        this.chatBubble.style.display = 'none';
        this.chatWindow.classList.add('open');
        this.chatWindow.setAttribute('aria-hidden', 'false');
        this.chatWindow.removeAttribute('inert');
        this.inputField?.focus();
        
        // Stop bounce animation permanently and save to sessionStorage
        if (this.bounceInterval) {
            clearInterval(this.bounceInterval);
            this.bounceInterval = null;
        }
        this.chatBubble.classList.remove('bounce');
        sessionStorage.setItem('chatBounceDisabled', 'true');
    }

    closeChat() {
        this.isOpen = false;
        this.chatWindow.classList.remove('open');
        this.chatWindow.setAttribute('aria-hidden', 'true');
        this.chatWindow.setAttribute('inert', '');
        this.chatBubble.style.display = 'flex';
        this.chatBubble.focus();
    }

    addInitialGreeting() {
        const greeting = "Hi 👋 I'm Gastón's AI assistant built by him using Vibe coding, fully custom.\n\n I can help you explore:\n• His work experience & skills\n• Case studies (Ibancar, Camunda, The Hackett Group)\n• Contact information (email, phone, location)\n• Design process & tools\n\nWhat would you like to know?";
        this.addMessage(greeting, 'bot');
    }

    sendMessage() {
        const message = this.inputField?.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.inputField.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI processing delay
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 800 + Math.random() * 400);
    }

    addMessage(text, sender) {
        if (!this.messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.setAttribute('role', 'log');
        messageDiv.setAttribute('aria-live', 'polite');

        if (sender === 'bot') {
            const avatar = document.createElement('div');
            avatar.className = 'chat-avatar';
            avatar.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="12" y1="2" x2="12" y2="8"/>
                    <circle cx="12" cy="1.5" r="1" fill="currentColor"/>
                    <rect x="2" y="8" width="20" height="10" rx="2" fill="none"/>
                    <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                    <circle cx="16" cy="13" r="1.5" fill="currentColor"/>
                </svg>
            `;
            messageDiv.appendChild(avatar);
        }

        const textDiv = document.createElement('div');
        textDiv.className = 'chat-message-text';
        // Convert \n to <br> for proper line breaks and preserve formatting
        textDiv.innerHTML = text.replace(/\n/g, '<br>');
        messageDiv.appendChild(textDiv);

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'chat-message bot-message typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.setAttribute('aria-label', 'Assistant is typing');

        const avatar = document.createElement('div');
        avatar.className = 'chat-avatar';
        avatar.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="12" y1="2" x2="12" y2="8"/>
                <circle cx="12" cy="1.5" r="1" fill="currentColor"/>
                <rect x="2" y="8" width="20" height="10" rx="2" fill="none"/>
                <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                <circle cx="16" cy="13" r="1.5" fill="currentColor"/>
            </svg>
        `;

        const dots = document.createElement('div');
        dots.className = 'chat-message-text';
        dots.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';

        indicator.appendChild(avatar);
        indicator.appendChild(dots);
        this.messagesContainer?.appendChild(indicator);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator?.remove();
    }

    scrollToBottom() {
        if (this.messagesContainer) {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }

    startBounceAnimation() {
        // Check sessionStorage - if user clicked before, don't bounce
        if (sessionStorage.getItem('chatBounceDisabled') === 'true') {
            return;
        }

        const doBounce = () => {
            if (!this.isOpen && sessionStorage.getItem('chatBounceDisabled') !== 'true') {
                this.chatBubble.classList.add('bounce');
                setTimeout(() => this.chatBubble.classList.remove('bounce'), 500);
                this.bounceCount++;
            }
        };

        // Progressive delays: 2s, 15s, 30s, then stop
        const delays = [2000, 15000, 30000];
        
        delays.forEach((delay, index) => {
            setTimeout(() => {
                if (this.bounceCount === index) {
                    doBounce();
                }
            }, delay);
        });
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        console.log('Generating response for:', message);

        // Portfolio Data Context
        const context = {
            experience: "7+ years in Product Design, 15 years in technology",
            currentRole: "Senior Product Designer at Camunda since October 2022",
            location: "Málaga, Spain - Remote work",
            specialization: "SaaS, B2B platforms, AI-driven design, workflow automation",
            
            skills: {
                technical: "HTML, CSS, JavaScript, Git, Figma, AI prototyping tools (Cursor, v0, Claude, Lovable)",
                design: "UX Strategy, Design Systems, User Research, Usability Testing, Product Strategy",
                tools: "Figma, Dovetail, Mixpanel, Hotjar, Google Analytics, Maze, Miro, Storybook"
            },

            projects: {
                ibancar: {
                    role: "Product Designer (Sep 2020 - Dec 2021)",
                    impact: "3.5x loan origination growth, 6 months early profitability, 55% reduction in documentation friction",
                    focus: "Fintech B2C, Mobile-first design, WhatsApp integration, UX strategy"
                },
                camunda: {
                    role: "Senior Product Designer (Oct 2022 - Present)",
                    impact: "85% enterprise adoption of BYOEK feature, 40% reduction in support tickets, 30% decrease in misconfigured deployments",
                    focus: "SaaS B2B, Enterprise security, Encryption functionality, IBM Carbon Design System"
                },
                hackett: {
                    role: "UX/UI Designer (Sep 2018 - Aug 2020)",
                    impact: "60% reduction in time to insight, 4x faster metric comparison workflow, 15,000+ metrics made accessible",
                    focus: "Data Analytics B2B, Benchmarking platform, Dashboard design for finance executives"
                }
            },

            contact: {
                email: "gdpillet@gmail.com",
                phone: "+34 615 435 576",
                linkedin: "linkedin.com/in/gastonpillet",
                location: "Málaga, Spain"
            },

            personal: {
                pet: "Toto, a Dachshund with an irrational hatred for Amazon drivers and mailmen",
                music: "Plays bass, guitar, and drums. Into jazz (Herbie Hancock's 'Cantaloupe Island'), Miles Davis, The Doors, Queen, Dire Straits, Red Hot Chili Peppers",
                drink: "Switched from coffee to green tea after a trip to Japan",
                tools: "Figma for design, VS Code and Cursor for coding, GitHub for version control, Claude, Lovable, and V0 for AI-assisted workflows",
                routine: "Green tea → family breakfast → school drop-off → work mode",
                timezone: "Málaga, Spain - European timezone, fully remote-ready",
                interests: "Fascinated by AI and how it's shaping human evolution, work, and creativity",
                sports: "Brown belt in Judo (trained at the Kodokan in Tokyo), practices archery with his wife",
                food: "Diverse and quality-focused, sushi, pasta, paella, pizza, burgers, BBQ across all cuisines"
            },

            practical: {
                availability: "2 weeks notice period",
                interviewHours: "Available 9 AM to 5 PM",
                languages: "Spanish (native), English (fluent)"
            }
        };

        // PRIORITY 1: Contact information - Must be checked FIRST before any other responses
        // Check for specific email queries
        if ((message.includes('email') && (message.includes('what') || message.includes('his') || message.includes('address') || message.includes('contact'))) ||
            (message.includes('mail') && !message.includes('gmail')) ||
            message.includes('e-mail') ||
            message.includes('correo')) {
            console.log('✓ Email query detected');
            return `📧 <a href="mailto:${context.contact.email}">${context.contact.email}</a>`;
        }

        // Check for specific phone queries
        if ((message.includes('phone') || message.includes('número') || message.includes('telefono') || message.includes('telephone')) ||
            (message.includes('number') && (message.includes('phone') || message.includes('contact') || message.includes('his') || message.includes('call'))) ||
            (message.includes('call') && (message.includes('how') || message.includes('number')))) {
            console.log('✓ Phone query detected');
            return `📱 <a href="tel:+34615435576">${context.contact.phone}</a>`;
        }

        // Check for LinkedIn
        if (message.includes('linkedin') || message.includes('linked in')) {
            console.log('✓ LinkedIn query detected');
            return `💼 <a href="https://www.linkedin.com/in/gastonpillet" target="_blank" rel="noopener noreferrer">linkedin.com/in/gastonpillet</a>`;
        }

        // General contact request - all info
        if ((message.includes('contact') && (message.includes('how') || message.includes('info') || message.includes('information'))) ||
            (message.includes('reach') && (message.includes('how') || message.includes('can'))) ||
            message.includes('get in touch') ||
            message.includes('connect with')) {
            console.log('✓ General contact query detected');
            return `You can contact Gastón:\n\n📧 Email: <a href="mailto:${context.contact.email}">${context.contact.email}</a>\n📱 Phone: <a href="tel:+34615435576">${context.contact.phone}</a>\n💼 LinkedIn: <a href="https://www.linkedin.com/in/gastonpillet" target="_blank" rel="noopener noreferrer">${context.contact.linkedin}</a>\n📍 ${context.contact.location}`;
        }

        // PRIORITY 2: Greeting responses
        if ((message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('hola')) && message.length < 20) {
            return "Hello! 👋 I can answer questions about Gastón's experience, projects, or contact info. What would you like to know?";
        }

        if (message.includes('thank') || message.includes('thanks') || message.includes('gracias')) {
            return "You're welcome! Feel free to ask anything else about Gastón's work.";
        }

        // PRIORITY 3: Specific project queries
        if (message.includes('ibancar') || (message.includes('fintech') && message.includes('loan'))) {
            return `At Ibancar, Gastón scaled loan origination by 3.5x while achieving profitability 6 months ahead of plan. He reduced form complexity by 50% (from 4 to 2 screens) and documentation friction by 55%. The mobile-first redesign with WhatsApp integration dramatically improved conversion rates.`;
        }

        if (message.includes('camunda') || message.includes('byoek') || message.includes('byok') || (message.includes('encryption') && message.includes('feature'))) {
            return `At Camunda, Gastón designed the BYOEK (Bring Your Own Encryption Key) feature, achieving 85% enterprise adoption within 3 months. The solution included a two-step wizard, real-time validation, and comprehensive monitoring dashboards. This became a critical differentiator in enterprise sales.`;
        }

        if (message.includes('hackett') || message.includes('thg') || (message.includes('dashboard') && message.includes('finance'))) {
            return `At The Hackett Group, Gastón redesigned a finance benchmarking dashboard serving Fortune 500 executives. The solution reduced time to insight by 60% and enabled 4x faster metric comparison across 15,000+ performance indicators.`;
        }

        // PRIORITY 4: Experience and skills
        if ((message.includes('experience') || message.includes('years')) && !message.includes('user experience')) {
            return `Gastón has ${context.experience}. He specializes in ${context.specialization}, working in global remote environments. His technical background as a web developer enhances his ability to bridge design and engineering teams effectively.`;
        }

        if (message.includes('current') || (message.includes('now') && (message.includes('work') || message.includes('doing')))) {
            return `Currently, Gastón is a ${context.currentRole}. At Camunda, he led the BYOEK security feature that achieved 85% enterprise adoption and reduced support tickets by 40%. He focuses on workflow automation and process orchestration design.`;
        }

        if (message.includes('skill') || message.includes('expertise') || message.includes('specializ') || message.includes('good at')) {
            return `Gastón's expertise spans Product Strategy, User Research, Design Systems, and AI-Driven Prototyping. His technical skills include ${context.skills.technical}. He excels at translating complex business requirements into user-centered design solutions with measurable impact.`;
        }

        if (message.includes('tool') || (message.includes('software') && !message.includes('saas')) || (message.includes('figma') && message.includes('use'))) {
            return `Gastón uses industry-standard tools including ${context.skills.tools}. He leverages AI tools like Cursor, v0, Claude Code, and Lovable for rapid prototyping and "vibe coding" to accelerate ideation and validate concepts quickly.`;
        }

        if (message.includes('process') || message.includes('methodology') || message.includes('approach') || message.includes('how does he work')) {
            return `Gastón follows a comprehensive design process: Discovery (leveraging AI for research analysis) → Research & Insights → Prototyping (using Lovable for rapid iteration) → Testing & Validation → Implementation (collaborating with engineering). He emphasizes data-driven decision making and continuous iteration.`;
        }

        if (message.includes('result') || message.includes('impact') || message.includes('metric') || message.includes('kpi') || message.includes('achievement')) {
            return `Gastón consistently delivers measurable results: 3.5x loan origination at Ibancar, 85% enterprise adoption for BYOEK at Camunda, 60% reduction in time to insight at Hackett Group. He focuses on KPIs like conversion rates, adoption metrics, and efficiency improvements.`;
        }

        // PRIORITY 5: Specific topics
        if (message.includes('design system') || (message.includes('carbon') && message.includes('design'))) {
            return `At Camunda, Gastón led the implementation of IBM Carbon Design System across the 'Operate' product suite. He created reusable UI patterns for technical monitoring and built exportable components to ensure consistency and scalability across products.`;
        }

        if (message.includes('remote') || message.includes('distributed')) {
            return `Gastón has extensive experience leading design in global remote environments. He's worked with distributed teams across Germany, Spain, USA, and Argentina, collaborating effectively with Engineering, Product, and QA teams across multiple time zones.`;
        }

        if ((message.includes('ai') || message.includes('artificial intelligence')) && !message.includes('assistant')) {
            return `Gastón is at the forefront of AI-driven design. He uses tools like Claude Code, Cursor, Figma Make, Lovable, and v0 for rapid prototyping and ideation. His approach combines AI capabilities with human-centered design principles to accelerate the design process while maintaining quality.`;
        }

        if (message.includes('education') || message.includes('background') || message.includes('studied') || message.includes('university')) {
            return `Gastón studied Web Design & Programming at Escuela Da Vinci in Buenos Aires, Argentina (2008-2010). His foundation as a web developer (2009-2014) provides him with technical expertise that bridges design and engineering, enabling effective collaboration with development teams.`;
        }

        if (message.includes('location') || message.includes('where') || message.includes('based') || message.includes('live')) {
            return `Gastón is based in ${context.contact.location}. He has extensive experience working remotely with global teams and is comfortable with distributed collaboration across time zones.`;
        }

        if (message.includes('portfolio') || (message.includes('work') && message.includes('show')) || message.includes('project')) {
            return `Gastón's portfolio showcases three main case studies: Ibancar (Fintech B2C loan platform with 3.5x growth), Camunda (BYOEK security feature with 85% adoption), and The Hackett Group (Finance dashboard for Fortune 500). Each demonstrates his ability to deliver measurable business impact through strategic design.`;
        }

        if (message.includes('mobile') || message.includes('responsive')) {
            return `Gastón specializes in mobile-first design. At Ibancar, he transformed a desktop-centric loan application into a mobile-optimized flow (serving 75-80% mobile traffic), resulting in dramatic conversion improvements. He ensures all designs are fully responsive and accessible.`;
        }

        if (message.includes('clearstar') || message.includes('background check') || message.includes('medical check')) {
            return `At ClearStar (2014-2017), Gastón designed UI applications for background and medical checking workflows. He collaborated with product teams on core projects like ScreenMeNow and ClearID, improving interfaces by increasing usability for both mobile and desktop applications. His work focused on simplifying complex compliance processes.`;
        }

        if (message.includes('nickelodeon') || message.includes('nick') || message.includes('mtv network') || message.includes('spongebob') || message.includes('viacom')) {
            return `At Nickelodeon/MTV Network (2012-2014), Gastón developed crisp, clean interfaces for high-traffic kids entertainment sites like nick.com. He maximized user engagement by implementing best UX practices, focusing on delivering optimal experiences for shows aimed at children while meeting both user and business needs.`;
        }

        if (message.includes('velocity partners') || message.includes('icontact')) {
            return `At Velocity Partners (2010-2012), Gastón handled frontend development and maintenance for iContact.com, working in an Agile environment. He focused on creating responsive web applications while collaborating with cross-functional teams in Buenos Aires, Argentina.`;
        }

        if (message.includes('hrsmart') || message.includes('deltek') || (message.includes('hr') && message.includes('tool'))) {
            return `At HRsmart (2009-2010, now Deltek), Gastón developed frontend applications for HR management tools in Austin, Texas. He worked with HTML, CSS, and Smarty PHP templates, and conducted presentations about emerging Web 2.0 design trends, demonstrating early leadership in design thinking.`;
        }

        if (message.includes('spongebob') || message.includes('nick') && message.includes('show')) {
            return `At Nickelodeon, Gastón built engaging interfaces for high-traffic websites focused on B2C entertainment. As a Web Developer, he developed crisp interfaces for Nickelodeon's high-traffic media sites, implementing best UX practices to maximize user engagement for shows aimed at kids. His work ensured frontend maintenance and successfully delivered the best experience that met both user and business needs.`;
        }

        if (message.includes('testimonial') || message.includes('endorsement') || message.includes('opinion') || message.includes('what') && (message.includes('say') || message.includes('said')) && (message.includes('other') || message.includes('people') || message.includes('colleague'))) {
            const testimonials = [
                `"His ability to simplify complexity while maintaining functionality is a rare and valuable skill. This technical foundation proved invaluable in his design role, enabling him to communicate effectively with engineering teams."\n\n— Melanie Butcher, Head of Product Design`,
                `"Took ownership of driving design-related changes... he paid a strong focus on quickly iterating on the features we are building for our SaaS offering, while still keeping the bigger picture in mind."\n\n— Tim Schuppener, Engineering Manager`,
                `"As a leader, he made sure we felt we could count on him to support us and created an environment where we could work comfortably, boosting our creativity."\n\n— Lina Forero, UX Designer`
            ];
            const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
            return randomTestimonial;
        }

        // PRIORITY 6: Personal interests and hobbies
        if (message.includes('dog') || message.includes('pet') || message.includes('toto')) {
            return `Gastón's dog is Toto, a Dachshund with an irrational hatred for Amazon drivers and mailmen. He doesn't ask questions, he just accepts him. 🐕`;
        }

        if (message.includes('judo') || message.includes('martial art') || message.includes('sport') || message.includes('training') || message.includes('kodokan')) {
            return `He's a brown belt in Judo and got to train at the Kodokan in Tokyo, the historic home of Judo itself. It was a full-circle moment during his Japan trip. 🥋`;
        }

        if (message.includes('archery') || message.includes('bow') || message.includes('arrow')) {
            return `He practices archery with his wife. For him, it's about focus, literally and metaphorically. Aiming at targets helps sharpen goal-setting skills. 🏹`;
        }

        if (message.includes('music') || message.includes('instrument') || message.includes('bass') || message.includes('guitar') || message.includes('drums') || message.includes('jazz') || (message.includes('play') && !message.includes('display'))) {
            return `Gastón plays bass, guitar, and drums. He's into jazz, Herbie Hancock's 'Cantaloupe Island' is a favorite, but his taste ranges from Miles Davis and The Doors to Queen, Dire Straits, and Red Hot Chili Peppers. Pretty much anything good. 🎸`;
        }

        if (message.includes('food') || message.includes('cuisine') || message.includes('eat') || message.includes('restaurant')) {
            return `His taste in food mirrors his design approach, diverse and quality-focused. Sushi, pasta, paella, pizza, burgers, BBQ... he appreciates good food across all cuisines. 🍕`;
        }

        if ((message.includes('outside') && message.includes('work')) || (message.includes('fun') && (message.includes('do') || message.includes('for'))) || (message.includes('hobbies') || message.includes('interests'))) {
            return `Outside of design, Gastón practices Judo (he's a brown belt and trained at the Kodokan in Tokyo during his Japan trip) and archery with his wife, both help him stay focused and disciplined. He plays bass, guitar, and drums, loves jazz (Herbie Hancock, Miles Davis) but listens to everything from Queen to Red Hot Chili Peppers. And there's Toto, his Dachshund, who has strong feelings about delivery drivers. 🥋🏹🎸`;
        }

        if (message.includes('coffee') || message.includes('tea') || message.includes('drink') || message.includes('beverage') || (message.includes('fuel') && !message.includes('web'))) {
            return `Gastón recently made the switch from coffee to green tea after a trip to Japan, a place that left a real mark on him. Now it's green tea every morning. ☕→🍵`;
        }

        if ((message.includes('tools') || message.includes('software') || message.includes('use')) && (message.includes('design') || message.includes('code') || message.includes('ai'))) {
            return `His toolkit: Figma for design, VS Code and Cursor for coding, GitHub for version control, and Claude, Lovable, and V0 for AI-assisted workflows. He's deep into the AI-enhanced design space. 🛠️`;
        }

        // PRIORITY 7: Practical/hiring details
        if ((message.includes('start') && (message.includes('when') || message.includes('could') || message.includes('can'))) || message.includes('notice') || message.includes('availability')) {
            return `${context.practical.availability}. Available for interviews ${context.practical.interviewHours}. 📋`;
        }

        if (message.includes('language') || message.includes('speak') || (message.includes('spanish') && message.includes('english'))) {
            return `Languages: ${context.practical.languages}. 🌐`;
        }

        if (message.includes('interview') && !message.includes('availability')) {
            return `Available for interviews from 9 AM to 5 PM (European timezone). He can start with a 2-week notice period. 📅`;
        }

        if ((message.includes('excited') && message.includes('about')) || message.includes('currently') || message.includes('interested in') || (message.includes('what') && message.includes('fascinated'))) {
            return `Right now, he's fascinated by AI, not just the tools, but how it's fundamentally shaping human evolution and the way we work, create, and think. 🚀`;
        }

        if ((message.includes('japan') || message.includes('travel') || message.includes('trip')) && !message.includes('business trip')) {
            return `Gastón recently visited Japan, and it left a real mark on him, so much so that he switched from coffee to green tea. The culture, design sensibility, and attention to detail resonated deeply. 🇯🇵`;
        }

        if ((message.includes('morning') && message.includes('routine')) || message.includes('daily routine') || (message.includes('start') && message.includes('day'))) {
            return `Morning routine: green tea → family breakfast → school drop-off → work mode. 🌅`;
        }

        if (message.includes('timezone') || message.includes('time zone') || (message.includes('what time') && message.includes('zone'))) {
            return `Based in Málaga, Spain. Sunny weather, European timezone (CET/CEST), and fully set up for remote collaboration. 🌍`;
        }

        // Default response for unrecognized queries
        return "I can help you with information about:\n• Contact details (email, phone, location)\n• Work experience & current role\n• Case studies (Ibancar, Camunda, The Hackett Group)\n• Skills, tools & design process\n• Personal interests (music, hobbies, routine)\n• Practical details (availability, languages)\n\nWhat would you like to know?";
    }
}

// Initialize chat assistant
new ChatAssistant();
