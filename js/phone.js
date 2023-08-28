const loadPhone = async(searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) =>{
    // get Element for set innerHtml or innerText
    const phoneContainer = document.getElementById('phone-container');
    //clear phone container cards before adding new cards
    phoneContainer.innerText = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
if(phones.length > 12 && !isShowAll){
  showAllContainer.classList.remove('hidden')
} else{
  showAllContainer.classList.add('hidden')
}

    //display only first 12 phones  if not show All
    if(!isShowAll){
      phones = phones.slice(0,12);
    }
    phones.forEach(phone =>{
        console.log(phone);
        //2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl`
        //3 set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
          </div>
        </div>
        `;
        // 4. append Child
        phoneContainer.appendChild(phoneCard);
    })
    //hide loading spinner when product already displayed
    toggleLoadingSpinner(false)
}
//
const handleShowDetails = async (id) => {
  //load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
  console.log(phone);
//show the modal
const phoneName = document.getElementById('show-detail-phone-name');
phoneName.innerText = phone.name;
const showDetailContainer = document.getElementById('show-detail-container');
showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt=""//>
  <P> <span>${phone?.mainFeatures?.storage}</span> </P>
`
show_details_modal.showModal()
}

// handle search button
const handleSearch = (isShowAll)=>{
    toggleLoadingSpinner(true)
    const serachField = document.getElementById('search-field');
    const searchText = serachField.value
    console.log(searchText);
    loadPhone(searchText, isShowAll)
}

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  } else{
    loadingSpinner.classList.add('hidden')
  }
};

//handle show all
const handleShowAll = () =>{
handleSearch(true)
} 

loadPhone();