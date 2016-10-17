window.BaiduUpload = (function($, WebUploader) {
    function BaiduUpload(options, setting) {
        this.handler = null;
        this.uploader = options.uploader || null;
        this.setting = {};

        var config = {
            // swf文件路径
            swf: './js/Uploader.swf',
            // 文件接收服务端。
            server: '',
            // 选择文件的按钮
            pick: '',
            // 设置为 true 后，不需要手动调用上传，有文件选择即开始上传
            auto: true,
            // 是否要分片处理大文件上传
            chunked: false,
            // 如果要分片，分多大一片？ 默认大小为5M
            chunkSize: 5242880,
            // 如果某个分片由于网络问题出错，允许自动重传多少次
            chunkRetry: 2,
            // 上传并发数。允许同时最大上传进程数
            threads: 1,
            // 验证单个文件大小是否超出限制, 超出则不允许加入队列
            fileSingleSizeLimit: 1024*1024*5,
            // 指定接受哪些类型的文件。 由于目前还有ext转mimeType表，所以这里需要分开指定
            accept: {
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }

        };

        config = $.extend(config, options);

        this.setting = $.extend({
            fileQueued: function(that, file) {
                var $uploader = $(that.uploader);
                var $statusBar = $uploader.find(".statusBar");
                $statusBar.html('<div class="progress"><span class="text"></span><span class="percentage"></span></div>');
            }
        }, setting);

        this.handler = WebUploader.create(config);
    }


    // 文件加入上传队列
    BaiduUpload.prototype.fileQueued = function(callback) {
        var that = this;
        this.handler.on( 'fileQueued', function(file) {
            that.setting.fileQueued(that, file);
        });
    };

    // 文件验证不通过
    BaiduUpload.prototype.error = function() {
        this.handler.on('error', function(type) {
            switch (type) {
                case "F_EXCEED_SIZE":
                    alert('文件大小超过限制');
                    break;
                case "Q_TYPE_DENIED":
                    alert("文件格式不支持");
                    break;
                default:
                    console.warn(type);
                    alert("未知错误");
            }
        });
    };

    // 文件上传过程中创建进度条实时显示
    BaiduUpload.prototype.uploadProgress = function(callback) {
        var that = this;
        this.handler.on( 'uploadProgress', function( file, percentage ) {
            if ($.isFunction(callback)) {
                callback(file, percentage);
                return true;
            }

            var $uploader = $(that.uploader),
                $percent = $uploader.find('.progress .percentage'),
                $info = $uploader.find('.progress .text');

            var percent = parseInt(percentage * 100);
            $info.html(percent + '%');
            $percent.css( 'width', percent + '%' );
        });
    };

    // 文件上传完成
    BaiduUpload.prototype.uploadComplete = function(callback) {
        var that = this;
        this.handler.on( 'uploadComplete', function( file ) {
            if ($.isFunction(callback)) {
                callback(file);
                return true;
            }

            var $uploader = $(that.uploader);
            var $statusBar = $uploader.find(".statusBar");
            setTimeout(function() {
                $statusBar.html("");
                that.handler.reset();
            }, 800);
        });
    };

    // 文件上传成功
    BaiduUpload.prototype.uploadSuccess = function(callback) {
        this.handler.on('uploadSuccess', function (file, response) {
            console.log(file);
            console.log(response);
            if ($.isFunction(callback)) {
                callback(file, response);
                return true;
            }
        });
    };

    // 文件上传失败
    BaiduUpload.prototype.uploadError = function (callback) {
        this.handler.on('uploadError', function (file, reason) {
            if ($.isFunction(callback)) {
                callback(file, reason);
                return true;
            }
            alert('上传失败，请联系客服并提交错误代码:' + reason);
        });
    };

    BaiduUpload.prototype.upload = function (successCallback, errorCallback) {
        // 文件加入上传队列
        this.fileQueued();
        // 文件验证不通过
        this.error();
        // 文件上传过程中创建进度条实时显示
        this.uploadProgress();
        // 文件上传完成
        this.uploadComplete();
        // 文件上传成功
        this.uploadSuccess(successCallback);
        // 文件上传失败
        this.uploadError(errorCallback);
    };

    return BaiduUpload;
})(jQuery, WebUploader);