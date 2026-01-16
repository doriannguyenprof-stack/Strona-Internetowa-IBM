const form = document.getElementById("opinion-form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const formData = new FormData(form);
	let formDataObject = {};
	formData.forEach((value, key) => {
		formDataObject[key] = value;
	});
	document.getElementById("json-container").textContent = JSON.stringify(
		formDataObject,
		null,
		4,
	);
});

const downloadJsonButton = document.getElementById("download-json-button");
downloadJsonButton.addEventListener("click", () => {
	const jsonString = document.getElementById("json-container").textContent;

	const blob = new Blob([jsonString], { type: "application/json" });
	const dataUrl = URL.createObjectURL(blob);

	const downloadElement = document.createElement("a");
	downloadElement.href = dataUrl;
	downloadElement.download = "dane.json";
	downloadElement.style.display = "none";
	downloadElement.dataset.is_download_element = true;
	document.body.appendChild(downloadElement);
	downloadElement.click();
	document.body.removeChild(downloadElement);
});
