// Lấy phần tử
const searchInput = document.querySelector('.header__search-input');
const searchButton = document.querySelector('.header__search-btn');
const searchHistoryList = document.querySelector('.header__search-history-list');
const removeButtons = document.querySelectorAll('.header__search-remove-btn');

// Lấy dữ liệu từ localStorage
function getSearchHistory() {
    return JSON.parse(localStorage.getItem('searchHistory')) || [];
}

// Hiển thị lịch sử tìm kiếm
function displaySearchHistory() {
    const history = getSearchHistory();
    searchHistoryList.innerHTML = history.map(item => 
        `<li class="header__search-history-item">
            <a href="#">${item}</a>
            <button class="header__search-remove-btn" data-item="${item}">
                <i class="header__search-remove-btn-icon fa-solid fa-x"></i>
            </button>
        </li>`).join('');

    // Gắn sự kiện click cho từng nút xóa
    removeButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const item = this.getAttribute('data-item');
            removeSearchItem(item);
        });
    });
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

// Xóa một mục từ lịch sử
function removeSearchItem(item) {
    let history = getSearchHistory();
    const index = history.indexOf(item);
    if (index !== -1) {
        history.splice(index, 1);
        localStorage.setItem('searchHistory', JSON.stringify(history));
        displaySearchHistory();
    }
}

// Sự kiện click
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (searchInput.value.trim() !== '') {
        saveSearchTerm(searchInput.value.trim());
    }
});

// Lịch sử tìm kiếm khi tải trang
document.addEventListener('DOMContentLoaded', displaySearchHistory);
