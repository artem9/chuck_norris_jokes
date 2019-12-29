// App controller
const App = (function(HTTPCtrl, JokeCtrl, UICtrl) {
    let pageSize = 10;
    let pageList = [];
    let currentPage = 1;
    let numberOfPages = 1;

    // Load event listeners
    const loadEventListeners = function() {
        const UISelectors = UICtrl.getSelectors();

        // First page button click event
        document.querySelector(UISelectors.firstPageBtn).addEventListener('click', firstPage);

        // Last page button click event
        document.querySelector(UISelectors.lastPageBtn).addEventListener('click', lastPage);

        // Next page button click event
        document.querySelector(UISelectors.nextPageBtn).addEventListener('click', nextPage);

        // Previous page button click event
        document.querySelector(UISelectors.previousPageBtn).addEventListener('click', previousPage);
        
        // Current page input keyUp event
        document.querySelector(UISelectors.currentPageInput).addEventListener('keyup', goToPage);
    }

    const getNumberOfPages = function() {
        return Math.ceil(JokeCtrl.getJokes().length / pageSize);
    }

    const nextPage = function(e) {
        currentPage += 1;
        loadList();
        
        e.preventDefault();
    }

    const previousPage = function(e) {
        currentPage -= 1;
        loadList();

        e.preventDefault();
    }

    const firstPage = function(e) {
        currentPage = 1;
        loadList();

        e.preventDefault();
    }

    const lastPage = function(e) {
        currentPage = numberOfPages;
        loadList();

        e.preventDefault();
    }

    const goToPage = function(e) {
        let inputValue = parseInt(e.target.value);

        if(inputValue && (inputValue >= 1 && inputValue <= numberOfPages)) {
            currentPage = inputValue;
            loadList();
        } else {
            e.target.value = currentPage;
        }

        e.preventDefault();
    }

    const loadList = function() {
        let start = ((currentPage -1) * pageSize);
        let end = start + pageSize

        pageList = JokeCtrl.getJokes().reverse().slice(start, end);
        drawList(); 
        check();
    }

    const drawList = function() {
        UICtrl.populateJokesList(pageList);
        UICtrl.setCurrentPage(currentPage);
        UICtrl.setTotalPages(numberOfPages);
    }

    const check = function () {
        const UISelectors = UICtrl.getSelectors();
        if(currentPage == numberOfPages) {
            document.querySelector(UISelectors.nextPageBtn).parentElement.classList.add('disabled');
            document.querySelector(UISelectors.lastPageBtn).parentElement.classList.add('disabled');
        } else {
            document.querySelector(UISelectors.nextPageBtn).parentElement.classList.remove('disabled');
            document.querySelector(UISelectors.lastPageBtn).parentElement.classList.remove('disabled');
        }
        
        if (currentPage == 1){
            document.querySelector(UISelectors.previousPageBtn).parentElement.classList.add('disabled');
            document.querySelector(UISelectors.firstPageBtn).parentElement.classList.add('disabled');
        } else {
            document.querySelector(UISelectors.previousPageBtn).parentElement.classList.remove('disabled');
            document.querySelector(UISelectors.firstPageBtn).parentElement.classList.remove('disabled');
        }
        
    }


    return{
        init: function() {
            setInterval(function() {
                HTTPCtrl.get(`http://api.icndb.com/jokes/random/${7}`)
                .then(data => {
                    JokeCtrl.setJokes(data.value);
                })
            }, 3000);

            setInterval(function() {
                numberOfPages = getNumberOfPages();
                loadList();
            }, 5000);

            // Load event listeners
            loadEventListeners();
        }
    }
})(HTTPCtrl, JokeCtrl, UICtrl);

// Init App
App.init();

