
fetch("products.json")
    .then((response) => {
        if (!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        initialProducts(data);
    })
    .catch((error) => console.error(`Fetch problem: ${error.message}`));

function initialProducts(products){
    const mainContainer = document.querySelector('main');
    const category = document.querySelector('#category');
    const btnFilter = document.querySelector('button');
    const searchTerm = document.querySelector('#searchTerm');
    const allProducts = products;
    let filteredProducts = [];

    function showProducts(products){
        if (products){
            for (const product of products) {        
                let productContainer = document.createElement('section');
                productContainer.setAttribute("class", product.type);
                mainContainer.appendChild(productContainer);
    
                const productName = document.createElement('h2');
                productName.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());
                
    
                const productPrice = document.createElement('p');
                productPrice.textContent = `$${product.price}`;
                
                const productImg = document.createElement('img');
                fetch(`images/${product.image}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error: ${response.status}`);
                        }
    
                        return response.blob();
                    })
                    .then(blob => {
                        const objectURL = URL.createObjectURL(blob);
                        productImg.src = objectURL;
                    })
                // productImg.src = `images/${product.image}`;
                productImg.alt = product.name;
    
                productContainer.append(productName);
                productContainer.append(productPrice);
                productContainer.append(productImg);
            }
        }
    }
    showProducts(products);
    function filterByCategory(products){
        const filteredPro = [];
        const selectedCategory = category.value;

        if(selectedCategory){
            for (const product of products) {
                if(product.type === selectedCategory){
                    filteredPro.push(product)
                }
            }
            return filteredPro;
        } else{
            return products;
        }
    }
    btnFilter.addEventListener('click', (e) =>{
        e.preventDefault();
        mainContainer.replaceChildren();
        let finalProducts = [];
        let searchTermLower = '';
        if (category.value === ""){
            finalProducts = products
        } else{
            finalProducts = filterByCategory(products);
        }

        if (searchTerm.value.trim()){
            searchTermLower = searchTerm.value.toLowerCase();
            finalProducts = finalProducts.filter((product) => product.name.includes(searchTermLower));
        }

        showProducts(finalProducts);
    })


}

