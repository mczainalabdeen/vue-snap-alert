const SnapAlert = {
    install(app) {
        // Default options
        const defaultOptions = {
            rtl: false,
            type: 'info',
            title: 'Default Title',
            message: 'This is a default message',
            icon : null ,
            customIcon : null ,

            confirmText: 'OK',
            enableConfirm : false ,
            onConfirm: function() {},

            cancelText: 'Cancel',
            enableCancel: false ,
            onCancel: function() {},

            onConfirm: () => {},
            onCancel: () => {},
            enableCloseHandler: false,
            onClose: () => {},
            clickToClose: false,
            autoClose: true,
            duration: 3000,
            preogressBar: true,
            isDark: false,
            position: 'top left',
            animation : 'slide',
            html : ``,
        };

        const icons = {
            success: "bx-check",
            warning: "bx-bell",
            error: "bx-error",
            info: "bx-info-circle",
        };

        const positions = {
            "top center": "snapAlert-top-center",
            "bottom center": "snapAlert-bottom-center",
            "top left": "snapAlert-top-left",
            "top right": "snapAlert-top-right",
            "bottom left": "snapAlert-bottom-left",
            "bottom right": "snapAlert-bottom-right",
        };

        let setOptions = {};

        // Function to set global options
        function setGlobalOptions(options) {
            setOptions = Object.assign({}, setOptions, options);
        }

        // Function to create alerts
        const createAlert = (type = null, title = null, message = null, options = {}) => {
            const settings = Object.assign({}, defaultOptions, setOptions, options);
            if (type && type != "html") {
                settings.type = type;
            }else if(type == "html"){
                settings.type = type;
                settings.code = title;
            }
            settings.title = title;
            settings.message = message;

            let notClosed = true;

            // Create container if it doesn't exist
            let container = document.querySelector('.snapAlert-container.' + positions[settings.position] + '.snapAlert-animation-'+settings.animation);
            if (!container) {
                const alertDiv = document.createElement('div');
                alertDiv.classList.add('snapAlert-container', positions[settings.position] , 'snapAlert-animation-'+settings.animation);
                document.body.appendChild(alertDiv);
                container = alertDiv;
            }

            const modal = document.createElement('div');
            settings.type != 'html' && (modal.innerHTML = `
                <div class="${settings.rtl ? 'snapAlert-rtl' : ''} snapAlert-item snapAlert-${settings.type} ${settings.clickToClose ? 'snapAlert-clickable' : ''} ${settings.isDark ? 'snapAlert-dark' : ''} ${ !settings.preogressBar ? "progress-hide" : '' }">
                    <div class="snapAlert-main">
                        <div class="snapAlert-icon">${ settings.customIcon ? settings.customIcon : '<i class="bx '+ (settings.icon ?? icons[settings.type])+'"></i>' }</div>
                        <div>
                            <div class="snapAlert-title">${settings.title}</div>
                            <div class="snapAlert-message">${settings.message}</div>
                            <div class="snapAlert-actions">
                            ${ settings.enableConfirm ? '<button class="snapAlert-action snapAlert-action-confirm" snap-alert-confirm >'+ settings.confirmText+'</button>' : ''}
                            ${ settings.enableCancel ?'<button class="snapAlert-action snapAlert-action-cancel" snap-alert-cancel >'+ settings.cancelText+'</button>' : ''}
                            </div>
                        </div>
                        ${settings.preogressBar ? "<div style='--snapAlert-progress-duration:"+settings.duration/1000+"s' class='snapAlert-progress-bar'></div>" : '' }
                        <button class="snapAlert-close" snap-alert-close ><i class='bx bx-x'></i></button>
                    </div>
                </div>
            `);

            settings.type == 'html' && ( modal.innerHTML = `
                <div class="${settings.rtl && 'snapAlert-rtl'} snapAlert-html snapAlert-item snapAlert-${settings.type} ${settings.clickToClose && 'snapAlert-clickable'}">
                    ${settings.code}
                </div>
            `);

            const modalContent = modal.querySelector('.snapAlert-item');
            container.appendChild(modal);

            setTimeout(() => {
                modalContent.classList.add('snapAlert-'+settings.animation+'-in');
            }, 10);

            if (settings.autoClose) {
                setTimeout(() => {
                    closeAndRemove();
                }, settings.duration);
            }

            // Close and remove alert
            function closeAndRemove($is_actions = false) {
                modalContent.classList.remove('snapAlert-'+settings.animation+'-in');
                modalContent.classList.add('snapAlert-'+settings.animation+'-out');
                setTimeout(() => {
                    modal.remove();
                    if (!document.querySelectorAll('.snapAlert-container.' + positions[settings.position] + ' > div').length) {
                        container.remove();
                    }
                }, settings.animation == 'slide' ? 55 : 100);

                if (settings.enableCloseHandler && notClosed && $is_actions == false) {
                    setTimeout(() => {
                        notClosed = false;
                        settings.onClose();
                    }, 50);
                }
            }

            // Event listeners
            modal.querySelector('[snap-alert-confirm]')?.addEventListener('click', () => {
                settings.onConfirm();
                closeAndRemove();
            });

            modal.querySelector('[snap-alert-cancel]')?.addEventListener('click', () => {
                settings.onCancel();
                closeAndRemove();
            });

            modal.querySelector('[snap-alert-close]')?.addEventListener('click', () => {
                closeAndRemove();
            });

            modal.querySelector('.snapAlert-clickable')?.addEventListener('click', () => {
                closeAndRemove();
            });
        };

        function clearAll() {
            const allAlerts = document.querySelectorAll('.snapAlert-container > div');
            allAlerts.forEach((alert , key) => {

                setTimeout(() => {
                    alert.classList.remove('snapAlert-'+settings.animation+'-in');
                    alert.classList.add('snapAlert-'+settings.animation+'-out');
                }, (key*20));
                setTimeout(() => {
                    alert.remove();
                }, 300+(key*20));
            });

            const allContainers = document.querySelectorAll('.snapAlert-container');
            allContainers.forEach((container , key) => {
                setTimeout(() => {
                    if (!container.hasChildNodes()) {
                        container.remove();
                    }
                }, 2000);
            });
        }

        const nsAlert = {
            success: (title, message, options) => createAlert('success', title, message, options),
            error: (title, message, options) => createAlert('error', title, message, options),
            warning: (title, message, options) => createAlert('warning', title, message, options),
            info: (title, message, options) => createAlert('info', title, message, options),
            alert: (title, message, options) => createAlert('alert', title, message, options),
            html: (title , options) => createAlert('html', title , null , options ),
            SnapOptions : (options) => setGlobalOptions(options),
            clearAll : () => clearAll(),
        };

        // Expose the plugin methods to the app instance
        app.config.globalProperties.$SnapAlert = nsAlert;
    },
};

export default SnapAlert;