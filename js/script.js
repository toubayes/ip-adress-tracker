let input=document.getElementById("ip-address");
let track=document.querySelector(".btn-tracker");
let IpResult=document.querySelector(".ipaddress");
let iplocation=document.querySelector(".location");
let iptimezone=document.querySelector(".timezone");
let inpisput=document.querySelector(".isp");
let map=document.querySelector(".map-traccking");
// let=apikey="https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_Yy3kKEAQmK6iJG0EUpHyEDHbL6ceB&ipAddress=8.8.8.8"

//TO CHECK THE INPUTED IP ADDRESS
const validateInputs = function (inputed) {
    if (!Number(inputed) || inputed.length < 11 || inputed) {
      alert("Not a valid IP Address");
    } else {
      console.log("IP Address is valid");
    }
  };
  
  //CALLING THE API to get the location of the user https://geo.ipify.org/api/v2/country?apiKey=at_d7PHraagdYPV9IlJEOm1wmQx4gTkQ&ipAddress=8.8.8.8
  const userIP = async function (inp) {
    try {
      //FUNCTION TO SHOW THE RESULT OF THE INPUTED IP ADDRESS
      const ip = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=8bb5046b979d4e76a86854423f2d7691&ip=${inp}`
      );
      const data = await ip.json();
  
      //getting the current ip address of the user
      console.log(data);
      const myIp = data.ip;
      const location = data.city;
      const timezone = data.time_zone.offset;
      const isp = data.isp;
  
      //setting my ip address to show on load
      input.value = myIp;
      IpResult.innerHTML = myIp;
      iplocation.innerHTML = location;
      iptimezone.innerHTML = timezone;
      inpisput.innerHTML = isp;
  
      // FUNCTION TO SHOW THE LOCATION ON THE MAP
  
      const lat = data.latitude;
      const lng = data.longitude;
      console.log(lat, lng);
      mapboxgl.accessToken =
        "pk.eyJ1IjoiY29kaW5nbmluamEiLCJhIjoiY2xscHRwb2g0MDhhajNsbDBua2o2MGc1aiJ9.5UJt0BwVEq8SsGV9ExOVyw";
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: [lng, lat], // starting position [lng, lat]
        zoom: 15, // starting zoom
      });
  
      const geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
          },
        ],
      };
      for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement("div");
        el.className = "marker";
  
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);
      }
  
      // POP UP BOX
      const popup = new mapboxgl.Popup()
        .setLngLat([lng, lat])
        .setHTML(`<img src="../images/icon-location.svg" alt="">`)
        .addTo(map);  //FUNCTION TO SHOW THE RESULT OF THE INPUTED IP ADDRESS
    } catch (error) {}
  };
  
  //TO SHOW THE IP ADDRESS ON LOAD
  window.addEventListener("load", function () {
    userIP("");
  });
  
  //BUTTON EVENT LISTENER TO SHOW EVERYTHING
  track.addEventListener("click", function (e) {
    e.preventDefault();
    //calling the api to get the location of the inserted ip address
    userIP(input.value);
  });