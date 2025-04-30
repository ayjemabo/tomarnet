// Articles data
const articles = [
    {
      title: "قوة المعرفة",
      url: "articles/article1.html",
      description: "المعرفة هي أساس التطور البشري، وكل تقدم يبدأ بفكرة..."
    },
    {
      title: "كيف غيّرت الكتب التاريخ",
      url: "articles/article2.html",
      description: "منذ اختراع الكتابة والكتب تكتب تاريخ البشرية وتحفظ تراثها..."
    },
    {
      title: "أهمية القراءة اليومية",
      url: "articles/article3.html",
      description: "خصص عشر دقائق فقط يوميًا، وستبني عادة تقودك للمعرفة الواسعة..."
    }
  ];
  
  // Handle form submit
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.search-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = this.search.value.trim();
      showResults(query);
    });
  });
  
  function showResults(query) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';
  
    const matches = articles.filter(article =>
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

  // Homepage article data
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
  

  function showHomepageArticles(category = 'all') {
    const grid = document.getElementById('homepageArticles');
    if (!grid) return;
  
    grid.innerHTML = '';
  
    const filtered = category === 'all'
      ? homepageArticles
      : homepageArticles.filter(article => article.category === category);
  
    filtered.forEach(article => {
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
  function filterArticles(category) {
    showHomepageArticles(category);
  }
  
  

  document.addEventListener('DOMContentLoaded', function () {
    showHomepageArticles();
  });
  