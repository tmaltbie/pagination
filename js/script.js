/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const listItem = document.querySelectorAll('.student-item')
const eachPage = 10
const paginationDiv = document.createElement('div')
const pageDiv = document.querySelector('.page')
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
  paginationDiv.className = 'pagination'
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

showPage(listItem, 1)
appendPageLinks(listItem)

// create a search input with button
const pageHeader = document.querySelector('.page-header')
const searchDiv = createElement('div', 'className', 'student-search')
const searchBar = createElement('input')
const submit = createElement('button', 'innerText', 'Search')
searchDiv.appendChild(searchBar)
searchDiv.appendChild(submit)
pageHeader.appendChild(searchDiv)

// create no results element
const noMatch = createElement('h3', 'textContent', 'No results found... try again')
pageDiv.appendChild(noMatch)
noMatch.style.display = 'none'

const renderSearch = (input, list) => {
  const filter = input.value.toLowerCase()

  for (let i = 0; i < list.length; i++) {
    list[i].style.display = 'none'
    const studentNames = list[i].querySelectorAll('h3')[0]
    const studentText = studentNames.textContent
    if (studentText.toLowerCase().indexOf(filter) > -1) {
      list[i].style.display = ''
    } else {
      list[i].style.display = 'none'
    }
  }
}

searchBar.addEventListener('keyup', () => {
  if (searchBar.value !== '') {
    renderSearch(searchBar, listItem)
  } else {
    paginationDiv.innerHTML = ''
    showPage(listItem, 1)
    appendPageLinks(listItem)
  }
})

// searchBar.addEventListener('submit', (e) => {
//   e.preventDefault()
//   renderSearch(searchBar, listItem)
// })
