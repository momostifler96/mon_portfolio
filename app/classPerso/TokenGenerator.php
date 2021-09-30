<?php

namespace App\classPerso;

class TokenGenerator
{
    public function __construct(){

    }
    public static function Generate( $longueur)
    {
    $listeCar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $chaine = '';
    $max = mb_strlen($listeCar, '8bit') - 1;
    for ($i = 0; $i < $longueur; ++$i)
    {
        $chaine .= $listeCar[random_int(0, $max)];
     }
         return $chaine;
    }
}