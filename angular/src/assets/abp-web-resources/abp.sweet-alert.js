var abp = abp || {};
(function () {
    var showMessage = function (type, message, title, options) {

        options = options || {};
        options.titleText = title;
        options.icon = type;
        options.confirmButtonText = options.confirmButtonText || abp.localization.localize('Ok', 'MyTrainingV1231AngularDemo');

        if (options.isHtml) {
            options.html = message;
        } else {
            options.text = message;
        }

        const { isHtml, ...optionsSafe } = options;
        return Swal.fire(optionsSafe);
    };

    abp.message.info = function (message, title, options) {
        return showMessage('info', message, title, options);
    };

    abp.message.success = function (message, title, options) {
        return showMessage('success', message, title, options);
    };

    abp.message.warn = function (message, title, options) {
        return showMessage('warning', message, title, options);
    };

    abp.message.error = function (message, title, options) {
        return showMessage('error', message, title, options);
    };

    abp.message.confirm = function (message, title, callback, options) {
        options = options || {};
        options.title = title ? title : abp.localization.localize('AreYouSure', 'MyTrainingV1231AngularDemo');
        options.icon = 'warning';

        options.confirmButtonText = options.confirmButtonText || abp.localization.localize('Yes', 'MyTrainingV1231AngularDemo');
        options.cancelButtonText = options.cancelButtonText || abp.localization.localize('Cancel', 'MyTrainingV1231AngularDemo');
        options.showCancelButton = true;

        if (options.isHtml) {
            options.html = message;
        } else {
            options.text = message;
        }
        const { isHtml, ...optionsSafe } = options;
        return Swal.fire(optionsSafe).then(function(result) {
            callback && callback(result.value, result);
        });
    };
})();
