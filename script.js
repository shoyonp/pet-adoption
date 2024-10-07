console.log("hello");

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

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

// load category pets
const loadCategoryPets = (category) => {
  document.getElementById("spinner").style.display = "block";
  setTimeout(function () {
    document.getElementById("spinner").style.display = "none";
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${category}`);
        activeBtn.classList.add("active");
        displayAllPets(data.data);
      })
      .catch((error) => console.log(error));
  }, 2000);
};

// load pet details
const loadPetDetails = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayPetDetails(data.petData))
    .catch((error) => console.log(error));
};

// load pet Photos
const loadPetPhotos = (photos) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${photos}`)
    .then((res) => res.json())
    .then((data) => displayPetPhotos(data.petData.image))
    .catch((error) => console.log(error));
};

// countdown modal
const openModal = () => {
  my_modal_2.showModal();
  let countdown = 3;
  document.getElementById("countdownValue").innerText = countdown;

  const countdownInterval = setInterval(() => {
    countdown--;
    document.getElementById("countdownValue").innerText = countdown;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      document.getElementById("close").click();
    }
  }, 1000);
};

// load pets sort by price
const loadShortPets = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  const petPrice = data.pets;
  // console.log(short);
  petPrice.sort((a, b) => b.price - a.price);
  console.log(petPrice);
  displayAllPets(petPrice);
};

// display pet photos
const displayPetPhotos = (photos) => {
  const petPhoto = document.getElementById("photos");
  const div = document.createElement("div");

  div.innerHTML = `
  <div class="p-3"><img class="rounded-lg" src="${photos}"></div>
  `;
  petPhoto.append(div);
};

// display pet details
const displayPetDetails = (petDetails) => {
  const details = document.getElementById("modal-content");
  document.getElementById("my_modal_5").showModal();
  details.innerHTML = `
  <img class="rounded-lg mb-3 w-full" src="${petDetails.image}">
  <h1 class="font-bold text-2xl mb-3" >${petDetails.pet_name}</h1>
 <div class="grid grid-cols-2 gap-2 mb-3">
 <p class="flex items-center text-gray-500 gap-2"><img src="https://img.icons8.com/?size=16&id=68585&format=png"> Breed: ${
   petDetails.breed ? petDetails.breed : "Not available"
 }</p>
    <p class="flex items-center text-gray-500 gap-2"><img class="w-4" src="https://img.icons8.com/?size=24&id=84997&format=png"> Birth: ${
      petDetails.date_of_birth ? petDetails.date_of_birth : "Not available"
    }</p>
    <p class="flex items-center text-gray-500 gap-2"><img class="w-4" src="https://img.icons8.com/?size=32&id=16275&format=png"> Gender: ${
      petDetails.gender ? petDetails.gender : "Not available"
    }</p>
    <p class="flex items-center text-gray-500 gap-2"><img class="w-4" src="https://img.icons8.com/?size=24&id=85782&format=png"> Price: ${
      petDetails.price
    }$ </p>
    <p class="flex items-center text-gray-500 gap-2 mb-3><img class="w-4" src="https://img.icons8.com/?size=24&id=85782&format=png"> Vaccinated status: ${
      petDetails.vaccinated_status
        ? petDetails.vaccinated_status
        : "Not available"
    }</p>
    </div>
    <hr>
    <div class="mt-3"><h2 class="font-semibold text-base mb-3">Details Information</h2>
    <p class="text-gray-500">${petDetails.pet_details}</p>
    </div>
  `;
};

// display all pets
const displayAllPets = (pets) => {
  const petContainer = document.getElementById("petCard");
  petContainer.innerHTML = "";

  if (pets.length == 0) {
    petContainer.classList.remove("grid");
    petContainer.innerHTML = `
     <div>
     <div class="bg-gray-200 border-none rounded-3xl text-center p-8 ">
              <img class="mx-auto mb-6" src="images/error.webp" alt="" />
              <h2 class="font text-3xl mb-6">No Information Available</h2>
              <p class="font-normal text-base text-gray-400 ">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a.
              </p>
          </div></div>
    `;
    return;
  } else {
    petContainer.classList.add("grid");
  }

  pets.forEach((pet) => {
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
    <p class="flex items-center gap-2"><img src="https://img.icons8.com/?size=16&id=68585&format=png"> Breed: ${
      pet.breed ? pet.breed : "Not available"
    }</p>
    <p class="flex items-center gap-2"><img class="w-4" src="https://img.icons8.com/?size=24&id=84997&format=png"> Birth: ${
      pet.date_of_birth ? pet.date_of_birth : "Not available"
    }</p>
    <p class="flex items-center gap-2"><img class="w-4" src="https://img.icons8.com/?size=32&id=16275&format=png"> Gender: ${
      pet.gender ? pet.gender : "Not available"
    }</p>
    <p class="flex items-center gap-2"><img class="w-4" src="https://img.icons8.com/?size=24&id=85782&format=png"> Price: ${
      pet.price
    }$ </p>
  </div>
  <hr>
  <div class="card-actions flex justify-between mt-3 items-center">
      <button onclick="loadPetPhotos(${
        pet.petId
      })" class="border border-gray-400 rounded-lg p-2 hover:bg-gray-300"><img src="https://img.icons8.com/?size=24&id=82788&format=png"></button>
      <button onclick="openModal()" class="font-bold text-lg text-[#0E7A81] border border-gray-400 rounded-lg p-2 hover:bg-gray-300">Adopt</button>
      <button onclick="loadPetDetails(${
        pet.petId
      })" class="font-bold text-lg text-[#0E7A81] border border-gray-400 rounded-lg p-2 hover:bg-gray-300">Details</button>
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
        <button id="btn-${item.category}" onclick="loadCategoryPets('${item.category}')" class="flex items-center gap-2 p-4 font-bold text-2xl border rounded-2xl hover:bg-gray-300 category-btn"><img class="w-6" src="${item.category_icon}"> ${item.category}</button>
        `;
    categoryContainer.append(button);
  });
};

loadCategories();
loadAllPets();
