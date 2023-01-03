AOS.init();
const quotes = document.getElementById("quotes");
const author = document.getElementById("author");
const newQ = document.getElementById("newQ");
const tweetMe = document.getElementById("tweetMe");
const linkedin = document.getElementById("linkedin");
let realData = "";
let quotesData = "";

const tweetNow = () => {
  let tweetPost = `https://twitter.com/intent/tweet?text="${quotesData.text}"  ${quotesData.author}`;
  window.open(tweetPost);
};
const linkedinNow = () => {
  let linkedinPost = ` https://www.linkedin.com/share?text="${quotesData.text}"  ${quotesData.author}`;
  window.open(linkedinPost);
};

const getNewQuotes = () => {
  let rdmNum = Math.floor(Math.random() * 1000);
  quotesData = realData[rdmNum];
  console.log(quotesData.text);
  console.log(quotesData.author);
  quotes.innerText = `${quotesData.text}`;

  quotesData.author == null
    ? (author.innerText = "Unknown")
    : (author.innerText = `${quotesData.author}`);
};

const getQuotes = async () => {
  const api = "https://type.fit/api/quotes";
  try {
    let data = await fetch(api);
    realData = await data.json();
    getNewQuotes();
  } catch (error) {
    console.log("API not fetching");
  }
};
tweetMe.addEventListener("click", tweetNow);
linkedin.addEventListener("click", linkedinNow);
newQ.addEventListener("click", getNewQuotes);

getQuotes();

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(`"${quotes.innerText}" ${author.innerText}`);
    console.log("Content copied to clipboard");
    alert("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

