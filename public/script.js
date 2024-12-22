document
  .getElementById("wordsDB")
  .addEventListener("submit", async function (event) {
    const word = document.getElementById("savedText").value;
    try {
      const response = await fetch("/save-data-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedText: word }),
      });
      if (response.ok) {
        const result = await response.text();
        console.log("Text stored succesfully");
      }
    } catch (error) {
      console.error("eroare", error);
    }
  });

async function displayData() {
  try {
    const response = await fetch("http://localhost:3000/get-data");
    const data = await response.json();
    data.forEach((row) => {
      const wordsForDisplay =
        row.words.length > 30 ? row.words.substring(0, 3) + "..." : row.words;
      const finalWord =
        row.words.length > 30
          ? `<a href="/word/${row.ID}" target="_blank">${wordsForDisplay}</a>`
          : row.words;
      const wordsInList = `<li>${finalWord}</li>`;
      document.querySelector("ul").insertAdjacentHTML("beforeend", wordsInList);
    });
  } catch (error) {
    console.log("You did not get the data!");
  }
}
displayData();
