angular.module('favouritesCtrl', [])

  .controller('favouritesController', function ($scope, $http, dataService) {

    $scope.favourites = []

    $scope.openNav = function () {
      document.getElementById("sideNav").style.width = "350px";
    };

    $scope.closeNav = function () {
      document.getElementById("sideNav").style.width = "0";
    };

    $scope.getFavourites = function () {
      $http.get('/user/getFavourites')

        .then(function (response) {
          $scope.initialfavourites = [...response.data[0].favourites];
          $scope.filterDuplicateFavourites($scope.initialfavourites, 'cocktailName');
          return $scope.favourites;
        })

        .catch(function (response) {
          console.log(response);
        })
    }

    //filter out the duplicate database entries before displaying them on the view

    $scope.filterDuplicateFavourites = function (arr, comparison) {

      $scope.favourites = arr.map(e => e[comparison])

        .map((e, i, final) => final.indexOf(e) === i && i)

        .filter((e) => arr[e]).map(e => arr[e]);

      return $scope.favourites;

    }

    $scope.getFavourites();

    $scope.deleteFavourites = function ($index) {
      $http.post('/user/deleteFavourite', { cocktailName: $scope.favourites[$index].cocktailName })

        .then(function (response) {
          $scope.favourites.splice($index, 1);
        })
        .catch(function (response) {
          console.log(response)
        })
    }

    $scope.selectedCocktail = function ($index) {
      let cocktailName = $scope.favourites[$index].cocktailName;

      $http.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktailName)
        .then(function (response) {
          if (dataService.selectedCocktailData.length == null) {
            dataService.selectedCocktailData.push(response.data.drinks[0]);
          } else {
            dataService.selectedCocktailData.splice(0, 1);
            dataService.cocktailIngredients.length = 0;
            dataService.selectedCocktailData.push(response.data.drinks[0]);
            Object.keys(dataService.selectedCocktailData[0]).forEach((key) => (dataService.selectedCocktailData[0][key] == null) && delete dataService.selectedCocktailData[0][key]);
            $scope.getSelectedCocktailIngredients();
          }
        })
    }


    //loop over the cocktail object that we get back from the API and get the ingredients to store in an array.

    $scope.getSelectedCocktailIngredients = function () {
      for (let key in dataService.selectedCocktailData[0]) {
        if (/^strIngredient/.test(key)) {
          dataService.cocktailIngredients.push(dataService.selectedCocktailData[0][key]);
        }
      }
    }

  })