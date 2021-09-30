<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\classPerso\PhotoRequestLoader;
use App\Models\projet;

class siteController extends Controller
{
/*      controller pour ajouter nouveau projet a mon portfolio
    */  public function newSite(Request $request)

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
/*      cotroller pour recuperer tout les projet
 */     public function projetAll(){

            $projet = projet::all();

            return response()->json(["projets"=>$projet ]);

        }
/*      controller pour selction un projet 
 */     public function selectprojet($id){

            $projet = projet::find($id);

            return response()->json(["projet"=>$projet ]);

        }
}
