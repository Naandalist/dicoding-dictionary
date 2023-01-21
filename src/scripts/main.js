import axios from "axios";
import Toastify from "toastify-js";

// Import the custom element
import "./word-content.js";

const baseUrl = "https://api.dictionaryapi.dev";
const endpoint = "entries/en";

const main = () => {
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  const handleSearch = () => {
    getWordData(searchInput.value);
  };

  const handleEnter = (event) => {
    if (event.keyCode === 13 && searchInput.value) {
      getWordData(searchInput.value);
    }
  };

  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keyup", handleEnter);

  const getWordData = (word) => {
    axios
      .get(`${baseUrl}/api/v2/${endpoint}/${word}`)
      .then((response) => {
        console.log("data: ", response);
        showToast("Get data success!😁");

        // Pass the data from the response to showData()
        showData(response.data);
      })
      .catch((error) => {
        showToast(`Error: ${error.message}`);
        console.log(error);
      });
  };

  const showToast = (text) => {
    Toastify({
      text: text || "A message",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #f44336, #e91e63)",
      },
    }).showToast();
  };

  const showData = (data) => {
    // Remove the previous word-content element from the container
    const container = document.querySelector(".col");
    const previousWordContent = container.querySelectorAll("word-content");
    if (previousWordContent.length > 0) {
      previousWordContent.forEach((element) => element.remove());
    }

    // Create a new word-content element
    const wordContent = document.createElement("word-content");
    wordContent.setAttribute("word", data[0].word);
    wordContent.setAttribute("phonetic", `noun: ${data[0]?.phonetic || "-"}`);
    wordContent.setAttribute(
      "definition",
      data[0].meanings[0].definitions[0].definition
    );

    // Add the new word-content element to the container
    container.appendChild(wordContent);
  };
};

export default main;
