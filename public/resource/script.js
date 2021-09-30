
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


