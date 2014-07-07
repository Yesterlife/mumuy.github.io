/* v1.0 */
(function($) {
    $.fn.modalDialog = function(parameter,getApi) {
        if(typeof parameter == 'function'){ //重载
            getApi = parameter;
            parameter = {};
        }else{
            parameter = parameter || {};
            getApi = getApi||function(){};
        }
        var defaults = {
            content:"",
            title:"",            
            opacity: 0.5,
            autoOpen:false,
            isModel:true,
            buttons:{},
            beforeOpen:function(){}
        };
        var options = $.extend({}, defaults, parameter);
        var $window = $(window);
        var $body = $("body");
        var isIE6 = navigator.appVersion.indexOf("MSIE 6") > -1; //IE6
        return this.each(function() {
            //全局变量
            var $this = $(this);
            var $children = options.content?$(options.content):$this.children(); //内容区域
            var $overlay = $(".md-overlay");
            var $close = $("<div class='md-close'>x</div>");
            var $title = $("<div class='md-title'>"+options.title+"</div>");
            var $content = $("<div class='md-content'></div>").append($children);
            var $buttons = $("<div class='md-buttons'></div>");
            var _api = {};  //对外接口
            var _position = isIE6?'absolute':'fixed';
            var _isOpen = false; //是否是打开状态
            //结构修改
            $body.css('height','100%');
            if(options.isModel && $overlay.length==0){
                $overlay = $("<div class='md-overlay'></div>").css({
                    'position': _position,
                    'z-index': '998',
                    'top': '0px',
                    'left': '0px',
                    'height': '100%',
                    'width': '100%',
                    'background': '#000',
                    'display': 'none'
                }).appendTo($body);                
            }
            $this.css({
                'display':'none',
                'position':_position,
                'z-index': '999'
            }).append($close).append($title).append($content).append($buttons);
            for(name in options.buttons){
                $("<button type='button'>"+name+"</button>").appendTo($buttons).click(options.buttons[name]);
            }
            //对话框开启
            _api.open = function(fun){
                if(options.beforeOpen()!=false){
                    (fun || function(){})(); //如果open的时候传入了方法，则在执行时进行预处理
                    if(options.isModel){
                        $overlay.css({
                            'display': 'block',
                            'opacity': 0
                        }).stop().fadeTo(200,options.opacity);                    
                    }
                    $this.css("opacity",0).fadeTo(200, 1);
                    _api.resize();
                    _isOpen = true;
                }
            };
            //对话框关闭
            _api.close = function(){
                if(options.isModel){
                     $overlay.stop().fadeOut(200);
                }
                $this.hide();
                _isOpen = false;
            };
            //对话框形状自动调整
            _api.resize = function(){
                $this.css({
                    "left": ($window.width()-$this.outerWidth())/2 + "px",
                    "top": ($window.height()-$this.outerHeight())/2 + "px"
                });    
            };
            //设置文本内容
            _api.setContent = function(html){
                $content.html(html);
            };
            //获取按键对象
            _api.getButtons = function(){
                return $buttons;
            };
            _api.isOpen = function(){
                return _isOpen;
            };
            //事件绑定
            if(options.autoOpen){
                _api.open();
            }
            $close.click(_api.close);
            $overlay.click(_api.close);
            $window.resize(_api.resize);
            getApi(_api);
        });
    }
})(jQuery);