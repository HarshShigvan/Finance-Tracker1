// Wait for the entire HTML document to be loaded and parsed before running the script.
document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Add a click event listener to the toggle button.
    mobileMenuToggle.addEventListener('click', function() {
        // Toggles the 'active' class on the sidebar to show/hide it on mobile.
        sidebar.classList.toggle('active');
    });

    // --- Theme Toggle ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the theme
    function applyTheme(theme) {
        if (!theme) {
            // If no theme provided, do nothing
            return;
        }
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        } else if (theme === 'light') {
            body.classList.remove('dark-mode');
            themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    }

    // Load theme from localStorage on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Add event listener to theme toggle button
    themeToggleButton.addEventListener('click', function() {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
    
    // --- Month Selection Logic ---
    const monthListItems = document.querySelectorAll('.month-list li');
    
    monthListItems.forEach(item => {
        item.addEventListener('click', function() {
            // First, remove the 'active' class from all month items to reset the state.
            monthListItems.forEach(month => month.classList.remove('active'));
            
            // Then, add the 'active' class to the specific month that was clicked.
            this.classList.add('active');
            
            // Get selected month index
            const selectedMonth = parseInt(this.getAttribute('data-month'));
            
            // Update dashboard data based on selected month
            updateDashboardData(selectedMonth);
        });
    });
    
    // --- Main Menu Item Selection Logic ---
    const menuItems = document.querySelectorAll('.menu-items li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove 'active' class from all menu items.
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            
            // Add 'active' class to the clicked menu item.
            this.classList.add('active');
            
            // Get the selected page from the 'data-page' attribute.
            const selectedPage = this.getAttribute('data-page');
            
            // Call a function to update the page content (currently a placeholder).
            updatePageContent(selectedPage);
        });
    });
    
    // --- Chart.js Initialization ---
    // Get the 2D rendering context for the canvas element.
    const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
    // Create a new line chart instance.
    const incomeExpenseChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Income',
                    data: [35000, 38000, 36000, 40000, 42000, 42500],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4, // Makes the line curved instead of sharp.
                    fill: true
                },
                {
                    label: 'Expenses',
                    data: [25000, 26000, 28000, 24000, 27000, 26000],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true, // Makes the chart responsive to container size.
            maintainAspectRatio: false, // Allows the chart to fill the container's height and width.
            plugins: {
                legend: {
                    position: 'bottom',
                }
            },
            // Configuration for the chart's axes.
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString('en-IN');
                        }
                    }
                }
            }
        }
    });
    
    // --- Main Function to Update Dashboard ---
    // This function is called whenever a new month is selected.
    async function updateDashboardData(monthIndex) {
        try {
            // Fix URL path for API call to include /api prefix
            const response = await fetch(`/api/monthly-data/${monthIndex}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const selectedMonthData = await response.json();

            // --- Update DOM Elements with New Data ---
            // 1. Update the Balance Card
            document.querySelector('.balance-amount').textContent = selectedMonthData.balance;
            const balanceChangeElement = document.querySelector('.balance-change');
            balanceChangeElement.textContent = `${selectedMonthData.balanceChange} from last month`;
            balanceChangeElement.className = `balance-change ${selectedMonthData.balanceDirection}`;

            // Update income goal card
            const goalPercentage = Math.round((selectedMonthData.incomeGoal.current / selectedMonthData.incomeGoal.target) * 100);
            document.querySelector('.goal-info p').textContent = `₹${selectedMonthData.incomeGoal.current.toLocaleString('en-IN')} of ₹${selectedMonthData.incomeGoal.target.toLocaleString('en-IN')}`;
            document.querySelector('.goal-percentage').textContent = `${goalPercentage}%`;
            document.querySelector('.progress').style.width = `${goalPercentage}%`;

            // 3. Update Notifications Card
            // Clear the existing notifications before adding new ones.
            const notificationContainer = document.querySelector('.notification-card .card-body');
            notificationContainer.innerHTML = '';

            selectedMonthData.notifications.forEach(notification => { // Loop through notifications and create HTML for each.
                const notificationItem = document.createElement('div');
                notificationItem.className = 'notification-item';
                notificationItem.innerHTML = `
                    <div class="notification-icon">
                        <i class="fas ${notification.icon}"></i>
                    </div>
                    <div class="notification-info">
                        <h4>${notification.title}</h4>
                        <p>${notification.due}</p>
                    </div>
                    <div class="notification-amount">
                        ${notification.amount}
                    </div>
                `;
                notificationContainer.appendChild(notificationItem);
            });

            // 4. Update Income Sources Card
            // Clear the existing list.
            const incomeSourcesContainer = document.querySelector('.income-sources-list');
            incomeSourcesContainer.innerHTML = '';

            selectedMonthData.incomeSources.forEach(source => { // Loop through sources and create list items.
                const sourceItem = document.createElement('li'); // Using data from the object to set classes and icons.
                sourceItem.innerHTML = `
                    <div class="income-source-icon ${source.iconClass}">
                        <i class="fas ${source.icon}"></i>
                    </div>
                    <div class="income-source-info">
                        <h4>${source.name}</h4>
                        <p>${source.amount}</p>
                    </div>
                `;
                incomeSourcesContainer.appendChild(sourceItem);
            });

            // 5. Update Spending Categories Card
            // Clear the existing categories.
            const spendingCategoriesContainer = document.querySelector('.spending-categories');
            spendingCategoriesContainer.innerHTML = '';

            selectedMonthData.spendingCategories.forEach(category => { // Loop through categories and create HTML elements.
                const categoryItem = document.createElement('div'); // Using data from the object to set classes and icons.
                categoryItem.className = `spending-category ${category.categoryClass}`;
                categoryItem.innerHTML = `
                    <div class="category-icon">
                        <i class="fas ${category.icon}"></i>
                    </div>
                    <h4>${category.name}</h4>
                    <p>${category.amount}</p>
                `;
                spendingCategoriesContainer.appendChild(categoryItem);
            });

            // 6. Update the main line chart with data for the selected month.
            await updateChartData(monthIndex);
        } catch (error) {
            console.error('Error fetching monthly data:', error);
        }
    }
    
    // --- Function to Update Page Content (Placeholder) ---
    function updatePageContent(page) {
        // In a real application, you would fetch and display different content for each page
        console.log(`Switching to ${page} page`);
        
        // For demonstration, we'll just show an alert
        if (page !== 'dashboard') {
            // In a real app, you would load different content here
            // For now, we'll just log the page change
            console.log(`Navigating to ${page} page`);
        }
    }
    
    // --- Function to Update Chart Data ---
    async function updateChartData(monthIndex) {
        try {
            // Fetch chart data from the API
            const response = await fetch(`/api/chart-data/${monthIndex}`);
            const selectedChartData = await response.json();

            // Update the 'data' properties of the chart's datasets.
            incomeExpenseChart.data.datasets[0].data = selectedChartData.income;
            incomeExpenseChart.data.datasets[1].data = selectedChartData.expenses;

            // Redraw the chart with the new data.
            incomeExpenseChart.update();
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    }
    
    // --- Initial Load ---
    // Call the function once on page load to display the data for the default month (January, index 0).
    updateDashboardData(0);
});