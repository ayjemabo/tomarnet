// 🔹 Hardcoded articles
const homepageArticles = [
  {
    title: "قوة المعرفة",
    url: "articles/article1.html",
    image: "images/article1.jpg",
    description: "المعرفة هي أساس التطور البشري...",
    category: "علم"
  },
  {
    title: "كيف غيّرت الكتب التاريخ",
    url: "articles/article2.html",
    image: "images/article2.jpg",
    description: "منذ اختراع الكتابة...",
    category: "تاريخ"
  },
  {
    title: "أهمية القراءة اليومية",
    url: "articles/article3.html",
    image: "images/article3.jpg",
    description: "خصص عشر دقائق فقط...",
    category: "علم"
  }
];

// 🔹 Fetch additional articles from the Google Sheet
async function fetchArticlesFromFormSheet() {
  const res = await fetch("https://script.google.com/macros/s/AKfycbyzOu2QdWhOuLUD25e2gMLyEQk_kBlEN5GRVnQElpVVHCqX-N0TUNhSfRLBVSnVNJgT/exec");
  const data = await res.json();

  const formArticles = data.map(article => ({
    title: article["عنوان المقال"],
    url: `article.html?id=${article["id"]}`,
    image: article["الرابط إلى صورة (غير الزامي)"] || "images/default.jpg",
    description: article["النص"],
    category: article["التصنيف"]
  }));

  const allArticles = [...homepageArticles, ...formArticles];

  document.getElementById("loadingMessage").style.display = "none";
  showHomepageArticles(allArticles);
}

// 🔹 Show articles on homepage
function showHomepageArticles(articleList) {
  const grid = document.getElementById('homepageArticles');
  if (!grid) return;

  grid.innerHTML = '';

  articleList.forEach(article => {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <h3><a href="${article.url}">${article.title}</a></h3>
      <p>${article.description}</p>
    `;
    grid.appendChild(card);
  });
}

// 🔹 Filtering by category (optional)
function filterArticles(category) {
  showHomepageArticles(
    homepageArticles.filter(article => article.category === category)
  );
}

// 🔹 Show category-specific articles
function showCategoryArticles(categoryName) {
  const grid = document.getElementById("categoryArticles");
  if (!grid) return;

  const filtered = homepageArticles.filter(article => article.category === categoryName);

  grid.innerHTML = "";

  filtered.forEach(article => {
    const card = document.createElement("div");
    card.className = "article-card";
    card.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <h3><a href="${article.url}">${article.title}</a></h3>
      <p>${article.description}</p>
    `;
    grid.appendChild(card);
  });
}

// 🔹 Search
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.search-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = this.search.value.trim();
      showResults(query);
    });
  }

  fetchArticlesFromFormSheet(); // Only load after page is ready
});

function showResults(query) {
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = '';

  const matches = homepageArticles.filter(article =>
    article.title.includes(query) || article.description.includes(query)
  );

  if (matches.length === 0) {
    resultsDiv.innerHTML = "<p>لا توجد نتائج.</p>";
    return;
  }

  matches.forEach(article => {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
      <h3><a href="${article.url}">${article.title}</a></h3>
      <p>${article.description}</p>
    `;
    resultsDiv.appendChild(card);
  });
}
