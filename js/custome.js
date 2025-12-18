(function ($) {
  // Dynamic Page Spacer
  $(window).on("load resize", function () {
    var mode = "desktop";
    if (matchMedia("only screen and (max-width: 991px)").matches)
      mode = "mobile";
    if (matchMedia("only screen and (max-width: 767px)").matches)
      mode = "smobile";
    $(".page-spacer").each(function () {
      if (mode === "desktop") {
        $(this).attr("style", "height:" + $(this).data("desktop") + "px");
      } else if (mode == "mobile") {
        $(this).attr("style", "height:" + $(this).data("mobile") + "px");
      } else {
        $(this).attr("style", "height:" + $(this).data("smobile") + "px");
      }
    });
  });

  // if (matchMedia('only screen and (max-width: 991px)').matches){
  //     $("#carousel-status").removeClass("owl-carousel owl-theme page-carousel owl-loaded");
  // }

  //nav on scroll
  $(document).ready(function () {
    var s = $(".header_wrap");
    var pos = s.position();
    $(window).scroll(function () {
      var windowpos = $(window).scrollTop();
      if (windowpos >= 100) {
        s.addClass("stick");
      } else {
        s.removeClass("stick");
      }
    });
  });

  //scroll to section
  $(".m-link").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        1000,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          // window.location.hash = hash;
        }
      );
    } // End if
  });

  //=============Dynamic Spacer

  // $(window).on('load', function () {
  //     setTimeout(function () {
  //         $('.page_loader').fadeOut();
  //     }, 2000)
  // });

  $(".acedemies_carousel").owlCarousel({
    loop: true,
    nav: true,
    margin: 0,
    dots: false,
    autoplay: false,
    smartSpeed: 2000,
    autoplayTimeout: 10000,
    navText: ["<img src='images/next.svg'>", "<img src='images/next.svg'>"],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      992: {
        items: 3,
      },
    },
  });
  $(".ame_carousel").owlCarousel({
    loop: true,
    nav: true,
    margin: 30,
    dots: false,
    autoplay: false,
    smartSpeed: 2000,
    autoplayTimeout: 10000,
    navText: ["<img src='images/next.svg'>", "<img src='images/next.svg'>"],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 1,
      },
    },
  });

  //===========stellar backgroung parellax

  // $.stellar({
  //     horizontalScrolling: false,
  //     verticalOffset: 40
  // });

  //==========AOS Initialization

  AOS.init({
    //easing: 'ease-in-out-sine'
    easing: "ease-out-back",
  });

  new WOW().init();

  $(".readmore").click(function () {
    $(this)
      .find("span")
      .html(
        $(this).find("span").html() == "Read More" ? "Read Less" : "Read More"
      );
  });

  $(".cust_show_more").click(function () {
    if ($(this).hasClass("is_close")) {
      $(this).removeClass("is_close");
      $(".read_more_wrap").addClass("is_open");
    } else {
      $(this).addClass("is_close");
      $(".read_more_wrap").removeClass("is_open");
    }
  });

  // Jquery Mobile Validation
  jQuery.validator.addMethod(
    "country",
    function (value, element) {
      return this.optional(element) || /^[^+]/.test(value);
    },
    "Enter Number Without Country Code"
  );
  // jQuery.validator.addMethod(
  //   "number",
  //   function (value, element) {
  //     return this.optional(element) || value.match(/^[1-9][0-9]*$/);
  //   },
  //   "Please enter the number without beginning with '0'"
  // );
  jQuery.validator.addMethod(
    "intlinput",
    function (value, element) {
      return (
        this.optional(element) || jQuery(element).intlTelInput("isValidNumber")
      );
    },
    "Please enter a valid mobile number"
  );
  jQuery.validator.addMethod(
    "alphabets",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
    },
    "Please enter Alphabets only"
  );
  // jQuery.validator.addMethod("email", function (value, element) {
  //     return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  // }, "Please enter a valid email address.");
  jQuery.validator.addMethod(
    "valueNotEquals",
    function (value, element, arg) {
      return arg !== value;
    },
    "Value must not equal arg."
  );


  jQuery.validator.addMethod(
    "fivenumber",
    function (value, element) {
      return this.optional(element) || /^(?!(\d)\1{4})\d+$/.test(value);
    },
    "Please enter a valid mobile number"
  );

  jQuery.validator.addMethod(
    "novalidnumber",
    function (value, element) {
      return this.optional(element) || /^[6789]\d{9}$/.test(value);
    },
    "Please enter a valid mobile number"
  );

  var contform = $("#contact-form");
  if (contform.length > 0) {
    contform.validate({
      rules: {
        fname: {
          required: true,
          maxlength: 100,
        },
        mobile: {
          required: true,
          number: true,
          minlength: 10,
          maxlength: 10,
          novalidnumber: true,
          fivenumber: true,
        },
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        fname: {
          required: "Enter Your Name",
        },
        mobile: {
          required: "Enter Your Valid Number",
        },
        email: {
          required: "Enter Your Valid Email",
        },
        otp: {
          required: "Please Enter OTP",
        },
      },
    });
  }

  var main_form = $("#main-form");
  if (main_form.length > 0) {
    main_form.validate({
      rules: {
        fname: {
          required: true,
          maxlength: 100,
        },
        mobile: {
          required: true,
          number: true,
          minlength: 10,
          maxlength: 10,
          novalidnumber: true,
          fivenumber: true,
        },
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        fname: {
          required: "Enter Your Name",
        },
        mobile: {
          required: "Enter Your Valid Number",
        },
        email: {
          required: "Enter Your Valid Email",
        },
      },
    });
  }

  var contact_form = $("#contact-form");
  if (contact_form.length > 0) {
    contact_form.validate({
      rules: {
        fname: {
          required: true,
          maxlength: 100,
        },
        mobile: {
          required: true,
          number: true,
          minlength: 10,
          maxlength: 10,
          novalidnumber: true,
          fivenumber: true,
        },
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        fname: {
          required: "Enter Your Name",
        },
        mobile: {
          required: "Enter Your Valid Number",
        },
        email: {
          required: "Enter Your Valid Email",
        },
      },
    });

    // Sell.do API push
    const SELLDO_API = "https://app.sell.do/api/leads/create";
    const SELLDO_API_KEY = "e671547fdcfa16ba3f4dc662863b07e2";

    const getParam = (key) => new URLSearchParams(window.location.search).get(key) || "";

    contact_form.on("submit", function (e) {
      if (!contact_form.valid()) {
        return;
      }
      e.preventDefault();

      const name = $("#contact-fname").val().trim();
      const email = $("#contact-email").val().trim();
      const phone = $("#contact-mobile").val().trim();
      const message = $("#price-enqproject").val() || "";
      const srd = getParam("srd") || "";

      const payload = {
        sell_do: {
          analytics: {
            utm_content: getParam("utm_content"),
            utm_term: getParam("utm_term"),
            utm_source: getParam("utm_source"),
            utm_medium: getParam("utm_medium"),
            utm_campaign: getParam("utm_campaign"),
          },
          campaign: { srd },
          form: {
            requirement: { property_type: "flat" },
            lead: { name, phone, email },
            note: { content: message },
          },
        },
        api_key: SELLDO_API_KEY,
      };

      $.ajax({
        url: SELLDO_API,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function () {
          alert("Thank you! We have received your details.");
          contact_form.trigger("reset");
        },
        error: function (xhr) {
          console.error("Sell.do push failed", xhr.responseText || xhr.statusText);
          alert("Unable to submit right now. Please try again.");
        },
      });
    });
  }
})(jQuery);
