/* ====> SideBar Section <===== */
$(document).ready(function () {
  let sidebarWidth = $("#sideBaritems").width();
  listbottom();
  function listbottom() {
    $(".item-1").animate({ "padding-top": "500px" }, 1000);
    $(".item-2").animate({ "padding-top": "500px" }, 1000);
    $(".item-3").animate({ "padding-top": "500px" }, 1000);
    $(".item-4").animate({ "padding-top": "500px" }, 1000);
    $(".item-5").animate({ "padding-top": "500px" }, 1000);
  }
  function listUp() {
    $(".item-1").animate({ "padding-top": "15px" }, 1000);
    $(".item-2").animate({ "padding-top": "15px" }, 1000);
    $(".item-3").animate({ "padding-top": "15px" }, 1000);
    $(".item-4").animate({ "padding-top": "15px" }, 1000);
    $(".item-5").animate({ "padding-top": "15px" }, 1000);
  }

  $("#sideBarButton").click(function () {
    let navOffset = $("#sideBar-nav").offset().left;
    if (navOffset == sidebarWidth) {
      $("#sideBarButton").removeClass("fa-x");
      $("#sideBar").animate({ left: `-${sidebarWidth}` }, 500);
      listbottom();
    } else {
      $("#sideBarButton").addClass("fa-x");
      $("#sideBar").animate({ left: 0 }, 500);
      listUp();
    }
  });

  /*===============> Search Section <==================  */

  // Globla elements

  let searchName = document.getElementById("searchName");
  let searchLetter = document.getElementById("searchLetter");
  // end of Global Elements
  $(".item-1").click(function () {
    document.getElementById("contact-us").style.cssText =
      "display: none !important";
    listbottom();
    $("#searchSection").removeClass("invisible");
    $("#mealsList").css({ display: "none" });
  });
  $(".nav-list li").click(function () {
    $("#sideBar").animate({ left: `-${sidebarWidth}` }, 500);
    $("#sideBarButton").removeClass("fa-x");
    $(".lds-facebook").fadeIn(0, function () {
      $("#loadingScreen").fadeIn(0);
    });
    $(".lds-facebook").fadeOut(500, function () {
      $("#loadingScreen").fadeOut(500);
    });
  });
  async function getMealsApi(meals) {
    $(".lds-facebook").fadeIn(0, function () {
      $("#loadingScreen").fadeIn(0);
    });
    var apiRespone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`,
      {
        method: "GET",
      }
    );
    let finalResult = await apiRespone.json();
    finalResult = finalResult.meals;
    displayMeals(finalResult);
    $(".lds-facebook").fadeOut(500, function () {
      $("#loadingScreen").fadeOut(500);
    });
  }

  async function getFirstLetterMeals(char) {
    $(".lds-facebook").fadeIn(0, function () {
      $("#loadingScreen").fadeIn(0);
    });
    let apiRespone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`,
      {
        method: "GET",
      }
    );
    let finalResult = await apiRespone.json();
    finalResult = finalResult.meals;
    if (finalResult != "" && finalResult != null) {
      displayMeals(finalResult);
    }
    $(".lds-facebook").fadeOut(500, function () {
      $("#loadingScreen").fadeOut(500);
    });
  }
  // if ($("#searchSection").attr("class") == "invisible") {
  // }
  function displayMeals(finalResult) {
    let cartona = ``;
    for (let i = 0; i < finalResult.length; i++) {
      cartona += `
    <div class="meal col-md-6 col-lg-3">
          <div class="inner position-relative rounded-1 overflow-hidden">
            <img class="img-fluid rounded-1" src="${finalResult[i].strMealThumb}" alt="" />
            <div class="layer">
              <h2>${finalResult[i].strMeal}</h2>
            </div>
          </div>
        </div>
    `;
    }
    $("#mealsList .row").html(cartona);
    let mealsItems = $("#mealsList .row .meal");
    mealDetails(mealsItems, finalResult);
  }
  function mealDetails(mealsItems, finalResult) {
    for (let i = 0; i < finalResult.length; i++) {
      $(mealsItems[i]).click(function (e) {
        let ingredientCartona = ``;
        let tagsCartona = ``;
        let ingredient = [
          finalResult[i].strIngredient1,
          finalResult[i].strIngredient2,
          finalResult[i].strIngredient3,
          finalResult[i].strIngredient4,
          finalResult[i].strIngredient5,
          finalResult[i].strIngredient6,
          finalResult[i].strIngredient7,
          finalResult[i].strIngredient8,
          finalResult[i].strIngredient9,
          finalResult[i].strIngredient10,
          finalResult[i].strIngredient11,
          finalResult[i].strIngredient12,
          finalResult[i].strIngredient13,
          finalResult[i].strIngredient14,
          finalResult[i].strIngredient15,
          finalResult[i].strIngredient16,
          finalResult[i].strIngredient17,
          finalResult[i].strIngredient18,
          finalResult[i].strIngredient19,
          finalResult[i].strIngredient20,
        ];
        if (finalResult[i].strTags != null) {
          let tags = finalResult[i].strTags.split(",");
          console.log(tags);
          for (let i = 0; i < tags.length; i++) {
            tagsCartona += `
            <li class="my-3 mx-1 p-1 alert-danger rounded d-inline-block">${tags[i]}</li>
            `;
          }
        }

        for (let i = 0; i < ingredient.length; i++) {
          if (ingredient[i] != "") {
            ingredientCartona += `
            <li class="my-3 mx-1 p-1 alert-success rounded-1">${ingredient[i]}</li>
            `;
          }
        }
        // console.log(finalResult[i]);
        $("#mealsList .row").html(`
      <div class="col-md-4 text-white">
         <img class="img-fluid" src="${finalResult[i].strMealThumb}" alt="" />
         <h1 class="text-center">${finalResult[i].strMeal}</h1>
      </div>
      </div>
      <div class="col-md-8 ps-4 text-white">
         <h2 class="instruction">Instructions</h2>
         <p class="instParagraph">${finalResult[i].strInstructions}</p>
         <p><b>Area: </b>${finalResult[i].strArea}</p>
         <p><b>Category: </b>${finalResult[i].strCategory}</p>
         <h3>Receipes:</h3>
      <ul class="d-flex flex-wrap" id="recipes" style="padding: 0">
      ${ingredientCartona}
      </ul>
      <h3>Tags :</h3>
      ${tagsCartona}
      <div class="mt-3">
      <a class="btn btn-success text-white" target="_blank" href="https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/">Source</a>
      <a class="btn youtube text-white" target="_blank" href="https://www.youtube.com/watch?v=VVnZd8A84z4">Youtub</a>
      </div>
      </div>
      `);
      });
    }
  }

  searchName.addEventListener("input", function () {
    let mealName = searchName.value;
    $("#mealsList").css({ display: "block" });
    getMealsApi(mealName);
  });
  searchLetter.addEventListener("input", function () {
    let mealName = searchLetter.value;
    $("#mealsList").css({ display: "block" });
    getFirstLetterMeals(mealName);
  });

  getMealsApi("");

  /* ==============> categories Section <========== */
  async function categoryApi() {
    $(".lds-facebook").fadeIn(0, function () {
      $("#loadingScreen").fadeIn(0);
    });
    var apiRespone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`,
      {
        method: "GET",
      }
    );
    let finalResult = await apiRespone.json();
    finalResult = finalResult.categories;
    displayCategory(finalResult);
    $(".lds-facebook").fadeOut(500, function () {
      $("#loadingScreen").fadeOut(500);
    });
  }
  function displayCategory(finalResult) {
    let cartona = ``;
    for (let i = 0; i < finalResult.length; i++) {
      cartona += `
    <div class="meal col-md-6 col-lg-3">
          <div class="inner position-relative rounded-1 overflow-hidden text-center">
            <img class="img-fluid rounded-1" src="${finalResult[i].strCategoryThumb}" alt="" />
            <div class="layer">
              <h2>${finalResult[i].strCategory}</h2>
            </div>
          </div>
        </div>
    `;
    }
    $("#mealsList .row").html(cartona);
    let mealsItems = $("#mealsList .row .meal");
    categoriesDetails(mealsItems, finalResult);
  }
  function categoriesDetails(mealsItems, finalResult) {
    for (let i = 0; i < finalResult.length; i++) {
      $(mealsItems[i]).click(function (e) {
        let categoryName = finalResult[i].strCategory;
        getCategoryMealsApi(categoryName);
      });
    }
  }
  async function getCategoryMealsApi(meals) {
    $(".lds-facebook").fadeIn(0, function () {
      $("#loadingScreen").fadeIn(0);
    });
    var apiRespone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meals}`,
      {
        method: "GET",
      }
    );
    let finalResult = await apiRespone.json();
    finalResult = finalResult.meals;
    displayCategoryMeals(finalResult);
    $(".lds-facebook").fadeOut(500, function () {
      $("#loadingScreen").fadeOut(500);
    });
  }
  function displayCategoryMeals(finalResult) {
    let cartona = ``;
    for (let i = 0; i < finalResult.length; i++) {
      cartona += `
    <div class="meal col-md-6 col-lg-3">
          <div class="inner position-relative rounded-1 overflow-hidden text-center">
            <img class="img-fluid rounded-1" src="${finalResult[i].strMealThumb}" alt="" />
            <div class="layer">
              <h2>${finalResult[i].strMeal}</h2>
            </div>
          </div>
        </div>
    `;
    }
    $("#mealsList .row").html(cartona);
    let mealsItems = $("#mealsList .row .meal");
    categoryMealDetails(mealsItems, finalResult);
  }
  function categoryMealDetails(mealsItems, finalResult) {
    for (let i = 0; i < finalResult.length; i++) {
      $(mealsItems[i]).click(function (e) {
        let mealId = finalResult[i].idMeal;
        findMealsId(mealId);
      });
    }
  }
  async function findMealsId(id) {
    $(".lds-facebook").fadeIn(0, function () {
      $("#loadingScreen").fadeIn(0);
    });
    let apiRespone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      {
        method: "GET",
      }
    );
    let finalResult = await apiRespone.json();
    finalResult = finalResult.meals[0];
    console.log(finalResult);
    displayMealsDetailsId(finalResult);
    $(".lds-facebook").fadeOut(500, function () {
      $("#loadingScreen").fadeOut(500);
    });
  }
  function displayMealsDetailsId(finalResult) {
    let ingredientCartona = ``;
    let tagsCartona = ``;
    let ingredient = [
      finalResult.strIngredient1,
      finalResult.strIngredient2,
      finalResult.strIngredient3,
      finalResult.strIngredient4,
      finalResult.strIngredient5,
      finalResult.strIngredient6,
      finalResult.strIngredient7,
      finalResult.strIngredient8,
      finalResult.strIngredient9,
      finalResult.strIngredient10,
      finalResult.strIngredient11,
      finalResult.strIngredient12,
      finalResult.strIngredient13,
      finalResult.strIngredient14,
      finalResult.strIngredient15,
      finalResult.strIngredient16,
      finalResult.strIngredient17,
      finalResult.strIngredient18,
      finalResult.strIngredient19,
      finalResult.strIngredient20,
    ];
    if (finalResult.strTags != null) {
      let tags = finalResult.strTags.split(",");
      console.log(tags);
      for (let i = 0; i < tags.length; i++) {
        tagsCartona += `
          <li class="my-3 mx-1 p-1 alert-danger rounded d-inline-block">${tags[i]}</li>
          `;
      }
    }

    for (let i = 0; i < ingredient.length; i++) {
      if (ingredient[i] != "") {
        ingredientCartona += `
          <li class="my-3 mx-1 p-1 alert-success rounded-1">${ingredient[i]}</li>
          `;
      }
    }
    // console.log(finalResult);
    $("#mealsList .row").html(`
    <div class="col-md-4 text-white">
       <img class="img-fluid" src="${finalResult.strMealThumb}" alt="" />
       <h1 class="text-center">${finalResult.strMeal}</h1>
    </div>
    </div>
    <div class="col-md-8 ps-4 text-white">
       <h2 class="instruction">Instructions</h2>
       <p class="instParagraph">${finalResult.strInstructions}</p>
       <p><b>Area: </b>${finalResult.strArea}</p>
       <p><b>Category: </b>${finalResult.strCategory}</p>
       <h3>Receipes:</h3>
    <ul class="d-flex flex-wrap" id="recipes" style="padding: 0">
    ${ingredientCartona}
    </ul>
    <h3>Tags :</h3>
    ${tagsCartona}
    <div class="mt-3">
    <a class="btn btn-success text-white" target="_blank" href="https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/">Source</a>
    <a class="btn youtube text-white" target="_blank" href="https://www.youtube.com/watch?v=VVnZd8A84z4">Youtub</a>
    </div>
    </div>
    `);
  }

  $(".item-2").click(function () {
    document.getElementById("contact-us").style.cssText =
      "display: none !important";
    listbottom();
    $("#mealsList").css({ display: "block" });
    $("#searchSection").addClass("invisible");
    categoryApi();
  });
  /* ==============>End categories Section <========== */

  /*================> Start Area Section <============== */
  $(".item-3").click(function () {
    document.getElementById("contact-us").style.cssText =
      "display: none !important";
    listbottom();
    $("#mealsList").css({ display: "block" });
    $("#searchSection").addClass("invisible");
    displayArea();
  });
  async function displayArea() {
    $(".lds-facebook").fadeIn(0, function () {
      $("#loadingScreen").fadeIn(0);
    });
    let apiRespone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let finalResult = await apiRespone.json();
    finalResult = finalResult.meals;

    let cartona = "";
    for (let i = 0; i < finalResult.length; i++) {
      cartona += `
      <div class="meal col-md-6 col-lg-3 text-center ">
      <i class="fa-solid fa-city fa-3x"></i>
      <h2 class="text-white">${finalResult[i].strArea}</h2>
      </div>
      `;
    }
    $("#mealsList .container").html(
      `
      <div class="row g-5 py-5">
      ${cartona}
      </div>
      `
    );
    let mealsItems = $("#mealsList .row .meal");
    $(mealsItems).click(function (e) {
      let countryName = $(e.currentTarget.children[1]).text();
      countryMealsApi(countryName);
    });
    $(".lds-facebook").fadeOut(500, function () {
      $("#loadingScreen").fadeOut(500);
    });
  }
  async function countryMealsApi(countryName) {
    $(".lds-facebook").fadeIn(0, function () {
      $("#loadingScreen").fadeIn(0);
    });
    var apiRespone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryName}`,
      {
        method: "GET",
      }
    );
    let finalResult = await apiRespone.json();
    finalResult = finalResult.meals;
    displayCategoryMeals(finalResult);
    $(".lds-facebook").fadeOut(500, function () {
      $("#loadingScreen").fadeOut(500);
    });
  }
  /*================> End Area Section <================ */

  /* =====> Loading Screen Section <==== */

  /* Start Ingredients Section */
  $(".item-4").click(function () {
    document.getElementById("contact-us").style.cssText =
      "display: none !important";
    listbottom();
    $("#mealsList").css({ display: "block" });
    $("#searchSection").addClass("invisible");
    getIngredientsApi();
  });
  async function getIngredientsApi() {
    $(".lds-facebook").fadeIn(0, function () {
      $("#loadingScreen").fadeIn(0);
    });
    let apiRespone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let finalResult = await apiRespone.json();
    finalResult = finalResult.meals.splice(0, 20);
    displayIngredients(finalResult);
    $(".lds-facebook").fadeOut(500, function () {
      $("#loadingScreen").fadeOut(500);
    });
  }

  function displayIngredients(finalResult) {
    let cartona = ``;
    for (let i = 0; i < finalResult.length; i++) {
      let ingParagraph = finalResult[i].strDescription
        .split(" ")
        .splice(0, 20)
        .join(" ");
      cartona += `
      <div class="meal col-md-6 col-lg-3 text-center">
          <i class="fa-solid fa-bowl-food fa-3x"></i>
          <h2 class="text-white">${finalResult[i].strIngredient}</h2>
          <p class="text-white">${ingParagraph}</p>
      </div>
      `;
      $("#mealsList .row").html(cartona);
      let mealsList = $("#mealsList .meal");
      for (let i = 0; i < finalResult.length; i++) {
        $(mealsList[i]).click(function (e) {
          let mealName = finalResult[i].strIngredient;
          getIngredientsMealsApi(mealName);
        });
      }
    }
  }
  async function getIngredientsMealsApi(meals) {
    $(".lds-facebook").fadeIn(0, function () {
      $("#loadingScreen").fadeIn(0);
    });
    var apiRespone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${meals}`,
      {
        method: "GET",
      }
    );
    let finalResult = await apiRespone.json();
    finalResult = finalResult.meals;
    displayCategoryMeals(finalResult);
    $(".lds-facebook").fadeOut(500, function () {
      $("#loadingScreen").fadeOut(500);
    });
  }

  /* End Ingredients Section */

  $(".item-5").click(function () {
    $("#mealsList").css({ display: "none" });
    listbottom();
    $("#searchSection").addClass("invisible");
    document.getElementById("contact-us").style.cssText =
      "display: block !important";
  });
  /* Contact-us */
  let userName = document.getElementById("userName");
  let userEmail = document.getElementById("userEmail");
  let userPhone = document.getElementById("userPhone");
  let userAge = document.getElementById("userAge");
  let firstPassword = document.getElementById("firstPassword");
  let rePassword = document.getElementById("rePassword");

  userName.addEventListener("input", function () {
    document.getElementById("icon-1").style.cssText =
      "display:inline-block !important";
    let name = userName.value;
    let regax = /^[a-zA-z]{3,10}$/;
    contactRegax(regax, "#userName", name, "#icon-1", "#x-p1");
  });
  userEmail.addEventListener("input", function () {
    document.getElementById("icon-2").style.cssText =
      "display:inline-block !important";
    let email = userEmail.value;
    let regax = /^[a-z0-9A-z]{4,20}@[a-z]{3,10}[.][a-z]{2,10}$/;
    contactRegax(regax, "#userEmail", email, "#icon-2", "#x-p2");
  });
  userPhone.addEventListener("input", function () {
    document.getElementById("icon-3").style.cssText =
      "display:inline-block !important";
    let phone = userPhone.value;
    let regax = /^(02){0,1}01[0125][0-9]{8}$/;
    contactRegax(regax, "#userPhone", phone, "#icon-3", "#x-p3");
  });
  userAge.addEventListener("input", function () {
    document.getElementById("icon-4").style.cssText =
      "display:inline-block !important";
    let age = userAge.value;
    let regax = /^(16|17|18|19|[2-9][0-9]|100)$/;
    contactRegax(regax, "#userAge", age, "#icon-4", "#x-p4");
  });
  firstPassword.addEventListener("input", function () {
    document.getElementById("icon-5").style.cssText =
      "display:inline-block !important";
    let fPassword = firstPassword.value;
    let regax = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    contactRegax(regax, "#firstPassword", fPassword, "#icon-5", "#x-p5");
    rePasswordValidation();
  });
  rePassword.addEventListener("input", function () {
    rePasswordValidation();
  });
  function rePasswordValidation() {
    document.getElementById("icon-6").style.cssText =
      "display:inline-block !important";
    let myRePassword = rePassword.value;
    let fPassword = firstPassword.value;
    if (fPassword == myRePassword) {
      $("#x-p6").addClass("d-none");
      $("#rePassword").removeClass("border-wrong");
      $("#rePassword").addClass("border-correct");
      $("#icon-6").removeClass("fa-x");
      $("#icon-6").addClass("fa-check");
    } else {
      $("#x-p6").removeClass("d-none");
      $("#rePassword").removeClass("border-correct");
      $("#rePassword").addClass("border-wrong");
      $("#icon-6").addClass("fa-x");
      $("#icon-6").removeClass("fa-check");
    }
  }

  function contactRegax(regax, inputId, name, icon, paragraph) {
    if (regax.test(name) == true) {
      $(paragraph).addClass("d-none");
      $(inputId).removeClass("border-wrong");
      $(inputId).addClass("border-correct");
      $(icon).removeClass("fa-x");
      $(icon).addClass("fa-check");
    } else {
      $(paragraph).removeClass("d-none");
      $(inputId).removeClass("border-correct");
      $(inputId).addClass("border-wrong");
      $(icon).addClass("fa-x");
      $(icon).removeClass("fa-check");
    }
  }
  let allContactinput = $("#contact-us .row input");
  let allInput = document.querySelectorAll("#contact-us input");
  for (let i = 0; i < allInput.length; i++) {
    allInput[i].addEventListener("blur", function () {
      checkValidation();
    });
  }
  function checkValidation() {
    for (let i = 0; i < allContactinput.length; i++) {
      if (
        $(allContactinput[i]).css("border-bottom-color") != "rgb(0, 128, 0)"
      ) {
        $("#contactBtn").addClass("disabled");
        return false;
      }
    }
    $("#contactBtn").removeClass("disabled");
  }
  $(".lds-facebook").fadeOut(1000, function () {
    $("#loadingScreen").fadeOut(1000);
    $("#loadingScreen").css({ backgroundColor: "transparent" });
  });
});
