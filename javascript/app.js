//Global variables
const studentsPerPage = document.getElementsByClassName("studentItem cf");
const itemsPerPage = 10;
const divPage = document.querySelector(".page");

const noResultDiv = document.createElement("div");
divPage.appendChild(noResultDiv);

/***  
SHOWS students
***/
const showPage = (list, page) => {
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage - 1;

  for (let i = 0; i < list.length; i++) {
    let li = list[i];
    if (i >= startIndex && i <= endIndex) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  }
};

const appendPageLinks = (list) => {
  const numberOfPages = Math.ceil(list.length / itemsPerPage);

  const div = document.createElement("div");
  div.className = "pagination";
  divPage.appendChild(div);
  const ul = document.createElement("ul");
  div.appendChild(ul);
  const li = ul.children;

  for (let i = 1; i <= numberOfPages; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);
    const a = document.createElement("a");
    li.appendChild(a);
    if (i === 1) {
      a.className = "active";
    }
    a.href = "#";
    a.textContent = i;
  }

  ul.addEventListener("click", (e) => {
    for (let i = 0; i < ul.children.length; i++) {
      const a = li[i].firstElementChild;
      if (a.className === "active") {
        a.classList.remove("active");
      }
    }
    showPage(list, e.target.textContent);
    e.target.className = "active";
  });
};

// Search button and window creation
const addSearch = () => {
  const pageHeader = document.querySelector(".pageHeader");
  const div = document.createElement("div");
  div.className = "studentSearch";
  const search = document.createElement("input");

  search.placeholder = "Search for students...";
  const buttonSearch = document.createElement("button");
  buttonSearch.textContent = "Search";
  pageHeader.appendChild(div);
  div.appendChild(search);
  div.appendChild(buttonSearch);

  buttonSearch.addEventListener("click", (e) => {
    e.preventDefault();
    searchFunction(search, studentsPerPage);
  });
  search.addEventListener("keyup", () => {
    searchFunction(search, studentsPerPage);
  });
};

// Search functionality
const searchFunction = (search, names) => {
  const arr = [];
  noResultDiv.textContent = "";

  for (let i = 0; i < names.length; i++) {
    names[i].style.display = "none";
    let studentName = names[i].querySelector("h3").textContent.toLowerCase();
    let searchContent = search.value.toLowerCase();
    if (searchContent !== 0 && studentName.includes(searchContent)) {
      names[i].style.display = "";
      arr.push(names[i]);
    }
  }
  if (arr.length === 0) {
    noResultDiv.textContent = "No results";
  }
  pageRefresh(arr);
};

const pageRefresh = (arr) => {
  const pageLinks = document.querySelector(".pagination");
  divPage.removeChild(pageLinks);
  showPage(arr, 1);
  appendPageLinks(arr);
};

showPage(studentsPerPage, 1);
appendPageLinks(studentsPerPage);
addSearch();
