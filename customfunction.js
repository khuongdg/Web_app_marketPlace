// Lấy phần tử
const searchInput = document.querySelector('.header__search-input');
const searchButton = document.querySelector('.header__search-btn');
const searchHistoryList = document.querySelector('.header__search-history-list');

// Lấy dữ liệu từ localStorage
function getSearchHistory() {
    return JSON.parse(localStorage.getItem('searchHistory')) || [];
}

// Sự kiện click
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (searchInput.value.trim() !== '') {
        saveSearchTerm(searchInput.value.trim());
    }
});

// Hiển thị lịch sử tìm kiếm
function displaySearchHistory() {
    const history = getSearchHistory();
    searchHistoryList.innerHTML = history.map(item => 
        `<li class="header__search-history-item">
            <a href="#">${item}</a>
        </li>`).join('');
}

// Lưu lịch sử
function saveSearchTerm(term) {
    const history = getSearchHistory();
    if (!history.includes(term)) {
        history.push(term);
        localStorage.setItem('searchHistory', JSON.stringify(history));
        displaySearchHistory();
    }
}

function clearHistory() {
    localStorage.clear(); 
    displaySearchHistory(); 
}

const clearHistoryButton = document.querySelector('.header__clear-history-btn');
clearHistoryButton.addEventListener('mouseleave', clearHistory);

// Lịch sử tìm kiếm khi tải trang
document.addEventListener('DOMContentLoaded', displaySearchHistory);
