//fonction java script
function ouvrir_cam(came_view) {
    let came = `
                        <span id="span_camera_photos">
                            <p id="track_msg"></p>
                            <video src="" id="came_photo" width=300 height=300></video>
                            <button id="capture_photo">shot</button>
                        </span>
                       <span id="preview_pic" style="display: none">
                            <canvas id="canvas_capt_ph"></canvas>
                            <div style="display: flex; margin-top: 10px;">
                                <button class="btn_simple_1" id="btn_save_pic">enregistré</button>
                                <button class="btn_simple_1" id="btn_retpic">reprendre</button>
                                <button class="btn_simple_1" id="btn_ann_pic">annuler</button>
                            </div>

                        </span>
                        <p id="erreur_log"></p>

                `;
    $("#" + came_view).append(came);

    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: { width: 300, height: 300 },
        })
        .then((stream) => {
            let photo_view_l = document.getElementById("came_photo");
            photo_view_l.srcObject = stream;

            var track = stream.getTracks();

            document.getElementById("track_msg").innerHTML =
                "camera : " + track[0].label + " connecé";
            console.log("track label:", track[0].label);

            photo_view_l.onloadedmetadata = (e) => {
                $("#span_camera_photo").show();
                photo_view_l.play();

                $("#capture_photo").click(() => {
                    $("#preview_pic").attr("style", "display:flex;");
                    console.log("camera : ", "photo cpaturer");
                    capture_photo();
                    $("#span_camera_photos").attr("style", "display: none;");
                });

                $("#btn_save_pic").click(() => {
                    save_photo_capture();
                });
                $("#btn_retpic").click(() => {
                    $("#span_camera_photos").attr("style", "display: flex;");
                    $("#preview_pic").attr("style", "display: none;");
                });
                $("#btn_ann_pic").click(() => {
                    fermer_cam("came_photo");
                    $("#span_camera_photo").empty();
                });
            };
        })
        .catch((e) => {
            erreur = e;
            console.log("erreur de lecture:", erreur);
            document.getElementById("erreur_log").innerHTML = "erreur : " + e;
        });
}

function capture_photo() {
    let vivi = document.getElementById("came_photo");
    let canvas1 = document.getElementById("canvas_capt_ph");
    let ctx = canvas1.getContext("2d");

    canvas1.height = 300;
    canvas1.width = 300;

    ctx.drawImage(vivi, 0, 0, 300, 300);
}

function save_photo_capture() {
    if (navigator.msSaveOrOpenBlob) {
        var blobObject = document.getElementById("canvas_capt_ph").msToBlob();
        window.navigator.msSaveOrOpenBlob(blobObject, "image.png");
    } else {
        var canvas = document.getElementById("canvas_capt_ph");
        var elem = document.createElement("a");
        elem.href = canvas.toDataURL("image/png");
        elem.download = "photo-momo-came.png";
        var evt = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
        });
        elem.dispatchEvent(evt);
    }
}

function add_photo_formData(canvas_id, formData) {
    let canvas = document.getElementById(canvas_id);
    canvas.toBlob((blob) => {
        console.log(blob.type);
        formData.append("came_photo", blob, "came_photo.jpeg");
    }, "image/jpeg");
}

//---------------------------- fonction pour apercu de ficher ou image charger
function apreçu_image_charger(
    id_du_champ_de_selction_la_photo,
    id_du_champ_dapercu_de_limage
) {
    var image_charger = document.getElementById(
        id_du_champ_de_selction_la_photo
    ).files;

    if (image_charger.length > 0) {
        var ficher_charger = new FileReader();
        ficher_charger.onload = function (chargement) {
            var apercu_img = document.getElementById(
                id_du_champ_dapercu_de_limage
            );
            apercu_img.setAttribute("src", chargement.target.result);
        };
        ficher_charger.readAsDataURL(image_charger[0]);
    }
}
//------------------fonction fenetre modal chager dpuis api
export function modal_view_site(id_projet){
    
    $("#projet_view_modal").empty();
    let url1 = '/projet/'+id_projet;

    fetch(url1, {
        method: "get",
    }).then((responce) => {
        responce.json().then((responce) => {

            projets = responce.projets;

            projets.forEach(prjs => {

                let photo = JSON.parse(prjs.image);
                let caroucel;
                let caroucel_sel;

                for (let index = 0; index < photo.length; index++) {
                    caroucel = caroucel+ `<div class="element  flx-full">
                    <img class="hg-in wd-100pc hg-100pc"
                        src="${photo[index]}" alt="image slider">
                    </div>`

                    caroucel_sel = caroucel_sel+ `<div class="img_slider mg-y-10px">
                    <img src="${photo[index]}" class="wd-105px hg-65px"
                        alt="photo">

                    </div>
                    `


                }
               
                let prj = `<div class="site_tr_cotainer pos-abs-center-x-y zi-10 pd-15px back-noir-s3">
                <div class="wd-800px pd-x-10px pd-y-3px justif-between">
                    <div class="dis-flx">
                        <div class="">
                            <img class="wd-50px hg-50px" src="{{asset('favicon.ico')}}" alt="logo">
                        </div>
                        <div class="inf_site_tr">
                            <h2>${prjs.titre}</h2>
                            <p>type: ${prjs.type}</p>
                            <p>language : ${prjs.langage} </p>
                        </div>
    
                    </div>
                    <div class="">
                        <button class="btn_rouge_outline bord-rad-5px">fermer</button>
                        <a href="${prjs.code}"><button class="btn_bleu_outline bord-rad-5px">code source</button>
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
    
                    <div class="mg-x-20px">
                        ${caroucel_sel}
    
                    </div>
    
                </div>
            </div>
           `

                $("#projet_view_modal").append(prj);
                $("#projet_view_modal").removeClass('cacher')
            });
           console.log([0])
            
        })

    }).catch((err) => {
        console.log('err', err);

    })

}
//------------------fonction de verification de caractère non autorisé

export function apercu_muti_image(
    id_div_ou_span_pour_afficher_les_image,
    id_input_file,
    addclass=null,
    addclass_slider=null
) {
    let images = document.getElementById(id_input_file).files;
    let nombre_images = images.length;
    $("#" + id_div_ou_span_pour_afficher_les_image).empty();

    if (nombre_images > 0) {
        for (let i = 0; i < nombre_images; i++) {
            let balise_img = document.createElement("img");
            $(balise_img).addClass(addclass);

            let file_loader = new FileReader();
            file_loader.onload = (e) => {
                balise_img.setAttribute("src", e.target.result);
            };
            file_loader.readAsDataURL(images[i]);
            $("#" + id_div_ou_span_pour_afficher_les_image).append(balise_img);
        }
        let imgFirst = $("." + addclass);
        $(imgFirst[0]).addClass(addclass_slider);
    }
}

export function changer_image_profile(
    id_du_champ_de_selction_la_photo,
    id_du_champ_dapercu_de_limage
) {
    console.log("image bien charger");
    apreçu_image_charger(
        id_du_champ_de_selction_la_photo,
        id_du_champ_dapercu_de_limage
    );

    let token = $("input[name='_token']").attr("value");

    let file = document.getElementById(id_du_champ_de_selction_la_photo).files[0];
   console.log("photo",file);
   let fordata_profil = new FormData();
    fordata_profil.append("_token",token);
    fordata_profil.append("photo_profil",file);
    url_vt =  $("input[name='urleditePhotoProfil']").attr("value");
    console.log("url_photo_profil",url_vt)
   fetch(url_vt, {
        headers: {

            "X-CSRF-TOKEN": token
        },
        method: "post",
        body: fordata_profil

    }).then(Response => {
        Response.json().then(data => {

            photo = data.photo_profil;
            $("#photo-profil").attr('src',"../"+photo);

            $("#photo-profil-min").attr('src',"../"+photo);

            console.log("photorecu n",photo)
        })
    }).catch(e=>{
        console.log(e)
    })

}

function verification_de_charactère_speciaux(
    id_input_a_verifier,
    id_zone_afficher_erreur
) {
    var z = document.getElementById(id_input_a_verifier);

    var v = document.getElementById(id_zone_afficher_erreur);

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
        v.innerHTML = "";
    }
}

function add_class(id, clas) {
    $("#" + id).addClass(clas);
}

function rmv_class(id, clas) {
    $("#" + id).removeClass(clas);
}

function existe_class(id, clas) {
    var cls = $("#" + id).attr("class");

    if (cls.indexOf(clas) != -1) {
        console.log(clas + " : existe");
        return true;
    } else {
        console.log(clas + " : existe pas");
        return false;
    }
}

function verification_de_champ_de_saisir_remplir(
    id_champ_de_saisir,
    id_champ_daficharge_erreur
) {
    var g = document.getElementById(id_champ_de_saisir);
    var h = g.value;
    var v = document.getElementById(id_champ_daficharge_erreur);

    if (h.length < 1) {
        v.innerHTML = "veillilez remplir ce champ";
        return true;
    } else if (h.length <= 2) {
        v.innerHTML = "entrez aumoin 3 letre";
        return true;
    }
}

function egaliter_de_champ_de_saisir(champ_1, champ_2) {
    let a = document.getElementById(champ_1).value;
    let b = document.getElementById(champ_2).value;

    if (a == b) {
        return false;
    } else {
        return true;
    }
}

//---------------verification de majusculeau debut dun mots de pass
function verif_majuscule_au_debut_mdps(
    id_champ_de_saisir,
    id_champ_affiche_erreur
) {
    var z = document.getElementById(id_champ_de_saisir);

    if (
        (z.value.indexOf("A") == -1) &
        (z.value.indexOf("B") == -1) &
        (z.value.indexOf("C") == -1) &
        (z.value.indexOf("D") == -1) &
        (z.value.indexOf("E") == -1) &
        (z.value.indexOf("F") == -1) &
        (z.value.indexOf("G") == -1) &
        (z.value.indexOf("H") == -1) &
        (z.value.indexOf("I") == -1) &
        (z.value.indexOf("J") == -1) &
        (z.value.indexOf("K") == -1) &
        (z.value.indexOf("L") == -1) &
        (z.value.indexOf("M") == -1) &
        (z.value.indexOf("N") == -1) &
        (z.value.indexOf("O") == -1) &
        (z.value.indexOf("P") == -1) &
        (z.value.indexOf("Q") == -1) &
        (z.value.indexOf("R") == -1) &
        (z.value.indexOf("S") == -1) &
        (z.value.indexOf("T") == -1) &
        (z.value.indexOf("U") == -1) &
        (z.value.indexOf("V") == -1) &
        (z.value.indexOf("W") == -1) &
        (z.value.indexOf("X") == -1) &
        (z.value.indexOf("Y") == -1) &
        (z.value.indexOf("Z") == -1)
    ) {
        $(id_champ_affiche_erreur).text("majuscul svp");
        return true;
    }
}

function verification_de_champ_de_mot_de_pass(
    id_champ_de_saisir,
    id_champ_daficharge_erreur
) {
    var g = document.getElementById(id_champ_de_saisir);
    var h = g.value;
    var v = document.getElementById(id_champ_daficharge_erreur);

    if (h.length < 1) {
        v.innerHTML = "veillilez remplir le mots de pass";
        return true;
    } else if (h.length <= 7) {
        v.innerHTML = "entrez aumoin 8 charctères";
        return true;
    } else {
        return false;
    }
}

function donner_de_form(element_form) {
    var el_form_data = $("#" + element_form + " [name]");
    count_dt = el_form_data.length;
    i = "";
    for (i = 0; i < count_dt; i++) {
        debug = $(el_form_data[i]).val();
    }
}

function conver_timestamp_date(timestamp) {
    var date = new date(timestamp);
    return date;
}

//--------------- fonction de slider image--------------

var cunt = 0;

function img_suiv(class_des_image_selectioner) {
    var image = document.querySelectorAll("." + class_des_image_selectioner);

    var nombre_image = image.length;

    $(image).removeClass("slider-img");

    if (cunt < nombre_image - 1) {
        cunt++;
    } else {
        cunt = 0;
    }
    $(image[cunt]).addClass("slider-img");
}

function img_pres(class_des_image_selectioner) {
    var image = document.querySelectorAll("." + class_des_image_selectioner);

    var nombre_image = image.length;

    $(image).removeClass("slider-img");

    if (cunt > 0) {
        cunt--;
    } else {
        cunt = nombre_image - 1;
    }
    $(image[cunt]).addClass("slider-img");
}

        compteur = 0;
        function slide_s(compteur,slider_container) {
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
        /* let btn_slt = $(".slider_s1 .img_slider");
        for (let index = 0; index < btn_slt.length; index++) {

            $(btn_slt[index]).click(()=>{
                $(btn_slt).removeClass("slide_selected");
                $(btn_slt[index]).addClass("slide_selected")

                slide_s(index);

            })
        }
 */
        //--------fonction pour verifcation de champ d'email
        export function verification_champ_email(input, error_show) {
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
        export function verification_de_charactère_speciaux(input, error_show) {
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

        export function verification_remplissage_input(input, error_show, require_min = 5) {

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
        export function verifInput(input_container_id, require_min = 5, specialChar = false, email = false) {
            let input_container = input_container_id;

            let chd = Array.from(input_container.children);
            console.log(chd);
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
    

            
function s(){
//-----------------------------fonction jquery----------------------------

//------------------------fonction ecouter le changement sur des champ de formulaire
$(/*id ou class de l'élément a selectioné*/).change(function () {});

//------------------------fonction pour evenement submit sur des formulaire
$(/*id ou class de l'élément a selectioné*/).submit(function () {});

//------------------------fonction pour apliquer du style sur un element html

//------------------------fonction pour declanché un evenement lors d'un click

$(/*id ou class de l'élément a selectioné*/).click(function () {});

//------------------------fonction pour declanché un evenement lors d'un double click

$(/*id ou class de l'élément a selectioné*/).dblclick(function () {});

//------------------------fonction pourcach" un élément html

$(/*id ou class de l'élément a selectioné*/).hide();

//------------------------fonction pourcach" un élément html

$(/*id ou class de l'élément a selectioné*/).show();

//------------------------fonction pour declanché un evenement lorsque la souris setrouve sur un élément html

$(/*id ou class de l'élément a selectioné*/).mouseenter(function () {});

//------------------------fonction pour declanché un evenement lorsque la souris sort d'un élément html apres avoir été sur ce element

$(/*id ou class de l'élément a selectioné*/).mouseleave(function () {});

//------------------------fonction pour declanché un evenement lors de lentez et de la sortir sur éléments html

//------------------------fonction touche de la souris enfoncé
$(/*id ou class de l'élément a selectioné*/).mousedown(function () {});

//------------------------fonction touche de la souris relachez apres avoir été en foncé
$(/*id ou class de l'élément a selectioné*/).mouseup(function () {});

//------------------------fonction touche du clavier enfoncé

$(/*id ou class de l'élément a selectioné*/).keydown(function () {});

//------------------------fonction touche du clavier relachez apres avoir été en foncé

$(/*id ou class de l'élément a selectioné*/).keyup(function () {});

//------------------------fonction pour recuperez la cle de la dernière touche du clavier tapez

$(/*id ou class de l'élément a selectioné*/).keypess(function (e) {
    var variable = String.fromCharCode(e.which);
});

//------------------------fonction pour inséré ou pour recupéré du texte entre les balise ouvrante et fermante d'un élément html
$(/*id ou class de l'élément a selectioné*/).text();

//------------------------fonction pour inséré ou pour recupéré du du code html entre les balise ouvrante et fermante d'un élément html
$(/*id ou class de l'élément a selectioné*/).html();

//------------------------fonction pour inséré ou pour recupéré des valeur de fomulaire html
$(/*id ou class de l'élément a selectioné*/).val();

//------------------------fonction pour inséré ou pour recupéré des valeur des attribut html
$(/*id ou class de l'élément a selectioné*/).attr(/* nom de l'attribut , la valeur de l'attribut */);
$(/*id ou class de l'élément a selectioné*/).attr({
    /* nom de l'attribut :la valeur de l'attribut, nom de l'attribut : la valeur de l'attribut */
});

//------------------------fonction pour le focuse des saisir ou de touche

$(/*id ou class de l'élément a selectioné*/).focus(function () {});

$(/*id ou class de l'élément a selectioné*/).focusout(function () {});

//------------------------fonction pour le focuse des saisir ou de touche sur des élements parents et enfant

$(/*id ou class de l'élément a selectioné*/).focusin(function () {});

$(/*id ou class de l'élément a selectioné*/).blur(function () {});

//----------------------------method on pour simplifié et géré plusieur evènement ensemble

$(/*id ou class de l'élément a selectioné*/).on("click", function () {});

$(/*id ou class de l'élément a selectioné*/).on(
    "click dblclick",
    function () {}
);

$(/*id ou class de l'élément a selectioné*/).on({
    click: function () {},
    dblclick: function () {},
});

$(/*id ou class de l'élément a selectioné*/).on("click", function () {
    $(/*id ou class de l'élément a selectioné*/).on("click", function () {});
});

$(/*id ou class de l'élément a selectioné*/).on("click", function () {
    $(/*id ou class de l'élément a selectioné*/).off("click");
});
// --------------------------fonction pour ajouter des éléments html

// --------------------------fonction pour ajouter des éléments html dans un élément html au debut
$(/*id ou class de l'élément a selectioné*/).append(/*le text ou le code ou l'élément a ajouter */);

// --------------------------fonction pour ajouter des éléments html dans un élément html a la fin
$(/*id ou class de l'élément a selectioné*/).preappend(/*le text ou le code ou l'élément a ajouter */);

// --------------------------fonction pour ajouter des éléments html apres un élément html
$(/*id ou class de l'élément a selectioné*/).after(/*le text ou le code ou l'élément a ajouter */);

// --------------------------fonction pour ajouter des éléments html avent un élément html

$(/*id ou class de l'élément a selectioné*/).befor(/*le text ou le code ou l'élément a ajouter */);

//--------------------fonction pour suprimer des les élément html et leurs enfants
//--------------------fonction pour suprimer des les élément html et leurs enfants
$(/*lélément a selectionner */).remove(/*id ou class de l'élément a selectioné*/);

//--------------------fonction pour suprimer les enfants d'un élément html
$(/*lélément a selectionner*/).empty(/*id ou class de l'élément a selectioné*/);

//--------------------fonction pour suprimer les les attribut d'un élément html
$(/*lélément a selectionner*/).removeAttr(/*id ou class de l'élément a selectioné*/);

//--------------------fonction pour suprimer une class a un élément html
$(/*lélément a selectionner*/).removeClass(/*class a ajouter*/);

//--------------------fonction pour ajouter une class a un élément html
$(/*lélément a selectionner*/).addClass(/*class a ajouter*/);

//--------------------fonction pour remplacer des les élément html par d'autre élément html

$(/*id ou class de l'élément a remplacer */).replaceWith(/* le code a inserez en remplacement */);

$(/* le code a inserez en remplacement */).replaceWith(/* id ou class de l'élément a remplacer */);

//--------------------fonction pour entouré dautre élément

//-------------------- fonction pour entouré chaque élément selectionné
$(/*id ou class de l'élément a selectioné */).wrap(/* élément a ajouter pour entourer */);

//-------------------- fonction pour entouré tout les élément selectionné par le meme element
$(/*lélément a selectionner*/).wrapAll(/* élément a ajouter pour entourer */);

//-------------------- fonction pour entouré chaque contenu de l'élément selectionné
$(/*lélément a selectionner*/).wrapInner(/* élément a ajouter pour entourer */);

//-------------------- fonction pour detouré un élément html
$(/*lélément a selectionner*/).unwrap()
}