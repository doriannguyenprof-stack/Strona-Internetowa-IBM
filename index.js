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

productTypeSelect.value = "wszystko";

const nameSearch = document.getElementById("name-search");
nameSearch.addEventListener("input", () => {
	showProducts();
});

function showProducts() {
	// Czyścimy katalog, by od nowa go zbudować
	catalogueItemsContainer.innerHTML = "";

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

		// Tworzymy element 'div'
		const div = document.createElement("div");

		// Dodajemy klasę do elementu
		div.classList = "product-card";

		// Dodajemy wyświetlanie danych do elementu
		div.innerHTML = `
        <div>Typ: ${product.type}</div>
        <img src="${product.image_url}" alt="product image"/>
        <div>Nazwa: ${product.name}</div>
        <div>Opis: ${product.description}</div>
    `;

		// Dodanie elementu do strony
		catalogueItemsContainer.appendChild(div);
	});
}

showProducts();
