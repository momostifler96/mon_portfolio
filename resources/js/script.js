

/*----------------------*/
$("#btn-ins").click(() => {

    $("#form_insc").attr("style", '')
    $("#form_insc").addClass("annimeform")
    $("#form_con").removeClass("")
    $("#form_con").hide()

    $(this).hide()
})

$("#link-connection").click(() => {
    $("#form_con").attr("style", '')
    $("#form_con").addClass("annimeform")
    $("#form_insc").removeClass("")
    $("#form_insc").hide()
})

$("#link-inscription").click(() => {

    $("#form_insc").attr("style", '')
    $("#form_insc").addClass("annimeform")
    $("#form_con").removeClass("")
    $("#form_con").hide()

})

function verification_de_champ_de_mot_de_pass(id_champ_de_saisir, id_champ_daficharge_erreur) {
    var g = document.getElementById(id_champ_de_saisir)
    var h = g.value;
    var v = document.getElementById(id_champ_daficharge_erreur);

    if (h.length < 1) {
        v.innerHTML = 'veillilez remplir le mots de pass';
        return true;

    } else if (h.length <= 7) {
        v.innerHTML = 'entrez aumoin 8 charctères';
        return true;

    } else {
        return false;
    }
}

function egaliter_de_champ_de_saisir(champ_1, champ_2) {

    let a = document.getElementById(champ_1).value;
    let b = document.getElementById(champ_2).value;
    if (a == b) {
        return false
    } else {
        return true
    }
}
/*---------login---------------- */
var formLogin = document.getElementById("form-login-user")
if (formLogin != null) {

    formLogin.addEventListener("submit", (e) => {

        e.preventDefault()

        let url_verif_User = $('#url-verif-login').attr("value")

        let inputNameLogin = document.getElementById('inputUserLogin');

        let inputPasswordLogin = document.getElementById('inp-user-password');

        let UserNAM = inputNameLogin.value
        let PassWord = inputPasswordLogin.value



        let token = $("input[name='_token']").attr("value")

        let formData = {
            "_token": token,
            "name": UserNAM,
            "password": PassWord

        }


        if (UserNAM != "" && PassWord != "") {

            if (UserNAM.length > 5 && PassWord.length > 8) {

                $.ajax({
                    type: "post",
                    url: url_verif_User,
                    data: formData,
                    success: (data) => {
                        console.log('requette login reusit');
                        console.log('data', data);
                        let response = data.response;

                        if (response == "userOk") {

                            formLogin.submit();

                        } else if (response == "existePas") {
                            alert('user not exist')
                            $('.error-user').html("cet utilisateur n'existe pas")

                            $("#inputUserLogin").attr("class", "input_text_error")
                            $("#inp-user-password").attr("class", "input_text_error")

                        } else if (response == "mdpPas") {
                            $("#inputUserLogin").attr("class", "input_text_error")
                            $("#inp-user-password").attr("class", "input_text_error")
                        }
                    }
                })
            } else {
                if (UserNAM.length < 5) {
                    $("#inputUserLogin").attr("class", "input_text_error")
                    $('.error-user').html("remplisé cavec aumoin 5 character")

                }
                if (PassWord.length < 8) {
                    $("#inp-user-password").attr("class", "input_text_error")
                    $('.error-password').html("remplisé cavec aumoin 8 character")

                }
            }
        } else {
            if (UserNAM == "") {
                $("#inputUserLogin").attr("class", "input_text_error")
                $('.error-user').html("remplisé ce champ corectement")


            }
            if (PassWord == "") {
                $("#inp-user-password").attr("class", "input_text_error")
                $('.error-password').html("remplisé ce champ corectement")

            }
        }
    })
}
var inputLogin = $(".form_conect input")

$(inputLogin[2]).on("input", () => {
    $("#inputUserLogin").attr("class", "input_text")
    $('.error-user').html("")

})

$(inputLogin[3]).on("input", () => {
    $("#inp-user-password").attr("class", "input_text")
    inputLogin[3].innerHTML = ""
    $('.error-password').html("")

})

$("#btn-conect").click(() => {
    $("#form_con").attr("style", '')
    $("#form_con").addClass("annimeform")
    $("#form_insc").removeClass("")
    $("#form_insc").hide()
    $(this).hide()

})

/*-------------------register--------------*/

var formRegist = document.getElementById("form-register-user")
if (formRegist != null) {

    formRegist.addEventListener("submit", (e) => {
        e.preventDefault();

        let input = $("#form-register-user input")
        $(input).attr("class", "input_text")

        let regist_cls = $(".regist-cls")
        $(regist_cls).html("")

        let UserNAM = input[2].value
        let Email = input[3].value

        let token = $("input[name='_token']").attr("value")

        let formData = {
            "_token": token,
            "name": UserNAM,
            "email": Email

        }

        if (input[2].value != "" && input[3].value != "" && input[4].value != "" && input[5].value != "") {

            let url_verif_User_reg = $('#url_inscription').attr("value")

            if (input[2].value.length > 5 && input[3].value.length > 8 && input[4].value.length > 8 && input[5].value.length > 8) {
                if (input[4].value == input[5].value) {

                    $.ajax({
                        type: "post",
                        url: url_verif_User_reg,
                        data: formData,
                        success: (data) => {
                            console.log('data', data);
                            let response = data.response;

                            if (response == "userName et Email Pris") {
                                $(input[2]).attr("class", "input_text_error")
                                $(regist_cls[0]).html("cet nom es deja pris chager svp")
                                $(input[3]).attr("class", "input_text_error")
                                $(regist_cls[1]).html("cet email es deja pris chager svp")

                            } else if (response == "userNamePris") {
                                $(input[2]).attr("class", "input_text_error")
                                $(regist_cls[0]).html("cet nom es deja pris chager svp")

                            } else if (response == "EmailPris") {
                                $(input[3]).attr("class", "input_text_error")
                                $(regist_cls[1]).html("cet email es deja pris chager svp")
                            } else if (response == "RAS") {
                                formRegist.submit();
                            }
                        }
                    })
                } else {
                    $(input[4]).attr("class", "input_text_error")
                    $(regist_cls[2]).html("le mots de pass ne corespond pas")
                    $(input[4]).attr("class", "input_text_error")
                    $(regist_cls[3]).html("le mots de pass ne corespond pas")
                }
            } else {
                if (input[2].value.length < 5) {
                    $(input[2]).attr("class", "input_text_error")
                    $(regist_cls[0]).html("remplisé cavec aumoin 5 character")
                }
                if (input[3].value.length < 8) {
                    $(input[3]).attr("class", "input_text_error")
                    $(regist_cls[1]).html("remplisé cavec aumoin 8 character")
                }
                if (input[4].value.length < 8) {
                    $(input[4]).attr("class", "input_text_error")
                    $(regist_cls[2]).html("remplisé cavec aumoin 8 character")
                }
                if (input[5].value.length < 8) {
                    $(input[5]).attr("class", "input_text_error")
                    $(regist_cls[3]).html("remplisé cavec aumoin 8 character")
                }
            }
        } else {
            if (input[2].value == "") {
                $(input[2]).attr("class", "input_text_error")
                $(regist_cls[0]).html("remplisé ce champ corectement")
            }
            if (input[3].value == "") {
                $(input[3]).attr("class", "input_text_error")
                $(regist_cls[1]).html("remplisé ce champ corectement")
            }
            if (input[4].value == "") {
                $(input[4]).attr("class", "input_text_error")
                $(regist_cls[2]).html("remplisé ce champ corectement")
            }
            if (input[5].value == "") {
                $(input[5]).attr("class", "input_text_error")
                $(regist_cls[3]).html("remplisé ce champ corectement")
            }
        }
    })
}
$('#spn-usr-inf').click(()=>{

    let span = $("#pop-user-info").attr('class')
    console.log('span:', )

    let i = span.indexOf('anim-fade')
    if(i !=-1){

        $("#pop-user-info").removeClass('anim-fade')
        $("#pop-user-info").hide()
        console.log('spanfgf:', span)

    }
    else{
        $("#pop-user-info").attr('style',"")
        $("#pop-user-info").addClass('anim-fade')
        console.log('spanaaaa:', span)


    }

})


/**---------- */
$(document).ready(()=>{

    let compteur = 0;

    let timer,element ,slider;
    const diapo_content = document.querySelector(".diapo-content");
    diapo = document.querySelector('.diapo');
    element = document.querySelectorAll('.element');
    sliderWhidth = diapo_content.getBoundingClientRect().width;
    slider = Array.from(diapo.children);
    firstImage = diapo.firstElementChild.cloneNode(true);
    diapo.appendChild(firstImage)
    console.log('firstImage :', firstImage )

    $(".diapo-slid_btn-left").click(()=>{

        let decalsc = -sliderWhidth * compteur;
        let decals = decalsc + sliderWhidth
        console.log('decal22:', decals)
        diapo.style.transition = "1s linear";
        diapo.style.transform = `translateX(${decals}px)`;


        compteur--
        console.log('compteur:', compteur)
    })
    function nextSlid(){

        console.log('sliderWhidth:', sliderWhidth)
        stl = $('.pation')
        console.log('stl :', stl )
        let pat = compteur+1
        $('.pation').removeClass("tran-top")
        $(stl[pat]).addClass("tran-top")
        console.log('compteur:', compteur)
        compteur++
        let decal = -sliderWhidth * compteur;
        console.log('decal:', decal)
        diapo.style.transition = "1s linear";
        diapo.style.transform = `translateX(${decal}px)`;

        setTimeout(()=>{
            if(compteur >=slider.length){
                compteur = 0;
                diapo.style.transition = "unset";
                let set1 = setInterval(() => {
                    diapo.style.transform = `translateX(0)`;
                    clearInterval(set1)
                }, 3000);
            }
        },1000)
    }



    $(".diapo-slid_btn-right").click(()=>{
    nextSlid()


    })
})
/*-------------------*/
$("#chargeur-image-profile").click(()=>{
        $("#photo-profile").click()
})


$("i#btn-active-nav-lat").click(()=>{

        let clas = $(".dv-new-vehicule").attr('class')

        if(clas.indexOf("nav-left-wd") == -1){
            $(".dv-new-vehicule").attr('style',"width:300px")
            $(".dv-new-vehicule").addClass('nav-left-wd')
            $("i#btn-active-nav-lat svg").attr('style',"transform: rotate(180deg);")
        }
        else if(clas.indexOf("nav-left-wd") != -1){
            $(".dv-new-vehicule").attr('style',"")
            $(".dv-new-vehicule").removeClass('nav-left-wd')
            $("i#btn-active-nav-lat svg").attr('style',"transform: rotate(0deg);")

        }
})

