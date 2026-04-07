export const openContextMenu = (contextMenuButton, contextMenu) => {
    contextMenu.classList.add('active');

    contextMenu.addEventListener('mouseleave', function (evt) {
        contextMenu.classList.remove('active');
    });

    document.addEventListener('touchstart', function (evt) {
        if (!evt.target.closest('.context__menu')) {
            contextMenu.classList.remove('active');
        }
    });
};