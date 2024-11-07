const tabs = document.querySelectorAll('.tab');
const tabContent = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = document.getElementById(tab.dataset.tab);

    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    tabContent.forEach(content => {
      content.classList.remove('active');
    });

    tab.classList.add('active');
    targetTab.classList.add('active');
  });
});