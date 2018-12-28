
// Budget Controller
const budgetController = (() => {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: (type, desc, val) => {
            var newItem, Id;

            if (data.allItems[type].length === 0) {
                Id = 0;
            } else {
                Id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }

            if (type === 'exp') {
                newItem = new Expense(Id, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(Id, desc, val);
            }

            data.allItems[type].push(newItem);

            return newItem;

        },

        test: () => {
            console.log(data);
        }
    }
})();


// UI Controller
const UIController = (() => {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    }

    return {
        getInput: () => {

            return {
                type: document.querySelector(DOMStrings.inputType).value, //value of this will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },
        addListIem: (obj, type) => {
            var html, newHtml, element;
            // html to be inserted when type == inc or 'exp'
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            } else if (type === 'exp') {
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div >'

            }
            // replace placeholders with the actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%desc%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // insert new HTML into the dom using insertAdjacentHTML
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        getDOMStrings: () => {
            return DOMStrings;
        }
    }

})();

// app controller
const controller = ((budgetCtrl, UICtrl) => {

    const setupEventListeners = () => {
        const DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });

    }

    const ctrlAddItem = () => {
        var input, newItem;
        // get the input value from the field
        input = UICtrl.getInput();
        // add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value);

        // add the item to th UI
        UICtrl.addListIem(newItem, input.type);
        // Calculate the budget

        // Display the budget on the UI

    }

    return {
        init: () => {
            console.log('App has been started!')
            setupEventListeners();
        }
    }

})(budgetController, UIController);


controller.init();


