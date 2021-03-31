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
              <div>
                <a id="mobile_item" class="item"><i class="bars icon"></i></a>
                <sui-button class="menuHamburguesa" v-on:click="onVisible()" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="ui sidebar vertical menu">
            <sui-sidebar-pushable>
              <sui-menu
                is="sui-sidebar"
                :visible="visible"
                animation="overlay"
                width="thin"
                icon="labeled"
                inverted
                vertical
              >
                <sui-menu-item>
                  <a class="item" href="/Admin">Productos</a>
                </sui-menu-item>
                <sui-menu-item>
                  <a class="item" href="/Inventario">Inventario</a>
                </sui-menu-item>
                <sui-menu-item>
                  <a class="item" href="/CajeroAdmin">Cajeros</a>
                </sui-menu-item>
                <sui-menu-item>
                  <a class="item" href="/Marcas">Marcas</a>
                </sui-menu-item>
                <sui-menu-item>
                  <a class="item" href="/Categorias">Categorías</a>
                </sui-menu-item>
                <sui-menu-item>
                  <a class="item" href="/Ventas">Ventas</a>
                </sui-menu-item>
                <sui-menu-item>
                  <a class="item" href="/Paquetes">Paquetes</a>
                </sui-menu-item>
                <sui-menu-item>
                  <a class="item" href="/Descuentos">Descuentos</a>
                </sui-menu-item>
              </sui-menu>
              <sui-sidebar-pusher>
                <sui-segment>
                  <h3 is="sui-header">Application Content</h3>
                </sui-segment>
              </sui-sidebar-pusher>
            </sui-sidebar-pushable>
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
  display: flex !important;
  padding: 10px 20px !important;
  margin-top: 5% !important;
  max-width: 60px !important;
  background: white !important;
  text-shadow: 1px 1px black !important;
  float: right !important;
}
</style>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onVisible() {
      if (this.visible) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    },
  },
};
</script>