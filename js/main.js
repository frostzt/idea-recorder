'use strict';

var _uniqid = require('uniqid');

var _uniqid2 = _interopRequireDefault(_uniqid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// App Controller
var appController = function () {

    // Elements of the DOM
    var elements = {
        title: document.getElementById('idea_topic'),
        desc: document.getElementById('description'),
        addBtn: document.getElementById('addBtn'),
        ideaList: document.querySelector('.ideas__list')
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
        tempObj.id = (0, _uniqid2.default)();
        if (tempObj.desc == "") {
            tempObj.desc = "Umm, I think it's a Super Secret Description...";
        }
        data.push(tempObj);
    };

    // Data storage
    var data = [];

    return {
        test: function test() {
            return data;
        },
        elements: elements,
        storeData: function storeData(title, desc) {
            // 1. Call the pushData function  
            pushData(title, desc);
        },
        getData: function getData() {
            return data;
        }
    };
}();

// UI Controller
var UIController = function () {
    var elements = appController.elements; // Import elements from appController

    // Render data to the UI
    var renderUI = function renderUI(arr) {
        var markup = void 0,
            desc = void 0,
            topic = void 0;

        desc = arr[0].desc;
        topic = arr[0].topic;

        markup = '\n            <li class="ideas__list--item" id="idea-0">\n                <h3 class="heading-tertiary head-divide">' + topic + '</h3>\n                <div class="desc desc-divide">' + desc + '</div>\n            </li>\n        ';

        elements.ideaList.insertAdjacentHTML('afterbegin', markup);
    };

    return {
        renderData: function renderData() {
            var data = appController.getData();
            renderUI(data);
        }
    };
}();

// Main Controller
var controller = function (appCtrl, UICtrl) {
    var elements = appController.elements; // Import elements from appController

    // Add idea to the data set
    var addIdea = function addIdea() {
        var title = void 0,
            desc = void 0;
        title = elements.title.value;
        desc = elements.desc.value;

        if (title == "") {
            console.log("Enter quelque chose");
        } else {
            // Pass the idea recieved to the appController
            appCtrl.storeData(title, desc);

            // Render data to the UI
            UICtrl.renderData();
        }
    };

    return {
        init: function init() {
            appCtrl.test();
        }

        // Setup event listeners
    };elements.addBtn.addEventListener('click', addIdea);
}(appController, UIController);

controller.init();