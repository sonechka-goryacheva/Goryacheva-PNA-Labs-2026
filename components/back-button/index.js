export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }
    
    getHTML() {
        return `
            <button id="back-button" class="back-button">
                ← На главную
            </button>
        `;
    }
    
    addListeners(listener) {
        const button = document.getElementById("back-button");
        if (button) {
            button.addEventListener("click", listener);
        }
    }
    
    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}