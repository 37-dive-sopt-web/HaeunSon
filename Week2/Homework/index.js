const filterForm = document.getElementById('filter-form');
const nameInput = document.getElementById('name');
const englishNameInput = document.getElementById('english-name');
const githubInput = document.getElementById('github');
const genderSelect = document.getElementById('gender');
const roleSelect = document.getElementById('role');
const codeReviewGroupInput = document.getElementById('code-review-team');
const ageInput = document.getElementById('age');

const tableBody = document.getElementById('member-table-body');
const deleteBtn = document.getElementById('delete-btn');
const selectAll = document.getElementById('select-all');

const addBtn = document.getElementById('add-btn');
const dialog = document.querySelector('dialog');
const closeBtn = document.getElementById('close-btn');

const modalForm = document.getElementById('modal-form');
const nameModalInput = document.getElementById('modal-name');
const englishNameModalInput = document.getElementById('modal-english-name');
const githubModalInput = document.getElementById('modal-github');
const genderModalSelect = document.getElementById('modal-gender');
const roleModalSelect = document.getElementById('modal-role');
const codeReviewGroupModalInput = document.getElementById('modal-code-review-team');
const ageModalInput = document.getElementById('modal-age');

// localStorage에서 멤버 데이터 가져오기
let membersData = JSON.parse(localStorage.getItem('membersData')) || [];

// 열 생성 함수 - 멤버의 각 정보(이름, 영어 이름, 깃허브, ...)를 담은 td
const createCell = (text) => {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}
// 행 생성 함수 - 초기 테이블 출력 및 모달 입력을 통한 추가 시 사용할 로직
const createRow = (obj) => {
    // 행 생성
    const tr = document.createElement('tr');
    // checkbox 열 생성
    const tdCheckbox = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = obj.id;
    // checkbox.className = 'member-checkbox';
    tdCheckbox.appendChild(checkbox);
    
    // 깃허브 바로가기 주소열 생성
    const tdA = document.createElement('td');
    const a = document.createElement('a');
    a.href = `https://github.com/${obj.github}`;
    a.textContent = obj.github;
    a.target = "_blank";
    tdA.appendChild(a);

    tr.appendChild(tdCheckbox);
    tr.appendChild(createCell(obj.name));
    tr.appendChild(createCell(obj.englishName));
    tr.appendChild(tdA);
    tr.appendChild(createCell(obj.gender));
    tr.appendChild(createCell(obj.role));
    tr.appendChild(createCell(obj.codeReviewGroup));
    tr.appendChild(createCell(obj.age));

    tableBody.appendChild(tr);
}
// 테이블 렌더링 함수 - 초기 렌더링, 필터링 결과 렌더링, 초기화 버튼 클릭 시 렌더링에 사용할 로직
const createTable = (memberList) => {
    memberList.forEach((member) => {
        if (memberList.length === 0) return;

        createRow(member);
    })
}

// 초기 진입 시 테이블 렌더링
createTable(membersData);

// 필터링 결과 테이블 렌더링
filterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value;
    const englishName = englishNameInput.value;
    const github = githubInput.value;
    const gender = genderSelect.value;
    const role = roleSelect.value;
    const codeReviewGroup = parseInt(codeReviewGroupInput.value, 10);
    const age = parseInt(ageInput.value, 10);

    const filteredTable = membersData.filter((member) => {
        // 일부만 입력해도 검색 가능하도록 includes 사용
        if(name && !member.name.includes(name)) {
            return false;
        }
        if (englishName && !member.englishName.includes(englishName)) {
            return false;
        }
        if (github && !member.github.includes(github)) {
            return false;
        }
        // role이 all이 아닐 때만 입력값과 멤버 속성 간 비교 진행
        if (gender && gender !== 'all' && member.gender !== gender) {
            return false;
        }
        // gender가 all이 아닐 때만 입력값과 멤버 속성 간 비교 진행
        if (role && role !== 'all' && member.role !== role) {
            return false;
        }
        // codeReviewGroup, age는 정확히 일치해야 하기 때문에 !== 로 비교
        if (codeReviewGroup && member.codeReviewGroup !== codeReviewGroup) {
            return false;
        }
        if (age && member.age !== age) {
            return false;
        }

        return true;
    });

    tableBody.innerHTML = '';
    createTable(filteredTable);
})

// 초기화 버튼 클릭 시 테이블 렌더링
filterForm.addEventListener('reset', () => {
    tableBody.innerHTML = '';
    createTable(membersData);
})

// 선택 삭제
deleteBtn.addEventListener('click', () => {
    const checkedList = document.querySelectorAll('input[type="checkbox"]:not(#select-all):checked');
    const checkedIdList = [...checkedList].map((checked) => Number(checked.value));

    let membersData = JSON.parse(localStorage.getItem('membersData')) || [];
    
    if (checkedIdList.length === 0) return;

    if (selectAll.checked) {
        localStorage.setItem("membersData", JSON.stringify([]));

        selectAll.checked = false;  // 맨 위 체크 박스 선택 해제
        tableBody.innerHTML = '';
    } else {
        const newMembersData = membersData.filter((member) => {
            if (checkedIdList.includes(member.id)) {
                return false;
            }
            return true;
        })

        localStorage.setItem("membersData", JSON.stringify(newMembersData));

        tableBody.innerHTML = '';
        createTable(newMembersData);
    }

})

// --- 체크박스 ---
// 맨위 체크박스 클릭 시 전체 선택 or 전체 해제
selectAll.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all)');


    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
    })
})
// 하나라도 해제되면 맨위 체크박스도 해제 & 모두 선택되면 맨위 체크박스도 선택되는 로직
const checkboxesHandler = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all)');
    const checkedList = document.querySelectorAll('input[type="checkbox"]:not(#select-all):checked');

    if (checkboxes.length === checkedList.length) {
        selectAll.checked = true;
    } else {
        selectAll.checked = false;
    }
}
// 맨위 체크박스를 제외한 모든 체크박스에 onclick 함수 등록 - 이벤트 버블링 이용
tableBody.addEventListener('click', (e) => {
    if (e.target && e.target.type === 'checkbox') {
        checkboxesHandler();
    }
})

// --- 모달 ---
// 추가 버튼 클릭 시 모달창 열기
addBtn.addEventListener('click', () => {
    dialog.showModal();
});
// 닫기 아이콘 클릭 시 모달창 닫기
closeBtn.addEventListener('click', () => {
    dialog.close();
});
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameModalInput.value;
    const englishName = englishNameModalInput.value;
    const github = githubModalInput.value;
    const gender = genderModalSelect.value;
    const role = roleModalSelect.value;
    const codeReviewGroup = parseInt(codeReviewGroupModalInput.value, 10);
    const age = parseInt(ageModalInput.value, 10);

    let membersData = JSON.parse(localStorage.getItem('membersData')) || [];

    const lastId = (membersData.length === 0) ? 1 : membersData[membersData.length - 1].id + 1;

    if (!name || !englishName || !github || !gender || !role || !codeReviewGroup || !age) {
        alert('입력하지 않은 값이 있습니다.');
    } else {
        const newMember = {
            id: lastId,
            name: name,
            englishName: englishName,
            github: github,
            gender: gender,
            role: role,
            codeReviewGroup: codeReviewGroup,
            age: age,
        }

        createRow(newMember);

        membersData.push(newMember);
        localStorage.setItem('membersData', JSON.stringify(membersData));

        dialog.close();
    }
})
