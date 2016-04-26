(function($){
    var getDefaultTabListId = function(obj,id){
        var id  = id || obj.attr('id');
        return 'tab_' + id;
    };

    var getDefaultTabContentId = function(obj,id){
      var id  = id || obj.attr('id');
        return 'tab_' + id;
    };

  var methods = {
    init:function (options){
      var settings = this.data('bootstrapTab');
      if(settings == undefined) {
          var defaults = {
                    tabIndex : 0,
                    tabItems : {},
                }
                settings = $.extend({}, defaults, options);
      } else {
          settings = $.extend({}, settings, options);
            }
        this.data('bootstrapTab', settings);
            var id = settings.id = settings.id || this.attr('id');
            id = id || '';
            settings.tabListId = settings.tablist || getDefaultTabListId(this,id);
            settings.tabContentId = settings.tabContentId || getDefaultTabContentId(this,id);
            $('<ul>',{
              id : settings.tabListId,
              class:'nav nav-tabs',
              role:'tablist',
            }).appendTo(this);
            
            $('<div>',{
              id : settings.tabContentId,
              class:'tab-content'
            }).appendTo(this);
            var self = this;
            this.on('click', '.close-tab', function () {
                var id = $(this).parent().attr("id-controls");
                methods['_removeById'].call(self,id);
            });
            return this;
    },

    add : function(options){
            var id = 'tab_' + options.title,closeable = options.closeable;
            var settings = this.data('bootstrapTab');
            settings.tabItems[options.title] = id;
            this.find('.active').removeClass('active');
            var list = this.find('li').filter(function(){
               return this.id == "#" + id;
            });
            if(list.length){
              this.find('li').filter(function(){
                 return this.id == "#" + id;
              }).addClass('active');
              this.find('div').filter(function(){
                 return this.id == id;
              }).addClass('active');
              return this;
            }
            var a = $('<a>',{
                    href:'#'+id,
                    role:'tab',
                    'id-controls':id,
                    "data-toggle":'tab'
                }).html(options.title || '');
            if(closeable){
                $('<button class="close close-tab" type="button" title="Remove this page">×</button>').appendTo(a);
            }
            var title = $('<li>',{
                class:'active',
                id : "#" + id,
            }).append(
               a 
            );
            var content = $('<div>',{
                class:'tab-pane active',
                id : id,
            });
            if(typeof (options.content) == 'string'){
                content.html(options.content);
            }else {
                $(options.content).appendTo(content);
            }
            this.find('.nav-tabs').append(title);
            this.find('.tab-content').append(content);
            return this;
    },

        remove: function  (title) {
            var id = 'tab_' + title;
            return methods['_removeById'].call(this,id);
        },

        _removeById : function  (id) {
            var id2 = '#' + id;
            var list = this.find('li').filter(function(){
               return this.id == id2;
            });
            if(list.length){
              if (this.find("li.active").attr('id') == id2) {
                  var prev = $("#" + id).prev();
                  if(prev.length){
                    prev.addClass('active');
                  }
                  $("#" + id).next().addClass('active');
              }
              this.find('li').filter(function(){
                 return this.id == id2;
              }).remove();
              this.find('div').filter(function(){
                 return this.id == id;
              }).remove();
            }
            return this;
        },

    getSelectIndex : function(){

    },

    val : function(){

    },
  };
  $.fn.bootstrapTab = function() {
    var method = arguments[0];
        if(methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if( typeof(method) == 'object' || !method ) {
            method = methods.init;
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.bootstrapTab' );
            return this;
        }
        return method.apply(this, arguments);
  };
})(jQuery);

