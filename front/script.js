$(document).ready(function () {
    // Manipule o envio do formulário de registro
    $('#registerForm').submit(function (e) {
      e.preventDefault();
      const username = $('#registerUsername').val();
      const password = $('#registerPassword').val();
      registerUser(username, password);
    });
  
    // Manipule o envio do formulário de login
    $('#loginForm').submit(function (e) {
      e.preventDefault();
      const username = $('#loginUsername').val();
      const password = $('#loginPassword').val();
      loginUser(username, password);
    });
  });
  
  // Função para registrar um usuário
  function registerUser(username, password) {
    $.ajax({
      url: '/register',
      type: 'POST',
      data: {
        login: username,
        senha: password,
        email: '',
      },
      success: function (response) {
        showResult('Usuário registrado com sucesso');
      },
      error: function (error) {
        showResult('Erro ao registrar usuário');
      },
    });
  }
  
  // Função para fazer o login
  function loginUser(username, password) {
    $.ajax({
      url: '/login',
      type: 'POST',
      data: {
        login: username,
        senha: password,
      },
      success: function (response) {
        const token = response.token;
        showResult('Login realizado com sucesso');
        // Faça o que desejar com o token (por exemplo, salvar em local storage)
      },
      error: function (error) {
        showResult('Erro ao fazer login');
      },
    });
  }
  
  // Função para exibir o resultado
  function showResult(message) {
    const resultDiv = $('#result');
    resultDiv.text(message);
    resultDiv.show();
  }
  