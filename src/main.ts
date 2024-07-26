import "./style.css";
import { fetchData } from "../libs/fetch.ts";
import { ITaskResult } from "../types/entity.ts";

const URL_API = "https://v1.appbackend.io/v1/rows/eWsCV4wiJ0Wx";
const cardContent = document.getElementById("app-content");

async function app() {
  // fetch
  const tasks = await fetchData<ITaskResult>(URL_API);

  // iterate
  tasks?.data.map((task) => {
    // call
    const cards = document.createElement("div");
    const cardTitle = document.createElement("h2");
    const cardBatch = document.createElement("h4");
    const cardUrlLink = document.createElement("a");
    const cardGithubLink = document.createElement("a");
    const cardNotes = document.createElement("p");

    // set
    cardTitle.textContent = task.title;
    cardBatch.textContent = task.batch;
    cardUrlLink.href = task.url_link;
    cardUrlLink.textContent = "Assignment Link";

    cards.classList.add("card-content");
    cards?.append(cardTitle, cardBatch, cardUrlLink);

    if (task.github_link !== undefined) {
      cardGithubLink.href = task.github_link;
      cardGithubLink.textContent = "Assignment Github Link";
      cards?.appendChild(cardGithubLink);
    }
    if (task.notes !== undefined) {
      cardNotes.textContent = task.notes;
      cards?.appendChild(cardNotes);
    }

    cardContent?.appendChild(cards);
  });
}
app();
