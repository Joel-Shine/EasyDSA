// Handle Sidebar Navigation
const navNodes = document.querySelectorAll('.atomic-node');
const contentSections = document.querySelectorAll('.content-section');
const explanationBox = document.getElementById('explanation-content');
const sidebar = document.getElementById('sidebar');

navNodes.forEach(node => {
    node.addEventListener('click', (e) => {
        // 1. Update Active State in Sidebar
        navNodes.forEach(n => n.classList.remove('active'));
        e.target.classList.add('active');

        // 2. Hide all sections, show the targeted one
        const targetId = e.target.getAttribute('data-target');
        contentSections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');

        // 3. Reset the explanation pane when switching topics
        explanationBox.style.opacity = 0;
        setTimeout(() => {
            explanationBox.innerHTML = '<span class="placeholder-text">Click the ➔ arrow on any line to reveal the underlying logic here.</span>';
            explanationBox.style.opacity = 1;
        }, 150);

        // 4. Auto-close sidebar on mobile after making a selection
        if (window.innerWidth <= 900) {
            sidebar.classList.remove('sidebar-open');
        }
    });
});

// Handle Dynamic Explanation Loading (Relies on database.js)
function showExplanation(id) {
    if (typeof explanations !== 'undefined' && explanations[id]) {
        explanationBox.style.opacity = 0; 
        
        setTimeout(() => {
            explanationBox.innerHTML = explanations[id];
            explanationBox.style.opacity = 1; 
        }, 150);
        
        // Auto-scroll down to the right pane on mobile devices when clicked
        if (window.innerWidth <= 900) {
            document.querySelector('.right-pane').scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Handle Mobile Nav Toggle
const mobileBtn = document.getElementById('mobile-nav-btn');
if(mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-open');
    });
}