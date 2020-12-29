function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    url: document.querySelector("#url").value,
    method: document.querySelector("#method").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    console.log(result)
    document.querySelector("#url").value = result.url || "";
    document.querySelector("#method").value = result.color || "POST";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get(["url", "method"]);
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

