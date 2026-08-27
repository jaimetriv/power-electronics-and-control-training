document.addEventListener('DOMContentLoaded', () => {

    // Restore and auto-save all result inputs and textareas
    document.querySelectorAll('.result-input, .result-textarea').forEach(el => {
        const saved = localStorage.getItem(el.id);
        if (saved !== null) el.value = saved;
        el.addEventListener('input', () => localStorage.setItem(el.id, el.value));
    });

    // Export button: collect all inputs on the page and download as JSON
    document.querySelectorAll('.result-export-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const labId = btn.dataset.lab;
            const data = {};
            document.querySelectorAll('.result-input, .result-textarea').forEach(el => {
                if (el.id.startsWith(labId)) data[el.id] = el.value;
            });
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = labId + '_results.json';
            a.click();
        });
    });

    // Clear button: remove all saved values for this lab
    document.querySelectorAll('.result-clear-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!confirm('Clear all saved results for this lab?')) return;
            const labId = btn.dataset.lab;
            document.querySelectorAll('.result-input, .result-textarea').forEach(el => {
                if (el.id.startsWith(labId)) {
                    localStorage.removeItem(el.id);
                    el.value = '';
                }
            });
        });
    });

});
