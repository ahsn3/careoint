// Chatbot functionality
const chatbotData = {
    en: {
        greeting: "Hello! I'm here to help you find the right department. Please describe your symptoms or how you're feeling, and I'll guide you to the appropriate specialist.",
        noMatch: "I understand you're not feeling well. Could you provide more details about your symptoms? For example, you can mention pain location, duration, or any specific concerns.",
        departments: {
            cardiology: {
                name: "Cardiology",
                url: "cardiology.html",
                keywords: ["heart", "chest", "cardiac", "cardiovascular", "blood pressure", "hypertension", "arrhythmia", "palpitation", "chest pain", "shortness of breath", "قلب", "صدر", "ضغط", "نبض", "ألم صدر", "ضيق تنفس"]
            },
            neurology: {
                name: "Neurology",
                url: "neurology.html",
                keywords: ["headache", "migraine", "seizure", "epilepsy", "stroke", "brain", "neurological", "dizziness", "vertigo", "memory", "confusion", "numbness", "tingling", "صداع", "نوبة", "صرع", "سكتة", "دماغ", "دوار", "ذاكرة", "تنميل"]
            },
            orthopedics: {
                name: "Orthopedics",
                url: "orthopedics.html",
                keywords: ["bone", "joint", "fracture", "knee", "shoulder", "back pain", "spine", "arthritis", "sports injury", "ankle", "wrist", "hip", "عظم", "مفصل", "كسر", "ركبة", "كتف", "ألم ظهر", "عمود فقري", "إصابة رياضية"]
            },
            pediatrics: {
                name: "Pediatrics",
                url: "pediatrics.html",
                keywords: ["child", "baby", "infant", "pediatric", "children", "kids", "newborn", "toddler", "طفل", "رضيع", "أطفال", "مولود", "صغير"]
            },
            dermatology: {
                name: "Dermatology",
                url: "dermatology.html",
                keywords: ["skin", "rash", "acne", "eczema", "psoriasis", "mole", "dermatitis", "allergy", "itching", "burn", "wound", "جلد", "طفح", "حبوب", "حساسية", "حكة", "جرح"]
            },
            gynecology: {
                name: "Gynecology",
                url: "gynecology.html",
                keywords: ["women", "female", "gynecological", "menstrual", "pregnancy", "pregnant", "ovarian", "uterus", "vaginal", "menopause", "نساء", "أنثى", "دورة", "حمل", "حامل", "رحم", "انقطاع"]
            }
        },
        recommendations: {
            found: "Based on your symptoms, I recommend visiting our",
            department: "department",
            clickHere: "Click here to view available doctors and book an appointment.",
            multiple: "Your symptoms might relate to multiple departments. I recommend starting with",
            or: "or",
            general: "If you're unsure, you can also visit our homepage to see all departments."
        }
    },
    tr: {
        greeting: "Merhaba! Size doğru bölümü bulmanızda yardımcı olmak için buradayım. Lütfen semptomlarınızı veya nasıl hissettiğinizi açıklayın, size uygun uzmana yönlendireceğim.",
        noMatch: "İyi hissetmediğinizi anlıyorum. Semptomlarınız hakkında daha fazla detay verebilir misiniz? Örneğin, ağrının yeri, süresi veya belirli endişelerinizden bahsedebilirsiniz.",
        departments: {
            cardiology: {
                name: "Kardiyoloji",
                url: "cardiology.html",
                keywords: ["kalp", "göğüs", "kardiyak", "kardiyovasküler", "tansiyon", "hipertansiyon", "aritmi", "çarpıntı", "göğüs ağrısı", "nefes darlığı", "heart", "chest", "cardiac"]
            },
            neurology: {
                name: "Nöroloji",
                url: "neurology.html",
                keywords: ["baş ağrısı", "migren", "nöbet", "epilepsi", "inme", "beyin", "nörolojik", "baş dönmesi", "vertigo", "hafıza", "karışıklık", "uyuşma", "karıncalanma", "headache", "migraine", "seizure"]
            },
            orthopedics: {
                name: "Ortopedi",
                url: "orthopedics.html",
                keywords: ["kemik", "eklem", "kırık", "diz", "omuz", "sırt ağrısı", "omurga", "artrit", "spor yaralanması", "ayak bileği", "bilek", "kalça", "bone", "joint", "fracture"]
            },
            pediatrics: {
                name: "Pediatri",
                url: "pediatrics.html",
                keywords: ["çocuk", "bebek", "bebeklik", "pediatrik", "çocuklar", "yeni doğan", "yürümeye başlayan", "child", "baby", "infant"]
            },
            dermatology: {
                name: "Dermatoloji",
                url: "dermatology.html",
                keywords: ["cilt", "döküntü", "akne", "egzama", "sedef", "ben", "dermatit", "alerji", "kaşıntı", "yanık", "yara", "skin", "rash", "acne"]
            },
            gynecology: {
                name: "Jinekoloji",
                url: "gynecology.html",
                keywords: ["kadın", "kadınsı", "jinekolojik", "adet", "hamilelik", "hamile", "yumurtalık", "rahim", "vajinal", "menopoz", "women", "female", "pregnancy"]
            }
        },
        recommendations: {
            found: "Semptomlarınıza dayanarak, size",
            department: "bölümünü ziyaret etmenizi öneriyorum.",
            clickHere: "Mevcut doktorları görüntülemek ve randevu almak için buraya tıklayın.",
            multiple: "Semptomlarınız birden fazla bölümle ilgili olabilir. Şununla başlamanızı öneriyorum:",
            or: "veya",
            general: "Emin değilseniz, tüm bölümleri görmek için ana sayfamızı da ziyaret edebilirsiniz."
        }
    },
    ar: {
        greeting: "مرحباً! أنا هنا لمساعدتك في العثور على القسم المناسب. يرجى وصف أعراضك أو ما تشعر به، وسأوجهك إلى الأخصائي المناسب.",
        noMatch: "أفهم أنك لا تشعر بالراحة. هل يمكنك تقديم المزيد من التفاصيل حول أعراضك؟ على سبيل المثال، يمكنك ذكر موقع الألم أو مدته أو أي مخاوف محددة.",
        departments: {
            cardiology: {
                name: "أمراض القلب",
                url: "cardiology.html",
                keywords: ["heart", "chest", "cardiac", "cardiovascular", "blood pressure", "hypertension", "arrhythmia", "palpitation", "chest pain", "shortness of breath", "قلب", "صدر", "ضغط", "نبض", "ألم صدر", "ضيق تنفس"]
            },
            neurology: {
                name: "الأعصاب",
                url: "neurology.html",
                keywords: ["headache", "migraine", "seizure", "epilepsy", "stroke", "brain", "neurological", "dizziness", "vertigo", "memory", "confusion", "numbness", "tingling", "صداع", "نوبة", "صرع", "سكتة", "دماغ", "دوار", "ذاكرة", "تنميل"]
            },
            orthopedics: {
                name: "العظام",
                url: "orthopedics.html",
                keywords: ["bone", "joint", "fracture", "knee", "shoulder", "back pain", "spine", "arthritis", "sports injury", "ankle", "wrist", "hip", "عظم", "مفصل", "كسر", "ركبة", "كتف", "ألم ظهر", "عمود فقري", "إصابة رياضية"]
            },
            pediatrics: {
                name: "طب الأطفال",
                url: "pediatrics.html",
                keywords: ["child", "baby", "infant", "pediatric", "children", "kids", "newborn", "toddler", "طفل", "رضيع", "أطفال", "مولود", "صغير"]
            },
            dermatology: {
                name: "الأمراض الجلدية",
                url: "dermatology.html",
                keywords: ["skin", "rash", "acne", "eczema", "psoriasis", "mole", "dermatitis", "allergy", "itching", "burn", "wound", "جلد", "طفح", "حبوب", "حساسية", "حكة", "جرح"]
            },
            gynecology: {
                name: "النساء والتوليد",
                url: "gynecology.html",
                keywords: ["women", "female", "gynecological", "menstrual", "pregnancy", "pregnant", "ovarian", "uterus", "vaginal", "menopause", "نساء", "أنثى", "دورة", "حمل", "حامل", "رحم", "انقطاع"]
            }
        },
        recommendations: {
            found: "بناءً على أعراضك، أنصحك بزيارة قسم",
            department: "",
            clickHere: "انقر هنا لعرض الأطباء المتاحين وحجز موعد.",
            multiple: "قد تكون أعراضك مرتبطة بأقسام متعددة. أنصحك بالبدء بقسم",
            or: "أو",
            general: "إذا لم تكن متأكداً، يمكنك أيضاً زيارة الصفحة الرئيسية لرؤية جميع الأقسام."
        }
    }
};

// Initialize chatbot
function initChatbot() {
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotBadge = document.getElementById('chatbotBadge');
    const chatbotMessages = document.getElementById('chatbotMessages');

    if (!chatbotButton || !chatbotWindow) return;

    // Update chatbot language
    function updateChatbotLanguage() {
        const lang = window.currentLanguage || 'en';
        const messages = chatbotData[lang];
        
        // Update placeholder
        if (chatbotInput) {
            const placeholder = chatbotInput.getAttribute(`data-placeholder-${lang}`);
            if (placeholder) chatbotInput.placeholder = placeholder;
        }
        
        // Update header text
        const headerTitle = chatbotWindow?.querySelector('.chatbot-header h3');
        const headerSubtitle = chatbotWindow?.querySelector('.chatbot-header p');
        if (headerTitle && headerTitle.hasAttribute('data-en')) {
            headerTitle.textContent = headerTitle.getAttribute(`data-${lang}`);
        }
        if (headerSubtitle && headerSubtitle.hasAttribute('data-en')) {
            headerSubtitle.textContent = headerSubtitle.getAttribute(`data-${lang}`);
        }
    }

    // Toggle chatbot window
    function toggleChatbot() {
        chatbotWindow.classList.toggle('active');
        chatbotButton.classList.toggle('active');
        if (chatbotBadge) chatbotBadge.style.display = 'none';
        
        if (chatbotWindow.classList.contains('active')) {
            chatbotInput?.focus();
            updateChatbotLanguage();
        }
    }

    // Close chatbot
    function closeChatbot() {
        chatbotWindow.classList.remove('active');
        chatbotButton.classList.remove('active');
    }

    // Analyze symptoms and recommend department
    function analyzeSymptoms(userMessage) {
        const lang = window.currentLanguage || 'en';
        const messages = chatbotData[lang];
        const text = userMessage.toLowerCase();
        
        const matches = {};
        
        // Check each department
        Object.keys(messages.departments).forEach(dept => {
            const deptData = messages.departments[dept];
            let score = 0;
            
            deptData.keywords.forEach(keyword => {
                if (text.includes(keyword.toLowerCase())) {
                    score++;
                }
            });
            
            if (score > 0) {
                matches[dept] = score;
            }
        });
        
        return matches;
    }

    // Generate response
    function generateResponse(userMessage) {
        const lang = window.currentLanguage || 'en';
        const messages = chatbotData[lang];
        const matches = analyzeSymptoms(userMessage);
        
        // Get patient data if logged in
        let patientData = null;
        if (window.auth && window.auth.isLoggedIn() && window.auth.getCurrentUserRole() === 'patient') {
            patientData = window.auth.getCurrentUser();
        }
        
        if (Object.keys(matches).length === 0) {
            let noMatchText = messages.noMatch;
            
            // Personalize response if patient is logged in
            if (patientData) {
                const patientName = patientData.name || 'there';
                if (lang === 'ar') {
                    noMatchText = `مرحباً ${patientName}. ${messages.noMatch}`;
                } else {
                    noMatchText = `Hello ${patientName}. ${messages.noMatch}`;
                }
            }
            
            return {
                text: noMatchText,
                department: null
            };
        }
        
        // Sort by score (highest first)
        const sortedMatches = Object.entries(matches)
            .sort((a, b) => b[1] - a[1]);
        
        const topMatch = sortedMatches[0];
        const topDept = topMatch[0];
        const deptData = messages.departments[topDept];
        
        let responseText = '';
        let greeting = '';
        
        // Add personalized greeting if patient is logged in
        if (patientData) {
            const patientName = patientData.name || 'there';
            if (lang === 'ar') {
                greeting = `مرحباً ${patientName}. `;
            } else {
                greeting = `Hello ${patientName}. `;
            }
        }
        
        if (sortedMatches.length === 1) {
            // Single match
            if (lang === 'ar') {
                responseText = `${greeting}${messages.recommendations.found} ${deptData.name}. ${messages.recommendations.clickHere}`;
            } else {
                responseText = `${greeting}${messages.recommendations.found} ${deptData.name} ${messages.recommendations.department}. ${messages.recommendations.clickHere}`;
            }
        } else {
            // Multiple matches
            const secondMatch = sortedMatches[1];
            const secondDept = messages.departments[secondMatch[0]];
            
            if (lang === 'ar') {
                responseText = `${greeting}${messages.recommendations.multiple} ${deptData.name} ${messages.recommendations.or} ${secondDept.name}. ${messages.recommendations.clickHere}`;
            } else {
                responseText = `${greeting}${messages.recommendations.multiple} ${deptData.name} ${messages.recommendations.or} ${secondDept.name}. ${messages.recommendations.clickHere}`;
            }
        }
        
        // Add medical history context if available
        if (patientData && patientData.medicalHistory) {
            if (lang === 'ar') {
                responseText += ` ملاحظة: لدي معلومات عن تاريخك الطبي، مما يساعدني في تقديم توصيات أفضل.`;
            } else {
                responseText += ` Note: I have access to your medical history, which helps me provide better recommendations.`;
            }
        }
        
        return {
            text: responseText,
            department: deptData
        };
    }

    // Add message to chat
    function addMessage(text, isBot = false, department = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isBot ? 'bot-message' : 'user-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textP = document.createElement('p');
        textP.textContent = text;
        contentDiv.appendChild(textP);
        
        // Add department link if available
        if (department && isBot) {
            const linkDiv = document.createElement('div');
            linkDiv.className = 'department-link-container';
            const link = document.createElement('a');
            link.href = department.url;
            link.className = 'department-link';
            const lang = window.currentLanguage || 'en';
            link.textContent = lang === 'ar' ? 'عرض الأطباء' : 'View Doctors';
            linkDiv.appendChild(link);
            contentDiv.appendChild(linkDiv);
        }
        
        messageDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, false);
        chatbotInput.value = '';
        
        // Simulate thinking delay
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response.text, true, response.department);
        }, 500);
    }

    // Event listeners
    chatbotButton?.addEventListener('click', toggleChatbot);
    chatbotClose?.addEventListener('click', closeChatbot);
    chatbotSend?.addEventListener('click', sendMessage);
    
    chatbotInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Update language when changed
    const originalSetLanguage = window.setLanguage;
    if (originalSetLanguage) {
        window.setLanguage = function(lang) {
            originalSetLanguage(lang);
            updateChatbotLanguage();
        };
    }

    // Hide badge after first interaction
    if (chatbotBadge) {
        setTimeout(() => {
            chatbotBadge.style.display = 'none';
        }, 5000);
    }
    
    // Initialize greeting message
    function initializeGreeting() {
        const lang = window.currentLanguage || 'en';
        const messages = chatbotData[lang];
        let greeting = messages.greeting;
        
        // Personalize greeting if patient is logged in
        if (window.auth && window.auth.isLoggedIn() && window.auth.getCurrentUserRole() === 'patient') {
            const patientData = window.auth.getCurrentUser();
            const patientName = patientData.name || 'there';
            if (lang === 'ar') {
                greeting = `مرحباً ${patientName}! ${messages.greeting}`;
            } else {
                greeting = `Hello ${patientName}! ${messages.greeting}`;
            }
        }
        
        // Update or add initial greeting message
        if (chatbotMessages) {
            const existingGreeting = chatbotMessages.querySelector('.bot-message');
            if (existingGreeting) {
                // Update existing greeting
                const messageContent = existingGreeting.querySelector('.message-content p');
                if (messageContent) {
                    messageContent.textContent = greeting;
                }
            } else {
                // Add new greeting if none exists
                addMessage(greeting, true);
            }
        }
    }
    
    // Initialize greeting on load (with delay to ensure auth.js is loaded)
    setTimeout(() => {
        initializeGreeting();
    }, 100);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}

