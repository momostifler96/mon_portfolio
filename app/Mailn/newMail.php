<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use App\classPerso\TokenGenerator;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class nawMail extends Mailable
{
    use Queueable, SerializesModels;
    public $mail;
    public $sujet;
    public $mail_content;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mail,$sujet,$mail_content)

    {   $this->mail = $mail;
        $this->$sujet = $sujet;
        $this->$mail_content = $mail_content;

    }

    /**
     * Build the message.
     *
     * @return $this
     */

    public function build()

    {   
        return $this->from($this->mail)->subject($this->sujet)->view('mail.new_mail');
    }
}