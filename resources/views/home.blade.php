<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('resource/fontawesome/css/all.css')}}">
    <link rel="stylesheet" href="{{asset('resource/bootstrap-momo.css')}}">
    <link rel="stylesheet" href="{{asset('resource/sizing_pos.css')}}">
    <link rel="stylesheet" href="{{asset('resource/style.css')}}">
    <meta name="token" content="{{csrf_token()}}">
    <script src="{{asset('resource/fontawesome/js/all.js')}}" defer></script>
    <title>Momoledev</title>
    <style>
        .site_tr_cotainer {
            display: flex;
            flex-direction: column;
        }

        .inf_site_tr {
            color: white;
            margin: 0px 10px;
        }

        .zi-10 {
            z-index: 10;
        }

        .zi-15 {
            z-index: 15;
        }

        .zi-20 {
            z-index: 20;
        }

        .zi-25 {
            z-index: 25;
        }

        .slide_selected {
            box-shadow: 0px 0px 6px 3px rgb(0, 123, 255);
        }

    </style>


</head>

<body class="body pos-rel">

    {{--     modale de preview site mes projet
 --}}
    <input type="hidden" id="projetAllId" value="{{route('projetAll')}}">

    <div id="projet_view_modal" class="pos-abs cacher full-screen ft-siz-13pxalign-center-x-y zi-10">
    </div>
    {{--     modal de connection denvoie de mail--}}
  <div class="contact_me_modal pos-fix align-center-x-y">
        <div class="back-blanc-flout contact_me_modal_element align-center-x-y pd-20px bord-rad-10px">
            <form class="contact_me_modal_form flx-col align-center-x-y wd-100pc" action="/newMail" method="post">
                @csrf

                <div class="title_contact_me no-select wd-100pc">
                    <p>me contactez</p>
                </div>
                <div class="contact_me_info col-blanc">
                    <p class="dis-flx align-center-y"><i class="fas fa-phone-alt col-bleu-s1 ft-siz-20px"> </i> <span
                            class="ft-siz-10px"> +2250544554896 <br>
                            +2250777110179 </span></p>
                    <p class="dis-flx align-center-y mg-x-10px"><i class="fab fa-whatsapp col-vert ft-siz-20px">
                        </i><span class="ft-siz-10px"> <strong> +2250103067712 </strong></span>
                        <p class="dis-flx align-center-y"><i class="fas fa-at col-jaune ft-siz-20px"></i> <span
                                class="ft-siz-10px"> <strong> momoledev2021@gmail.com </strong></span> </p>
                </div>
                <div class=" wd-100pc no-select">
                    <div class="ms-input-group inp_contain mg-y-10px wd-100pc">
                        <label class="col-blanc" for="">votre adress mail</label>
                        <input type="text" name="mail_adress"
                            class="ms-input-form inp_addr_mail wd-100pc ms-input-prim">
                        <p></p>
                    </div>
                    <div class="ms-input-group mg-y-10px inp_contain wd-100pc">
                        <label class="col-blanc" for="">sujet</label>
                        <input type="text" name="subject" class="ms-input-form inp_subject wd-100pc ms-input-prim">
                        <p></p>
                    </div>
                    <div class="ms-area-group mg-y-10px inp_contain wd-100pc">
                        <label class="col-blanc" for="">entrez votre message</label>
                        <textarea style="resize: none;" name="message"
                            class="ms-area-form inp_message wd-100pc hg-25vh ms-area-prim" id="" cols="30"
                            rows="10"></textarea>
                        <p></p>
                    </div>
                    <div class="justif-between mg-y-10px wd-100pc">
                        <button class="btn_hid_contact_me btn_rouge_outline wd-100px">annuler</button>
                        <button class="btn_bleu_outline wd-100px">envoyez</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
    </div>
    {{--     contenu page principal--}}</div>
    <div>
        <div class="nav_bar justif-between">
            <div class="logo_m">
                <img src="{{asset('resource/background/logo-momoledev.png')}}" alt="">
            </div>
            <div class="nav_link justif-between align-center-y pd-x-20px hg-60px">
                <button id="btn_home" class="btn_link select_ted">acceille</button>
                <button id="btn_aboutme" class="btn_link">apropos de moi</button>
                <button id="btn_my_project" class="btn_link">portfoliot</button>
                <button class="btn_contact_me bord-rad-5px">me contactez</button>
            </div>
        </div>
                {{--page slider --}}

        <div class="page_slider_main hg-100vh over-fl-hid ">

            <div class="page_slider_cont hg-100vh flx-col">
                {{--page d'aceille --}}
                <div class="div_main align-center-x pd-20px back_img flx-full">
                    <div class="my_info">
                        <div class="img_profil">
                            <img src="{{asset("resource/background/PicsArt_03-29-04.09.29.jpg")}}" alt="photo">
                        </div>
                        <p class="my_name"><strong>Doumbia Mohamed</strong> </p>
                        <p class="title_dev"><strong>developper web full stack et aplication mobile</strong> </p>
                        <div class="my_social_page col-blanc ft-siz-30px">

                            <a href="" class="fb_col"><i class="fab fa-facebook-square"></i></a>
                            <a href="" class="lnk_col"><i class="fab fa-linkedin"></i></a>
                            <a href="" class="tw_col"><i class="fab fa-twitter-square"></i></a>
                        </div>
                    </div>

                </div>
                 {{--page apropose de moi --}}
                <div class="about_me_div flx-full full-screen align-center-x-y">
                    <div class="about_me_div_pict">
                        <img src="{{asset("resource/D5C35F86-F7BE-469E-AD7A-E5890296E20AL0001.jpg")}}" alt="">
                    </div>
                    <div class="about_me_div_txt flx-col wd-600px col-blanc">
                        <div class="title_about_me ft-siz-40px pd-x-10px">
                            <p>Apropos de moi</p>
                        </div>
                        <div class="about_me_text ft-siz-15px pd-10px">
                            <p>
                                je suis <strong>mohamed doumbia</strong> basé a abidjan en cote d'ivoir je suis
                                un jeune pationner de <strong>développement informatique</strong>
                                et je suis un <strong> developpeur web front-end back-end full-stack ui/ux
                                    designer et developer d'applications mobiles</strong> de toute sorte adapté à vos
                                besoins
                                J'aime les challenges et je n'ai pas peur d'être confronté à de nouvelles
                                difficultés car cela me permet de m'améliorer et de devenir encore meilleur
                                rdv dans mon portfolio pour voir mes projets réalisé.
                            </p>
                        </div>
                        <div class="title_about_me_info">
                            <div><span class="ft-siz-13px dis-in-bloc wd-48pc"><span class="ft-siz-20px aboutme_t">Nom :
                                    </span>Doumbia
                                    Mohamed</span> <span class="wd-48pc dis-in-bloc ft-siz-15px "><span
                                        class="ft-siz-20px aboutme_t">Age
                                        : </span>25 ans</span></div>
                            <div><span class="ft-siz-13px dis-in-bloc wd-48pc"><span
                                        class="ft-siz-20px aboutme_t">Contact
                                        :</span>+2250777110179</span> <span
                                    class="ft-siz-13px dis-in-bloc wd-48pc"><span class="ft-siz-20px aboutme_t">Addrress
                                        : </span>
                                    cote
                                    d'ivoir abidjan</span></div>
                            <div><span class="ft-siz-13px dis-in-bloc wd-48pc"><span
                                        class="ft-siz-20px aboutme_t">Experiance :
                                    </span>2
                                    ans</span> <span class="ft-siz-15px dis-in-bloc wd-48pc"><span
                                        class="ft-siz-20px aboutme_t">Type
                                        de
                                        contact : </span> <strong>freelance / Cdd</strong> </span></div>
                            <div><span class="ft-siz-13px dis-in-bloc wd-48pc"><span
                                        class="ft-siz-20px aboutme_t">Linkedine
                                        :</span>Doumbia Mohamed</span> <span
                                    class="ft-siz-13px dis-in-bloc wd-48pc"><span class="ft-siz-20px aboutme_t">Facebook
                                        :</span>Doumbia Mohamad</span></div>
                            <div><span class="ft-siz-13px dis-in-bloc wd-48pc"><span
                                        class="ft-siz-20px aboutme_t">Instagram
                                        :</span>Doumbia Mohamed</span> <span
                                    class="ft-siz-13px dis-in-bloc wd-48pc"><span class="ft-siz-20px aboutme_t">Tweeter
                                        :</span>Doumbia Mohamad</span></div>

                        </div>

                    </div>
                </div>
                 {{--page mes projet --}}
                <div class="my_projets flx-full full-screen ">
                    <div class="">
                        <div class="my_project-title_div ">
                            <p class="col-blanc ft-siz-60px mg-10px">Mes projets</p>
                            <div class="project_laguage col-blanc wd-600px justif-row">

                            </div>
                        </div>
                    </div>
                    <div class="main_my_projevt">
                        <div class="nav_bar_project col-blanc  mg-y-10px pd-x-20px dis-flx">
                            <p class="mg-x-10px select_ted">Touts</p>
                            <div class="mg-x-10px">
                                <i class="fas fa-mobile-alt ft-siz-20px col-bleu-s1"></i><span> mobile</span>
                            </div>
                            <div class="mg-x-10px">
                                <i class="fab fa-js-square ft-siz-20px col-jaune"></i><span> javasript</span>
                            </div>
                            <div class="mg-x-10px">
                                <i class="fab fa-react ft-siz-20px col-bleu-s1"></i><span> react</span>
                            </div>
                            <div class="mg-x-10px">
                                <i class="fab fa-node ft-siz-20px col-vert"></i><span> nodejs</span>
                            </div>
                            <div class="mg-x-10px">
                                <i class="fab fa-php ft-siz-20px col-bleu-s1"></i><span> php</span>
                            </div>
                            <div class="mg-x-10px">
                                <i class="fab fa-laravel ft-siz-20px col-rouge"></i><span> laravel</span>
                            </div>
                        </div>
                        <div class="div_project_caroucel  dis-flx">

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script src="{{asset("resource/jquery.min.js")}}"></script>
    <script src="{{asset("resource/scriptjs.js")}}"></script>

</body>

</html>
