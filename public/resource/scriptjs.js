//-----------contact me script------------
$('.btn_contact_me').click(() => {
    $('.contact_me_modal').removeClass('contact_me_modl_hid');
    $('.contact_me_modal').addClass('contact_me_modl_show');
})
$('.btn_hid_contact_me').click((e) => {
    e.preventDefault();
    $('.contact_me_modal').removeClass('contact_me_modl_show');
    $('.contact_me_modal').addClass('contact_me_modl_hid');
})
//----------page slider script--------------
let compteur = 0;
let elements, sliders;

const slid_main_s = document.querySelector(".page_slider_main ");
let slider_conte = document.querySelector('.page_slider_cont');
elements = document.querySelectorAll('.element');
sliderHeight = slid_main_s.getBoundingClientRect().height;
sliders = Array.from(slider_conte.children);

function slide(compteur) {

    let decal = -sliderHeight * compteur;
    slider_conte.style.transition = "0.3s linear";
    slider_conte.style.transform = `translateY(${decal}px)`;

    setTimeout(() => {
        if (compteur >= sliders.length) {
            compteur = 0;
            slider_conte.style.transition = "unset";
            slider_conte.style.transform = `translateX(0)`;

        }
    }, 1000)
}
let btn_lk = $(".btn_link");

$(window).scroll(() => {
    $(window).scrollTop(() => {});
});

$("#btn_home").click(() => {
    $("#btn_aboutme").removeClass('select_ted')
    $("#btn_my_project").removeClass('select_ted')
    $("#btn_home").addClass('select_ted')
    slide(0);
})
$("#btn_aboutme").click(() => {
    $("#btn_home").removeClass('select_ted')
    $("#btn_my_project").removeClass('select_ted')
    $("#btn_aboutme").addClass('select_ted')
    slide(1);
})
$("#btn_my_project").click(() => {
    $("#btn_aboutme").removeClass('select_ted')
    $("#btn_home").removeClass('select_ted')
    $("#btn_my_project").addClass('select_ted')
    slide(2);
})


//-------------message sender script------------
$(".contact_me_modal_form").submit((e) => {
    e.preventDefault();
    let input = $('input textarea')
    $(".contact_me_modal_form").addClass("cacher");

    let msg_envoyer = `<div class="flx-col contact_me_modal_send_success align-center-y">
                            <p class="col-blanc ft-siz-18px mg-y-10px">votre message a bien été envoyez merci de patienté<br> vous aurez une reponce dans les minutes qui suivent</p>
                            <button class="btn_bleu wd-150px btn_hid_contact_me">ok</button>
                        </div>`;

    let msg_non_envoyer = `<div class="flx-col contact_me_modal_send_success align-center-y">
                            <p class="col-blanc ft-siz-18px mg-y-10px">votre message n'a pas pue etres envoyez merci de veriefier les information entrez en reéssayez</p>
                            <button class="btn_bleu wd-150px btn_hid_contact_me">ok</button>
                        </div>`;



    let url = $(".contact_me_modal_form").attr("action");
    let data = new FormData();
    let token = $('meta[name="token"]').attr('content');
    let mail_adress = $(".inp_addr_mail").val();
    let subject = $(".inp_subject").val();
    let message = $(".inp_message").val();

    data.append("_token", token);
    data.append("mail_adress", mail_adress);
    data.append("subject", subject);
    data.append("message", message);



    function cls_modal() {
        $('.contact_me_modal').removeClass('contact_me_modl_show');
        $('.contact_me_modal').addClass('contact_me_modl_hid');
        setTimeout(() => {
            $(".contact_me_modal_send_success").remove();
            $(".contact_me_modal_form").removeClass("cacher");
        }, 1000)
        $(".inp_addr_mail").value = ""
        $(".inp_subject").value = "";
        $(".inp_message").value = "";

    }
    //--------fonction pour verifcation de champ d'email
    function verification_champ_email(input, error_show) {
        let z = input;

        let v = error_show;

        if (z.value.indexOf(".") == -1 || z.value.indexOf("@") == -1) {
            v.innerHTML = "entrez le bon format d'email svp";

            return true;
        } else {
            v.innerHTML = " ";
            return false;
        }
    }
    //--------fonction pour verifcation de caharactère special
    function verification_de_charactère_speciaux(input, error_show) {
        let z = input;

        let v = error_show;

        if (
            z.value.indexOf("&") != -1 ||
            z.value.indexOf("é") != -1 ||
            z.value.indexOf('"') != -1 ||
            z.value.indexOf("(") != -1 ||
            z.value.indexOf("-") != -1 ||
            z.value.indexOf("è") != -1 ||
            z.value.indexOf("_") != -1 ||
            z.value.indexOf("ç") != -1 ||
            z.value.indexOf("à") != -1 ||
            z.value.indexOf(")") != -1 ||
            z.value.indexOf("=") != -1 ||
            z.value.indexOf("}") != -1 ||
            z.value.indexOf("]") != -1 ||
            z.value.indexOf("@") != -1 ||
            z.value.indexOf("^") != -1 ||
            z.value.indexOf("'") != -1 ||
            z.value.indexOf("`") != -1 ||
            z.value.indexOf("|") != -1 ||
            z.value.indexOf("[") != -1 ||
            z.value.indexOf("{") != -1 ||
            z.value.indexOf("#") != -1 ||
            z.value.indexOf("<") != -1 ||
            z.value.indexOf(">") != -1 ||
            z.value.indexOf(",") != -1 ||
            z.value.indexOf(";") != -1 ||
            z.value.indexOf(":") != -1 ||
            z.value.indexOf("!") != -1 ||
            z.value.indexOf("$") != -1 ||
            z.value.indexOf("*") != -1 ||
            z.value.indexOf("ù") != -1 ||
            z.value.indexOf("%") != -1 ||
            z.value.indexOf("µ") != -1 ||
            z.value.indexOf("§") != -1 ||
            z.value.indexOf("/") != -1 ||
            z.value.indexOf(".") != -1 ||
            z.value.indexOf("?") != -1 ||
            z.value.indexOf(" ") != -1 ||
            z.value.indexOf("¤") != -1 ||
            z.value.indexOf("€") != -1 ||
            z.value.indexOf("²") != -1
        ) {
            v.innerHTML = "pas caractèr speciaux svp";

            return true;
        } else {
            v.innerHTML = " ";
            return false;
        }
    }
    //--------fonction pour verification de saisi de champ

    function verification_remplissage_input(input, error_show, require_min = 5) {

        if (input.value.length == 0) {
            error_show.innerHTML = "remplisez ce champ svp";
            return true;
        } else if (input.value.length < require_min) {
            error_show.innerHTML = "remplisez ce champ avec au moin " + require_min + " caractère";
            return true;
        } else {
            error_show.innerHTML = " ";
            return false;
        }
    }

    //--------fonction de validation de champ
    function verifInput(input_container_id, require_min = 5, specialChar = false, email = false) {
        let input_container = input_container_id;

        let chd = Array.from(input_container.children);
        if (verification_remplissage_input(chd[1], chd[2], require_min)) {
            return true;

        } else if (specialChar) {
            if (verification_de_charactère_speciaux(chd[1], chd[2])) {
                return true;
            }

        } else if (email) {
            if (verification_champ_email(chd[1], chd[2])) {
                return true;
            }
        } else {
            return false;
        }

    }

    let inp_cont = $(".inp_contain");


    if (!verifInput(inp_cont[0], 10, false, true) & !verifInput(inp_cont[1], null, true) & !verifInput(
            inp_cont[2], 8)) {

        alert("aucun problem a signalé")

        fetch(url, {
            headers: {

                "X-CSRF-TOKEN": token
            },
            method: "post",
            body: data

        }).then((js) => {
            js.json().then((rsp) => {
                if (rsp.response == "mail envoyez") {
                    $('.contact_me_modal_element').append(msg_envoyer);
                    $('.btn_hid_contact_me').click(cls_modal)


                } else {
                    $('.contact_me_modal_element').append(msg_non_envoyer);
                    $('.btn_hid_contact_me').click(cls_modal)

                }

            })

        }).catch(err => {
            console.log('err', err);

        })
    } else {
        alert("ERREUR : verifier les champ de saisir et reéssayez")
        $(".contact_me_modal_form").removeClass("cacher");

    }

})

//--------- slideur site view------------------


compteur = 0;


function slide_s(compteur, slider_container) {
    const slid_main = document.querySelector(`#${slider_container}`);
    let slider_contes = document.querySelector(`#${slider_container}>div`);
    sliderHeight = slid_main.getBoundingClientRect().height;
    slider = Array.from(slider_contes.children);

    let decal = -sliderHeight * compteur;
    slider_contes.style.transition = "0.3s linear";
    slider_contes.style.transform = `translateY(${decal}px)`;

    setTimeout(() => {
        if (compteur >= slider.length) {
            compteur = 0;
            slider_contes.style.transition = "unset";
            slider_contes.style.transform = `translateX(0)`;

        }
    }, 1000)
}

let url1 = $('#projetAllId').val();
fetch(url1, {
    method: "get",
}).then((responce) => {
    responce.json().then((responce) => {

        projets = responce.projets;

        projets.forEach(prjs => {

            let photo = JSON.parse(prjs.image)

            let prj = `
                        
            <div class="div_pro_caroucel mg-x-10px col-blanc" onclick="modal_view_site(${prjs.id})">
                            <div class="mg-y-5px ft-siz-12px">
                                <h2 class=" ft-w-bold">${prjs.titre}</h2>
                                <p class="">${prjs.type}</p>
                            </div>
                            
                            <div class="element_img">
                                <img src="${photo[0]}" class="wd-330px hg-200px" alt="">
                            </div>
                        </div>

                   
   `

            $(".div_project_caroucel").append(prj);
        });




    })

}).catch((err) => {
    console.log('err', err);

})

function modal_view_site(id_projet) {

    $("#projet_view_modal").empty();
    let url1 = '/projet/' + id_projet;

    fetch(url1, {
        method: "get",
    }).then((responce) => {
        responce.json().then((responce) => {

            prjs = responce.projet;

            let photo = JSON.parse(prjs.image);
            let caroucel = "";
            let caroucel_sel = "";

            photo.forEach(element => {
                caroucel = caroucel + `<div class="element  flx-full">
            <img class="hg-in wd-100pc hg-100pc"
                src="${element}" alt="image slider">
            </div>`

                caroucel_sel = caroucel_sel + `<div class="img_slider mg-y-10px">
            <img src="${element}" class="wd-105px hg-65px"
                alt="photo">

            </div>
            `
            });


            let prj = `<div class="site_tr_cotainer pos-abs-center-x-y zi-10 pd-15px back-noir-s3">
        <div class="wd-800px pd-x-10px pd-y-3px justif-between">
            <div class="dis-flx inf_modal_site_view">
                <div class="logo_modal_site_view">
                    <img class="wd-50px hg-50px" src="{{asset('favicon.ico')}}" alt="logo">
                </div>
                <div class="inf_site_tr">
                    <h2>${prjs.titre}</h2>
                    <p>type: ${prjs.type}</p>
                    <p>language : ${prjs.langage} </p>
                </div>

            </div>
            <div class="btn_modal_site_view">
                <button id="btn_close_modal_site_view" class="btn_rouge_outline bord-rad-5px">fermer</button>
                <a href="${prjs.code}"><button class="btn_bleu_outline bord-rad-5px">code </button>
                </a>
                <a href="${prjs.lien}"><button class="btn_bleu_outline bord-rad-5px">lien</button>
                </a>


            </div>

        </div>

        <div class="dis-flx slider_s1">
            <div id="slider_main" class="pos-rel  over-fl-hid">

                <div id="slider_main_cont" class="wd-650px flx-col hg-430px">
                ${caroucel}

                </div>
            </div>

            <div class="mg-x-20px img_selct_car img_min_modal_site_view">
                ${caroucel_sel}

            </div>

        </div>
    </div>
   `

            $("#projet_view_modal").append(prj);
            $("#projet_view_modal").removeClass('cacher')
            $("#projet_view_modal").addClass("anim-fade")
            $("#btn_close_modal_site_view").click(() => {
                $("#projet_view_modal").addClass("cacher")

            })


            let btn_slt = $(".slider_s1 .img_slider");
            $(btn_slt[0]).addClass("slide_selected")
            for (let index = 0; index < btn_slt.length; index++) {


                $(btn_slt[index]).click(() => {
                    $(btn_slt).removeClass("slide_selected");
                    $(btn_slt[index]).addClass("slide_selected")

                    slide_s(index, 'slider_main');

                })

            }

        })

    }).catch((err) => {

    })

}
