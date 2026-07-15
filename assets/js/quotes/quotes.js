document.addEventListener("DOMContentLoaded", () => {
    const savedQuote =  JSON.parse(localStorage.getItem("quoteData"));

    if (savedQuote && savedQuote.quote) {
        bindQuoteData(savedQuote.quote);
        document.getElementById( "motivationQuotes").style.display = "block";
    } else 
        getQuotes();

    document.querySelector("#newQuote").addEventListener("click", getQuotes);
});

async function getQuotes() {
    try {
        const response = await fetch(
            "https://api.api-ninjas.com/v2/randomquotes",
            {
                headers: {
                    "X-Api-Key": "r7l1IqXpB7u4ivymcI9d2uqiPQWMXiow7G8ZVGLj"
                }
            }
        );

        const data = await response.json();
        const quote = data[0];
        localStorage.setItem("quoteData",JSON.stringify({quote}));
        bindQuoteData(quote);
        document.getElementById("motivationQuotes").style.display = "block";
    } catch (error) {
        console.error(error);
    }
}

function bindQuoteData(data) {
    document.querySelector(".quote-text").textContent = data.quote;
    document.querySelector(".author").textContent = `— ${data.author}`;
    document.querySelector(".tags").innerHTML =
        data.categories
            .map(category => `
                <button class="tag-btn" onclick="getQuoteByCategory('${category}')">
                    ${category.charAt(0).toUpperCase() +
                    category.slice(1)}
                </button>
            `)
            .join("");
}

async function getQuoteByCategory(category) {
    try {
        const response = await fetch(
            `https://api.api-ninjas.com/v2/randomquotes?categories=${category}`,
            {
                headers: {
                    "X-Api-Key": "r7l1IqXpB7u4ivymcI9d2uqiPQWMXiow7G8ZVGLj"
                }
            }
        );

        const data = await response.json();
        document.querySelector(".quote-text").textContent =data[0].quote;
        document.querySelector(".author").textContent =`— ${data[0].author}`;
    }
    catch (error) {
        console.error(error);
    }

}