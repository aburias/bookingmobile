$("[data-role=page]").on("pageinit", function () {
    //$.session.clear();
    InitializeSiteConfig();
});

// --------------------------------------------------------------//
// ------------------- BOOK NOW FUNCTIONS ---------------- //
// --------------------------------------------------------------//
$("#user-info").on("pageshow", function () {
    InitializeBookNowInfo();
});

$("#user-info").on("pageinit", function () {
    InitializeBooknowEvents();
});

function InitializeBookNowInfo() {
    var selectedDate = $.session.get("booking-date");
    var selectedTime = $.session.get("selected-interval");
    if (selectedDate == undefined || selectedDate == null || selectedTime == null || selectedTime == undefined) {
        $.mobile.changePage("#bookings");
    } else {
        var longDate = Date.parse(selectedDate).toString('dddd, MMMM d, yyyy');
        $("#date-info").html(longDate);
        $("#time-info").html(selectedTime);
        $("#service-info").html($("#services-list option:selected").text());
        $("#product-info").html($("#product-list option:selected").text());
    }
}

function InitializeBooknowEvents() {
    $("#book-now-form").submit(function () {
        var selectedDate = $("#booking-date").val();
        var selectedService = $("#services-list").val();
        var selectedProduct = $("#product-list").val();
        var selectedTime = $.session.get("selected-interval");
        var establishmentIdentifier = $("#site-identifier").val();
        var name = $("#customer-name").val();
        var email = $("#customer-email").val();

        var serviceUrl = $("#service-url").val();
        $.mobile.showPageLoadingMsg("b", "Saving Bookings...");
        $.post(serviceUrl + "booking", { name: name, email: email, selectedDate: selectedDate, selectedTime: selectedTime, serviceId: selectedService, productId: selectedProduct, establishmentIdentifier: establishmentIdentifier }, function () {
            $.mobile.hidePageLoadingMsg();
            alert("Booking successfully saved!");
            $.mobile.changePage("#bookings");
        });

        return false;
    });
}

function GetDayString(dayInt) {
    switch (dayInt) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
    }
}

// --------------------------------------------------------------//
// ------------------- PRODUCT DETAIL FUNCTIONS ---------------- //
// --------------------------------------------------------------//
$("#product-detail").on("pageshow", function () {
    if ($.session.get("product-list") == undefined) {
        PopulateProducts();
    } else {
        PopulateIntervals($("#product-list").val());
    }
    
    if ($("#booking-time-container a").length <= 0) {
        $.mobile.showPageLoadingMsg("b", "Finding Available Slots...");
    }
});

$("#product-detail").on("pageinit", function () {
    //$.session.remove("service");
    PopulateProducts();
    InitializeProductEvents();
});

function InitializeProductEvents() {
    $("#finalize-booking").click(function () {
        if ($.session.get("selected-interval") == undefined) {
            alert("Please select booking time...");
            return false;
        }
    });

    $("#product-list").change(function () {
        //$.session.remove("service");
        //PopulateProducts();
        PopulateIntervals($(this).val());
    });
}

function PopulateIntervals(productId) {
    $("#booking-time-container").html("");
    var bookingDate = $.session.get("booking-date");
    var serviceUrl = $("#service-url").val();
    $.mobile.showPageLoadingMsg("b", "Finding Available Slots...");
    $.get(serviceUrl + "product", { id: productId }, function (product) {
        $.mobile.hidePageLoadingMsg();
        $.session.remove("booking-intervals");
        $.session.remove("selected-interval");
        //alert(product.Establishment);
        //alert(product.Establishment.BusinessHours);
        if (product.Establishment.BusinessHours.length > 0) {
            $.each(product.Establishment.BusinessHours, function (bIndex, businessHour) {
                var bookingDay = GetDayString(Date.parse(bookingDate).getDay());
                if (businessHour.Day == bookingDay) {
                    {
                        $.each(businessHour.Intervals, function (iIndex, interval) {
                            var available = true;
                            $.each(product.Establishment.Bookings, function (bkIndex, booking) {
                                var existingBooking = Date.parse(booking.StartDateTime).toString("MM/dd/yyyy HH:mm:ss");
                                var existingProductId = booking.ProductId;
                                var currentBooking = Date.parse(bookingDate + " " + interval).toString("MM/dd/yyyy HH:mm:ss");
                                var currentProductId = $("#product-list").val();

                                if (existingBooking == currentBooking) {
                                    if (existingProductId == currentProductId) {
                                        available = false;
                                    }
                                }
                            });
                            if ($(".booking-interval a:contains('" + interval + "')").length <= 0) {
                                if (available) {
                                    $("#booking-time-container").append("<div class='booking-interval'><a class='available' href='#'>" + interval + "</a></div>");
                                } else {
                                    $("#booking-time-container").append("<div class='booking-interval'><a class='unavailable' href='#'>" + interval + "</a></div>");
                                }
                            }

                        });
                    }
                }
            });
        }
        SetBookingIntervalEvents();
    }, "json");
}

function PopulateProducts() {
    var serviceUrl = $("#service-url").val();
    var selectedService = $.session.get("selected-service");
    if ($.session.get("product-list") == undefined) {
        $.mobile.showPageLoadingMsg("b", "Finding " + $.session.get("product-name") + "s...");
        $.get(serviceUrl + "service", { id: selectedService }, function (service) {
            $.session.set("service", JSON.stringify(service));
            $.mobile.hidePageLoadingMsg();
            if (service != null) {
                $("#product-list").html("");
                if (service.Products.length > 0) {
                    $.session.set("product-list", JSON.stringify(service.Products));
                    $.each(JSON.parse($.session.get("product-list")), function (pIndex, product) {
                        $("#product-list").append("<option value=" + product.Id + ">" + product.Name + "</option>");
                    });
                } else {
                    $("#product-list").html("<option>No Available " + $.session.get("product-name") + "</option>");
                }
                $("#product-list").selectmenu("refresh");
            }
            PopulateIntervals($("#product-list").val());
            //InitializeProductPage(service, bookingDate);
        }, "json");
    } else {
        $("#product-list").html("");
        if (JSON.parse($.session.get("product-list").length > 0)) {
            $.each(JSON.parse($.session.get("product-list")), function(pIndex, product) {
                $("#product-list").append("<option value=" + product.Id + ">" + product.Name + "</option>");
            });
        } else {
            $("#product-list").html("<option>No Available " + $.session.get("product-name") + "</option>");
        }
        $("#product-list").selectmenu("refresh");
        PopulateIntervals($("#product-list").val());
    }
}

function SetBookingIntervalEvents() {
    if ($(".booking-interval a").length > 0) {
        $(".booking-interval a").click(function() {
            $(".booking-interval a").removeClass("selected-interval");
            $.session.remove("selected-interval");
            if ($(this).hasClass("unavailable")) {
                alert("Please select another time slot\nor Choose a different " + $.session.get("product-name"));
            } else {
                $(".booking-interval a").removeClass("selected-interval");
                $(this).addClass("selected-interval");
                $.session.set("selected-interval", $(this).html());
            }
        });
    } else {
        $("#booking-time-container").html("<h3>No Available Booking Slot</h3>");
    }
    //$("#booking-time-container").css("padding-left", ($(".booking-interval").length * $(".booking-interval").width()) / 2);
}

// --------------------------------------------------------------//
// -------------------- MAIN FUNCTIONS ------------------------- //
// --------------------------------------------------------------//
$("#bookings").on("pageinit", function () {
    //$.mobile.showPageLoadingMsg("b", "Loading Services...");
    InitializeMainEvents();
    InitializeMainDefaultValues();
    PopulateServices();
});

function InitializeMainDefaultValues() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    $.session.set("booking-date", curr_year + "-" + curr_month + "-" + curr_date);
    $("#booking-date").val($.session.get("booking-date"));
}

$("#bookings").on("pageshow", function () {
    if ($.session.get("services") == undefined) {
        $.mobile.showPageLoadingMsg("b", "Loading Services...");
    }
    InitializeMainWidgets();
});

function InitializeSiteConfig() {
/*
    if ($.session.get("establishment-name") == undefined || $.session.get("establishment-address") == undefined) {
        $.mobile.changePage("#bookings");
    }
*/
    var services = $("#site-services").val();
    var product = $("#site-product").val();
    $.session.set("services-name", services);
    $.session.set("product-name", product);
    $(".service").text($.session.get("services-name"));
    $(".product").text($.session.get("product-name"));

    $(".establishment-name").text($.session.get("establishment-name"));
    $(".establishment-address").text($.session.get("establishment-address"));
}

function InitializeMainWidgets() {
    $('#booking-date').Zebra_DatePicker(
        {
            onSelect: function () {
                $.session.set("booking-date", $("#booking-date").val());
                //$.session.remove("product-list");
            }
        });
}

function InitializeMainEvents() {
    $("#find-appointments").click(function () {
        //$.mobile.showPageLoadingMsg("b", "Finding Appointments...");
        //$.mobile.changePage("#product-detail");
        //alert($.session.get("selected-service"));
        //alert($.session.get("booking-date"));
    });

    $("#services-list").change(function () {
        $.session.set("selected-service", $(this).val());
        $.session.remove("product-list");
    });
}

function PopulateServices() {
    var serviceUrl = $("#service-url").val();
    var siteIdentifier = $("#site-identifier").val();
    var siteCurrency = $("#site-currency").val();
    //$.session.clear();
    if ($.session.get("services") == undefined || $.session.get("establishment-name") == undefined || $.session.get("establishment-address") == undefined) {
        $.mobile.showPageLoadingMsg("b", "Loading Services...");
        $.get(serviceUrl + "establishment/?$filter=EstablishmentIdentifier eq '" + siteIdentifier + "'", {}, function (result) {
            $.mobile.hidePageLoadingMsg();
            if (result.length > 0) {
                $.session.set("establishment-name", result[0].Name);
                $.session.set("establishment-address", result[0].Address);
                $(".establishment-name").text($.session.get("establishment-name"));
                $(".establishment-address").text($.session.get("establishment-address"));
                if (result[0].Services.length > 0) {
                    $.session.set("selected-service", result[0].Services[0].Id);
                    $.session.set("services", JSON.stringify(result[0].Services));
                    $("#services-list").html("");
                    $.each(JSON.parse($.session.get("services")), function (serviceIndex, service) {
                        var option = "<option value=" + service.Id + ">[" + service.Category + "] " + service.Name + " - " + service.Price + siteCurrency;
                        $("#services-list").append(option);
                    });
                } else {
                    $("#services-list").html("<option>No Services Available</option>");
                }
            } else {
                $("#services-list").html("<option>No Services Available</option>");
            }
            //if ($.session.get("selected-service") == undefined) {
            //    $("#services-list")[0].selectedIndex = 0;
            //} else {
            //    $("#services-list")[0].selectedIndex = $.session.get("selected-service");
            //}
            $("#services-list").selectmenu("refresh");
        }, "json");
    } else {
        $(".establishment-name").text($.session.get("establishment-name"));
        $(".establishment-address").text($.session.get("establishment-address"));
        $("#services-list").html("");
        $.each(JSON.parse($.session.get("services")), function (serviceIndex, service) {
            var option = "<option value=" + service.Id + ">[" + service.Category + "] " + service.Name + " - " + service.Price + siteCurrency;
            $("#services-list").append(option);
        });
        $("#services-list").selectmenu("refresh");
    }
}