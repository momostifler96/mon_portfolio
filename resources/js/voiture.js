var token = $("input[name='_token']").attr("value")

let formDataVT = new FormData()
formDataVT.append("token", token)
let url_vt = $("input[name='route_voiture']").attr("value")

fetch(url_vt, {
    headers: {

        "X-CSRF-TOKEN": token
    },
    method: "post",
    body: formDataVT

}).then(Response => {
    Response.json().then(data => {
        dt = data.voiture
        for (let i = 0; i < dt.length; i++) {

            console.log('data', dt[i])
            dtvv = dt[i]
            console.log('marque', dtvv.marque);
            photos = dtvv.photos
            photos = JSON.parse(photos)
            console.log('toute les photos route voiture', photos);
            photos = photos[0]



            vtDt = (`

            <span class="voiture-inf">
                <div class="img-dv">
                    <img src="${photos}" alt="photo">
                </div>
                <div class="vt-inf">
                    <p>marque : ${dtvv.marque}</p>
                    <p>model : ${dtvv.model}</p>
                    <p>carburan : ${dtvv.carburan}</p>
                    <p>puissance : ${dtvv.puissance}</p>
                    <p>boite de vitesse : ${dtvv.boite_vitesse}</p>
                    <p>date de fabrication : ${dtvv.date_fabrication}</p>
                </div>
                <div class="edit-vt">
                <button class="button-voir-vouture" onclick="modal_pop_1('${dtvv.id}')">voire</button>

                </div>
            </span>

            `)

            $("#voiture_all").append(vtDt)

        }


    })
}).catch(err => {
    console.log('err', err);

})

