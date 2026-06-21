let talks = JSON.parse(localStorage.getItem("talks")) || [];

function saveTalks() {
  localStorage.setItem("talks", JSON.stringify(talks));
}

function addTalk() {
  const person = document.getElementById("person").value;
  const topic = document.getElementById("topic").value;
  const date = document.getElementById("date").value;
  const status = document.getElementById("status").value;
  const notes = document.getElementById("notes").value;

  if (!person || !topic) {
    alert("Please enter person name and topic");
    return;
  }

  const talk = {
    id: Date.now(),
    person,
    topic,
    date,
    status,
    notes
  };

  talks.push(talk);
  saveTalks();
  clearForm();
  renderTalks();
}

function clearForm() {
  document.getElementById("person").value = "";
  document.getElementById("topic").value = "";
  document.getElementById("date").value = "";
  document.getElementById("status").value = "Open";
  document.getElementById("notes").value = "";
}

function deleteTalk(id) {
  talks = talks.filter(talk => talk.id !== id);
  saveTalks();
  renderTalks();
}

function renderTalks() {
  const list = document.getElementById("talkList");
  const search = document.getElementById("search").value.toLowerCase();

  list.innerHTML = "";

  talks
    .filter(talk =>
      talk.person.toLowerCase().includes(search) ||
      talk.topic.toLowerCase().includes(search) ||
      talk.status.toLowerCase().includes(search)
    )
    .forEach(talk => {
      const div = document.createElement("div");
      div.className = "talk " + talk.status.toLowerCase();

      div.innerHTML = `
        <h3>${talk.topic}</h3>
        <p><b>Person:</b> ${talk.person}</p>
        <p><b>Date:</b> ${talk.date || "Not set"}</p>
        <p><b>Status:</b> ${talk.status}</p>
        <p><b>Notes:</b> ${talk.notes || ""}</p>
        <button onclick="deleteTalk(${talk.id})">Delete</button>
      `;

      list.appendChild(div);
    });
}

renderTalks();
