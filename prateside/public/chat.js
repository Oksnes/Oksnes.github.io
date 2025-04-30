//GANSKE MYE LAGET MED JO-BJØRNAR V2 OG LITT HJELP FRA COPILOT
//GANSKE MYE LAGET MED JO-BJØRNAR V2 OG LITT HJELP FRA COPILOT
//GANSKE MYE LAGET MED JO-BJØRNAR V2 OG LITT HJELP FRA COPILOT


let currentRomID;

async function fetchRom() {
  const response = await fetch('/Rom');
  const Rom = await response.json();
  const channelSelect = document.getElementById('channel-select');

  channelSelect.innerHTML = '';
  Rom.forEach(Rom => {
    const option = document.createElement('option');
    option.value = Rom.RomID;
    option.textContent = Rom.Navn;
    channelSelect.append(option);
  });

if (Rom.length > 0) {
  currentRomID = Rom[0].RomID;
  fetchMeldinger(currentRomID);
}
}

document.getElementById('create-channel-button').addEventListener('click', async () => {
  const newChannelInput = document.getElementById('new-channel-input');
  const channelName = newChannelInput.value;
  await fetch('/Rom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Navn: channelName })
  });
  newChannelInput.value = '';
  fetchRom();
});

async function fetchMeldinger(currentRomID) {
  const response = await fetch(`/Rom/${currentRomID}/Meldinger`);
  const meldinger = await response.json();
  const messageContainer = document.getElementById('message-container');
  messageContainer.innerHTML = '';

  meldinger.forEach(msg => {
    const messageElement = document.createElement('div');
    const profileImg = document.createElement('img');

    // Bruk profilbilde eller standardbilde
    profileImg.src = msg.ProfilBilde || '/Standard-Profilbilde.jpg';
    profileImg.alt = `${msg.BrukerNavn} sitt profilbilde`;
    profileImg.style.width = '40px';
    profileImg.style.height = '40px';
    profileImg.style.marginRight = '10px';
    // profileImg.style.borderRadius = '50%';

    const textElement = document.createElement('span');
    textElement.textContent = `${msg.BrukerNavn}: `;

    messageElement.append(profileImg, textElement);

    // Legg til tekstinnhold hvis det finnes
    if (msg.Innhold) {
      const contentElement = document.createElement('span');
      contentElement.textContent = msg.Innhold;
      messageElement.append(contentElement);
    }

    // Legg til bilde hvis det finnes
    if (msg.BildeURL) {
      const imageElement = document.createElement('img');
      imageElement.src = msg.BildeURL;
      imageElement.alt = 'Bilde sendt i chat';
      imageElement.style.maxWidth = '200px';
      imageElement.style.maxHeight = '200px';
      imageElement.style.marginLeft = '10px';
      messageElement.append(imageElement);
    }

    messageContainer.append(messageElement);
  });
}

async function postMelding(Innhold, BildeURL) {
  const body = {
    Innhold: Innhold || null,
    BildeURL: BildeURL || null
  };

  await fetch(`/Rom/${currentRomID}/Meldinger`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

document.getElementById('send-button').addEventListener('click', async (event) => {
  event.preventDefault();

  const messageInput = document.getElementById('message-input');
  const imageUrlInput = document.getElementById('image-url-input');
  const Innhold = messageInput.value.trim();
  const BildeURL = imageUrlInput.value.trim();

  if (!Innhold && !BildeURL) return; // Unngå å sende tomme meldinger

  await postMelding(Innhold, BildeURL);

  messageInput.value = '';
  imageUrlInput.value = '';
  fetchMeldinger(currentRomID);
});

document.getElementById('channel-select').addEventListener('change', (event) => {
  currentRomID = event.target.value;
  fetchMeldinger(currentRomID);
});

fetchRom();

setInterval(() => {
  if (currentRomID) {
    fetchMeldinger(currentRomID);
  }
}, 1000);