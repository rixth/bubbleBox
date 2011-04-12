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
        self.list.delegate('.ui-bubbleBox-removeItem', 'click', function (event) {
          $(this.parentNode).remove();
          self._trigger('remove', event, {value: $(this).text, node: this});
        });
      }
      
      self.element.bind('blur keypress', function (event) {
        if (event.type === 'blur' || self.options.triggerKeyCodes.indexOf(event.which) !== -1) {
          var bubbleValue = self.input.val();
          
          if (bubbleValue !== '' && !bubbleValue.match(/^\s+$/) && self._trigger('beforeAdd', event, { value: bubbleValue }) !== false) {
            self.input.val('');
            self._trigger('afterAdd', event, { value: bubbleValue, node: self.addItem(bubbleValue) });
          }
          
          event.preventDefault();
        }
      });
      
      // Insert start data
      $(self.options.seedData).each(function () {
        self.addItem(this);
      });
    },
    _createBubble: function (value) {
      var removeButton = this.options.showRemoveButton ? '<div class="ui-bubbleBox-removeItem">x</div>' : '';
      return $('<li class="ui-bubblebox-item"><span>' + value + '</span>' + removeButton + '</li>');
    },
    val: function () {
      var values = [];
      this.list.children().each(function () {
        values.push($(this).find('span').text())
      })
      return values.join(',');
    },
    addItem: function (value) {
      var bubble = this._createBubble(value);
      this.list.append(bubble);
      return bubble;
    },
    _destroy: function () {
      this.list.empty().removeClass('ui-bubblebox-list');
      $.Widget.prototype.destroy.apply(this, arguments);
    }
  });
}(jQuery));