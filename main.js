elements = {
    faqAnswer: document.querySelectorAll('.faq-answer'),
    faqAllBtn: document.querySelectorAll('.faq-img-btn, .faq-btn'),
}

state = {
    activeButton: null,
    activeGroupId: null
}


function handleButtonClick(clickedButton) {
    const answerId = clickedButton.getAttribute('aria-controls');
    const answerElement = document.getElementById(answerId);
    const isImgButton = clickedButton.classList.contains('faq-img-btn');
    
    if (state.activeGroupId === answerId) {
        if (state.activeButton) {
            state.activeButton.setAttribute('aria-expanded', 'false');
            state.activeButton.setAttribute('aria-pressed', 'false');
            state.activeButton.classList.remove('active');
        }
        
        answerElement?.setAttribute('hidden', '');
        toggleIcons(answerId, 'inactive');
        
        state.activeGroupId = null;
        state.activeButton = null;
        return;
    }
    
    if (state.activeGroupId) {
        if (state.activeButton) {
            state.activeButton.setAttribute('aria-expanded', 'false');
            state.activeButton.setAttribute('aria-pressed', 'false');
            state.activeButton.classList.remove('active');
        }
        
        const oldAnswer = document.getElementById(state.activeGroupId);
        oldAnswer?.setAttribute('hidden', '');
        toggleIcons(state.activeGroupId, 'inactive');
    }
    
    clickedButton.setAttribute('aria-expanded', 'true');
    clickedButton.setAttribute('aria-pressed', 'true');
    
    answerElement?.removeAttribute('hidden');
    toggleIcons(answerId, 'active');

    state.activeGroupId = answerId;
    state.activeButton = clickedButton;
}

function toggleIcons(answerId, forceState) {
    const relatedButtons = document.querySelectorAll(`[aria-controls="${answerId}"].faq-img-btn`);
    
    relatedButtons.forEach(button => {
        const img = button.querySelector('img');
        if (!img) return;
    
        if (forceState === 'active') {
            button.classList.add('active');
            img.src = 'assets/images/icon-minus.svg';
            img.alt = 'Close answer';
        } else {
            button.classList.remove('active');
            img.src = 'assets/images/icon-plus.svg';
            img.alt = 'Open answer';
        }
        });
}


function initEventListener() {
    elements.faqAllBtn.forEach(btn => {
        btn.addEventListener('click', () => handleButtonClick(btn));
    });
}

document.addEventListener('DOMContentLoaded', initEventListener);