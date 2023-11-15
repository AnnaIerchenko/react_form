import { useState } from "react";
import "./app.css";
import FormInput from "./components/FormInput";

const App = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Адрес почты",
      errorMessage: "Введите верный адрес почты!",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Пароль",
      errorMessage:
        "Пароль должен состоять из 8-20 знаков и содержать как минимум 1 букву, 1 число и 1 специальный знак!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Подтвердите пароль",
      errorMessage: "Пароль не соответствует!",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async(e) => {
    e.preventDefault();
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({
            values
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }      
        })
        if(response.ok){
           //обработка успешной аутенфикации 
           const data = await response.json()
           console.log(data)
           alert('Вы успешно зарегестрированы!')
           return data
        } else {
           //обработка ошибок Ошибка аутенфикации
          throw new Error('Не удалось авторизоваться')
        }
      } catch (error) {
        //Ошибка при отправке запроса
        alert('Ошибка при отправке запроса', error);
      }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Логин</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Отправить</button>
      </form>
    </div>
  );
};

export default App;
