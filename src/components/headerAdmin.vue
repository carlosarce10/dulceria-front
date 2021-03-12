<template>
  <div>
    <header>
      <div class="wrapper">
        <div class="logo">
          <img
            style="height: 100px; margin-bottom: -45%"
            src="../assets/V1.png"
            alt=""
          />
        </div>
        <nav>
          <a href="/Admin">Productos</a>
          <a href="/Inventario">Inventario</a>
          <a href="/CajeroAdmin">Cajeros</a>
          <a href="/Marcas">Marcas</a>
          <a href="/Categorias">Categorías</a>
          <a href="/Ventas">Ventas</a>
          <a href="/Paquetes">Paquetes</a>
          <a href="/Descuentos">Descuentos</a>
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
  line-height: 100px;
  float: left;
}

header nav {
  margin-top: 1%;
  line-height: 100px;
  float: right;
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