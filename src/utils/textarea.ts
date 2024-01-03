export function resizeTextarea(textarea) {
    textarea.style.height = 0;
    textarea.style.height = textarea.scrollHeight + 'px';
}