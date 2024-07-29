function skillsMember() {
    const member = document.querySelector('.member');
    const memberSkills = document.querySelector('.member-skills');

    member.addEventListener('click', () => {
        memberSkills.classList.toggle('active');
    });
}