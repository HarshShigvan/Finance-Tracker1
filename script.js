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
    function updateDashboardData(monthIndex) {
        // This array holds all the data for each month. In a real app, this would likely come from an API.
        const monthlyData = [ // Data is structured with presentation info (icons, classes) for easier rendering.
            { // January
                balance: '₹3,45,680.50',
                balanceChange: '+2.5%',
                balanceDirection: 'positive',
                incomeGoal: { current: 42500, target: 50000 },
                notifications: [
                    { title: 'Electricity Bill', due: 'Due in 3 days', amount: '₹2,450' },
                    { title: 'Internet Bill', due: 'Due in 5 days', amount: '₹1,200' },
                    { title: 'Mobile Recharge', due: 'Due in 7 days', amount: '₹599' }
                ],
                incomeSources: [
                    { name: 'Salary', amount: '₹35,000' },
                    { name: 'Freelance', amount: '₹7,500' },
                    { name: 'Investment', amount: '₹5,000' }
                ],
                spendingCategories: [
                    { name: 'Housing', amount: '₹12,000' },
                    { name: 'Personal', amount: '₹8,500' },
                    { name: 'Transportation', amount: '₹5,200' }
                ]
            },
            { // February
                balance: '₹3,78,920.75',
                balanceChange: '+3.2%',
                balanceDirection: 'positive',
                incomeGoal: { current: 48000, target: 50000 },
                notifications: [
                    { title: 'Credit Card', due: 'Due in 2 days', amount: '₹5,400' },
                    { title: 'Water Bill', due: 'Due in 4 days', amount: '₹850' }
                ],
                incomeSources: [
                    { name: 'Salary', amount: '₹38,000' },
                    { name: 'Freelance', amount: '₹8,000' },
                    { name: 'Investment', amount: '₹2,000' }
                ],
                spendingCategories: [
                    { name: 'Housing', amount: '₹12,000' },
                    { name: 'Personal', amount: '₹9,200' },
                    { name: 'Transportation', amount: '₹5,800' }
                ]
            },
            { // March
                balance: '₹3,56,420.30',
                balanceChange: '-1.2%',
                balanceDirection: 'negative',
                incomeGoal: { current: 36000, target: 50000 },
                notifications: [
                    { title: 'Insurance Premium', due: 'Due in 5 days', amount: '₹8,500' },
                    { title: 'Internet Bill', due: 'Due in 7 days', amount: '₹1,200' }
                ],
                incomeSources: [
                    { name: 'Salary', amount: '₹36,000' },
                    { name: 'Freelance', amount: '₹0' },
                    { name: 'Investment', amount: '₹0' }
                ],
                spendingCategories: [
                    { name: 'Housing', amount: '₹12,000' },
                    { name: 'Personal', amount: '₹10,500' },
                    { name: 'Transportation', amount: '₹6,200' }
                ]
            },
            { // April
                balance: '₹4,12,350.80',
                balanceChange: '+5.8%',
                balanceDirection: 'positive',
                incomeGoal: { current: 50000, target: 50000 },
                notifications: [
                    { title: 'Electricity Bill', due: 'Due in 3 days', amount: '₹2,750' },
                    { title: 'Mobile Recharge', due: 'Due in 5 days', amount: '₹599' }
                ],
                incomeSources: [
                    { name: 'Salary', amount: '₹40,000' },
                    { name: 'Freelance', amount: '₹8,000' },
                    { name: 'Investment', amount: '₹2,000' }
                ],
                spendingCategories: [
                    { name: 'Housing', amount: '₹12,000' },
                    { name: 'Personal', amount: '₹7,500' },
                    { name: 'Transportation', amount: '₹4,500' }
                ]
            },
            { // May
                balance: '₹4,38,760.45',
                balanceChange: '+3.1%',
                balanceDirection: 'positive',
                incomeGoal: { current: 52000, target: 50000 },
                notifications: [
                    { title: 'Credit Card', due: 'Due in 2 days', amount: '₹6,200' },
                    { title: 'Water Bill', due: 'Due in 6 days', amount: '₹850' }
                ],
                incomeSources: [
                    { name: 'Salary', amount: '₹42,000' },
                    { name: 'Freelance', amount: '₹8,000' },
                    { name: 'Investment', amount: '₹2,000' }
                ],
                spendingCategories: [
                    { name: 'Housing', amount: '₹12,000' },
                    { name: 'Personal', amount: '₹9,000' },
                    { name: 'Transportation', amount: '₹5,000' }
                ]
            },
            { // June
                balance: '₹4,65,890.20',
                balanceChange: '+2.8%',
                balanceDirection: 'positive',
                incomeGoal: { current: 42500, target: 50000 },
                notifications: [
                    { title: 'Electricity Bill', due: 'Due in 3 days', amount: '₹2,950' },
                    { title: 'Internet Bill', due: 'Due in 5 days', amount: '₹1,200' },
                    { title: 'Mobile Recharge', due: 'Due in 7 days', amount: '₹599' }
                ],
                incomeSources: [
                    { name: 'Salary', amount: '₹35,000' },
                    { name: 'Freelance', amount: '₹7,500' },
                    { name: 'Investment', amount: '₹0' }
                ],
                spendingCategories: [
                    { name: 'Housing', amount: '₹12,000' },
                    { name: 'Personal', amount: '₹8,500' },
                    { name: 'Transportation', amount: '₹5,200' }
                ]
            },
            // July to December data would follow the same pattern
        ];
        
        // Select the data for the chosen month. Defaults to the first month if the index is invalid.
        const selectedMonthData = monthlyData[monthIndex] || monthlyData[0];
        
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
        updateChartData(monthIndex);
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
    function updateChartData(monthIndex) {
        // This array holds the specific income/expense data for the line chart for each month.
        const chartData = [
            { // January
                income: [35000, 38000, 36000, 40000, 42000, 42500],
                expenses: [25000, 26000, 28000, 24000, 27000, 26000]
            },
            { // February
                income: [38000, 39000, 40000, 41000, 42000, 48000],
                expenses: [26000, 27000, 25000, 28000, 26000, 27000]
            },
            { // March
                income: [36000, 37000, 35000, 38000, 36000, 36000],
                expenses: [28000, 29000, 30000, 27000, 28000, 29000]
            },
            { // April
                income: [40000, 41000, 42000, 43000, 44000, 50000],
                expenses: [24000, 23000, 25000, 26000, 24000, 25000]
            },
            { // May
                income: [42000, 43000, 44000, 45000, 46000, 52000],
                expenses: [27000, 26000, 28000, 29000, 27000, 28000]
            },
            { // June
                income: [42500, 43000, 42000, 44000, 43000, 42500],
                expenses: [26000, 27000, 25000, 28000, 26000, 27000]
            }
        ];
        
        // Get the chart data for the selected month.
        const selectedChartData = chartData[monthIndex] || chartData[0];
        
        // Update the 'data' properties of the chart's datasets.
        incomeExpenseChart.data.datasets[0].data = selectedChartData.income;
        incomeExpenseChart.data.datasets[1].data = selectedChartData.expenses;
        
        // Redraw the chart with the new data.
        incomeExpenseChart.update();
    }
    
    // --- Initial Load ---
    // Call the function once on page load to display the data for the default month (January, index 0).
    updateDashboardData(0);
});