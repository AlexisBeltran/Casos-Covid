const Estado = document.querySelector('#estado');
const Estados = ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Ciudad de Mexico', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacan', 'Morelos', 'Nayarit', 'Nuevo Leon', 'Oaxaca', 'Puebla', 'Queretaro', 'Quintana Roo', 'San Luis Potosi', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatan', 'Zacatecas'];
let estado;
const Formulario = document.querySelector('#Formulario');
const Resultado = document.querySelector('#resultado');


document.addEventListener('DOMContentLoaded', function(){
    CargarEstados();
    Estado.addEventListener('change', LeerValor); 
    Formulario.addEventListener('submit', ValidarCampo);
});

function CargarEstados(){
    Estados.forEach(estado =>{
        const CrearEstados = document.createElement('option');
        CrearEstados.value = estado;
        CrearEstados.textContent = estado;
        Estado.appendChild(CrearEstados);
    });
      
}

function LeerValor(e){
    estado = e.target.value;
}

function ValidarCampo(e){
    e.preventDefault();
    if(estado === '' || estado === undefined){
        ImprimirAdvertencia('Selecciona un estado', 'error');
        return;
    }
    ConsumiendoEstados(estado);
}

function ImprimirAdvertencia(contenido, error){
    const Error = document.querySelector('existe');
    if(!Error){
        const DivAlerta = document.createElement('div');
        DivAlerta.textContent = contenido;
        DivAlerta.classList.add('existe');
        if(error === 'error'){
            DivAlerta.classList.add('error', 'advertencia');
        }else{
            DivAlerta.classList.add('correcto', 'advertencia');
        }
        Formulario.appendChild(DivAlerta);
        setTimeout(()=>{
            DivAlerta.remove();
            Formulario.reset();
        }, 3000);
    } 
}

async function ConsumiendoEstados(EstadoSeleccionado){
    Spinner();
    try{
        const URL = 'https://covid-api.mmediagroup.fr/v1/cases?country=Mexico';
        const Resultado = await fetch(URL);
        const Respuesta = await Resultado.json();
        ImprimirResultado(Respuesta[EstadoSeleccionado]);
    }catch(Error){
        console.log(Error);
    }
}

function ImprimirResultado(EstadoSeleccionado){
    LimpiarHTML();
    const {confirmed, deaths, updated} = EstadoSeleccionado;

    Resultado.innerHTML = `
        <p class="casos">Casos Confirmados: <span> ${confirmed} </span></p>
        <p class="casos">Muertes Confirmadas: <span> ${deaths} </span></p>
        <p class="casos">Ultima Actualización: <span> ${updated.split(' ')[0]}
    `;
}

function LimpiarHTML(){
    while(Resultado.firstChild){
        Resultado.removeChild(Resultado.firstChild);
    }
}

function Spinner(){
    LimpiarHTML();
    const Spinner = document.createElement('div');
    Spinner.classList.add('spinner');
    Spinner.innerHTML = `
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    `;
    Resultado.appendChild(Spinner);
}
