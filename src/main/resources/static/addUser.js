$(async function () {
    await newUser();
});

async function newUser() {
    await fetch("http://localhost:8080/adminProfile/roles")
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let el = document.createElement('option');
                el.text = role.name.substring(5);
                el.value = role.id
                $('#new-userRole')[0].appendChild(el);
            })
        })
}

$(async function () {
    await addUser();
});

async function addUser() {
    const addForm = document.forms["newUserForm"];
    addForm.addEventListener("submit", async ev => {
        ev.preventDefault();
        const roles = addForm.roles.options;
        let rolesList = [];
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].selected) rolesList.push({
                id: roles[i].value,
                name: "ROLE_" + roles[i].text
            });
        }
        let body = JSON.stringify({
            id: addForm.id.value,
            username: addForm.username.value,
            email: addForm.email.value,
            password: addForm.password.value,
            roles: rolesList
        })
        console.log(body)
        await fetch("localhost:8080/adminProfile/newUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(() => {
                addForm.reset();
                allUsers();
                $('#nav-adminTable').click();
            })
    })
}



