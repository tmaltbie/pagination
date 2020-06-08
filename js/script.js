/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const listItem = document.querySelectorAll('.student-item')
const eachPage = 10

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
  const pageDiv = document.querySelector('.page')

  const paginationDiv = createElement('div', 'className', 'pagination')

  const ul = createElement('ul')

  pageDiv.appendChild(paginationDiv)
  paginationDiv.appendChild(ul)

  // determine how many list items need to be created (ex: 66 items = 7 pages)
  const numOfLI = Math.round(list.length / 10)

  for (let i = 0; i <= numOfLI; i++) {
    const li = createElement('li')
    const a = createElement('a', 'textContent', i)
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
      const currentPage = e.target.textContent
      showPage(list, currentPage)
    }
  })
}

// create a search input with button
const pageHeader = document.querySelector('.page-header')

const searchDiv = createElement('div', 'className', 'student-search')

const searchInput = createElement('input')
searchInput.setAttribute('placeholder', 'Search for students...')
searchDiv.appendChild(searchInput)

const searchButton = createElement('button', 'innerHTML', 'Search')
searchDiv.appendChild(searchButton)

pageHeader.appendChild(searchDiv)

// reference to the search input:
const searchBar = document.querySelector('input')

/**
 * renderStudents
 * a search filter to reveal students that match search results and hide those that do not
 *
 * @search {object}  - will be a input value
 * @studentList {object}  - list of items to display and hide
 *
 */
const renderStudents = (search, studentList) => {
  const searchResults = []
  const filter = search.value.toLowerCase()
  const pageDiv = document.querySelector('.page')
  const pagination = document.querySelector('.pagination')
  pageDiv.removeChild(pagination)

  const noMatch = createElement('h3', 'textContent', 'No results found... try again')
  pageDiv.appendChild(noMatch)
  noMatch.style.display = 'none'

  // loop over studentList
  for (let i = 0; i < studentList.length; i++) {
  // variable to reference each individual in studentList at index of i
    const students = studentList[i]
    students.style.display = 'none'
    // reference just the names of the students (avoids emails)
    const names = students.querySelector('h3').textContent
    // if search results are in the list add to array otherwise remove
    if (names.toLowerCase().indexOf(filter) > -1) {
      searchResults.push(students)
    }
  }
  if (searchResults.length === 0) {
    noMatch.style.display = ''
    console.log('problem if more then 1')
  } else {
    noMatch.style.display = 'none'
  }
  showPage(searchResults, 1)
  appendPageLinks(searchResults)
}

// call original two function
showPage(listItem, 1)
appendPageLinks(listItem)
// keyup allows search filter to work in real time
searchBar.addEventListener('keyup', (e) => {
  renderStudents(searchBar, listItem)
})
// submit allows button to also process the input
searchBar.addEventListener('submit', () => {
  renderStudents(searchBar, listItem)
})
