async function onOpen() {

  const tabs = await browser.tabs.query({currentWindow: true, active: true});

  for (let tabInfo of tabs) {
    const { title, url } = tabInfo;

    const settings = await browser.storage.sync.get(["url", "method"]);

    if (settings.url && settings.url !== "") {
      const method = settings.method || 'POST';
      fetch(settings.url, { method, body: JSON.stringify({title, url}) });

      document.getElementById("loading").classList.add('hidden');
      document.getElementById("success").classList.remove('hidden');
    } else {
      document.getElementById("loading").classList.add('hidden');
      const errorDiv = document.getElementById("error")
      errorDiv.classList.remove('hidden');
      errorDiv.innerText = 'You need to specify a URL to Whack to in Settings'
    }
  }
}

onOpen()

