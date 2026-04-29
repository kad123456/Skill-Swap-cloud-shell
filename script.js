let users = JSON.parse(localStorage.getItem("users")) || [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addBtn").addEventListener("click", addUser);
  findMatches();
});

function addUser() {
  const name = document.getElementById("name").value.trim();
  const haveInput = document.getElementById("have").value;
  const wantInput = document.getElementById("want").value;

  if (!name || !haveInput || !wantInput) {
    alert("Please fill all fields!");
    return;
  }

  const have = haveInput.toLowerCase().split(",").map(s => s.trim());
  const want = wantInput.toLowerCase().split(",").map(s => s.trim());

  users.push({ name, have, want });

  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("name").value = "";
  document.getElementById("have").value = "";
  document.getElementById("want").value = "";

  findMatches();
}

function findMatches() {
  let output = "";

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {

      let u1 = users[i];
      let u2 = users[j];

      let match =
        u1.want.some(skill => u2.have.includes(skill)) &&
        u2.want.some(skill => u1.have.includes(skill));

      if (match) {
        output += `<p>${u1.name} matches with ${u2.name}</p>`;
      }
    }
  }

  document.getElementById("matches").innerHTML =
    output || "<p>No matches yet</p>";
}
