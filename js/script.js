/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const listItem = document.querySelectorAll('.student-item') // grabs list of students from HTML
const eachPage = 10 // sets number of students to show per page
const pageDiv = document.querySelector('.page') // wraps the page-header and student-list ul
const paginationDiv = createElement('div', 'className', 'pagination') // creates pagination div for "links"
let searchResults // for an empty array to hold search results
/**
 * createElement
 * creates elements with a property and a value and returns the element
 *
 * @elementName {object} - type of element, ex: li
 * @property {object} - element property, ex: elementName.innerText
 * @value {object} - property value, ex: element[property] = 'No results found'
 *
 */
function createElement (elementName, property, value) {
  const element = document.createElement(elementName)
  element[property] = value
  return element
}

/**
 * showPage
 * creates the pcessary amount of pages
 *
 * @list {object} - takes a list to iterate over and display list items
 * @page {number} - determines how many items are on each page
 *
 */
const showPage = (list, page) => {
  const startIndex = (page * eachPage) - eachPage
  const endIndex = (page * eachPage)
  for (let i = 0; i < list.length; i++) {
    const listIndex = list[i]
    if (i >= startIndex && i < endIndex) {
      listIndex.style.display = ''
    } else {
      listIndex.style.display = 'none'
    }
  }
}

/**
 * appendPageLinks
 * creates the pagination
 *
 * @list {object} - takes a list (NodeList or Array) to iterate over
 * in order create and append elements to the DOM based on number of students (list items)
 *
 */
const appendPageLinks = (list) => {
  const numOfLI = Math.ceil(list.length / eachPage)
  const ul = createElement('ul')
  pageDiv.appendChild(paginationDiv)
  paginationDiv.appendChild(ul)

  for (let i = 0; i < numOfLI; i++) {
    const li = createElement('li')
    const a = createElement('a')
    ul.appendChild(li)
    li.appendChild(a)

    a.href = '#'
    a.textContent = i + 1

    if (i === 0) {
      a.className = 'active'
    }
  }

  paginationDiv.addEventListener('click', (e) => {
    const anchor = document.querySelectorAll('a')
    if (e.target.tagName === 'A') {
      for (let i = 0; i < anchor.length; i++) {
        const anchors = anchor[i]
        anchors.className = 'none'
      }
      e.target.className = 'active'
      showPage(list, e.target.textContent)
    }
  })
}

showPage(listItem, 1) // call show page function with student list and first page number as paramters
appendPageLinks(listItem) // calls function in order to create necessary number of links

// create a search input with button
const pageHeader = document.querySelector('.page-header') // selectes the header
const searchDiv = createElement('div', 'className', 'student-search') // creates div with class name
const searchBar = createElement('input') // creates search bar input
const submit = createElement('button', 'innerText', 'Search') // creates submit button with text
searchDiv.appendChild(searchBar) // appends searchBar div to the .student-search div
searchDiv.appendChild(submit) // appends button to .student-search div
pageHeader.appendChild(searchDiv) // appends whole thing inside of header

// creates/styles+hides/appends No Results text element
const noMatch = createElement('h3', 'textContent', 'No results found... try again')
noMatch.style.color = '#4ba6c3'
noMatch.style.fontWeight = 'bold'
noMatch.style.display = 'none'
pageDiv.appendChild(noMatch)

const renderSearch = (input, studentList) => {
  const filter = input.value.toLowerCase() // variable references the string value in the input search bar, sets to lower case
  searchResults = [] // array to store search matches, it reset each time renderSearch is called b/c it is inside the function

  pageDiv.removeChild(paginationDiv) // deletes pagination from DOM in order to re-paginate later
  // paginationDiv.innerHTML = '' // clears pagination DIV, does similar removeChild above - remove

  for (let i = 0; i < studentList.length; i++) { // will loop over a list, student-items
    const students = studentList[i] // references each individual student
    const studentNames = document.querySelectorAll('.student-details h3') // grabs each individual students' names
    students.style.display = 'none' // hide students so they can be re-added and paginated again soon
    if (filter.length !== 0 && studentNames[i].textContent.toLowerCase().includes(filter)) { // if the filter isn't empty AND students' names match what is typed into the search input
      searchResults.push(students)
      noMatch.style.display = 'none' // push the results into array searchResults
    } else if (searchResults.length === 0) { // if search input is empty
      noMatch.style.display = '' // show the no match text
    }
  }
  paginationDiv.innerHTML = '' // empty the pagination div before appending based on new search results
  showPage(searchResults, 1) // show appropriate number of pages based on search results
  appendPageLinks(searchResults) // append paginate links based on search results
}

searchBar.addEventListener('keyup', (e) => { // anytime the search bar
  e.preventDefault()
  if (searchBar.value !== '') { // if the search input is NOT empty, update student list based on function
    renderSearch(searchBar, listItem) // functioning search bar
  } else { // otherwise, if the search IS empty:
    paginationDiv.innerHTML = '' // empty the pagination div of all content
    showPage(listItem, 1) // call original page function for original set of students
    appendPageLinks(listItem) // call links function for original amount of pages required
  }
})

searchBar.addEventListener('submit', (e) => { // search by submitting the input
  e.preventDefault() // prevents website from refreshing
  renderSearch(searchBar, listItem) // calls the search funtion
})
