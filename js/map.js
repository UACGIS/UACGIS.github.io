
var map = L.map('map',{
  fullscreenControl: true,
  fullscreenControlOptions: { // optional
    title:"Mostrar mapa completo!!!",
    titleCancel:"Salir del mapa completo"}
}).setView([-13.52408, -71.94421], 18);
// 13, 21
map.options.minZoom = 1;
map.options.maxZoom = 28;





new L.basemapsSwitcher([
  {
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map), //DEFAULT MAP
    icon: 'images/img1.png',
    name: 'Map one'
  },
  {
    layer: L.tileLayer('http://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }),
    icon: 'images/img2.png',
    name: 'Map two'
  },
  {
    layer: L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }),
    icon: 'images/img3.png',
    name: 'Map three'
  },
], { position: 'topright' }).addTo(map);
// tg_lote

function Infoerp(feature, layer) {
  if (feature.properties && feature.properties.id_lote) {
      var popupContent = '<h1 style="color: #2A4D69; font-size: 20px; text-align: center;">Información del Lote</h1>'
      + "<b>Manzana: </b>" + feature.properties.MANZANA + "<br>"
      + "<b>Lote: </b>" + feature.properties.LOTE + "<br>"
      + "<b>Area_m2: </b>" + feature.properties.area_m2 + "<br>"
      + "<b>Perimetro_m: </b>" + feature.properties.perimetro + "<br>"
      + "<b>USO: </b>" + feature.properties.USO_DEL__1 + "<br>"
      + "<b>ESTADO: </b>" + feature.properties.ESTADO_DE + "<br>"
      + "<b>ESTADO_1: </b>" + feature.properties.ESTADO_D_1 + "<br>"
      + "<b>CALIDAD: </b>" + feature.properties.CALIDAD_AR + "<br>"
      + "<b>USO COMERCIAL: </b>" + feature.properties.USO_COMERC + "<br>"
      + "<b>Foto: </b><br>" + '<center><img src="' + feature.properties.foto + '" height="200px" width="200px"/></center>'
      + '<br><button id="verPlanoBtn" class="btn btn-ver-plano">Ver Plano</button>'
      + '<button id="verFichaBtn" class="btn btn-ver-ficha">Ver Ficha</button>';
      

      layer.bindPopup(popupContent);

      layer.on('popupopen', function() {
          document.getElementById('verPlanoBtn').onclick = function() {
              // Acción al hacer clic en Ver Plano
              console.log('Ver Plano clic');
              // Aquí puedes añadir tu lógica, por ejemplo, abrir un enlace
              window.open(feature.properties.plano);
          };
          document.getElementById('verFichaBtn').onclick = function() {
              // Acción al hacer clic en Ver Ficha
              console.log('Ver Ficha clic');
              // Aquí puedes añadir tu lógica, por ejemplo, abrir un enlace
              window.open(feature.properties.ficha);
          };
      });
  }
}


// show
var tg_lote = L.geoJson(tg_lote, {
  className: 'lote',
  onEachFeature: Infoerp,
}).addTo(map);


var overlayMaps = {
    "LOTE": tg_lote,
};




// Coordenadas
L.control.mousePosition().addTo(map);



// zoom ventana
L.Control.boxzoom({ 
  position:'topright',
  title:'Zoom Windows'
 }).addTo(map);





// detect fullscreen toggling
map.on('enterFullscreen', function(){
  if(window.console) window.console.log('enterFullscreen');
});
map.on('exitFullscreen', function(){
  if(window.console) window.console.log('exitFullscreen');
});


var searchControl = new L.control.search({
  layer: tg_lote,
  initial: false,
  propertyName: 'id_lote',
  zoom: 21,
  buildTip: function(text, val) {
    var type = val.layer.feature.properties.amenity;
    return '<a href="#" class="'+type+'">'+text+'<b>'+' MANZANA - LOTE '+'</b></a>';
  }
})

map.addControl(searchControl);



	  
/* contents */
const right = '<div class="header">---</div>';
let contents = `
      <div class="content">
      <p>TESIS UAC</p>
          <div class="title">¿DULCINEA?</div>
          <p>D-U-L-C-I-N-E-A</p>       
          <img src="images/dulcinea.jpg" height="200px" width="200px"/>

      </div>`;


/* right */
const slideMenu = L.control
  .slideMenu("", {
    position: "topright",
    menuposition: "topright",
    width: "30%",
    height: "400px",
    delay: "50",
    icon:  'fa-solid fa-bars',
  })
  .addTo(map);
slideMenu.setContents(right + contents);
