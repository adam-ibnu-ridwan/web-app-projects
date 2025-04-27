const addTaskBtn = document.querySelector(".add-task button"),
  inputTask = document.querySelector(".add-task input"),
  containerTask = document.getElementById("tasks-container"),
  getTasks = () => JSON.parse(localStorage.getItem("tasks"));

// --- [Pengecekan Local Storage] ---
// Jika user sudah pernah buat tugas, tambahkan tugas-tugas tsb ke layar)
if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", "[]");
} else {
  getTasks().forEach((el) => {
    const newTaskBox = addTask(el.task);

    if (el.isChecked) {
      newTaskBox.firstChild.checked = true;
      newTaskBox.classList.add("checked");
    }
  });
}

// Event Handler: Tombol "Tambahkan Tugas"
addTaskBtn.addEventListener("click", () => {
  const tasks = getTasks();
  const newTaskValue = escapeHtml(inputTask.value);

  if (newTaskValue !== "") {
    if (tasks.filter((e) => e.task === newTaskValue).length > 0) {
      // Jika tugas duplikat, cegah!
      alert("⚠️ Tugas sudah ada, silahkan ketikkan tugas lain!");
    } else {
      addTask(newTaskValue);
      tasks.push({ task: newTaskValue, isChecked: false });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      inputTask.value = "";
    }
  }
});

// Event Handler: Tombol Atribut Tugas (selesai, edit, hapus)
containerTask.addEventListener("click", (e) => {
  const tasks = getTasks();

  if (e.target.classList.contains("delete-task")) {
    // Hapus Tugas [❌]
    if (confirm("⚠️ Apakah Anda yakin ingin menghapus tugas ini?")) {
      localStorage.setItem(
        "tasks",
        JSON.stringify(
          tasks.filter(
            (el) =>
              el.task !==
              e.target.previousElementSibling.previousElementSibling.innerText
          )
        )
      );

      e.target.parentNode.remove();
    }
  } else if (e.target.classList.contains("check-task")) {
    // Tugas Selesai [✅]
    if (e.target.checked) {
      e.target.parentNode.classList.add("checked");
      tasks.forEach((el) => {
        if (e.target.nextElementSibling.innerText == el.task) {
          el.isChecked = true;
        }
      });
    } else {
      e.target.parentNode.classList.remove("checked");
      tasks.forEach((el) => {
        if (e.target.nextElementSibling.innerText == el.task) {
          el.isChecked = false;
        }
      });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else if (e.target.classList.contains("edit-task")) {
    // Tombol Edit [✏️]
    let newTask = escapeHtml(prompt("ℹ️ Edit tugas ini:"));

    if (tasks.filter((e) => e.task === newTask).length > 0) {
      alert("⚠️ Task tidak boleh sama!");
    } else {
      tasks.forEach((el) => {
        if (el.task === e.target.previousElementSibling.innerText)
          el.task = newTask;
      });
      e.target.previousElementSibling.innerText = newTask;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
});

// --- [Kumpulan Functions] ---
function addTask(task) {
  const taskBox = document.createElement("div");
  taskBox.classList.add("task");
  taskBox.innerHTML = `<input type="checkbox" class="check-task" />
          <span class="">${task.toString()}</span>
          <button class="edit-task" data-feather="edit"></button>
          <button class="delete-task" data-feather="x"></button>`;
  containerTask.appendChild(taskBox);
  feather.replace();

  return taskBox;
}

function escapeHtml(unsafe) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
