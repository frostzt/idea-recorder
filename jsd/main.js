// App Controller
const appController = (function(){

    // Elements of the DOM
    const elements = {
        title: document.getElementById('idea_topic'),
        desc: document.getElementById('description'),
        addBtn: document.getElementById('addBtn'),
        ideaList: document.querySelector('.ideas__list'),
        delAllBtn: document.getElementById('delAllBtn')
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
    const pushData = function(title, desc) {
        let tempObj = new Idea();
        tempObj.topic = title;
        tempObj.desc = desc;
        tempObj.id = data.length;
        if (tempObj.desc == "" || tempObj.desc.trim() == "") {
            tempObj.desc = "Umm, I think it's a Super Secret Description...";
        }
        data.push(tempObj);        
    };

    // Remove the item from the data structure
    const removeItem = function(ID) {
        let index, delId;
        
        // Find the index of the element using the ID
        const isTheItem = el => el.id === ID;
        index = data.findIndex(isTheItem);
        delId = data[index].id;

        // Remove the element
        data.splice(index, 1);

        // Update UI
        UIController.delElem(delId);
    };

    // Data storage
    let data = [];

    return {
        test: function() {
            return data;
        },

        getElements: function() {
            return elements;
        },

        storeData: function(title, desc) {
            // 1. Call the pushData function  
            pushData(title, desc);
        },

        getData: function() {
            return data;
        },

        emptyData: function() {
            data = [];
            UIController.flushUI();
        },

        removeIdea: function(id) {
            removeItem(id);
        }
    }

})();

// UI Controller
const UIController = (function() {
    const elements = appController.getElements();    // Import elements from appController

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
                <div class="remove__item" id="remove-${id}">X</div>
            </li>`;

        elements.ideaList.insertAdjacentHTML('afterbegin', markup);
    };

    return {
        renderData: function() {
            let data = appController.getData();
            renderUI(data);
        },
        
        flushUI: function() {
            elements.ideaList.innerHTML = "";
        },

        delElem: function(delId) {
            // Removes the element from the UI
            let removeEl = document.getElementById(`idea-${delId}`);
            removeEl.parentNode.removeChild(removeEl);
        }
    }   

})();

// Main Controller
const controller = (function(appCtrl, UICtrl) {
    const elements = appController.getElements();    // Import elements from appController

    // If pressed enter addIdea will be called
    window.addEventListener('keyup', e => {
        if (e.keyCode == 13 || e.which == 13) {
            elements.addBtn.click();
        }
    });

    // Add idea to the data set
    const addIdea = function() {
        let title, desc;
        title = elements.title.value;
        desc = elements.desc.value;

        // Is title empty?
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

    // Delete the selected idea
    const delIdea = function(e) {
        let itemID, splitID, ID;
        itemID = e.target.id;
        
        if(itemID) {
            splitID = itemID.split('-');
            ID = parseInt(splitID[1]);   
        }

        // 1. Remove the item from the Data Structure
        appCtrl.removeIdea(ID);

        // 2. Remove the item from the UI


    };

    // Delete all ideas
    const delAllIdea = function() {
        // Delete everything from data array
        appCtrl.emptyData();
    };

    // Setup event listeners
    elements.addBtn.addEventListener('click', addIdea);
    elements.delAllBtn.addEventListener('click', delAllIdea);
    elements.ideaList.addEventListener('click', delIdea);
})(appController, UIController);