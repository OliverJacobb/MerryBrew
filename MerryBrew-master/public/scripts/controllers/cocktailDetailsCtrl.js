angular.module('cocktailDetailsCtrl', [])

  .controller('cocktailDetailsController', function ($scope, dataService, $http) {

    $scope.selectedCocktailData = dataService.selectedCocktailData;
    $scope.cocktailIngredients = dataService.cocktailIngredients;
    $scope.favouriteState = false;

    //navbar 
    $scope.openNav = function () {
      document.getElementById("sideNav").style.width = "350px";
    };

    $scope.closeNav = function () {
      document.getElementById("sideNav").style.width = "0";
    };


    //Add Favourite 
    $scope.AddFavourite = function () {

      $scope.favouriteState = true;

      dataService.addFavourite($scope.selectedCocktailData[0].strDrink, $scope.selectedCocktailData[0].strDrinkThumb)

    }

  });