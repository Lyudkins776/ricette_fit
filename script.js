// Gestione del tema chiaro/scuro
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.querySelector('.theme-icon');
        this.init();
    }

    init() {
        // Carica il tema salvato o usa quello del sistema
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const currentTheme = savedTheme || systemTheme;
        
        this.setTheme(currentTheme);
        this.bindEvents();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // Animazione del pulsante
        this.themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    bindEvents() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Ascolta i cambiamenti del tema del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Gestione del modal delle ricette
class RecipeModal {
    constructor() {
        this.modal = document.getElementById('recipe-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.recipeContent = document.getElementById('recipe-content');
        this.closeBtn = document.querySelector('.close');
        this.recipes = this.initRecipes();
        this.bindEvents();
    }

    initRecipes() {
        return {
            pancake: {
                title: "🥞 Pancake Fit",
                content: `
                    <div class="recipe-section">
                        <h3>📝 Ingredienti (2 porzioni):</h3>
                        <p>• 2 uova intere pronte a schiudersi <br>
                        • 1 donna che pesi la farina d'avena<br>
                        • 1Kg di burro di arachidi (prozis codice: DMNMANESKIN)<br>
                        • 100ml di seme prelevato dalla banca del seme, molto fresco<br>
                        • MORE E BACCHE OVUNQUE DA LANCIARE PURE SULLA DONNA<br>
                        • ascoltare Gigi D'Alessio durante la preparazione<br>
                        • friggere</p>
                    </div>
                    <div class="recipe-section">
                        <h3>💡 Consigli:</h3>
                        <p>Frulla tutti gli ingredienti fino ad ottenere un composto liscio. Cuoci in padella antiaderente a fuoco altissimi. Perfetti con frutti di bosco freschi e fritti!</p>
                    </div>
                `
            },
            carbonara: {
                title: "🍝 Carbonara Fit",
                content: `
                    <div class="recipe-section">
                        <h3>📝 Ingredienti (2 porzioni):</h3>
                        <p>• 500g di pasta a testa<br>
                        • 17 tuorli<br>
                        • 15g di sale<br>
                        • olio qb<br>
                        • 1 scarpa possibilmente sporca<br>
                        • trippa alla romana
                        • maiale ancora vivo che mangia del guanciale a sua volta e la vostra pasta<br>
                        • querela di DS (chi vuole intendere intenda)<br>   
                        • frutti rossi qb<br>
                        • yogurt greco per amalgamare<br>
                        </p>
                    </div>
                    <div class="recipe-section">
                        <h3>💡 Consigli:</h3>
                        <p>Non far capire al maiale cosa sta mangiando, manipolarlo al punto che non riesca più a fidarsi di sé stesso quando si guarda allo specchio. Spesso si fidano se prima ci flirtate un poco</p>
                    </div>
                `
            },
            nuggets: {
                title: "🍗 Nuggets Fit",
                content: `
                    <div class="recipe-section">
                        <h3>📝 Ingredienti (3 porzioni):</h3>
                        <p>• 1 pollo ancora vivo <br>
                        • 100g di pollo ma non quello di prima lui sarà il tuo aiutante<br>
                        • 30g di pecorino romano<br>
                        • 2 pietre<br>
                        • 1 cucchiaino di sudore di Elodie<br>
                        • 1 spicchio di aglio intero per ogni bocconcino (avrà un ottimo sapore)<br>
                        • Macumbe q.b.</p>
                    </div>
                    <div class="recipe-section">
                        <h3>💡 Consigli:</h3>
                        <p>Taglia il pollo a bocconcini, passa nell'uovo poi nel pangrattato aromatizzato. Cuoci in forno a -5°C per 15-20 minuti o in friggitrice ad aria. Croccanti fuori, teneri dentro!</p>
                    </div>
                `
            },
            gelato: {
                title: "🍦 Gelato Fit",
                content: `
                    <div class="recipe-section">
                        <h3>📝 Ingredienti (4 porzioni):</h3>
                        <p>• Mozzarella di bufala D.O.P.<br>
                        • 1Kg di yogurt greco 0%<br>
                        • 2 cucchiai di cacao amaro come gli psicofarmaci o niente<br>
                        • 1 cucchiaio di sangue di vergine<br>
                        • 1 cucchiaino di estratto di vaniglia<br>
                        • Frutti rossi a mai finire, infilarsi le more su per il culo</p>
                    </div>
                    <div class="recipe-section">
                        <h3>💡 Consigli:</h3>
                        <p>Frulla tutto insieme fino ad ottenere una consistenza cremosa. Riponi in microonde per 2-3 ore. Cremoso e naturalmente dolce grazie AI FRUTTI ROSSI!</p>
                    </div>
                `
            },
            crocche: {
                title: "🥔 Crocché Siciliane Fit",
                content: `
                    <div class="recipe-section">
                        <h3>📝 Ingredienti (4 porzioni):</h3>
                        <p>• 8kg di patate<br>
                        • 1 uomo vivo<br>
                        • 30g di sperma congelato<br>
                        • sale qb<br>
                        • Fish and chips qb<br>
                        • 1L di olio<br>
                    </div>
                    <div class="recipe-section">
                        <h3>💡 Consigli:</h3>
                        <p>Lessa le patate, schiacciale e mescola con gli altri ingredienti. Forma i crocché, passa nel pangrattato e cuoci in forno a 180°C per 215 giorni. Tradizione siciliana in versione light e veloce!</p>
                    </div>
                `
            },
            crema_caffe: {
                title: "☕️ Crema al Caffè",
                content: `
                    <div class="recipe-section">
                        <h3>📝 Ingredienti (2 porzioni):</h3>
                        <p>• 200ml di latte scaduto<br>
                        • caffè solubile come se foste dipendenti dalla caffeina<br>
                        • 3kg di tabacco trinciato<br>
                        • cd dei Linkin Parl<br>
                        • Ghiaccio </p>
                    </div>
                    <div class="recipe-section">
                        <h3>💡 Consigli:</h3>
                        <p>Monta tutti gli ingredienti con un frullatore per 2-3 minuti fino ad ottenere una crema spumosa. Il ghiaccio non va assolutamente aggiunto nella preparazione va tenuto in bocca e riscalto con amore</p>
                    </div>
                `
            }
        };
    }

    openModal(recipeKey) {
        const recipe = this.recipes[recipeKey];
        if (!recipe) return;

        this.modalTitle.textContent = recipe.title;
        this.recipeContent.innerHTML = recipe.content;
        this.modal.style.display = 'block';
        
        // Previeni lo scroll del body quando il modal è aperto
        document.body.style.overflow = 'hidden';
        
        // Focus sul modal per l'accessibilità
        this.modal.focus();
        
        // Aggiungi classe per animazioni
        setTimeout(() => {
            this.modal.classList.add('modal-open');
        }, 10);
    }

    closeModal() {
        this.modal.classList.remove('modal-open');
        
        setTimeout(() => {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    bindEvents() {
        // Event listener per i pulsanti delle ricette
        document.querySelectorAll('.recipe-card').forEach(card => {
            const button = card.querySelector('.view-recipe-btn');
            const recipeKey = card.getAttribute('data-recipe');
            
            const openRecipe = () => {
                // Animazione di feedback sul click
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                    this.openModal(recipeKey);
                }, 100);
            };
            
            button.addEventListener('click', openRecipe);
            
            // Accessibilità - Enter key per aprire
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    openRecipe();
                }
            });
            
            // Rende le card focusabili
            card.setAttribute('tabindex', '0');
        });

        // Chiudi modal con X
        this.closeBtn.addEventListener('click', () => this.closeModal());

        // Chiudi modal cliccando fuori
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Chiudi modal con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }
}

// Gestione degli effetti scroll
class ScrollEffects {
    constructor() {
        this.header = document.querySelector('header');
        this.init();
    }

    init() {
        this.bindScrollEvents();
    }

    bindScrollEvents() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Effetto parallax leggero per l'header
            if (currentScrollY > 50) {
                this.header.style.boxShadow = 'var(--shadow)';
                this.header.style.backgroundColor = 'var(--surface-color)';
            } else {
                this.header.style.boxShadow = 'none';
                this.header.style.backgroundColor = 'var(--surface-color)';
            }
            
            // Aggiorna l'ultimo valore dello scroll
            lastScrollY = currentScrollY;
        });
    }
}

// Gestione delle animazioni di entrata
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        // Intersection Observer per animazioni on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, this.observerOptions);

        // Osserva tutti gli elementi con animazioni
        document.querySelectorAll('.recipe-card, .intro').forEach(el => {
            observer.observe(el);
        });
    }
}

// Utilità varie
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Smooth scroll per eventuali link interni
    static smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Inizializzazione dell'applicazione
class RecipeApp {
    constructor() {
        this.init();
    }

    init() {
        // Attendi che il DOM sia completamente caricato
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Inizializza tutti i componenti
        new ThemeManager();
        new RecipeModal();
        new ScrollEffects();
        new AnimationManager();

        // Aggiungi eventi globali
        this.addGlobalEvents();
        
        console.log('🍽️ Ricettario Fit caricato con successo!');
    }

    addGlobalEvents() {
        // Gestione responsive del resize
        const handleResize = Utils.debounce(() => {
            // Eventuali aggiustamenti per il resize
            console.log('Window resized');
        }, 250);

        window.addEventListener('resize', handleResize);

        // Prevenzione del comportamento di default per alcuni elementi
        document.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        });
    }
}

// Avvia l'applicazione
new RecipeApp();