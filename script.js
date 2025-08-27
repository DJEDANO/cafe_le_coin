// Données du menu
const menuData = {
    chaud: [
        { name: "Espresso", description: "Café intense et corsé", price: "500 fcfa" },
        { name: "Cappuccino", description: "Espresso, lait chauffé et mousse de lait", price: "750 fcfa" },
        { name: "Latte", description: "Plus de lait, moins de café", price: "1000 fcfa" },
        { name: "Thé Vert", description: "Thé vert de qualité supérieure", price: "750 fcfa" }
    ],
    froid: [
        { name: "Iced Coffee", description: "Café froid avec glaçons", price: "1000 fcfa" },
        { name: "Smoothie aux Fruits", description: "Mélange de fruits frais", price: "1250 fcfa" },
        { name: "Limonade Maison", description: "Faite maison avec des citrons frais", price: "1500 fcfa" }
    ],
    patisserie: [
        { name: "Croissant", description: "Croissant beurré traditionnel", price: "800 fcfa" },
        { name: "Muffin Myrtille", description: "Muffin moelleux aux myrtilles", price: "1500 fcfa" },
        { name: "Tarte au Citron", description: "Tarte citronnée sur fond sablé", price: "800 fcfa" },
        { name: "Cookie Chocolat", description: "Cookie aux pépites de chocolat", price: "1500 fcfa" }
    ]
};

// Chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des fonctionnalités
    initNavigation();
    initMenu();
    initAboutSection();
    initContactForm();
    initThemeToggle();
    
    // Charger les éléments du menu par défaut
    loadMenuItems('chaud');
});

// Navigation responsive
function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Basculer la navigation
        nav.classList.toggle('active');
        
        // Animation des liens
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Animation du burger
        burger.classList.toggle('toggle');
    });
}

// Gestion du menu
function initMenu() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            // Charger les éléments de la catégorie sélectionnée
            const category = button.getAttribute('data-category');
            loadMenuItems(category);
        });
    });
    
    // Redirection vers la section menu depuis le bouton hero
    const heroBtn = document.getElementById('hero-btn');
    heroBtn.addEventListener('click', () => {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    });
}

// Chargement des éléments du menu
function loadMenuItems(category) {
    const menuItemsContainer = document.querySelector('.menu-items');
    const items = menuData[category];
    
    // Vider le conteneur
    menuItemsContainer.innerHTML = '';
    
    // Ajouter chaque élément du menu
    items.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        menuItemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">${item.price}</span>
        `;
        menuItemsContainer.appendChild(menuItemElement);
    });
}

// Section À propos
function initAboutSection() {
    const toggleButton = document.getElementById('toggle-history');
    const historyText = document.getElementById('history-text');
    
    toggleButton.addEventListener('click', () => {
        // Basculer la visibilité du texte
        historyText.classList.toggle('hidden');
        
        // Changer le texte du bouton
        if (historyText.classList.contains('hidden')) {
            toggleButton.textContent = 'Notre histoire';
        } else {
            toggleButton.textContent = 'Cacher l\'histoire';
        }
    });
}

// Formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simulation d'envoi (normalement, vous auriez ici un appel AJAX)
        setTimeout(() => {
            // Afficher un message de succès
            formMessage.textContent = `Merci ${name} ! Votre message a été envoyé.`;
            formMessage.classList.remove('hidden', 'error');
            formMessage.classList.add('success');
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Cacher le message après 5 secondes
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        }, 1000);
    });
}

// Basculer entre les thèmes clair/sombre
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Vérifier le thème système ou le thème sauvegardé
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Thème clair';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = 'Thème sombre';
    }
    
    // Gérer le clic sur le bouton de changement de thème
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = 'Thème clair';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = 'Thème sombre';
        }
    });
}

// Ajout d'une animation CSS pour les liens de navigation
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .toggle .line2 {
        opacity: 0;
    }
    
    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);