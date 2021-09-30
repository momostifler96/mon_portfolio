<?php

namespace App\Http\Controllers;

use App\Mail\newMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\classPerso\PhotoRequestLoader;
use App\Models\projet;

class MailController extends Controller
{
    public function newMail(Request $request){

       $request->validate([
            'adress_mail' => 'required | min : 10',
            'sujet' => 'required | min : 8',
            'mai_content' => 'required | min : 8',
        ]);
        

        $mail_content = $request->message;
        $sujet = $request->subject;
        $maild = $request->mail_adress;

        $mailData = ["emailTo"=>'momoledev2021@gmail.com',"email"=>$request->message,'subject'=>$request->subject,"fromAdresse"=>$request->mail_adress];
        Mail::send("mail.new_mail",["mailData"=>$mailData], function($message) use($mailData) {
            $message -> from($mailData['fromAdresse'],$mailData['fromAdresse']);
            $message -> to($mailData['emailTo']);
            $message -> subject($mailData['subject']);
            
        });

        return response()->json(["response"=>"mail envoyez"]);
 
    }

    public function newSite(Request $request)

    {  
        
        $nombre_foto = $request->nombre_foto;
        $image = PhotoRequestLoader::load($request,"image_","image/image_projet/",$nombre_foto);
        $projet = new projet();
        $projet->titre = $request->titre;
        $projet->type = $request->type;
        $projet->langage = $request->langage;
        $projet->lien = $request->lien;
        $projet->code = $request->code;
        $projet->image = $image;
        $projet->save();

        return response()->json(["response"=>"site publier"]);

    }

    public function projetAll(){

        $projet = projet::all();

        return response()->json(["projets"=>$projet ]);

    }

    public function selectprojet($id){

        $projet = projet::find($id);

        return response()->json(["projet"=>$projet ]);

    }
}
