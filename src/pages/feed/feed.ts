import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, InfiniteScroll} from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  
  providers:[
    MoovieProvider,
  ]  
})

export class FeedPage {

  public objeto_feed = {

    titulo:"Felipe garcia peres",
    data:"janeiro",
    decricao:"estou criando um app..",
    qtd_likes:12,
    qtd_comments:4,
    time_comment:"11hr ago teste"
  }

  public lista_filmes = new Array<any>();
  public page = 1;

  public nome_usuario:string = 'Charles franca do codigo';

  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infntScrl:InfiniteScroll;

  
  constructor(

        public navCtrl: NavController,
        public navParams: NavParams,
        private movieProvider: MoovieProvider,
        public loadingCtrl: LoadingController,
        

     ){
  }

abreCarregando(){

    this.loader = this.loadingCtrl.create({
        content: "Carregando...",
        duration:3000
    });

    this.loader.present();
}


fechaCarregando(){
 this.loader.dismiss(); 
}

//toda a vez que puxarem a tela pra baixo vai chamar essa funcao
doRefresh(refresher) {

    //console.log('Begin async operation',refresher);
    this.refresher = refresher;
    //toda a vez que ele aparecer na tela
    this.isRefreshing = true;
    
    this.carregarFilmes();

    
}


//ionViewDidLoad(){
  ionViewDidEnter(){
    this.carregarFilmes();   
  }

  abrirDetalhes(filme){

    console.log(filme);

    this.navCtrl.push(FilmeDetalhesPage,{id: filme.id});  
  }

  doInfinite(infntScrl) {

    this.page++;
    this.infntScrl = infntScrl;


    this.carregarFilmes(true);
    //infiniteScroll.complete();




    /*setTimeout(() => {

      console.log('Done');
      event.target.complete();
      if (data.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);*/

  }

  carregarFilmes(newpage: boolean = false){

    this.abreCarregando();

    this.movieProvider.getLatestMoovies(this.page).subscribe(

      data => {

        //const response = (data as any);
        //const objeto_retorno = JSON.parse(response._body);  
        //const objeto_retorno = data['results'][0].title;

        const objeto_retorno = data['results'];

        if(newpage){

          this.lista_filmes = this.lista_filmes.concat(objeto_retorno);
          //this.infntScrl.complete();

        }else{

          this.lista_filmes = objeto_retorno;

        }

        //console.log(objeto_retorno);

        this.fechaCarregando();

        if(this.isRefreshing){

            this.refresher.complete();
            this.isRefreshing = false;
        }

      },error => {

        console.log(error);
        this.fechaCarregando();

        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }

      }

    )

  }



}


