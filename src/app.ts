const itemsContainers = document.querySelectorAll(".items-container") as NodeListOf<HTMLDivElement>

let actualContainer: HTMLDivElement,
  actualBtn: HTMLButtonElement,
  actualUL: HTMLUListElement,
  actualForm: HTMLFormElement,
  actualTextInput: HTMLInputElement,
  actualValidation: HTMLSpanElement;

const addContainerListeners = (currentContainer: HTMLDivElement) => {
  
  const currentContainerDeleteBtn = currentContainer.querySelector(".delete-container-btn") as HTMLButtonElement
  const currentAddItemBtn = currentContainer.querySelector('.add-item-btn') as HTMLButtonElement
  const currentCloseFormBtn = currentContainer.querySelector('.close-form-btn') as HTMLButtonElement
  const currentForm = currentContainer.querySelector("form") as HTMLFormElement

  deleteBtnListeners(currentContainerDeleteBtn)
  addItemBtnListeners(currentAddItemBtn)
  closingFormBtnsListeners(currentCloseFormBtn)
  addFormSubmitListeners(currentForm)
  addDragNDropListeners(currentContainer)
}

// Remove Item
const deleteBtnListeners = (btn: HTMLButtonElement) => {
  btn.addEventListener("click", handleContainerDelete)
}
// Add Item
const addItemBtnListeners = (btn: HTMLButtonElement) => {
  btn.addEventListener("click", handleAddItem)
}
// Close Form X
const closingFormBtnsListeners = (btn: HTMLButtonElement) => {
  btn.addEventListener("click", () => toggleForm(actualBtn, actualForm, false))
}
// submit Form
const addFormSubmitListeners = (form: HTMLFormElement) => {
  form.addEventListener("submit", createNewItem)
}

const addDragNDropListeners = (element: HTMLElement) => {
  element.addEventListener("dragstart", handleDragStart)
  element.addEventListener("dragover", handleDragOver)
  element.addEventListener("drop", handleDrop)
  element.addEventListener("dragend", handleDragEnd)
}


const handleContainerDelete = (e: Event) => {
  const btn = e.target as HTMLButtonElement
  const btnsArray = [...document.querySelectorAll(".delete-container-btn")] as HTMLButtonElement[]
  const containers = [...document.querySelectorAll(".items-container")] as HTMLDivElement[]
  containers[btnsArray.indexOf(btn)].remove() 
}

const handleAddItem = (e: Event) => {
  const btn = e.target as HTMLButtonElement
  if(actualContainer) toggleForm(actualBtn, actualForm, false )
  setContainerItem(btn)
  toggleForm(actualBtn, actualForm, true)
}


const toggleForm = (btn:HTMLButtonElement, form:HTMLFormElement, action:Boolean ) => {
  if (!action) {
    form.style.display = "none"
    btn.style.display = "block"
  } else if (action) {
    form.style.display = "block"
    btn.style.display = "none"
  }
}

const setContainerItem = (btn: HTMLButtonElement) => {
  actualBtn = btn
  actualContainer = btn.parentElement as HTMLDivElement
  actualUL = actualContainer.querySelector("ul") as HTMLUListElement
  actualForm = actualContainer.querySelector("form") as HTMLFormElement
  actualTextInput = actualContainer.querySelector("input") as HTMLInputElement
  actualValidation = actualContainer.querySelector(".validation-msg") as HTMLSpanElement
}

const createNewItem = (e: Event) => {
  e.preventDefault()
  // Validation
  if (actualTextInput.value.length === 0) {
    actualValidation.textContent = "Must be at leats 1 charactere long"
    return;
  } else {
    actualValidation.textContent = ""
  }
  // new Item
  const itemContent = actualTextInput.value
  const li = `
  <li class="item" draggable="true">
    <p>${itemContent}</p>
    <button>X</button>
  </li>
  `
  actualUL.insertAdjacentHTML("beforeend", li)
  
  const item = actualUL.lastElementChild as HTMLLIElement
  const liBtn = item.querySelector("button") as HTMLButtonElement
  handleItemDelete(liBtn)
  addDragNDropListeners(item)
  actualTextInput.value = ""
}

const handleItemDelete = (btn: HTMLButtonElement) => {
  btn.addEventListener("click", () => {
    const elToRemove = btn.parentElement as HTMLLIElement
    elToRemove.remove()

  })
}

itemsContainers.forEach((container: HTMLDivElement) => addContainerListeners(container))

// Drag N Drop

let dragSrcEl: HTMLElement

function handleDragStart(this: HTMLElement, e:DragEvent) {
  e.stopPropagation()
  if (actualContainer) toggleForm(actualBtn, actualForm, false)
  dragSrcEl = this
  e.dataTransfer?.setData('text/html', this.innerHTML)
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()

}

function handleDrop(this: HTMLElement, e: DragEvent) {
  e.stopPropagation()
  const receptionEl = this

  if (dragSrcEl.nodeName === "LI" && receptionEl.classList.contains("items-container")) {
    (receptionEl.querySelector("ul") as HTMLUListElement).appendChild(dragSrcEl)
    addDragNDropListeners(dragSrcEl)
    handleItemDelete(dragSrcEl.querySelector("button") as HTMLButtonElement)

  }
  if (dragSrcEl !== this && this.classList[0] === dragSrcEl.classList[0]) {
    dragSrcEl.innerHTML = this.innerHTML
    this.innerHTML = e.dataTransfer?.getData("text/html") as string
    if (this.classList.contains('items-container')) {
      addContainerListeners(this as HTMLDivElement)

      this.querySelectorAll("li").forEach((li: HTMLLIElement) => {
        handleItemDelete(li.querySelector("button") as HTMLButtonElement)
        addDragNDropListeners(li)
      })
    } else {
      addDragNDropListeners(this)
      handleItemDelete(this.querySelector("button") as HTMLButtonElement)
    }
  } 
}

function handleDragEnd(this: HTMLElement, e: DragEvent) {
  e.stopPropagation()
  if (this.classList.contains("items-container")) {
    addContainerListeners(this as HTMLDivElement)
    this.querySelectorAll("li").forEach((li: HTMLLIElement) => {
      handleItemDelete(li.querySelector("button") as HTMLButtonElement)
      addDragNDropListeners(li)
    })
  } else {
    addDragNDropListeners(this)
  }
}

// Add new container

const addContainerBtn = document.querySelector(".add-container-btn") as HTMLButtonElement
const addContainerForm = document.querySelector(".add-new-container form") as HTMLFormElement
const addContainerFormInput = document.querySelector(".add-new-container input") as HTMLInputElement
const validationNewContainer = document.querySelector(".add-new-container .validation-msg") as HTMLSpanElement
const addContainerCloseBtn = document.querySelector(".close-add-list") as HTMLButtonElement
const addNewContainer = document.querySelector(".add-new-container") as HTMLDivElement
const containersList = document.querySelector(".main-content") as HTMLDivElement


addContainerBtn.addEventListener("click", () => toggleForm(addContainerBtn, addContainerForm, true))
addContainerCloseBtn.addEventListener("click", () => toggleForm(addContainerBtn, addContainerForm, false))
addContainerForm.addEventListener("submit",(e) => createNewContainer(e))

const createNewContainer = (e: Event) => {
  e.preventDefault()
  if (addContainerFormInput.value.length === 0) {
    validationNewContainer.textContent = "Must be at leats 1 charactere long"
    return;
  } else {
    validationNewContainer.textContent = ""
  }

  const itemsContainer = document.querySelector(".items-container") as HTMLDivElement  
  const newContainer = itemsContainer.cloneNode() as HTMLDivElement
  const newContainerContent = `
    <div class="top-container">
      <h2>${addContainerFormInput.value}</h2>
      <button class="delete-container-btn">X</button>
    </div>
    <ul></ul>
    <button class="add-item-btn">Add an item</button>
    <form autocomplete="off">
      <div class="top-form-container">
        <label for="item">Add a new item</label>
        <button type="button" class="close-form-btn">X</button>
      </div>
      <input type="text" id="item" />
      <span class="validation-msg"></span>
      <button type="submit">Submit</button>
    </form>
  `
  newContainer.innerHTML = newContainerContent
  containersList.insertBefore(newContainer, addNewContainer)
  addContainerFormInput.value = ""
  addContainerListeners(newContainer)
}
