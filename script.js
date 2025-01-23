// Function to dynamically populate the filter dropdown
function populateFilterOptions() {
    const papersContainer = document.getElementById('papers-summary');
    const papers = Array.from(papersContainer.getElementsByClassName('paper-item'));
    const filterDropdown = document.getElementById('filter-journal');
    const journalTypes = new Set();

    papers.forEach(paper => {
        const journal = paper.getAttribute('data-journal');
        journalTypes.add(journal);
    });

    // Clear existing options
    filterDropdown.innerHTML = '<option value="all">All</option>';

    // Add new options
    journalTypes.forEach(journal => {
        const option = document.createElement('option');
        option.value = journal;
        option.textContent = journal;
        filterDropdown.appendChild(option);
    });
}

// Function to sort papers
function sortPapers() {
    const sortOption = document.getElementById('sort').value;
    const sortOrder = document.getElementById('order').value;
    const papersContainer = document.getElementById('papers-summary');
    const papers = Array.from(papersContainer.getElementsByClassName('paper-item'));

    papers.sort((a, b) => {
        let comparison = 0;
        if (sortOption === 'year') {
            comparison = a.getAttribute('data-year') - b.getAttribute('data-year');
        } else if (sortOption === 'title') {
            comparison = a.getAttribute('data-title').localeCompare(b.getAttribute('data-title'));
        } else if (sortOption === 'journal') {
            comparison = a.getAttribute('data-journal').localeCompare(b.getAttribute('data-journal'));
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });

    papers.forEach(paper => papersContainer.appendChild(paper));
}

// Function to filter papers based on the selected journal
function filterPapers() {
    const filterOption = document.getElementById('filter-journal').value;
    const papersContainer = document.getElementById('papers-summary');
    const papers = Array.from(papersContainer.getElementsByClassName('paper-item'));

    papers.forEach(paper => {
        const journal = paper.getAttribute('data-journal');
        if (filterOption === 'all' || journal === filterOption) {
            paper.style.display = 'block';
        } else {
            paper.style.display = 'none';
        }
    });
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    populateFilterOptions();
    document.getElementById('order').value = 'asc';
    sortPapers();
    filterPapers(); // Ensure the filter is applied on page load
});