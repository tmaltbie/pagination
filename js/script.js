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
  const ul = createElement('ul')
  const paginationDiv = createElement('div', 'className', 'pagination')
  pageDiv.appendChild(paginationDiv)
  paginationDiv.appendChild(ul)

  // determine how many list items need to be created (ex: 66 items = 7 pages)
  const numOfLI = Math.round(list.length / eachPage)

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
const searchBar = createElement('input')
const searchButton = createElement('button', 'innerHTML', 'Search')
searchBar.setAttribute('placeholder', 'Search for students...')
searchDiv.appendChild(searchBar)
searchDiv.appendChild(searchButton)
pageHeader.appendChild(searchDiv)

// create no results element
const noMatch = createElement('h3', 'textContent', 'No results found... try again')
const pageDiv = document.querySelector('.page')
pageDiv.appendChild(noMatch)
noMatch.style.display = 'none'

const pagination = document.querySelector('.pagination')

/**
 * renderStudents
 * a search filter to reveal students that match search results and hide those that do not
 *
 * @search {object}  - will be a input value
 * @studentList {object}  - list of items to display and hide
 *
 */
// const renderStudents = (search, studentList) => {
//   const searchResults = []
//   const filter = search.value.toLowerCase()
//   // remove the pagination before re-adding it later
//    pageDiv.removeChild(pagination)

//   // loop over studentList
//   for (let i = 0; i < studentList.length; i++) {
//     const students = studentList[i]
//     students.style.display = 'none'
//     const studentsNames = students.querySelector('h3').textContent
//     if (filter.length !== 0 && studentsNames.toLowerCase().includes(filter)) {
//       searchResults.push(students)
//     } else {
//       students.style.display = 'none'
//     }
//   }
//   if (searchResults.length === 0) {
//     noMatch.style.display = ''
//   } else {
//     noMatch.style.display = 'none'
//   } if (searchBar.value === '') {
//     noMatch.style.display = 'none'
//     showPage(listItem, 1)
//     appendPageLinks(listItem)
//   }
//   showPage(searchResults, 1)
//   appendPageLinks(searchResults)
// }

function searchFilter () {
  const filter = searchBar.value.toLowerCase()
  for (let i = 0; i < listItem.length; i++) {
    const students = listItem[i]
    const studentsNames = students.querySelector('h3').textContent
    if (studentsNames.toLowerCase().indexOf(filter) > -1) {
      students.style.display = ''
    } else {
      students.style.display = 'none'
    }
  }
}

function searchPagination() {
  const searchResults = []
  const filter = searchBar.value.toLowerCase()
  for (let i = 0; i < listItem.length; i++) {
    const students = listItem[i]
    const studentsNames = students.querySelector('h3').textContent
    if (filter.length !== 0 && studentsNames.toLowerCase().includes(filter)) {
      searchResults.push(students)
    }
  }
  if (searchResults.length === 0) {
    noMatch.style.display = ''
  } else {
    noMatch.style.display = 'none'
  }
  pagination.innerHTML = ''
  showPage(searchResults, 1)
  appendPageLinks(searchResults)
}

// showPage(listItem, 1)
// appendPageLinks(listItem)

searchBar.addEventListener('keyup', (e) => {
  if (searchBar.value !== '') {
    searchFilter()
    searchPagination()
  } else {
    pagination.innerHTML = ''
    showPage(listItem, 1)
    appendPageLinks(listItem)
  }
})

// searchBar.addEventListener('submit', () => {
//   renderStudents(searchBar, listItem)
// })

// filter.length !== 0 && 
