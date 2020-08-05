angular.module('app.routes', [])

  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/landingPage.html",
        access: { restricted: false },
        css: 'styles/landingPage.css'
      })
      .when("/login", {
        templateUrl: "views/Login.html",
        controller: "loginController",
        access: { restricted: false },
        css: 'styles/Login.css'
      })
      .when("/register", {
        templateUrl: "views/Register.html",
        controller: "registerController",
        access: { restricted: false },
        css: 'styles/Register.css'
      })
      .when('/logout', {
        controller: 'logoutController',
        access: { restricted: true }
      })
      .when("/Home", {
        templateUrl: "views/Home.html",
        controller: "homeController",
        access: { restricted: true },
        css: 'styles/home.css'
      })
      .when("/CocktailDetails", {
        templateUrl: "views/CocktailDetails.html",
        controller: "cocktailDetailsController",
        access: { restricted: true },
        css: 'styles/cocktailDetails.css'
      })
      .when("/Favourites", {
        templateUrl: "views/Favourites.html",
        controller: "favouritesController",
        access: { restricted: true },
        css: 'styles/Favourites.css'
      })
      .otherwise({
        redirectTo: "/"
      })

  })
