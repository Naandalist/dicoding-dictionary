class WordContent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <div class="title-field">
          <h1 class="Word"></h1>
          <h4 class="phonetic-text"></h4>
        </div>
        <div class="descript-field">
          <p class="definition"></p>
        </div>
      `;
    }
  
    connectedCallback() {
      this.shadowRoot.querySelector(".Word").textContent = this.getAttribute("word");
      this.shadowRoot.querySelector(".phonetic-text").textContent = this.getAttribute("phonetic");
      this.shadowRoot.querySelector(".definition").textContent = this.getAttribute("definition");
    }
  }
  customElements.define("word-content", WordContent);
  