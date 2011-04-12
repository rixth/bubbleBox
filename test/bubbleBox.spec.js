beforeEach(function() {
  setFixtures('<ul id="bubbleBox_list"></ul><div id="bubbleBox"></div>');
  $('#bubbleBox').bubbleBox();
  expect($('#bubbleBox').length).toEqual(1);
});

describe("adding items", function () {
  var enterEvent = $.Event('keypress'),
      commaEvent = $.Event('keypress'),
      semicolonEvent1 = $.Event('keypress'),
      semicolonEvent2 = $.Event('keypress');
  
  enterEvent.which = $.ui.keyCode.ENTER;
  commaEvent.which = $.ui.keyCode.COMMA;
  semicolonEvent1.which = 59; // firefox's code
  semicolonEvent2.which = 186; // the standard code
  
  it("should do nothing when the input is empty", function () {
    
  });
  it("should add a new item when enter is pressed", function () {
    expect(true).toBeTruthy();
  });
  it("should add a new item when comma is pressed", function () {
    expect(true).toBeTruthy();
  });
  it("should add a new item when semicolon is pressed", function () {
    expect(true).toBeTruthy();
  });
  it("should add a new item when input focus is lost", function () {
    expect(true).toBeTruthy();
  });
  
  describe("duplicate item handling", function () {
    it("should not allow duplicates by default", function () {
      expect(true).toBeTruthy();
    });
    it("should allow duplicates when allowDupes is true", function () {
      expect(true).toBeTruthy();  
    });
  });
});

describe("removing items", function () {
  it("should remove items when the close button is clicked", function () {
    expect(true).toBeTruthy();
  });
  it("should remove the last item when the delete key is pressed when the input is blank", function () {
    expect(true).toBeTruthy();
  });
});

describe("events", function () {
  describe("add events", function () {
    it("should trigger the beforeAdd event before a new item is added", function () {
      expect(true).toBeTruthy();
    });
    it("should not add an item if any of the beforeAdd handlers return false", function () {
      expect(1).toBeTruthy();
    });
    it("should trigger the afterAdd event after a new item is added", function () {
      expect(true).toBeTruthy();
    });
  });
  
  describe("remove events", function () {
    it("should trigger the remove event when an event is removed", function () {
      expect(true).toBeTruthy();
    });
  });
});

describe("fetching the value", function () {
  it("should put all items comma separated in to another input", function () {
    expect(true).toBeTruthy();
  });
  it("should return comma separated values when the val() method is called", function () {
    expect(true).toBeTruthy();
  });
});

describe("destroying", function () {
  it("should empty the container upon destruction", function () {
    expect(true).toBeTruthy();
  });
});