import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import magnifyingGlass from "./mg.svg";
import "./Searchbar.css";

const cities = [
  "Oslo",
  "Bergen",
  "Stavanger",
  "Trondheim",
  "Drammen",
  "Skyer",
  "Kristiansand",
  "Tomasjorda",
  "Ålesund",
  "Sandnes",
  "Haugesund",
  "Tønsberg",
  "Moss",
  "Bodø",
  "Arendal",
  "Hamar",
  "Gjøvik",
  "Mo i Rana",
  "Narvik",
  "Lillehammer",
  "Harstad",
  "Molde",
  "Alta",
  "Steinkjer",
  "Hammerfest",
  "Namsos",
  "Vossevangen",
  "Vadsø",
  "Svolvær",
  "Finnsnes",
  "Kirkenes",
  "Rørvik",
  "Hermansverk",
  "Skogsvåg",
  "Noresund",
  "Sandnessjøen",
  "Hansnes",
  "Råde",
  "Tingvoll",
  "Årdalstangen",
  "Rosendal",
  "Batnfjordsøra",
  "Namdalseid",
  "Jaren",
  "Hov",
  "Kragerø",
  "Stranda",
  "Gratangen",
  "Valldal",
  "Ulefoss",
  "Våler",
  "Drøbak",
  "Hokksund",
  "Lurøy",
  "Vik",
  "Tysse",
  "Kleppe",
  "Skjåk",
  "Vågå",
  "Åseral",
  "Langesund",
  "Sørumsand",
  "Randaberg",
  "Treungen",
  "Ølen",
  "Sykkylven",
  "Ål",
  "Kongsberg",
  "Ski",
  "Dale",
  "Lyngdal",
  "Kongsvinger",
  "Brøstadbotn",
  "Sør-Fron",
  "Oppdal",
  "Bjørkelangen",
  "Alvdal",
  "Brekstad",
  "Iveland",
  "Storslett",
  "Søgne",
  "Rena",
  "Evje",
  "Brønnøysund",
  "Selbu",
  "Nesna",
  "Nannestad",
  "Andenes",
  "Borkenes",
  "Bremnes",
  "Jevnaker",
  "Bruflat",
  "Stokmarknes",
  "Kjøllefjord",
  "Røyrvik",
  "Fiskå",
  "Rognan",
  "Hommelvik",
  "Volda",
  "Alstad",
  "Valderhaug",
  "Surnadal",
  "Hauge",
  "Bø",
  "Gryllefjord",
  "Kopervik",
  "Gjerstad",
  "Leksvik",
  "Kvalsund",
  "Ås",
  "Reine",
  "Brattvåg",
  "Støren",
  "Meldal",
  "Larsnes",
  "Lena",
  "Sørland",
  "Steinshamn",
  "Skjervøy",
  "Skarnes",
  "Dokka",
  "Masfjordnes",
  "Kvinesdal",
  "Bruhagen",
  "Isdalstø",
  "Falkhytta",
  "Flekkefjord",
  "Kolvereid",
  "Øksfjord",
  "Oteren",
  "Honningsvåg",
  "Sunndalsøra",
  "Tynset",
  "Granvin",
  "Sørreisa",
  "Årnes",
  "Hareid",
  "Tromsø",
  "Terråk",
  "Lom",
  "Trysil",
  "Bardu",
  "Bogen",
  "Rong",
  "Burfjord",
  "Koppang",
  "Eidsvåg",
  "Eidsvoll",
  "Sagstua",
  "Flå",
  "Rjukan",
  "Sveio",
  "Karasjok",
  "Vikevåg",
  "Vågaholmen",
  "Ramberg",
  "Hamnvik",
  "Midsund",
  "Skien",
  "Enebakk",
  "Birkeland",
  "Flisa",
  "Raufoss",
  "Ørnes",
  "Krokstadøra",
  "Olderdalen",
  "Eivinvik",
  "Høyanger",
  "Manger",
  "Balestrand",
  "Liabøen",
  "Inndyr",
  "Breivikbotn",
  "Tana Bru",
  "Hemsedal",
  "Rømskog",
  "Dale",
  "Røyken",
  "Bryne",
  "Os",
  "Hol",
  "Rygge",
  "Verdal",
  "Lyngseidet",
  "Mandal",
  "Sætre",
  "Utsira",
  "Fagernes",
  "Sandane",
  "Heggenes",
  "Odda",
  "Fetsund",
  "Naustdal",
  "Rissa",
  "Våler",
  "Hobøl",
  "Elnesvågen",
  "Frekhaug",
  "Straumen",
  "Tvedestrand",
  "Ålen",
  "Fauske",
  "Grong",
  "Sjøvegan",
  "Høylandet",
  "Kyrksæterøra",
  "Judaberg",
  "Norheimsund",
  "Ulvik",
  "Berlevåg",
  "Østre Gausdal",
  "Ålgård",
  "Orkanger",
  "Ørje",
  "Førde",
  "Årnes",
  "Vestby",
  "Otta",
  "Røyse",
  "Rødberg",
  "Lampeland",
  "Vang",
  "Lauvsnes",
  "Aurlandsvangen",
  "Gaupne",
  "Korgen",
  "Spydeberg",
  "Asker",
  "Namsskogan",
  "Mosjøen",
  "Fredrikstad",
  "Grimstad",
  "Langevåg",
  "Mjøndalen",
  "Fillan",
  "Uggdal",
  "Dovre",
  "Drangedal",
  "Malm",
  "Stordal",
  "Leknes",
  "Varhaug",
  "Konsmo",
  "Mo",
  "Bagn",
  "Kirkenær",
  "Ringebu",
  "Øyer",
  "Straume",
  "Austrheim",
  "Kinsarvik",
  "Voss",
  "Stord",
  "Os",
  "Slidre",
  "Eikelandsosen",
  "Lesja",
  "Ørskog",
  "Bykle",
  "Bygland",
  "Skodje",
  "Storsteinnes",
  "Lonevåg",
  "Evenskjer",
  "Tennevoll",
  "Marnardal",
  "Sandvika",
  "Selje",
  "Løten",
  "Nodeland",
  "Lensvik",
  "Skaland",
  "Vennesla",
  "Nittedal",
  "Notodden",
  "Leland",
  "Sauda",
  "Halden",
  "Fedje",
  "Aksdal",
  "Snåsa",
  "Lærdalsøyri",
  "Myre",
  "Fyresdal",
  "Klæbu",
  "Vestnes",
  "Sarpsborg",
  "Seljord",
  "Åndalsnes",
  "Sand",
  "Gjerdrum",
  "Berkåk",
  "Jondal",
  "Tonstad",
  "Trofors",
  "Farsund",
  "Sande",
  "Florø",
  "Mysen",
  "Etne",
  "Eide",
  "Kautokeino",
  "Brumunddal",
  "Kristiansund",
  "Botngard",
  "Fosnavåg",
  "Nordli",
  "Meråker",
  "Sola",
  "Svelgen",
  "Jessheim",
  "Kviteseid",
  "Røst",
  "Froland",
  "Ås",
  "Eidfjord",
  "Skjærhalden",
  "Lakselv",
  "Siljan",
  "Hønefoss",
  "Rakkestad",
  "Måløy",
  "Hardbakke",
  "Mehamn",
  "Aure",
  "Vinstra",
  "Ranemsletta",
  "Leknes",
  "Straumsjøen",
  "Vangsvik",
  "Risør",
  "Tolga",
  "Dalen",
  "Leinesfjord",
  "Træna",
  "Stange",
  "Porsgrunn",
  "Nesbyen",
  "Nordfjordeid",
  "Fitjar",
  "Båtsfjord",
  "Prestfoss",
  "Dun",
  "Melhus",
  "Hopen",
  "Sistranda",
  "Rindal",
  "Kjøpsvik",
  "Lier",
  "Bokn",
  "Kvitsøy",
  "Forsand",
  "Skotterud",
  "Hyllestad",
  "Moldjord",
  "Engerdal",
  "Bergset",
  "Jørpeland",
  "Stjørdal",
  "Sogndal",
  "Askvoll",
  "Hornindal",
  "Skei",
  "Stryn",
  "Lørenskog",
  "Trøgstad",
  "Skiptvet",
  "Folldal",
  "Straumen",
  "Hurdal",
  "Storebø",
  "Røros",
  "Nesoddtangen",
  "Ørsta",
  "Åmli",
  "Havøysund",
  "Vikøyri",
  "Egersund",
  "Vardø",
  "Solfjellsjøen",
  "Tingvatn",
  "Moi",
  "Elverum",
  "Roan",
  "Steinsdalen",
  "Fossby",
  "Roa",
  "Børsa",
  "Vinje",
  "Sauland",
  "Akkerhaugen",
  "Vigeland",
  "Oppeid",
  "Kolbotn",
  "Lødingen",
  "Ballangen",
  "Hattfjelldal",
  "Ulsteinvik",
  "Gol",
  "Varangerbotn",
  "Rollag",
  "Vikeså",
  "Vikersund",
  "Hol",
  "Moen",
  "Levanger",
  "Hjelmeland",
  "Vegårshei",
  "Lillestrøm",
  "Lillesand",
  "Vevelstad",
  "Askim",
  "Sortland",
  "Valle",
  "Fjerdingby",
  "Kleppestø"
];
const cityOptions = cities.map(city => ({ value: city, label: city }));
const smileyOptions = [
  { value: "0", label: "Smil" },
  { value: "2", label: "Nøytral" },
  { value: "3", label: "Sur" }
];
const sortOptions = [
  { value: "NAME_AZ", label: "Navn A-Å" },
  { value: "NAME_ZA", label: "Navn Å-A" },
  { value: "SMILEY_DESC", label: "Fjes Glad-Sur" },
  { value: "SMILEY_ASC", label: "Fjes Sur-Glad" }
];

const animatedComponents = makeAnimated();

const Searchbar = props => {
  const [isExpanded, setExpand] = useState(false);
  const [name, setName] = useState("");
  const [orderBy, setOrder] = useState(sortOptions[0].value);
  const [cities, addCity] = useState([]);
  const [smileys, addSmiley] = useState([]);

  //Magnifying glass svg icon for search button
  const pic = (
    <img
      className="MagnifyingGlass"
      src={magnifyingGlass}
      alt="Magnifying Glass"
    />
  );

  //Called on click of the search button
  function handleSearch() {
    let parameters =
      "name=" +
      name +
      "&orderBy=" +
      orderBy +
      "&cities=" +
      cities +
      "&smileys=" +
      smileys;
    console.log(parameters);
    fetch("/companies/?" + parameters, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
      console.log(response);
    });
  }

  //Called when text into textfield navn changes, updates navn state
  function handleTextChange(event) {
    setName(event.target.value);
  }
  //Called when more filters button is clicked, toogles the expand state of the searchbar
  function handleFiltersClick() {
    setExpand(!isExpanded);
    //set cities and smileys filter to default values
    if (isExpanded) {
      addCity([]);
      addSmiley([]);
    }
  }
  //Called when a new order is selected
  function handleSelectOrder(selectedOption) {
    setOrder(selectedOption.value);
  }
  //Called when a new city is selected
  function handleSelectCity(selectedOption) {
    let tmp = "";
    selectedOption.forEach(element => {
      tmp = tmp + (tmp.length > 0 ? "-" : "") + element.value;
    });
    addCity(tmp);
  }
  //Called when a new smiley filter is selected
  function handleSelectSmiley(selectedOption) {
    let tmp = "";
    selectedOption.forEach(element => {
      tmp = tmp + (tmp.length > 0 ? "-" : "") + element.value;
      if (element.value === "0") tmp = tmp + "-" + "1";
    });
    addSmiley(tmp);
  }
  let ButtonText = isExpanded ? "Færre filter" : "Flere filter";
  let extraFilters = null;
  if (isExpanded) {
    extraFilters = (
      <div id="ExtraFilters" className="Grid">
        <div className="Label" id="CitiesLabel">
          Filtrer etter byer
        </div>
        <div id="FilterCities" className="Cell">
          <Select
            id="FilterCitiesbar"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={cityOptions}
            onChange={handleSelectCity.bind(this)}
          />
        </div>
        <div className="Label" id="SmileysLabel">
          Filtrer etter fjes
        </div>
        <div id="FilterSmiley" className="Cell">
          <Select
            id="FilterSmileybar"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={smileyOptions}
            onChange={handleSelectSmiley.bind(this)}
          />
        </div>
      </div>
    );
  }
  return (
    <div id="Searchbar" className="Grid">
      <div id="LabelRestaurant" className="Label">
        Søk etter spisested
      </div>
      <div id="TextRestaurant" className="Cell">
        <input
          type="text"
          placeholder="Navn"
          name="fname"
          onChange={handleTextChange}
        />
        <button id="SearchButton" onClick={handleSearch}>
          {pic}
        </button>
      </div>
      <div id="LabelSort" className="Label">
        Sorter etter
      </div>
      <div id="SortSelect" className="Cell">
        <Select
          id="SortSelectbar"
          closeMenuOnSelect={true}
          components={animatedComponents}
          options={sortOptions}
          defaultValue={sortOptions[0]}
          onChange={handleSelectOrder.bind(this)}
        />
      </div>
      <div id="FiltersButtonCell">
        <button id="FiltersButton" onClick={handleFiltersClick}>
          {ButtonText}
        </button>
      </div>
      {extraFilters}
    </div>
  );
};

export default Searchbar;
