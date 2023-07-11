      // Get DOM elements
      const myForm = document.querySelector('#my-form');
      const nameInput = document.querySelector('#name');
      const emailInput = document.querySelector('#email');
      const phoneInput = document.querySelector('#phone');
      const btn = document.querySelector('.btn');

      // Event listeners
      myForm.addEventListener('submit', onSubmit);

      // Load existing users from cloud storage on page load
      window.addEventListener('DOMContentLoaded', () => {
        axios.get("https://crudcrud.com/api/5af870d6289e423db64a09d967e415e5/Appointmentdata")
          .then((response) => {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
              showUsersOnScreen(response.data[i]);
            }
          })
          .catch((err) => {
            console.log(err);
          })
      });

      function onSubmit(e) {
        e.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;

        if (name === '' || email === '' || phone === '') {
          showMessage('Please enter all fields.', 'error');
          return;
        }

        const newUser = {
          name,
          email,
          phone
        };

        axios.post("https://crudcrud.com/api/5af870d6289e423db64a09d967e415e5/Appointmentdata", newUser)
          .then((response) => {
            showUsersOnScreen(response.data)
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          })

        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';

        showMessage('Form submitted successfully!');
      }

      function showUsersOnScreen(newUser) {
        const parentEle = document.getElementById('listOfItems');
        const childEle = document.createElement('li');
        childEle.textContent = newUser.name + ' - ' + newUser.email + ' - ' + newUser.phone;
        parentEle.appendChild(childEle);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteUser(newUser._id, childEle);
        });
        childEle.appendChild(deleteButton);

        newUser.listItem = childEle;
      }

      function deleteUser(id, listItem) {
        axios.delete(`https://crudcrud.com/api/5af870d6289e423db64a09d967e415e5/Appointmentdata/${id}`)
          .then((response) => {
            listItem.remove();
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }


      
      function showMessage(message, type = 'success') {
        const msg = document.querySelector('.msg');
        msg.classList.remove('error', 'success');
        msg.classList.add(type);
        msg.innerHTML = message;

        setTimeout(() => {
          msg.innerHTML = '';
        }, 5000);
      }