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

    // Use profile image or default
    profileImg.src = msg.ProfilBilde || '/Standard-Profilbilde.jpg';
    profileImg.alt = `${msg.BrukerNavn} sitt profilbilde`;
    profileImg.style.width = '40px';
    profileImg.style.height = '40px';
    profileImg.style.marginRight = '10px';

    const textElement = document.createElement('span');
    textElement.textContent = `${msg.BrukerNavn}: `;

    const contentElement = document.createElement('span');
    if (msg.Innhold.includes('<img')) {
      // If the message contains an image tag, render it as HTML
      const imageContainer = document.createElement('div');
      imageContainer.innerHTML = msg.Innhold;
      contentElement.append(imageContainer);
    } else {
      contentElement.textContent += msg.Innhold;
    }

    messageElement.append(profileImg, textElement, contentElement);
    messageContainer.append(messageElement);
  });
}

async function postMelding(Innhold, imageUrl) {
  const body = imageUrl
    ? { Innhold: `<img src="${imageUrl}" alt="Image" style="max-width: 200px; max-height: 200px;">` }
    : { Innhold };

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
  const Innhold = messageInput.value;
  const imageUrl = imageUrlInput.value;

  if (Innhold.trim() === '' && imageUrl.trim() === '') return; // Avoid sending empty messages

  await postMelding(Innhold, imageUrl);

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