document.querySelectorAll('.cf-item').forEach(function (facultyCard) {
    const nameElement = facultyCard.querySelector('.profile-info .headline2');
    const designationElement = facultyCard.querySelector('.profile-info .headline6');

    if (nameElement) {
        const name = nameElement.innerText.trim();
        const designation = designationElement ? designationElement.innerText.trim() : 'N/A';

        facultyCard.addEventListener('click', function () {
            if (typeof utag !== 'undefined' && utag.link) {
                utag.link({
                    event_name: "link_click",
                    type: "faculty_click",
                    placement: "Page Tab",
                    designation: designation,
                    name: name,
                    source: "faculty_card_click"
                });
            }
        });
    }
});
