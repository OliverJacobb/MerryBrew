angular.module('dataService', [])

  .factory('dataService', function ($http) {

    return ({

      selectedCocktailData: [],

      cocktailIngredients: [],

      addFavourite: function (cocktailName, cocktailImage) {

        $http.post('/user/addFavourite',
          { cocktailName: cocktailName, cocktailImage: cocktailImage })
          .then(function (response) {
            return
          })
          .catch(function (response) {
            console.log(response)
          })
      }
    })

  })