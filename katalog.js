// Załadowanie danych z pliku
const data = await fetch("./dane.json");

// Odczytanie danych w formacie json
const json = await data.json();
const productData = json.products;

// Wybór elementu z elementami katalogu
const catalogueItemsContainer = document.getElementById("catalogue-items");

const productTypeSelect = document.getElementById("type-select");
productTypeSelect.addEventListener("input", () => {
	showProducts();
});

const prothesisSubtypeSelect = document.getElementById(
	"prothesis-subtype-select",
);
prothesisSubtypeSelect.addEventListener("input", () => {
	showProducts();
});

productTypeSelect.value = "wszystko";

const nameSearch = document.getElementById("name-search");
nameSearch.addEventListener("input", () => {
	showProducts();
});
// Elementy powiększania przy kliknięciu
const imageModal = document.getElementById("image-modal");
const imageModalImg = document.getElementById("image-modal-img");
const imageModalBackdrop = document.getElementById("image-modal-backdrop");

function showProducts() {
	// Czyścimy katalog, by od nowa go zbudować
	catalogueItemsContainer.innerHTML = "";

	// Pokazujemy wybór podtypu dla protez
	if (productTypeSelect.value == "proteza") {
		if (prothesisSubtypeSelect.classList.contains("hidden")) {
			prothesisSubtypeSelect.classList.remove("hidden");
		}
	} else {
		prothesisSubtypeSelect.classList.add("hidden");
	}

	// Dla każdego produktu tworzymy element katalogu
	productData.forEach((product) => {
		if (
			productTypeSelect.value != "wszystko" &&
			product.type != productTypeSelect.value
		) {
			return;
		}

		if (
			!product.name.toLowerCase().includes(nameSearch.value.toLowerCase())
		) {
			return;
		}

		if (
			product.type == "proteza" &&
			product.subtype != prothesisSubtypeSelect.value &&
			prothesisSubtypeSelect.value != "wszystkie"
		) {
			return;
		}

		// Tworzymy element 'div'
		const div = document.createElement("div");

		// Dodajemy klasę do elementu
		div.classList = "product-card";
		let subtype_div =
			product.type == "proteza"
				? `<div>Podtyp: ${product.subtype}</div>`
				: "";

		// Dodajemy wyświetlanie danych do elementu
		div.innerHTML = `
        <div>Typ: ${product.type}</div>
        <img src="${product.image_url}" alt="product image"
		class="product-image" data-full="${product.image_url}"/>
        <div>Nazwa: ${product.name}</div>
        ${subtype_div}
        <div>Opis: ${product.description}</div>
    `;

		// Dodanie elementu do strony
		catalogueItemsContainer.appendChild(div);
	});

	const images = document.querySelectorAll(".product-image");
	for (const image of images) {
		image.addEventListener("click", () => {
			openImageModal(image.dataset.full);
		});
	}
}

showProducts();

// Funkcja otwierania i zamykania poszerzonego obrazu
function openImageModal(src) {
	console.log("open");
	imageModalImg.src = src;
	imageModal.classList.remove("hidden");
}

function closeImageModal() {
	imageModal.classList.add("hidden");
	imageModalImg.src = "";
}

imageModalBackdrop.addEventListener("click", closeImageModal);
