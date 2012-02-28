/*! bubbleBox: a jQuery UI widget to manage a list of items
    http://github.com/rixth/bubbleBox
*/

/*jshint browser: true, jquery: true, indent: 2, white: true, curly: true, forin: true, noarg: true, immed: true, newcap: true, noempty: true */
(function ($) {
  $.widget("ui.bubbleBox", {
    options: {
      showRemoveButton: true,
      list: null,
      allowDupes: false,
      seedData: [],
      triggerKeyCodes: [
        13,      // enter
        44, 188, // the two possibilities for comma
        59, 186  // the two possibilities for semicolon
      ]
    },
    _create: function () {
      var self = this;
      
      self.input = self.element;
      
      self.options.list || (self.options.list = '#' + self.input.attr('id') + '_list');
      self.list = $(self.options.list).addClass('ui-bubblebox-list');
      
      // Bind events
      if (self.options.showRemoveButton) {
        self.list.delegate('.ui-bubblebox-removeItem', 'click', function (event) {
          self.removeItem($(this.parentNode));
        });
      }
      
      self.element.bind('blur keydown', function (event) {
        var newValue = self.input.val();
        
        if (event.type === 'blur' || jQuery.inArray(event.which, self.options.triggerKeyCodes) !== -1) {
          if (self.addItem(newValue, event)) {
            self.input.val('');
            event.preventDefault();
          }
        } else if (newValue === '' && event.type === 'keydown' && event.which === 8) {
          self.removeItem(self.list.find('li:last-child'));
        }
      });

      // Insert start data
      $(self.options.seedData).each(function () {
        self.addItem(this);
      });
    },
    _createBubble: function (value) {
      var removeButton = this.options.showRemoveButton ? '<div class="ui-bubblebox-removeItem">x</div>' : '';
      return $('<li class="ui-bubblebox-item"><span>' + value + '</span>' + removeButton + '</li>');
    },
    val: function () {
      var values = [];
      this.list.children().each(function () {
        values.push($(this).find('span').text());
      });
      return values;
    },
    removeItem: function (item, event) {
      item.remove();
      this._trigger('remove', event, { value: item.find('span').text(), node: item[0] });
    },
    addItem: function (value, event) {
      var self = this,
          bubble;
          
      if (!self.options.allowDupes && jQuery.inArray(value, self.val()) !== -1) {
        return false;
      }
      
      if (value !== '' && !value.match(/^\s+$/) && self._trigger('beforeAdd', event, { value: value }) !== false) {
        bubble = self._createBubble(value);
        self.list.append(bubble);
        self._trigger('afterAdd', event, { value: value, node: bubble[0] });
        return bubble;
      } else {
        return false;
      }
    },
    _destroy: function () {
      this.list.empty().removeClass('ui-bubblebox-list');
      $.Widget.prototype.destroy.apply(this, arguments);
    }
  });
}(jQuery));