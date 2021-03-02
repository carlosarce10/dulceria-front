<template>
  <div>
    <header>
      <div class="wrapper">
        <div class="logo">Logo</div>

        <nav>
          <a href="#">Inicio</a>
          <a href="#">Servicios</a>
          <a href="#">Proyectos</a>
          <a href="#">Contacto</a>
        </nav>
      </div>
    </header>
  </div>
</template>

<style >
header {
  width: 100%; /* Establecemos que el header abarque el 100% del documento */
  overflow: hidden; /* Eliminamos errores de float */
  background: #2286c3;
  margin-bottom: 20px;
}

.wrapper {
  margin-left: 1%;
  overflow: hidden; /* Eliminamos errores de float */
}

header .logo {
  color: #f2f2f2;
  font-size: 30px;
  line-height: 100px;
  float: left;
}

header nav {
  float: right;
  line-height: 100px;
}

header nav a {
  display: inline-block;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  line-height: normal;
  font-size: 20px;
  -webkit-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}

header nav a:hover {
  background: #64b5f6;
  border-radius: 50px;
}
</style>