"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form");
const input = document.querySelector("#input-location");
const sectionTempInfos = document.querySelector("#temp-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionTempInfos)
        return;
    const location = input.value;
    if (location.length < 3) {
        alert("Location must be more than three characters");
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9cc9e172180948f5c225c71ff2a424b1&lang=pt_br&units=metric`);
        const data = yield response.json();
        const infos = {
            temperature: Math.round(data.main.temp),
            location: data.name,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };
        sectionTempInfos.innerHTML = `<div class="temp-data">
          <h2>${infos.location}</h2>
          <span>${infos.temperature}</span>
        </div>

        <img src="${infos.icon}" />`;
    }
    catch (err) {
        console.log("Error retrieving with API", err);
    }
}));
