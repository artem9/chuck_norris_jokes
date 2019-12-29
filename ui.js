const UICtrl = (function() {
    const UISelectors = {
        jokesList: '#jokes-list',
        currentPageInput: '#current-page',
        totalPagesInput: '#total-pages',
        firstPageBtn: '#first-page',
        lastPageBtn: '#last-page',
        nextPageBtn: '#next-page',
        previousPageBtn: '#previous-page'
    }

    return {
        populateJokesList: function(jokes) {

            const jokesList = document.querySelector(UISelectors.jokesList);
            // Clear old values
            jokesList.innerHTML = '';

            // Fill new values
            jokes.forEach(function(joke) {
                const liTag = document.createElement('li');
                liTag.textContent = joke.joke;
                liTag.className = 'list-group-item fade-in';
                jokesList.appendChild(liTag);
            });

        },
        getSelectors: function() {
            return UISelectors;
        },
        setCurrentPage: function(value) {
            document.querySelector(UISelectors.currentPageInput).value = value;
        },
        setTotalPages: function(value) {
            document.querySelector(UISelectors.totalPagesInput).value = value;
        }

    }
})();