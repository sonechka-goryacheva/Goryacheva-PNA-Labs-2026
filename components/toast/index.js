export class ToastComponent {
    constructor() {
        this.container = document.querySelector('.toast-container');
    }
    
    show(message, title = "Уведомление") {
        const toastId = `toast-${Date.now()}`;
        
        const html = `
            <div id="${toastId}" class="toast toast-custom" role="alert" data-bs-autohide="true" data-bs-delay="3000">
                <div class="toast-header">
                    <strong class="me-auto">Авиаперевозки грузов</strong>
                    <small>только что</small>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    <strong>${title}</strong><br>
                    ${message}
                </div>
            </div>
        `;
        
        this.container.insertAdjacentHTML('beforeend', html);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
        
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
}