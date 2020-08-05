angular.module('homeCtrl', [])

  .controller('homeController', function ($scope, $http, dataService) {

    //navbar 
    $scope.openNav = function () {
      document.getElementById("sideNav").style.width = "350px";
    };

    $scope.closeNav = function () {
      document.getElementById("sideNav").style.width = "0";
    };

    //Gets initial list of cocktails based on search 
    $scope.cocktails = [];
    $scope.selectedCocktailData = dataService.selectedCocktailData;
    $scope.ShowSearchResults = false;
    $scope.cocktailIngredients = dataService.cocktailIngredients;

    $scope.getSearchedInput = () => document.getElementById("search").value;

    $scope.clearSearchedInput = () => document.getElementById("search").value = "";

    $scope.getCocktails = (query) => {
      $http.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + query)
        .then(function (response) {
          if (response.data.drinks === null) {
            alert("No cocktails found matching " + query)
          } else {
            for (let i = 0; i < response.data.drinks.length; i++) {
              $scope.cocktails.push(response.data.drinks[i]);
            }
          }
        },
          function error(response) {
            alert(response.statustext);
          });
    };

    $scope.searchCocktail = () => {

      const query = $scope.getSearchedInput();

      if (query) {
        $scope.cocktails = [];
        $scope.ShowSearchResults = false;
        $scope.clearSearchedInput();
        $scope.getCocktails(query);
        $scope.ShowSearchResults = true;
      }
    };

    //get the users selected cocktail and make a call to the API to get the needed data for that specific cocktail
    $scope.selectedCocktail = function ($index) {
      let id = $scope.cocktails[$index].idDrink;

      $http.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id)
        .then(function (response) {
          if ($scope.selectedCocktailData.length == null) {
            $scope.selectedCocktailData.push(response.data.drinks[0]);
          } else {
            $scope.selectedCocktailData.splice(0, 1);
            $scope.cocktailIngredients.length = 0;
            $scope.selectedCocktailData.push(response.data.drinks[0]);
            Object.keys($scope.selectedCocktailData[0]).forEach((key) => ($scope.selectedCocktailData[0][key] == null) && delete $scope.selectedCocktailData[0][key]);
            $scope.getSelectedCocktailIngredients();
          }
        })
    }


    //loop over the cocktail object that we get back from the API and get the ingredients to store in an array.

    $scope.getSelectedCocktailIngredients = function () {
      for (let key in $scope.selectedCocktailData[0]) {
        if (/^strIngredient/.test(key)) {
          $scope.cocktailIngredients.push($scope.selectedCocktailData[0][key]);
        }
      }
    }

  });