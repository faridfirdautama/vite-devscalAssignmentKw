import "./style.css";
import { fetchData } from "../libs/fetch.ts";
import { ITaskResult } from "../types/entity.ts";

const URL_API = "https://v1.appbackend.io/v1/rows/eWsCV4wiJ0Wx";
const cardContent = document.getElementById("app-content");

async function app() {
  // fetch
  const tasks = await fetchData<ITaskResult>(URL_API);

  if (tasks?.data.length === 0) {
    const message = document.createElement("h2");
    message.textContent = "You have no submitted assignment !";
    cardContent?.appendChild(message);
    return;
  }
  // iterate
  tasks?.data.map((task) => {
    // call
    const cards = document.createElement("div");
    const cardTitle = document.createElement("h2");
    const cardBatch = document.createElement("h4");
    const cardUrlLink = document.createElement("a");
    const cardGithubLink = document.createElement("a");
    const cardNotes = document.createElement("p");
    const delBtn = document.createElement("button");

    // set
    cards.classList.add("card-content");
    cardTitle.textContent = task.title;
    cardBatch.textContent = task.batch;
    cardUrlLink.href = task.urllink;
    cardUrlLink.textContent = "Assignment Url Link";
    delBtn.classList.add("del-btn");
    delBtn.textContent = "Delete";

    cards?.append(cardTitle, cardBatch, cardUrlLink);

    if (task.githublink?.length !== 0) {
      cardGithubLink.href = task.githublink as string | ""; //github;
      cardGithubLink.textContent = "Assignment Github Url Link";
      cards?.appendChild(cardGithubLink);
    } else {
      cardGithubLink.remove();
    }
    if (task.notes?.length !== 0) {
      cardNotes.textContent = task.notes as string | "";
      cards?.appendChild(cardNotes);
    } else {
      cardNotes.remove();
    }

    cards.appendChild(delBtn);
    cardContent?.append(cards);

    // Delete row
    delBtn.addEventListener("click", async () => {
      //
      const id = task._id;
      try {
        //
        await fetch(URL_API, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([{ id }]),
        });
      } catch (error) {
        console.log(error);
      } finally {
        window.location.reload();
      }
    });
  });
}
app();

// Insert new row
const createBtn = document.getElementById("createBtn");
const submitBtn = document.getElementById("submitBtn");
const inputTitle = document.getElementById("inputTitle") as HTMLInputElement;
const inputOpt = document.getElementById("inputOpt") as HTMLOptionElement;
const inputUrlLink = document.getElementById(
  "inputUrlLink",
) as HTMLInputElement;
const inputGithubLink = document.getElementById(
  "inputGithubLink",
) as HTMLInputElement;
const inputNotes = document.getElementById("inputNotes") as HTMLTextAreaElement;
const modalContainer = document.getElementById("modal-container");
const overlay = document.getElementById("overlay");

createBtn?.addEventListener("click", () => {
  modalContainer?.classList.remove("hidden");
  overlay?.classList.remove("hidden");
});

submitBtn?.addEventListener("click", async () => {
  const title = inputTitle.value;
  const batch = inputOpt.value;
  const urllink = inputUrlLink.value;
  const githublink = inputGithubLink.value;
  const notes = inputNotes.value;

  try {
    await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ title, batch, urllink, githublink, notes }]),
    });
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }

  modalContainer?.classList.add("hidden");
  overlay?.classList.add("hidden");
});
