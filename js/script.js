$.fn.pswdChecker = function() {
    var $pStrength = $(".pStrength li"),
        $breakDown = $(".breakDown");

    $pStrength.hide();
    $breakDown.hide();
    // select the INPUT password element,
    // and attach keyup and keydown events to it
    $("#password").on("keyup keydown", function(msg)
    {
        var password = $(this).val();

        // Calculate strength
        var strength = 0;

        var baseP = 50; // points per test
        var lPoints = 1;
        var Ucasep = 4;
        var nPoints = 5;
        var symPoints = 5;
        var combPoints = 25;
        var lcaseOnly = 0;
        var numbOnly = 0;

        var req = 0;

        var Ucase = /[A-Z]/g; // Contains uppercase letters
        var lcase = /[a-z]/g; // Contains lowercase letters
        var numb = /[0-9]/g; // Contains digits
        var symb = /[~`!@#$%^&*_+-]/g; // Contains a special character
        if (password.length > 0) {
            $(".breakDown li *").text("");
            strength +=(password.length * 1);
            strength +=baseP;
            console.log(strength);
            $breakDown.show();
            $(".breakDown .bs span").text(baseP);
            $(".breakDown .length span").text((password.length * 1));
        } else {
            $breakDown.hide();
        }
        if (password.match(Ucase) != null) {
            strength += (Ucasep  * password.replace(/[^A-Z]/g, "").length);
            $(".breakDown .uBonus span").text((Ucasep  * password.replace(/[^A-Z]/g, "").length));
            req += 1;
        }
        if (password.match(lcase) != null) {
            req += 1;
        }
        if (password.match(numb) != null) {
            strength += (nPoints * password.replace(/[^0-9]/g, "").length);
            $(".breakDown .nBonus span").text((nPoints * password.replace(/[^0-9]/g, "").length));
            req += 1;
        }
        if (password.match(symb) != null) {
            console.log(password.match(/[~`!@#$%^&*_+-]/g, "").length)
            strength += (symPoints * password.match(/[~`!@#$%^&*_+-]/g, "").length);
            $(".breakDown .sBonus span").text((symPoints * password.match(/[~`!@#$%^&*_+-]/g, "").length));
            req += 1;
        }
        $(".breakDown .tScore span").text(strength);
        $pStrength.hide();
        switch (req) {
            case 1:
                $(".pStrength .weak").show();
                break;
            case 2:
                $(".pStrength .average").show();
                break;
            case 3:
                $(".pStrength .strong").show();
                break;
            case 4:
                $(".pStrength .secure").show();
                strength += combPoints;
                $(".breakDown .cBonus span").text(combPoints);
                $(".breakDown .tScore span").text(strength);
                break;
            default:
                $pStrength.hide();
        }
    });
};

$.fn.pswdChecker();