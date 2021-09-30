$(window).load(()=>{
    let url1 = $('#projetAllId').val();
    console.log("url all project",url1)
    fetch(url1, {
        method: "get",
    }).then((responce) => {
        responce.json().then((responce) => {
           console.log(responce)
           
            
        })

    }).catch((err) => {
        console.log('err', err);

    })

})
//---------------------------------------------
function modal_view_site(id_projet){
    
    $("#projet_view_modal").empty();
    let url1 = '/projet/'+id_projet;

    fetch(url1, {
        method: "get",
    }).then((responce) => {
        responce.json().then((responce) => {

            projets = responce.projets;

            projets.forEach(prjs => {

                let photo = JSON.parse(prjs.image);
                let caroucel = photo.map((item) => {
                    `<div class="element  flx-full">
                    <img class="hg-in wd-100pc hg-100pc"
                        src="${item}" alt="image slider">
                </div>`

                });
                let caroucel_sel = photo.map((item) => {
                    `<div class="img_slider mg-y-10px">
                    <img src="${item}" class="wd-105px hg-65px"
                        alt="photo">

                </div>
                `
                });
                

                let prj = `<div class="site_tr_cotainer pos-abs-center-x-y zi-10 pd-15px back-noir-s3">
                <div class="wd-800px pd-x-10px pd-y-3px justif-between">
                    <div class="dis-flx">
                        <div class="">
                            <img class="wd-50px hg-50px" src="{{asset('favicon.ico')}}" alt="logo">
                        </div>
                        <div class="inf_site_tr">
                            <h2>${prjs.titre}</h2>
                            <p>type: ${prjs.type}/p>
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
//--------------------------------------------
function apercu_muti_image(
    id_div_ou_span_pour_afficher_les_image,
    id_input_file,
    addclass=null,
    addclass_slider=null
) {
    console.log('balise_img')
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

$("#input_mf").change(()=>{
    apercu_muti_image("apercu-image","input_mf","wd-300px hg-200px mg-5px");
})

$('#form_pub_site').submit((e)=>{
    e.preventDefault();

    let input = $('#form_pub_site input');
    let url = $('#form_pub_site').attr("action");
    console.log(url)
    let token = $(input[0]).val();
    console.log(token)
    let images = input[1];
    console.log(images)
    

    let titre =  $(input[2]).val();
    let type = $(input[3]).val();
    let langage = $(input[4]).val();
    let lien = $(input[5]).val();
    let code = $(input[6]).val();

    let formData = new FormData();
    formData.append("titre",titre)
    formData.append("type",type)

    formData.append("langage",langage)

    formData.append("lien",lien)

    formData.append("code",code)

    let img1 = images.files
    formData.append("nombre_foto",img1.length)
    function tableau_mage_multi(id_input_file){
        let image = []
        let img1 = images.files;
        for (let index = 0; index < img1.length; index++) {
            image[index] = img1[index];
        }
        return image;

    }

    for (let index = 0;index < img1.length; index++) {
        formData.append('image_'+index,img1[index])
        console.log('image_'+index,img1[index])
        
    }
     fetch(url, {
        headers: {

            "X-CSRF-TOKEN": token
        },
        method: "post",
        body: formData

    }).then((responce) => {
        responce.json().then((responce) => {
            console.log(responce)
            response = responce.response
            if (response == "site publier") {
                $("#modal_site_pub_success").removeClass("cacher");
                
            }
            else{
                console.log('erreur',response)
            }
            
        })

    }).catch((err) => {
        console.log('err', err);

    })




})


