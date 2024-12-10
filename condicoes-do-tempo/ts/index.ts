const form = document.querySelector("#search-form");
const input: HTMLInputElement | null =
  document.querySelector("#input-location");
const sectionTempInfos = document.querySelector("#temp-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempInfos) return;

  const location = input.value;

  if (location.length < 3) {
    alert("Location must be more than three characters");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9cc9e172180948f5c225c71ff2a424b1&lang=pt_br&units=metric`
    );

    const data = await response.json();

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
  } catch (err) {
    console.log("Error retrieving with API", err);
  }
});