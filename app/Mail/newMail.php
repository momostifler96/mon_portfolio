<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

use function Ramsey\Uuid\v3;

class newMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    use Queueable, SerializesModels;
    public $maild = "";
    public $sujet ="";
    public $msg="";
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($maild,$sujet,$mail_content)

    {   
        $this->maild = "hrfthrtfhr";
        $this->sujet = "rgregergre";
        $this->msg = "sdff";
        
    }

    /**
     * Build the message.
     *
     * @return $this
     */

    public function build()

    {  

        $this->subject($this->sujet);   
        $this->view('mail.new_mail');

        return $this;
    }
    
}
