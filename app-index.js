function actualizarParpadeoImagen(hayParpadeo) {
  const formImage = document.getElementById("form-image");
  if (!formImage) return;

  if (hayParpadeo) {
    formImage.classList.add("parpadea-imagen");
    formImage.style.opacity = "1";
    formImage.style.pointerEvents = "auto";
  } else {
    formImage.classList.remove("parpadea-imagen");
    formImage.style.opacity = "0";
    formImage.style.pointerEvents = "none";
  }
}

window.addEventListener("storage", (event) => {
  if (event.key === "foca_loca_parpadeo") {
    const activo = event.newValue === "true";
    actualizarParpadeoImagen(activo);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const estadoAlCargar = localStorage.getItem("foca_loca_parpadeo") === "true";
  actualizarParpadeoImagen(estadoAlCargar);
});
