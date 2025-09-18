// Authentication logic
class AuthManager {
    constructor() {
        this.auth = window.firebaseAuth;
        this.isLoading = false;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
            this.setupFormHandlers();
        });

        // If DOM is already loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupFormHandlers();
            });
        } else {
            this.setupFormHandlers();
        }
    }

    setupFormHandlers() {
        const loginForm = document.getElementById('loginForm');
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');
        const signupLink = document.getElementById('signupLink');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => this.handleForgotPassword(e));
        }

        if (signupLink) {
            signupLink.addEventListener('click', (e) => this.handleSignupRedirect(e));
        }

        // Real-time validation
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        if (emailInput) {
            emailInput.addEventListener('blur', () => this.validateEmail());
            emailInput.addEventListener('input', () => this.clearError('email'));
        }

        if (passwordInput) {
            passwordInput.addEventListener('blur', () => this.validatePassword());
            passwordInput.addEventListener('input', () => this.clearError('password'));
        }
    }

    async handleLogin(event) {
        event.preventDefault();

        if (this.isLoading) return;

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Validate inputs
        if (!this.validateForm(email, password)) {
            return;
        }

        try {
            this.setLoadingState(true);
            this.clearAllErrors();

            // Set persistence based on "Remember Me" checkbox
            if (rememberMe) {
                await this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            } else {
                await this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
            }

            // Sign in user
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            console.log('Login successful:', user.email);
            this.showSuccess('Login successful! Redirecting...');

            // Simulate redirect delay for better UX
            setTimeout(() => {
                // Redirect to dashboard or home page
                // Replace with your actual dashboard URL
                window.location.href = 'dashboard.html';
            }, 1500);

        } catch (error) {
            console.error('Login error:', error);
            this.handleAuthError(error);
        } finally {
            this.setLoadingState(false);
        }
    }

    async handleForgotPassword(event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();

        if (!email) {
            this.showError('email', 'Please enter your email address first');
            document.getElementById('email').focus();
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError('email', 'Please enter a valid email address');
            return;
        }

        try {
            await this.auth.sendPasswordResetEmail(email);
            this.showSuccess('Password reset email sent! Check your inbox.');
        } catch (error) {
            console.error('Password reset error:', error);
            if (error.code === 'auth/user-not-found') {
                this.showError('email', 'No account found with this email address');
            } else {
                this.showError('login', 'Error sending password reset email. Please try again.');
            }
        }
    }

    handleSignupRedirect(event) {
        event.preventDefault();
        // Redirect to signup page
        // Replace with your actual signup URL
        window.location.href = 'signup.html';
    }

    validateForm(email, password) {
        let isValid = true;

        if (!email) {
            this.showError('email', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(email)) {
            this.showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!password) {
            this.showError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            this.showError('password', 'Password must be at least 6 characters');
            isValid = false;
        }

        return isValid;
    }

    validateEmail() {
        const email = document.getElementById('email').value.trim();
        if (email && !this.isValidEmail(email)) {
            this.showError('email', 'Please enter a valid email address');
            return false;
        }
        return true;
    }

    validatePassword() {
        const password = document.getElementById('password').value;
        if (password && password.length < 6) {
            this.showError('password', 'Password must be at least 6 characters');
            return false;
        }
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(field, message) {
        const errorElement = document.getElementById(field === 'login' ? 'loginError' : `${field}Error`);
        const inputElement = document.getElementById(field);

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }

        if (inputElement && field !== 'login') {
            inputElement.parentElement.classList.add('error');
        }
    }

    clearError(field) {
        const errorElement = document.getElementById(field === 'login' ? 'loginError' : `${field}Error`);
        const inputElement = document.getElementById(field);

        if (errorElement) {
            errorElement.classList.remove('show');
        }

        if (inputElement && field !== 'login') {
            inputElement.parentElement.classList.remove('error');
        }
    }

    clearAllErrors() {
        ['email', 'password', 'login'].forEach(field => {
            this.clearError(field);
        });
        
        // Hide success message
        const successElement = document.getElementById('loginSuccess');
        if (successElement) {
            successElement.classList.remove('show');
        }
    }

    showSuccess(message) {
        const successElement = document.getElementById('loginSuccess');
        if (successElement) {
            successElement.textContent = message;
            successElement.classList.add('show');
        }
    }

    setLoadingState(loading) {
        this.isLoading = loading;
        const loginBtn = document.getElementById('loginBtn');
        const form = document.getElementById('loginForm');

        if (loginBtn) {
            if (loading) {
                loginBtn.classList.add('loading');
                loginBtn.disabled = true;
            } else {
                loginBtn.classList.remove('loading');
                loginBtn.disabled = false;
            }
        }

        // Disable form inputs during loading
        if (form) {
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.disabled = loading;
            });
        }
    }

    handleAuthError(error) {
        let errorMessage = 'An error occurred during login. Please try again.';

        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email address.';
                this.showError('email', errorMessage);
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password. Please try again.';
                this.showError('password', errorMessage);
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address format.';
                this.showError('email', errorMessage);
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled.';
                this.showError('login', errorMessage);
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many failed attempts. Please try again later.';
                this.showError('login', errorMessage);
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your connection and try again.';
                this.showError('login', errorMessage);
                break;
            default:
                this.showError('login', errorMessage);
                break;
        }
    }
}

// Initialize the authentication manager
const authManager = new AuthManager();