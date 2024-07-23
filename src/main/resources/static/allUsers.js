// Функция, вызываемая при загрузке страницы
$(async function () {
    await allUsers();
});

// Ссылка на таблицу в HTML
const table = $('#all-user-tbody');

// Функция для получения и отображения всех пользователей
async function allUsers() {
    table.empty(); // Очищаем таблицу перед добавлением новых данных
    try {
        // Запрашиваем список пользователей с сервера
        const response = await fetch("http://localhost:8080/adminProfile");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Обрабатываем каждый пользовательский объект из полученного массива
        data.forEach(user => {
            // Форматируем роли пользователя для отображения
            let roles = user.roles.map(role => role.name.replace('ROLE_', '')).join(" ");

            // Создаем строку таблицы с данными пользователя
            let tableRow = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${roles}</td>
                    <td>
                        <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit"
                        data-action="edit" data-id="${user.id}" data-target="#edit">Edit
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
                        data-action="delete" data-id="${user.id}" data-target="#delete">Delete</button>
                    </td>
                </tr>`;

            // Добавляем созданную строку в таблицу
            table.append(tableRow);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        // Вы можете также добавить обработку ошибок для пользователя, если необходимо
    }
}




