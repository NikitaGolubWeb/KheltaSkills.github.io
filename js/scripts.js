let kheltaSkills = JSON.parse(localStorage.getItem('kheltaSkills'));
if (kheltaSkills) {
  console.log(kheltaSkills);

  let attributesSection = document.querySelector('#section-attributes');
  let skillsSection = document.querySelector('#section-skills');

  update(kheltaSkills.attribute, attributesSection);
  update(kheltaSkills.skills, skillsSection);
}

function update(groupList, parentNode) {
  let grid = parentNode.querySelector('.grid');
  if (grid) {
    parentNode.removeChild(grid);
  }

  addGroupList(groupList, parentNode);
}

function addGroupList(groupList, parentNode) {
  let grid = document.createElement('div');
  grid.classList.add('grid');
  grid.innerHTML = groupList.map(addSkillGroup).join('');

  parentNode.appendChild(grid);
}


function addSkillGroup(skillGroup) {
  return `<div class='grid__item skill-group tile'>
  <header class='skill-group__header'>
    <h4 class='skill-group__title title title--small'>${ skillGroup.groupName }</h4>
  </header>
    ${ addSkillList(skillGroup.groupSkills) }
  </div>\n`;
}

function addSkillList(skillGroupList) {
  return `<ul class='skill-group__body skill-list'>\n
    ${ skillGroupList.map(addSkill).join('') }
  </ul>\n`;
}

function addSkill(skill) {
  return `<li class='skill-list__item skill'>
  <span class='skill__name'>${ skill.skillName }</span>
  ${ addPointList(skill.skillValue) }
</li>\n`;
}

function addPointList(valuePointActive) {
  let pointList = `<ul class='skill__value point-list'>\n`
  for (let i = 5; i >= 1; i--) {
    pointList += addPoint(i, valuePointActive == i ? true : false);
  }
  pointList += `</ul>\n`;
  return pointList;
}

function addPoint(pointPrice, isActive) {
  return isActive ?
    `<li class='point-list__item ${ 'point-list__item--is-active' }' data-point-price='${ pointPrice }'></li>\n` : 
    `<li class='point-list__item' data-point-price='${ pointPrice }'></li>\n`;
}


let saveAllButton = document.getElementById('save-all-button');
saveAllButton.addEventListener('click', e => {
  e.preventDefault();

  let kheltaSkills = {
    attribute: new Array(),
    skills: new Array()
  };
  
  let attribute = document.querySelector('#section-attributes');
  let skills = document.querySelector('#section-skills');
  
  getKheltaSkills(kheltaSkills.attribute, attribute);
  getKheltaSkills(kheltaSkills.skills, skills);

  localStorage.setItem('kheltaSkills', JSON.stringify(kheltaSkills));
  console.log(JSON.parse(localStorage.getItem('kheltaSkills')));
});

function getKheltaSkills(kheltaProperty, parentNode) {
  let skillGroups = parentNode.querySelectorAll('.skill-group');
  Array.prototype.forEach.call(skillGroups, group => {

    let groupName = group.querySelector('.skill-group__title').textContent;
    let groupSkills = new Array();
    
    let skills = group.querySelectorAll('.skill');
    Array.prototype.forEach.call(skills, skill => {
      
      let skillName = skill.querySelector('.skill__name').textContent;
      let skillValue = skill.querySelector('.skill__value > .point-list__item.point-list__item--is-active')
        ?.getAttribute('data-point-price') ?? 0;
      
        groupSkills.push({ skillName: skillName, skillValue: Number(skillValue) });
    });

    kheltaProperty.push({ groupName: groupName, groupSkills: groupSkills });
  });
}

let pointLists = document.querySelectorAll('.point-list');
Array.prototype.forEach.call(pointLists, pointList => {
  
  let points = pointList.querySelectorAll('.point-list__item');
  Array.prototype.forEach.call(points, point => {

    point.addEventListener('click', e => {

      Array.prototype.forEach.call(points, p => {
        if (p.classList.contains('point-list__item--is-active') && p !== point) {
          p.classList.remove('point-list__item--is-active');
        }

        point.classList.toggle('point-list__item--is-active');
      });
    });
  });
});

let dropdowns = document.querySelectorAll('.dropdown');
Array.prototype.forEach.call(dropdowns, dropdown => {
  
  let dropdownToggle = dropdown.querySelector('.dropdown__toggle');
  dropdownToggle.addEventListener('click', e => {

    Array.prototype.forEach.call(dropdowns, d => {
      if (d !== dropdown) {
        d.classList.remove('dropdown--is-open');
      } else {
        dropdown.classList.toggle('dropdown--is-open');
      }
    });
  });
});