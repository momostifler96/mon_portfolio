<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller

{   
/*     controller d'envoi de mail pour me contacté
 */    public function newMail(Request $request){

        $request->validate([
            'adress_mail' => 'required | min : 10',
            'sujet' => 'required | min : 8',
            'mai_content' => 'required | min : 8',
        ]);
        
        $mailData = ["emailTo"=>'momoledev2021@gmail.com',"email"=>$request->message,'subject'=>$request->subject,"fromAdresse"=>$request->mail_adress];
        Mail::send("mail.new_mail",["mailData"=>$mailData], function($message) use($mailData) {
            $message -> from($mailData['fromAdresse'],$mailData['fromAdresse']);
            $message -> to($mailData['emailTo']);
            $message -> subject($mailData['subject']);
            
        });

        return response()->json(["response"=>"mail envoyez"]);
 
    }

}
