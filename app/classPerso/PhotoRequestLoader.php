<?php

namespace App\classPerso;

use Illuminate\Http\Request;

/*

une class concu pour recupéré les photos
dans les requette http et les enregistré
dans le dossier de votre choix et de
renvoyer les addres des photo dans
un tableau json ou la destination
de la photo si il y en a un seul

*/
class PhotoRequestLoader
{
    public static function load($request,$prefix_ou_nom_photo,$destination_photo,$nombre_photos = NULL){

        $array_photo = array();
        if($nombre_photos == NULL || $nombre_photos == 1){
            $file = $request->file($prefix_ou_nom_photo);
            $filNam = $file->getClientOriginalName();
            $fileExtension = $file->getClientOriginalExtension();
            $fileNewName = time()."_".$filNam;
            $file->move($destination_photo,$fileNewName);
            $path = $destination_photo.$fileNewName;
            return $path;
        }
        else{
            for ($i = 0; $i < $nombre_photos; $i++) {
            $file = $request->file($prefix_ou_nom_photo.$i);
            $filNam = $file->getClientOriginalName();
            $fileExtension = $file->getClientOriginalExtension();
            $fileNewName = time()."_".$filNam;
            $file->move($destination_photo,$fileNewName);
            $path = $destination_photo.$fileNewName;
            $array_photo[$i] = $path;

        }
        return json_encode($array_photo);
        }

     }

}