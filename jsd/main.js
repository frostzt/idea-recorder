// App Controller
const appController = (function(){

    // Elements of the DOM
    const elements = {
        title: document.getElementById('idea_topic'),
        desc: document.getElementById('description'),
        addBtn: document.getElementById('addBtn'),
        ideaList: document.querySelector('.ideas__list')
    };

    // Idea contructor
    class Idea {
        constructor(id, topic, desc) {
            this.id = id;
            this.topic = topic;
            this.desc = desc;
        }
    }

    // Recieve the data from UI, change it to object, and pass it into -> data array
    let pushData = function(title, desc) {
        let tempObj = new Idea();
        tempObj.topic = title;
        tempObj.desc = desc;
        tempObj.id = data.length;
        if (tempObj.desc == "") {
            tempObj.desc = "Umm, I think it's a Super Secret Description...";
        }
        data.push(tempObj);        
    };

    // Data storage
    let data = [];

    return {
        test: function() {
            return data;
        },
        elements: elements,
        storeData: function(title, desc) {
            // 1. Call the pushData function  
            pushData(title, desc);
        },
        getData: function() {
            return data;
        }
    }

})();

// UI Controller
const UIController = (function() {
    const elements = appController.elements;    // Import elements from appController

    // Render data to the UI
    const renderUI = function(arr) {
        let markup, desc, topic, id;

        // Figure out the next element
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id + 2 > arr.length) {
                id = arr[i].id;
                desc = arr[i].desc;
                topic = arr[i].topic;
            }
        }

        // Markup to be added
        markup = `
            <li class="ideas__list--item" id="idea-${id}">
                <h3 class="heading-tertiary head-divide">${topic}</h3>
                <div class="desc desc-divide">${desc}</div>
            </li>
        `;

        elements.ideaList.insertAdjacentHTML('afterbegin', markup);
    };

    return {
        renderData: function() {
            let data = appController.getData();
            renderUI(data);
        }        
    }   

})();

// Main Controller
const controller = (function(appCtrl, UICtrl) {
    const elements = appController.elements;    // Import elements from appController

    // If pressed enter addIdea will be called
    window.addEventListener('click', e => {
        
    });

    // Add idea to the data set
    let addIdea = function() {
        let title, desc;
        title = elements.title.value;
        desc = elements.desc.value;

        if (title == "") {
            alert("Title can't be empty...")
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

    // Setup event listeners
    elements.addBtn.addEventListener('click', addIdea);
})(appController, UIController);

