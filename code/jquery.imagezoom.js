/*
    ͼƬ���ž��� v1.2
    BY:le
*/
(function($) {
    $.fn.imagezoom = function(parameter) {
        parameter = parameter || {};
        var defaults = {
            width: null, //ͼƬ�����
            height: null, //ͼƬ�����
            resizeable: true, //���ڴ�С�ı�ʱ�Ƿ����µ���ͼƬλ��
            effect:'scale', //ͼƬ����
            condition: "img" //Ĭ��ɸѡ����
        };
        var options = $.extend({}, defaults, parameter);
        var $window = $(window);
        return this.each(function() {
            var $this = $(this);
            $this.css("overflow", "hidden");
            $this.find(options.condition).each(function() {
                var $img = $(this).css('display','block'); //��ֹ���text-align:center,ͼƬ���д�λ
                var _width = this.width;
                var _height = this.height;
                if(this.complete&&_width){ //��ֹͼƬδ����ʱ�Ϳ�ʼ����
                    zoom();
                }else{     
                    this.onload = function(){
                        _width = this.width;
                        _height = this.height;
                        zoom();
                    }  
                }
                //˽�з���
                function zoom(){
                    var obj = {};
                    var ratio = 1;
                    options.width = parameter.width||$this.width();
                    options.height = parameter.height||$this.height();
                    if(options.effect=='scale'){
                        //��ֵ����
                        if(_width>_height){
                            if(_height>options.height){
                                ratio = Math.max(options.width/_width,options.height/_height);
                            }
                        }else{
                            if(_width>options.width){
                                ratio = Math.max(options.width/_width,options.height/_height);
                            }
                        }
                        //��ʽ�޸�
                        obj = {
                            'width':Math.ceil(_width*ratio),
                            'height':Math.ceil(_height*ratio),
                            'margin-left':Math.ceil((options.width-_width*ratio)/2),
                            'margin-top':Math.ceil((options.height-_height*ratio)/2)
                        };                      
                    }
                    $img.css(obj);
                }
                //�¼���
                if(options.resizeable){
                    $window.resize(zoom);
                }
            });
        });
    };
})(jQuery);