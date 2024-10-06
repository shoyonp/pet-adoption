console.log("hello");

// load categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
// load all pets
const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((error) => console.log(error));
};

const displayAllPets = (pets) => {
  const petContainer = document.getElementById("petCard");
  pets.forEach((pet) => {
    console.log(pet);
    const card = document.createElement("div");
    card.classList = "card ";
    card.innerHTML = `
    <div class="border border-gray-400 rounded-xl p-4">
     <figure class="h-[160px]">
    <img
    class="h-full w-full object-cover"
      src="${pet.image}"
      alt="" />
  </figure>
  <div class="card-body px-0">
    <h2 class="card-title">${pet.pet_name}</h2>
    <p class="flex items-center gap-2"><img src="https://img.icons8.com/?size=16&id=68585&format=png"> Breed: ${pet.breed ? pet.breed : "Not available"}</p>
    <p class="flex items-center gap-2"><img class="w-4" src="https://img.icons8.com/?size=24&id=84997&format=png"> Birth: ${pet.date_of_birth? pet.date_of_birth : "Not available"}</p>
    <p class="flex items-center gap-2"><img class="w-4" src="https://img.icons8.com/?size=25&id=2LHzVg3k4AqG&format=png"> Gender: ${pet.gender? pet.gender : "Not available"}</p>
    <p class="flex items-center gap-2"><img class="w-4" src="https://img.icons8.com/?size=24&id=85782&format=png"> Price: ${pet.price}$ </p>
  </div>
  <hr>
  <div class="card-actions flex justify-between mt-3">
      <button class="border border-gray-400 rounded-lg p-2 hover:bg-gray-300"><img src="https://img.icons8.com/?size=24&id=82788&format=png"></button>
      <button class="font-bold text-lg text-[#0E7A81] border border-gray-400 rounded-lg p-2 hover:bg-gray-300">Adopt</button>
      <button class="font-bold text-lg text-[#0E7A81] border border-gray-400 rounded-lg p-2 hover:bg-gray-300">Details</button>
    </div>
  </div>
        `;
    petContainer.append(card);
  });
};

// display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category");

  categories.forEach((item) => {
    const button = document.createElement("button");
    button.innerHTML = `
        <button class="flex items-center gap-2 p-4 font-bold text-2xl border rounded-2xl hover:bg-gray-300"><img class="w-6" src="${item.category_icon}"> ${item.category}</button>
        `;
    categoryContainer.append(button);
  });
};

loadCategories();
loadAllPets();
