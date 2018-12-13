import "./css/public.scss";
import "./css/activeNotice.scss";

import {
  AssisFunc,
  baseUrl
} from "./js/public.js";

import "jquery";

$(function() {
  AssisFunc("#assis_wrap", 2);
  console.log(baseUrl);
  var str = "5D83B28D28C6F4A7E201C99606E945FC%1DrKz1KYyjFDdCOsfXfZ%2Fn5T9ieqqyX0cgAu64pjQ8oQOHFnWz9C6Q4AwT%2B4OAhG%2FTsrFahxutlF015jLyWuSHDcKCPRBP4O2KnqgQ%2BqF80Ks%3D%1DMNniBaFSAl5w3ullZ%2BXWXPdVwSOMbD%2B49NkQg%2BVoEBbiCZEtq0vspce3nSAU%2BqQyW9HEZ6u6w2kRbyUN%2FoyeQvPRv4QW6i2Ukij41pUgkKQpgCyHCTpM1NXXk1LzcF82aRPR%2B7fE4rIjbPEYozeVs5hQ9omoCqDOdAh8qJ1p6GY%3D";

  function getUserList(sign) {
    $.ajax({
      url: baseUrl.api + "/active/getSharePageShowInfo.json",
      dataType: "jsonp",
      type: "GET",
      data: {
        // "sign": decodeURI(sign),
        activeId:3,
        userCenterId:"1f2fd1ac1dd7b944c4ce34f9ed265ab6"
      },
      success: usersShowSuccess
    });
  }

  getUserList(str);

  function usersShowSuccess(data) {
    console.log(data);
  }

})
