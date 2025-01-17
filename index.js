console.log(
  "pretty good innit bruv\n\nstolen from jack\n\nwen eta"
);

const parseResponse = (res) => {
  const track = res.recenttracks.track[0];
  const artist = track.artist["#text"];
  const image = track.image[3]["#text"];
  const name = track.name;

  const np = track["@attr"] ? track["@attr"]["nowplaying"] === "true" : false;

  return {
    artist,
    name,
    image,
    np,
  };
};

const setResponse = (res) => {
  if (res.np === true) {
    console.log(`[last.fm] Received song data: ${res.name} - ${res.artist}`);
    document.querySelector(
      "#spotify"
    ).innerHTML = `<div class="bg-green-300 px-6 md:px-4 py-4" style="display:block">
      <div class="max-w-6xl mx-auto container text-grey-300">
        <div class="flex">
          <div class="flex-initial">
            <i class="fad fa-play-circle mr-2"></i>
          </div>
          <div class="flex-1">
            Currently listening to <b>${res.name}</b> by <b>${res.artist}</b> on <b>Spotify</b>
          </div>
        </div>
      </div>
    </div>`;
  } else {
    console.log(`[last.fm] No song data received, waiting...`);
    document.querySelector("#spotify").innerHTML = ``;
  }
};

const getSong = () => {
  fetch(
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=jioriku&api_key=1ced535b12a3461ef608333b87f2d989&format=json&limit=1"
  )
    .then((res) => res.json())
    .then(parseResponse)
    .then(setResponse);
};

setInterval(getSong, 15 * 1000);
getSong();
