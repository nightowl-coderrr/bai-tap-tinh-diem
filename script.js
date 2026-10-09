const SUBJECTS = [
  "Giải tích 1",
  "Đại số tuyến tính",
  "Xác suất thống kê",
  "Tin học đại cương",
  "Xây dựng ứng dụng Web"
];

/**
 * Tính điểm trung bình từ mảng điểm.
 * @param {number[]} scores - mảng điểm 5 môn
 * @returns {number} điểm trung bình
 */
function calculateAverage(scores) {
  const sum = scores.reduce((total, s) => total + s, 0);
  return sum / scores.length;
}

/**
 * Xếp loại học tập theo điểm trung bình.
 * @param {number} avg - điểm trung bình
 * @returns {string} xếp loại
 */
function classify(avg) {
  if (avg >= 8.0) return "Giỏi";
  if (avg >= 6.5) return "Khá";
  if (avg >= 5.0) return "Trung bình";
  return "Yếu";
}

function rankClass(rank) {
  switch (rank) {
    case "Giỏi": return "rank-gioi";
    case "Khá": return "rank-kha";
    case "Trung bình": return "rank-tb";
    default: return "rank-yeu";
  }
}

function setError(id, message) {
  const input = document.getElementById(id);
  document.getElementById("error-" + id).textContent = message;
  input.classList.toggle("invalid", message !== "");
}

function validate() {
  let valid = true;

  const name = document.getElementById("studentName").value.trim();
  if (name === "") {
    setError("studentName", "Vui lòng nhập tên sinh viên.");
    valid = false;
  } else {
    setError("studentName", "");
  }

  const scores = [];
  for (let i = 1; i <= 5; i++) {
    const id = "score" + i;
    const raw = document.getElementById(id).value.trim();

    if (raw === "") {
      setError(id, "Không được để trống.");
      valid = false;
      continue;
    }

    const value = Number(raw);
    if (Number.isNaN(value) || value < 0 || value > 10) {
      setError(id, "Điểm phải từ 0 đến 10.");
      valid = false;
      continue;
    }

    setError(id, "");
    scores.push(value);
  }

  return valid ? { name, scores } : null;
}

function showResult(name, scores) {
  const avg = calculateAverage(scores);
  const rank = classify(avg);

  document.getElementById("resName").textContent = name;

  const body = document.getElementById("resBody");
  body.innerHTML = "";
  scores.forEach((score, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${index + 1}</td><td>${SUBJECTS[index]}</td><td>${score}</td>`;
    body.appendChild(row);
  });

  document.getElementById("resAvg").textContent = avg.toFixed(2);

  const rankCell = document.getElementById("resRank");
  rankCell.textContent = rank;
  rankCell.className = rankClass(rank);

  document.getElementById("result").classList.remove("hidden");
}

document.getElementById("scoreForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const data = validate();
  if (data) {
    showResult(data.name, data.scores);
  } else {
    document.getElementById("result").classList.add("hidden");
  }
});
