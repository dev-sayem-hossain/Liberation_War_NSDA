// Documents: filter by type and relevance
var typeFilter = document.getElementById("typeFilter");
var relFilter = document.getElementById("relFilter");

function filterDocs() {
  var rows = document.querySelectorAll("#docTable tbody tr");
  rows.forEach(function (row) {
    var okType = typeFilter.value === "all" || row.dataset.type === typeFilter.value;
    var okRel = relFilter.value === "all" || row.dataset.relevance === relFilter.value;
    row.style.display = okType && okRel ? "" : "none";
  });
}

if (typeFilter) {
  typeFilter.addEventListener("change", filterDocs);
  relFilter.addEventListener("change", filterDocs);
}

// Documents: detail view in a modal
document.querySelectorAll(".view-doc").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var row = btn.closest("tr");
    document.getElementById("docTitle").textContent = row.dataset.title;
    document.getElementById("docDesc").textContent = row.dataset.desc;
    document.getElementById("docDate").textContent = row.dataset.date;
    document.getElementById("docSource").textContent = row.dataset.source;
    new bootstrap.Modal(document.getElementById("docModal")).show();
  });
});

// Gallery: open photo, zoom and download
var zoom = 100;

function setZoom(value) {
  zoom = Math.max(100, Math.min(400, value));
  document.getElementById("bigPhoto").style.width = zoom + "%";
}

document.querySelectorAll(".gallery-img").forEach(function (img) {
  img.addEventListener("click", function () {
    var big = document.getElementById("bigPhoto");
    big.src = img.dataset.full;
    document.getElementById("photoTitle").textContent = img.alt;
    var link = document.getElementById("downloadLink");
    link.href = img.dataset.full;
    link.download = img.dataset.full.split("/").pop();
    setZoom(100);
    new bootstrap.Modal(document.getElementById("photoModal")).show();
  });
});

var zoomIn = document.getElementById("zoomIn");
if (zoomIn) {
  zoomIn.addEventListener("click", function () { setZoom(zoom + 50); });
  document.getElementById("zoomOut").addEventListener("click", function () { setZoom(zoom - 50); });
}

// Contact form validation
var form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    document.getElementById("thanks").classList.remove("d-none");
    form.reset();
    form.classList.remove("was-validated");
  });
}
