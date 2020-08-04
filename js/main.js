'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// App Controller
var appController = function () {

    // Elements of the DOM
    var elements = {
        title: document.getElementById('idea_topic'),
        desc: document.getElementById('description'),
        addBtn: document.getElementById('addBtn'),
        ideaList: document.querySelector('.ideas__list'),
        delAllBtn: document.getElementById('delAllBtn')
    };

    // Idea contructor

    var Idea = function Idea(id, topic, desc) {
        _classCallCheck(this, Idea);

        this.id = id;
        this.topic = topic;
        this.desc = desc;
    };

    // Recieve the data from UI, change it to object, and pass it into -> data array


    var pushData = function pushData(title, desc) {
        var tempObj = new Idea();
        tempObj.topic = title;
        tempObj.desc = desc;
        tempObj.id = data.length;
        if (tempObj.desc == "" || tempObj.desc.trim() == "") {
            tempObj.desc = "Umm, I think it's a Super Secret Description...";
        }
        data.push(tempObj);
    };

    // Remove the item from the data structure
    var removeItem = function removeItem(ID) {
        var index = void 0,
            delId = void 0;

        // Find the index of the element using the ID
        var isTheItem = function isTheItem(el) {
            return el.id === ID;
        };
        index = data.findIndex(isTheItem);
        delId = data[index].id;

        // Remove the element
        data.splice(index, 1);

        // Update UI
        UIController.delElem(delId);
    };

    // Data storage
    var data = [];

    return {
        test: function test() {
            return data;
        },

        getElements: function getElements() {
            return elements;
        },

        storeData: function storeData(title, desc) {
            // 1. Call the pushData function  
            pushData(title, desc);
        },

        getData: function getData() {
            return data;
        },

        emptyData: function emptyData() {
            data = [];
            UIController.flushUI();
        },

        removeIdea: function removeIdea(id) {
            removeItem(id);
        }
    };
}();

// UI Controller
var UIController = function () {
    var elements = appController.getElements(); // Import elements from appController

    // Format topic for UI
    var formatTopic = function formatTopic(topic) {
        var newTopic = void 0,
            topicArr = void 0;
        topicArr = topic.split('');
        if (topicArr.length > 27) {
            topicArr.splice(27);
            newTopic = topicArr.join("") + "...";
            return newTopic;
        }
        return topic;
    };

    // Format description for UI
    var formatDescription = function formatDescription(desc) {
        var newDesc = void 0,
            descArr = void 0;
        descArr = desc.split('');
        if (descArr.length > 60) {
            descArr.splice(60);
            newDesc = descArr.join("") + "...";
            return newDesc;
        }
        return desc;
    };

    // Render data to the UI
    var renderUI = function renderUI(arr) {
        var markup = void 0,
            desc = void 0,
            topic = void 0,
            id = void 0;

        // Figure out the next element
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id + 2 > arr.length) {
                id = arr[i].id;
                desc = formatDescription(arr[i].desc);
                topic = formatTopic(arr[i].topic);
            }
        }

        // Markup to be added
        markup = '\n            <li class="ideas__list--item" id="idea-' + id + '">\n                <h3 class="heading-tertiary head-divide">' + topic + '</h3>\n                <div class="desc desc-divide">' + desc + '</div>\n                <div class="remove__item" id="remove-' + id + '">X</div>\n            </li>';

        elements.ideaList.insertAdjacentHTML('afterbegin', markup);
    };

    return {
        renderData: function renderData() {
            var data = appController.getData();
            renderUI(data);
        },

        flushUI: function flushUI() {
            elements.ideaList.innerHTML = "";
        },

        delElem: function delElem(delId) {
            // Removes the element from the UI
            var removeEl = document.getElementById('idea-' + delId);
            removeEl.parentNode.removeChild(removeEl);
        }
    };
}();

// Main Controller
var controller = function (appCtrl, UICtrl) {
    var elements = appController.getElements(); // Import elements from appController

    // If pressed enter addIdea will be called
    window.addEventListener('keyup', function (e) {
        if (e.keyCode == 13 || e.which == 13) {
            elements.addBtn.click();
        }
    });

    // Add idea to the data set
    var addIdea = function addIdea() {
        var title = void 0,
            desc = void 0;
        title = elements.title.value;
        desc = elements.desc.value;

        // Is title empty?
        if (title == "") {
            alert("Title can't be empty...");
        } else {
            // 1. Pass the idea recieved to the appController
            appCtrl.storeData(title, desc);

            // 2. Render data to the UI
            UICtrl.renderData();

            // 3. Clear the fields
            elements.title.value = "";
            elements.desc.value = "";
        }
    };

    // Delete the selected idea
    var delIdea = function delIdea(e) {
        // Delete only if the remove button was clicked
        if (e.target.classList == 'remove__item') {
            var itemID = void 0,
                splitID = void 0,
                ID = void 0;
            itemID = e.target.id;

            if (itemID) {
                splitID = itemID.split('-');
                ID = parseInt(splitID[1]);
            }

            // Remove the item from the Data Structure
            appCtrl.removeIdea(ID);
        }
    };

    // Delete all ideas
    var delAllIdea = function delAllIdea() {
        // Delete everything from data array
        appCtrl.emptyData();
    };

    // Setup event listeners
    elements.addBtn.addEventListener('click', addIdea);
    elements.delAllBtn.addEventListener('click', delAllIdea);
    elements.ideaList.addEventListener('click', delIdea);
}(appController, UIController);