<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('resource/bootstrap-momo.css')}}">
    <link rel="stylesheet" href="{{asset('resource/sizing_pos.css')}}">
    <link rel="stylesheet" href="{{asset('resource/style.css')}}">
    <title>momoledev Admine</title>
    <style>

    </style>

</head>

<body>
    <div class="">
        <p class="ft-siz-30px txt-center">momoledev page admin</p>
    </div>
    <div id="modal_site_pub_success" class="cacher full-screen align-center-x-y pos-abs back-noir-transp">
        <div class="wd-300px hg-150px flx-col back-noir-s2 bord-rad-10px align-center-x-y pd-20px">
            <p class="mg-20px col-blanc ft-siz-20px">site ajouter avec succes</p>
            <a href="/"><button class="btn_bleu_outline wd-150px hg-35px">ok</button></a>
        </div>
    </div>
    <div class="pd-20px">
        <div class="">
            <div class="">
                <form action="{{route('newSite')}}" id="form_pub_site" method="POST">
                    @csrf
                    <div class="">
                        <input type="file" name="image" id="input_mf" onchange="" multiple accept="image/*"
                            class="wd-200px hg45px col-bleu-s1">
                        <div id="apercu-image" class="dis-flx over-fl-scrol wd-100pc hg-250px"></div>

                    </div>
                    <div class="">
                        <div class="ms-form-group-1 dis-flx mg-10px">
                            <div class="wd-120px align-center-y">
                                <label class="ft-siz-18px ft-wd-bolder" for="">titre</label>
                            </div>
                            <div class="">
                                <input type="text" placeholder="titre" name="titre"
                                    class="back-blanc-s1 ms-input-form ms-input-prim">
                            </div>

                        </div>
                        <div class="ms-form-group-1 dis-flx mg-10px">
                            <div class="wd-120px align-center-y">
                                <label class="ft-siz-18px ft-wd-bolder" for="">type de site</label>
                            </div>
                            <div class="">
                                <input type="text" placeholder="type de site" name="type"
                                    class="back-blanc-s1 ms-input-form ms-input-prim">
                            </div>

                        </div>
                        <div class="ms-form-group-1 dis-flx mg-10px">
                            <div class="wd-120px align-center-y">
                                <label class="ft-siz-18px ft-wd-bolder" for="">language</label>
                            </div>
                            <div class="">
                                <input type="text" placeholder="language" name="language"
                                    class="back-blanc-s1 ms-input-form ms-input-prim">
                            </div>

                        </div>
                        <div class="ms-form-group-1 dis-flx mg-10px">
                            <div class="wd-120px align-center-y">
                                <label class="ft-siz-18px ft-wd-bolder" for="">lien</label>
                            </div>
                            <div class="">
                                <input type="text" placeholder="lien" name="lien"
                                    class="back-blanc-s1 ms-input-form ms-input-prim">
                            </div>

                        </div>
                        <div class="ms-form-group-1 dis-flx mg-10px">
                            <div class="wd-120px align-center-y">
                                <label class="ft-siz-18px ft-wd-bolder" for="">code</label>
                            </div>
                            <div class="">
                                <input type="text" placeholder="code" name="code"
                                    class="back-blanc-s1 ms-input-form ms-input-prim">
                            </div>

                        </div>
                    </div>

                    <div class="align-center-x">
                        <button class="btn_bleu_outline wd-200px hg-40px">valider</button>

                    </div>
                </form>
            </div>
        </div>

    </div>
    <script src="{{asset('resource/jquery.min.js')}}"></script>
    <script src="{{asset('resource/script.js')}}"></script>
    <script>

    </script>
</body>

</html>
