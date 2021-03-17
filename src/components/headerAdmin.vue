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
        <div class="ui grid">
          <div class="computer only row">
            <div class="column">
              <nav>
                <a class="item" href="/Admin">Productos</a>
                <a class="item" href="/Inventario">Inventario</a>
                <a class="item" href="/CajeroAdmin">Cajeros</a>
                <a class="item" href="/Marcas">Marcas</a>
                <a class="item" href="/Categorias">Categorías</a>
                <a class="item" href="/Ventas">Ventas</a>
                <a class="item" href="/Paquetes">Paquetes</a>
                <a class="item" href="/Descuentos">Descuentos</a>
              </nav>
            </div>
          </div>
          <div class="tablet mobile only row">
            <div class="column">
              <div class="menuHamburguesa">
                <a id="mobile_item" class="item"><i class="bars icon"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="ui sidebar vertical menu">
            <a class="item">Menu Item A</a>
            <a class="item">Menu Item B</a>
            <a class="item">Menu Item C</a>
            <a class="item">Menu Item D</a>
          </div>
        </div>
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

/* Menú de hamburguesa */
#content {
  min-height: 100px;
}
.ui.grid {
  padding: 0 !important;
}
.pushable.segment {
  margin: 0 !important;
}
.menuHamburguesa {
  display: flex;
  padding: 10px 20px;
  margin-top: 5%;
  max-width: 60px;
  background: white;
  text-shadow: 1px 1px black;
  float: right;
}
</style>

<script>
/* const $ = require("jquery");
$(".ui.sidebar")
  .sidebar({
    context: $(".ui.pushable.segment"),
    transition: "overlay",
  })
  .sidebar("attach events", "#mobile_item"); */
</script>