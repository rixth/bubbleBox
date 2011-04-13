/*globals jasmine, describe, it, beforeEach, setFixtures, expect */

describe("bubblebox", function () {
  function resetHtml() {
    setFixtures('<ul id="bubbleBox_list"></ul><div id="bubbleBox"></div>');
  }
  
  var itemSelector = '.ui-bubblebox-item',
      box, list;

  beforeEach(function() {
    resetHtml();
    $('#bubbleBox').bubbleBox();
    box = $('#bubbleBox');
    list = $('#bubbleBox_list');
  });
  
  function addThreeItems() {
    box.bubbleBox("addItem", "my value 1");
    box.bubbleBox("addItem", "my value 2");
    box.bubbleBox("addItem", "my value 3");
  }
  
  function numberOfItems() {
    return $('#bubbleBox_list ' + itemSelector).length;
  }

  describe("adding items", function () {
    var enterEvent = $.Event('keydown');
    enterEvent.which = $.ui.keyCode.ENTER;

    it("should do nothing when the input is empty", function () {
      box.trigger(enterEvent);
      expect(numberOfItems()).toEqual(0);
    });
    it("should add a new item when enter is pressed", function () {
      box.val('my value');
      box.trigger(enterEvent);
      expect(numberOfItems()).toEqual(1);
    });
    it("should clear the input after an item is added", function () {
      box.val('my value');
      box.trigger(enterEvent);
      expect(numberOfItems()).toEqual(1);
      expect(box.val()).toEqual('');
    });
    it("should add a new item when comma is pressed", function () {
      box.val('my value');
      var commaEvent = $.Event('keydown');
      
      commaEvent.which = $.ui.keyCode.COMMA;
      box.trigger(commaEvent);
      expect(numberOfItems()).toEqual(1);
    });
    it("should add a new item when semicolon is pressed", function () {
      box.val('my value');
      var semicolonEvent = $.Event('keydown');
      
      semicolonEvent.which = 59;
      box.trigger(semicolonEvent);
      expect(numberOfItems()).toEqual(1);
    });
    it("should add a new item when input focus is lost", function () {
      box.val('my value');
      box.trigger($.Event('blur'));
      expect($('#bubbleBox_list ' + itemSelector).length).toEqual(1);
    });

    describe("duplicate item handling", function () {
      it("should not allow duplicates by default", function () {
        addThreeItems();
        expect(numberOfItems()).toEqual(3);
        box.val('my value 1');
        box.trigger(enterEvent);
        expect(numberOfItems()).toEqual(3);
      });
      it("should allow duplicates when allowDupes is true", function () {
        box.bubbleBox("option", "allowDupes", true);
        addThreeItems();
        expect(numberOfItems()).toEqual(3);
        box.val('my value 1');
        box.trigger(enterEvent);
        expect(numberOfItems()).toEqual(4);
      });
    });

    describe("seeding start data", function () {
      it("should add items upon instantiation", function () {
        resetHtml();
        box.bubbleBox({
          seedData: ['Trulia', 'Zillow']
        });
        expect(numberOfItems()).toEqual(2);
        expect(box.bubbleBox("val").join(",")).toEqual("Trulia,Zillow");
      });
    });
  });

  describe("removing items", function () {
    it("should remove items when the close button is clicked", function () {
      addThreeItems();
      expect(numberOfItems()).toEqual(3);
      $('#bubbleBox_list>li>div').eq(0).click();
      expect(numberOfItems()).toEqual(2);
    });
    it("should remove the last item when the delete key is pressed when the input is blank", function () {
      var backspaceEvent = $.Event('keydown'),
          box = $('#bubbleBox');
      backspaceEvent.which = 8;

      addThreeItems();
      box.trigger(backspaceEvent);
      expect(box.bubbleBox("val").join(',')).toEqual('my value 1,my value 2');
    });
  });

  describe("events", function () {
    describe("add events", function () {
      var enterEvent = $.Event('keydown');
      enterEvent.which = $.ui.keyCode.ENTER;

      it("should trigger the beforeAdd event before a new item is added", function () {
        box.val('my value');
        var callback = jasmine.createSpy();

        box.bind('bubbleboxbeforeadd', callback);
        box.trigger(enterEvent);
        expect(callback).toHaveBeenCalledWith(jasmine.any(Object), { value: 'my value' });
      });
      it("should not add an item if any of the beforeAdd handlers return false", function () {
        box.val('my value');
        var callback = jasmine.createSpy().andReturn(false);

        box.bind('bubbleboxbeforeadd', callback);
        box.trigger(enterEvent);

        expect(callback).toHaveBeenCalledWith(jasmine.any(Object), { value: 'my value' });
        expect(numberOfItems()).toEqual(0);
      });
      it("should trigger the afterAdd event after a new item is added", function () {
        box.val('my value');
        var callback = jasmine.createSpy();

        box.bind('bubbleboxafteradd', callback);
        box.trigger(enterEvent);
        
        expect(callback).toHaveBeenCalledWith(jasmine.any(Object), { value: 'my value', node: jasmine.any(Object)});
        expect(numberOfItems()).toEqual(1);
      });
    });

    describe("remove events", function () {
      it("should trigger the remove event when an event is removed via the delete key", function () {
        var backspaceEvent = $.Event('keydown'),
            callback = jasmine.createSpy();
            
        backspaceEvent.which = 8;
          
        box.bind('bubbleboxremove', callback);
        addThreeItems();
        box.trigger(backspaceEvent);
        expect(numberOfItems()).toEqual(2);
        expect(callback).toHaveBeenCalledWith(jasmine.any(Object), { value: 'my value 3', node: jasmine.any(Object)});
      });
      it("should trigger the remove event when an event is removed via the remove button", function () {
        var callback = jasmine.createSpy();
        box.bind('bubbleboxremove', callback);
        addThreeItems();
        $('#bubbleBox_list>li>div').eq(0).click();
        expect(numberOfItems()).toEqual(2);
        expect(callback).toHaveBeenCalledWith(jasmine.any(Object), { value: 'my value 1', node: jasmine.any(Object)});
      });
    });
  });

  describe("fetching the value", function () {
    it("should return an array when the val() method is called", function () {
      addThreeItems();
      expect(box.bubbleBox("val").length).toEqual(3);
      expect(box.bubbleBox("val")).toContain('my value 1');
      expect(box.bubbleBox("val")).toContain('my value 2');
      expect(box.bubbleBox("val")).toContain('my value 3');
    });
  });

  describe("destroying", function () {
    it("should empty the container upon destruction", function () {
      addThreeItems();
      expect(numberOfItems()).toEqual(3);
      box.bubbleBox("destroy");
      expect(numberOfItems()).toEqual(3);
    });
  });
});
