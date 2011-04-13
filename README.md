# jquery.bubbleBox

A simple jQuery UI widget to manage a list of items. There is a full suite of unit tests available in test/, written with Jasmine. You can see an example and run the tests on the [plugin's website](http://rixth.github.com/bubbleBox/).

## HTML structure required

    <ul id="myInput_list"></ul>
    <input id="myInput" />
    
By default, an unordered list is required with the ID of your input prefixed with *\_list*. There are default styles provided in src/bubbleBox.css if you choose to use them.

## Options

* showRemoveButton (*default: true*): show a little x on each item with a click handler to remove said item
* seedData (*default: empty*): an array of values to load when the plugin is first rendered
* allowDupes (*default: false*): allow duplicate items to be added to the list
* triggerKeyCodes (*default: enter , ;*) key codes that are considered to delineate items.

## Methods

* val: fetch an array containing the values of each item, in the order they appear in the list
* addItem(value): programmatically add a new value to the list
* removeItem(jqCollection): remove the passed list item
* destroy: remove the plugin

## Events

* beforeAdd: called just before an event is added to the list. If any of the handlers attached return false, the item won't be appended. This is useful for validation. Passed the browser event, and an object with the key 'value'.
* afterAdd: called just after an item is added to the list, allowing you to decorate it with extra functionality if desired. Passed the browser event, and an object with the keys 'value', and 'node'.
* afterAdd: called when an item is removed from the list, allowing you to decorate it with extra functionality if desired. Passed the browser event, and an object with the keys 'value', and 'node'.
