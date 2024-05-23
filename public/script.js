const URL_BASE = 'http://localhost:3000';

const getProducts = async () => {
  try {
    const response = await fetch(`${URL_BASE}/getProducts`);
    const { data } = await response.json();
    let content = '';
    for (const product of data) {
      content += `
        <div class="box">
          <p><span>Nombre:</span> ${product.name}</p>
          <p><span>Categoría:</span> ${product.category}</p>
          <p><span>Descripción:</span> ${product.description}</p>
          <p><span>Precio:</span> ${product.price}</p>
          <button class="update-btn" data-id="${product.id}">Actualizar</button>
          <button class="delete-btn" data-id="${product.id}">Eliminar</button>
        </div>
      `;
    }
    document.getElementById('main_list').innerHTML = content;
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  try {
    const response = await fetch(`${URL_BASE}/createProduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category, description, price }),
    });
    const { message } = await response.json();
    console.log(message);
    getProducts();
  } catch (error) {
    console.log(error);
  }
};

document.getElementById('create-form').addEventListener('submit', createProduct);

getProducts();
