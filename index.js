// Załadowanie danych z pliku
const data = await fetch("./dane.json");

// Odczytanie danych w formacie json
const json = await data.json();
const productData = json.products;

// Wybór elementu z elementami katalogu
const catalogueItemsContainer = document.getElementById("catalogue-items");

// Dla każdego produktu tworzymy element katalogu
productData.forEach((product) => {
	// Tworzymy element 'div'
	const div = document.createElement("div");

	// Dodajemy klasę do elementu
	div.classList = "product-card";

	// Dodajemy wyświetlanie danych do elementu
	div.innerHTML = `
        <div>Typ: ${product.type}</div>
        <img src="${product.image_url}" alt="product image"/>
        <div>Cena: ${product.price_pln} zł</div>
        <div>Opis: ${product.description}</div>
    `;

	// Dodanie elementu do strony
	catalogueItemsContainer.appendChild(div);
});
