// Initialize Firebase
let config = {
  apiKey: "AIzaSyAsb9kQKq_1uiBKsChewFZp3ELY_MG4wxc",
  authDomain: "miranda-y-amado.firebaseapp.com",
  databaseURL: "https://miranda-y-amado.firebaseio.com",
  projectId: "miranda-y-amado",
  storageBucket: "miranda-y-amado.appspot.com",
  messagingSenderId: "158203245206"
};
firebase.initializeApp(config);

let database = firebase.database();
let info = database.ref('convenios');
/*Función para obtener los datos*/
info.on('value', function (datos) {
  data = datos.val();

  function listEmpresas() {
    let Type = '';
    let ObjectTypes = [];
    for (i = 0; i < Object.keys(data).length; i++) {
      Type = data[i]['Empresa'];
      Type = data[i]['Empresa'];
      id = data[i]['N°'] - 1,
        ObjectTypes.push({
          id: id,
          name: Type
        });
    }

    return ObjectTypes;
  }

  $('.token-input').tokenInput(
    listEmpresas(), {
      theme: 'bootstrap',
      preventDuplicates: true,
      hintText: 'Escribe un termino de busqueda',
      noResultsText: 'No se encntraron Resultados',
      searchingText: 'Buscando...',
      tokenLimit: 1
    });

  function filterCompany(company) {
    let resultCompany = [];
    info.on('value', function (datos) {
      data = datos.val();
      data.forEach(element => {
        if (element.Empresa == company)
          resultCompany.push(element);
      });
      localStorage.setItem('result', JSON.stringify(resultCompany))
      console.log(resultCompany);

      resultCompany.forEach(element => {
        let fecha = element.Suscripción;
        let fechames = fecha.slice(0, 10);
        $('#container-box').append(`
        
        <div class="col-6 col-lg-3 box"><div class="card bg-light mb-3  " >
        <div class="card-header">${element.Empresa}</div>
        <div class="card-body">
          <h5 class="card-title">${element.Industria}</h5>
          <p class="card-text">${fechames}</p>
        </div>
      </div>
      </div>
        `);


        $('.card-body').click(function () {
          window.open(`${element.URL}`, '_blank');
        });
      })
    });

  }
  $('#buscar').click(function () {
    let company = $('.token-input').tokenInput('get')[0]['name'];
    let inputvalue = $('.token-input').tokenInput('get');
    if (inputvalue.length === 0) {
      alert('ingrese un valor');
    } else {
      $('#container-box').empty();
      filterCompany(company);

    }
  });

});


function filterSuscription() {
  let result = [];
  info.on('value', function (datos) {
    data = datos.val();
   
    data.forEach(function (element) {
      if ((element.Suscripción).split) {
        console.log((element.Suscripción).substr(0, 4))
      }
      // result.push(element);
    });
  });
  return (result)
}
filterSuscription()


// Filtro por Empresa
function filterCompany(company) {
  let resultCompany = [];
  info.on('value', function (datos) {
    data = datos.val();
    data.forEach(element => {
      if (element.Empresa == company)
        resultCompany.push(element);

    });
    localStorage.setItem('result', JSON.stringify(resultCompany))
  });

}

function filterVigence(date) {
  let resultDateVig = [];

  info.on('value', function (datos) {
    data = datos.val();
    data.forEach(element => {
      if ((element.Vigencia).toString().substr(-4) === date) {
        resultDateVig.push(element);
      }

    });

    localStorage.setItem('resultDateVig', JSON.stringify(resultDateVig))
  });

}

let syndicate = document.getElementById('checkbox1');
let industry = document.getElementById('checkbox2');
let selectSyndicates = $('#select-syndicates');
let selectIndustries = $('#select-industries');
info.on('value', function (datos) {
  data = datos.val();
  // Mostrar los filtros escogidos en el modal
  syndicate.addEventListener('change', function() {
    if(syndicate.checked === true) {
     console.log('Funcionó');
     selectSyndicates.addClass('show');
     selectSyndicates.removeClass('hide');
    }

    if(syndicate.checked === false) {
      // debugger;
      console.log('Desactivastes el checkbox, por lo que no se verá nada');
      selectSyndicates.addClass('hide');
      selectSyndicates.removeClass('show');
    }
  });

  industry.addEventListener('change', function() {
    if(industry.checked === true) {
      console.log('Funcionó');
      selectIndustries.addClass('show');
      selectIndustries.removeClass('hide');
    }
    if(industry.checked === false) {
      // debugger;
      console.log('Desactivastes el checkbox por segunda vez, por lo que no se verá nada de nuevo');
      selectIndustries.addClass('hide');
      selectIndustries.removeClass('show');
    }
  });
  // Mostrar los 20 primeros
  let news = data.slice(0,19);
  news.forEach(element => {
    let fecha = element.Suscripción;
    let fechames = fecha.slice(0, 10);
    let template = `<div class="col-6 col-lg-3 box"><div class="card bg-light mb-3  " >
    <div class="card-header">${element.Empresa}</div>
    <div class="card-body">
      <h5 class="card-title">${element.Industria}</h5>
      <p class="card-text">${fechames}</p>
    </div>
  </div>
  </div>`
  $('#container-box').append(template);
  $('.box').click(function () {
    window.open(`${element.URL}`, '_blank');
  });
 });

});

// Seleccionar tipo de filtro solo Empresa

const checkCompany = $('#company-check');

 checkCompany.on('change', function() {
  
  if(checkCompany[0].checked === true ){
  
    $('#company').addClass( "show" );
    $('#company').removeClass( "hide" );
  }
  else{
    $('#company').removeClass( "show" );
    $('#company').addClass( "hide" );
  }
  
});

// Selección de Empresa
// select.addEventListener('change', function(event) {


// });
