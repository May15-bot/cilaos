/**
 * Module Modal - Gestion centralisée de tous les modals
 * Supporte plusieurs types de modals : login, info, confirmation, etc.
 */

export default class Modal {
    constructor(options = {}) {
        this.config = {
            modalSelector: '.modal',
            overlaySelector: '.modal-overlay',
            closeSelector: '.modal-close, .close-x',
            submitSelector: '.modal-submit',
            bodyNoScrollClass: 'no-scroll',
            activeClass: 'active',
            animationDuration: 300,
            ...options
        };

        // État et stockage des modals
        this.modals = new Map();
        this.activeModal = null;
        
        this.init();
    }

    /**
     * Initialisation du module
     */
    init() {
        // Enregistrer tous les modals existants
        this.registerExistingModals();
        
        // Configuration des événements globaux
        this.setupGlobalEventListeners();
        
        console.log('✅ Module Modal initialisé');
    }

    /**
     * Enregistrer tous les modals présents dans le DOM
     */
    registerExistingModals() {
        const modalElements = document.querySelectorAll(this.config.modalSelector);
        
        modalElements.forEach(modal => {
            const modalId = modal.id || `modal-${this.modals.size}`;
            this.registerModal(modalId, modal);
        });
    }

    /**
     * Enregistrer un modal individuel
     */
    registerModal(id, element) {
        if (!element) {
            console.warn(`Modal: Élément non trouvé pour l'ID ${id}`);
            return;
        }

        const modalConfig = {
            id: id,
            element: element,
            overlay: document.querySelector(`${this.config.overlaySelector}[data-modal="${id}"]`) || 
                     document.querySelector(this.config.overlaySelector),
            closeButtons: element.querySelectorAll(this.config.closeSelector),
            submitButton: element.querySelector(this.config.submitSelector),
            form: element.querySelector('form'),
            onOpen: null,
            onClose: null,
            onSubmit: null
        };

        // Configuration spécifique pour le modal de login
        if (id === 'loginModal') {
            this.setupLoginModal(modalConfig);
        }

        this.modals.set(id, modalConfig);
        this.setupModalEventListeners(modalConfig);
    }

    /**
     * Configuration spécifique du modal de login
     */
    setupLoginModal(modalConfig) {
        modalConfig.onSubmit = (formData) => {
            // Logique de connexion centralisée
            const { email, password, remember } = formData;
            
            // Validation simple (peut être étendue)
            const isValidUser = email === 'mayza' || email === 'mayza@cilaos.re';
            const isValidPassword = password === 'admin';
            
            if (isValidUser && isValidPassword) {
                // Gestion de la session
                sessionStorage.setItem('cilaos_session', 'true');
                
                if (remember) {
                    localStorage.setItem('cilaos_auth', 'true');
                }
                
                // Redirection vers le dashboard si on est sur une page publique
                if (window.location.pathname.includes('dashboard')) {
                    console.log('Déjà sur le dashboard');
                } else {
                    window.location.href = './dashboard/admin-dashboard.html';
                }
                
                return { success: true };
            } else {
                // Affichage de l'erreur
                this.showError(modalConfig.element, 'Identifiants invalides. Utilisez: mayza / admin');
                return { success: false };
            }
        };

        // Vérification de session existante au chargement
        if (localStorage.getItem('cilaos_auth') === 'true') {
            // Auto-connexion si "Se souvenir de moi" était coché
            if (!window.location.pathname.includes('dashboard')) {
                console.log('Session mémorisée, redirection...');
                // Optionnel: redirection automatique
                // window.location.href = './dashboard/admin-dashboard.html';
            }
        }
    }

    /**
     * Configuration des événements pour un modal
     */
    setupModalEventListeners(modalConfig) {
        const { element, overlay, closeButtons, submitButton, form } = modalConfig;

        // Événements de fermeture
        if (overlay) {
            overlay.addEventListener('click', () => this.close(modalConfig.id));
        }

        closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.close(modalConfig.id);
            });
        });

        // Événement de soumission
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(modalConfig.id);
            });
        }

        if (submitButton && !form) {
            submitButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSubmit(modalConfig.id);
            });
        }
    }

    /**
     * Configuration des événements globaux
     */
    setupGlobalEventListeners() {
        // Touche Échap pour fermer le modal actif
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.close(this.activeModal);
            }
        });

        // Gestion des boutons d'ouverture avec data-modal
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-modal-trigger]');
            if (trigger) {
                e.preventDefault();
                const modalId = trigger.dataset.modalTrigger;
                this.open(modalId);
            }
        });

        // Gestion spécifique du bouton PRO
        const btnPro = document.querySelector('.btn-pro');
        if (btnPro) {
            btnPro.addEventListener('click', (e) => {
                e.preventDefault();
                this.open('loginModal');
            });
        }
    }

    /**
     * Ouvrir un modal
     */
    open(modalId, options = {}) {
        const modal = this.modals.get(modalId);
        
        if (!modal) {
            console.warn(`Modal: Modal ${modalId} non trouvé`);
            return;
        }

        // Fermer tout modal déjà ouvert
        if (this.activeModal) {
            this.close(this.activeModal, false);
        }

        const { element, overlay } = modal;

        // Appeler le callback onOpen s'il existe
        if (modal.onOpen) {
            modal.onOpen(options);
        }

        // Afficher le modal et l'overlay
        if (overlay) {
            overlay.classList.add(this.config.activeClass);
            overlay.setAttribute('aria-hidden', 'false');
        }
        
        element.classList.add(this.config.activeClass);
        element.setAttribute('aria-hidden', 'false');
        
        // Bloquer le scroll du body
        document.body.classList.add(this.config.bodyNoScrollClass);
        
        // Gérer le focus
        setTimeout(() => {
            const firstInput = element.querySelector('input, textarea, select');
            if (firstInput) {
                firstInput.focus();
            }
        }, 10);

        // Marquer comme actif
        this.activeModal = modalId;

        // Événement personnalisé
        this.dispatchEvent('modal:opened', { modalId });
        
        console.log(`Modal ${modalId} ouvert`);
    }

    /**
     * Fermer un modal
     */
    close(modalId = null, restoreScroll = true) {
        const id = modalId || this.activeModal;
        const modal = this.modals.get(id);
        
        if (!modal) return;

        const { element, overlay } = modal;

        // Appeler le callback onClose s'il existe
        if (modal.onClose) {
            modal.onClose();
        }

        // Masquer le modal et l'overlay
        element.classList.remove(this.config.activeClass);
        element.setAttribute('aria-hidden', 'true');
        
        if (overlay) {
            overlay.classList.remove(this.config.activeClass);
            overlay.setAttribute('aria-hidden', 'true');
        }

        // Restaurer le scroll du body
        if (restoreScroll) {
            document.body.classList.remove(this.config.bodyNoScrollClass);
        }

        // Nettoyer les erreurs
        this.clearErrors(element);

        // Réinitialiser le modal actif
        if (this.activeModal === id) {
            this.activeModal = null;
        }

        // Événement personnalisé
        this.dispatchEvent('modal:closed', { modalId: id });
        
        console.log(`Modal ${id} fermé`);
    }

    /**
     * Gérer la soumission d'un formulaire dans un modal
     */
    handleSubmit(modalId) {
        const modal = this.modals.get(modalId);
        if (!modal) return;

        const { form, element } = modal;
        
        // Collecter les données du formulaire
        const formData = {};
        if (form) {
            const data = new FormData(form);
            data.forEach((value, key) => {
                formData[key] = value;
            });
            
            // Gérer les checkboxes
            const checkboxes = form.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb => {
                formData[cb.name] = cb.checked;
            });
        }

        // Appeler le callback onSubmit s'il existe
        if (modal.onSubmit) {
            const result = modal.onSubmit(formData);
            
            if (result && result.success) {
                this.close(modalId);
                if (form) form.reset();
            }
        } else {
            // Comportement par défaut
            console.log('Données du formulaire:', formData);
            this.close(modalId);
            if (form) form.reset();
        }

        // Événement personnalisé
        this.dispatchEvent('modal:submitted', { modalId, formData });
    }

    /**
     * Afficher une erreur dans le modal
     */
    showError(modalElement, message) {
        // Nettoyer les erreurs précédentes
        this.clearErrors(modalElement);

        // Créer l'élément d'erreur
        const errorElement = document.createElement('div');
        errorElement.className = 'modal-error';
        errorElement.innerHTML = `
            <p class="error-message">${message}</p>
        `;

        // Insérer après le formulaire ou au début du body du modal
        const form = modalElement.querySelector('form');
        const insertTarget = form || modalElement.querySelector('.modal-body, .login-body');
        
        if (insertTarget) {
            insertTarget.appendChild(errorElement);
        }
    }

    /**
     * Nettoyer les erreurs
     */
    clearErrors(modalElement) {
        const errors = modalElement.querySelectorAll('.modal-error');
        errors.forEach(error => error.remove());
    }

    /**
     * Créer dynamiquement un modal
     */
    createModal(config) {
        const { 
            id, 
            title, 
            content, 
            type = 'default', 
            buttons = [],
            onOpen,
            onClose,
            onSubmit
        } = config;

        // Créer l'overlay s'il n'existe pas
        let overlay = document.querySelector(this.config.overlaySelector);
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.setAttribute('data-modal', id);
            overlay.setAttribute('aria-hidden', 'true');
            document.body.appendChild(overlay);
        }

        // Créer le modal
        const modal = document.createElement('div');
        modal.className = `modal modal-${type}`;
        modal.id = id;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', `${id}-title`);
        modal.setAttribute('aria-hidden', 'true');

        // Contenu du modal selon le type
        modal.innerHTML = this.getModalTemplate(type, { id, title, content, buttons });

        // Ajouter au DOM
        document.body.appendChild(modal);

        // Enregistrer le modal
        this.registerModal(id, modal);

        // Ajouter les callbacks
        const modalConfig = this.modals.get(id);
        if (modalConfig) {
            modalConfig.onOpen = onOpen;
            modalConfig.onClose = onClose;
            modalConfig.onSubmit = onSubmit;
        }

        return modal;
    }

    /**
     * Template de modal selon le type
     */
    getModalTemplate(type, data) {
        const { id, title, content, buttons } = data;

        const buttonsHtml = buttons.map(btn => `
            <button class="${btn.className || 'btn'}" 
                    data-action="${btn.action}" 
                    ${btn.type ? `type="${btn.type}"` : ''}>
                ${btn.text}
            </button>
        `).join('');

        switch (type) {
            case 'confirm':
                return `
                    <div class="modal-content">
                        <button class="modal-close close-x" aria-label="Fermer">×</button>
                        <div class="modal-header">
                            <h3 class="modal-title" id="${id}-title">${title}</h3>
                        </div>
                        <div class="modal-body">
                            <p>${content}</p>
                        </div>
                        <div class="modal-footer">
                            ${buttonsHtml}
                        </div>
                    </div>
                `;
                
            case 'info':
                return `
                    <div class="modal-content">
                        <button class="modal-close close-x" aria-label="Fermer">×</button>
                        <div class="modal-header">
                            <h3 class="modal-title" id="${id}-title">${title}</h3>
                        </div>
                        <div class="modal-body">
                            ${content}
                        </div>
                    </div>
                `;
                
            default:
                return `
                    <div class="modal-content">
                        <button class="modal-close close-x" aria-label="Fermer">×</button>
                        <div class="modal-header">
                            <h3 class="modal-title" id="${id}-title">${title}</h3>
                        </div>
                        <div class="modal-body">
                            ${content}
                        </div>
                        ${buttonsHtml ? `<div class="modal-footer">${buttonsHtml}</div>` : ''}
                    </div>
                `;
        }
    }

    /**
     * Dispatcher un événement personnalisé
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, {
            bubbles: true,
            detail: detail
        });
        document.dispatchEvent(event);
    }

    /**
     * Détruire le module
     */
    destroy() {
        // Fermer tous les modals
        this.modals.forEach((modal, id) => {
            this.close(id);
        });
        
        // Nettoyer
        this.modals.clear();
        this.activeModal = null;
        
        console.log('Module Modal détruit');
    }
}