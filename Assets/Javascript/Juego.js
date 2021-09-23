

//Variables

    let deck                = []
    const tiposCartas       = ['C','D','H','S']
    const EspecialesCartas  = ['A','J','K','Q']
    let puntosJugadores     = [];

//Variables HTML 
    //Botones
    const botonNuevo        = document.querySelector('#btnNuevo');
    const botonPedir        = document.querySelector('#btnPedir');
    const botonDetener      = document.querySelector('#btnDetener');
    //Contador
    const contadorJugador   = document.querySelectorAll('.contador');
    //Container de cartas 
    const divContainer      = document.querySelectorAll('.divCartas');


//Funciones

//Funcion inizializa 
const inicializador = () =>{
    deck = [];
    crearDeck();
    console.log(deck);
    console.log(contadorJugador);
    contadorJugador.forEach(element => {
        element.innerText = '0';   
    });

    divContainer.forEach(element => {
        element.innerText = ('');
    });

    puntosJugadores = [];
    for(let i = 0; i < 2; i++){
        puntosJugadores.push(0);
    }

    console.log(puntosJugadores);


}

//Funcion que crea deck(Baraja)
 const crearDeck = () =>{

    for(let i = 2; i <= 10; i++){
        for (const tipos of tiposCartas) {
            deck.push(i+tipos);
        }
    }
    for (const Especiales of EspecialesCartas) {
        for (const tipos of tiposCartas) {
            deck.push(Especiales+tipos);
        }
    }
    deck = _.shuffle(deck);
    return deck;
 }

//Funcion que pide la ultima carta del deck
 const pedirCarta = () =>{
    if(deck.length === 0){
        throw 'No hay cartas';
     }
    return deck.pop();
 }

//Funcion que toma el ultimo valor de la carta 

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length -1);
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 :
            valor *1;
  }

//Funcion que agrega puntaje a los contadores

  const agregarPuntos = (carta,turno) =>{
    const valor = valorCarta(carta);
    puntosJugadores[turno] = valor + puntosJugadores[turno];
    contadorJugador[turno].innerText = puntosJugadores[turno];

  }

//Funcion que agrega cartas al div

  const crearImgCarta = (carta,turno) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `/Assets/Cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divContainer[turno].append(imgCarta);

  } 

//Funcion de la logica del computador
  const computador = () =>{
    const puntajeJugador = puntosJugadores[0];
    let puntajeComputador;
    do {
        const carta = pedirCarta();
        agregarPuntos(carta,puntosJugadores.length-1,);   
        crearImgCarta(carta,puntosJugadores.length-1);
        puntajeComputador = puntosJugadores[puntosJugadores.length-1];

    } while ( ((puntajeComputador < puntajeJugador) && (puntajeJugador < 21) ) || (puntajeComputador <= 11));

    setTimeout( () =>{
    if(puntajeComputador === puntajeJugador){
        alert('Empataste');
        }else if( puntajeJugador > 21){
            alert('Perdiste')
        } else if( puntajeComputador > 21){
            alert('Ganaste');
        }else{alert('Perdiste');}
    
      }, 200);
    }

//Inicializacion
//Boton nuevo juego
    botonNuevo.addEventListener('click', () =>{
    botonDetener.disabled = false;
    botonPedir.disabled = false;
    inicializador();  
    });

//Accion Pedir carta
    botonPedir.addEventListener('click', () =>{

    const carta = pedirCarta();
    agregarPuntos(carta,0);
    crearImgCarta(carta, 0);

    const puntajeJugador = puntosJugadores[0]
    if(puntajeJugador > 21){
        console.log('Perdiste');
        botonPedir.disabled = true;
        botonDetener.disabled = true;
        computador();

    } else if(puntajeJugador === 21){
        console.log("Genial, sacaste 21")
        botonPedir.disabled = true;
    }

    });

//Boton Detener
    botonDetener.addEventListener('click',()=>{
        botonPedir.disabled = true;
        botonDetener.disabled = true;
        computador();

    });