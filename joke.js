const JokeCtrl = (function() {
    // Item constructor
    const Joke = function(id, joke) {
        this.id = id;
        this.joke = joke;
    }

    const data = {
        items: []
    }

    // Public methods
    return {
        getJokes: function() {
            return data.items;
        },
        setJokes: function(items) {
            items.forEach((item) => {
                // erase and reassign ID 
                let Id;
                if(data.items.length > 0) {
                    Id = data.items[data.items.length - 1].id + 1;
                } else {
                    Id = 0;
                }
                joke = new Joke(Id, item.joke);
                data.items.push(joke);
            });
        }
    }
})();