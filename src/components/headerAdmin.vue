<template>
  <div>
    <header>
      <div class="ui stackable menu mymenu">
        <div  class="item">
          <img class="logo" src="../assets/V1.png"/>
        </div>
        <div class="right menu">
          <a class="item" href="/Admin">Productos</a>
          <a class="item" href="/Inventario">Inventario</a>
          <a class="item" href="/CajeroAdmin">Cajeros</a>
          <a class="item" href="/Marcas">Marcas</a>
          <a class="item" href="/Categorias">Categorías</a>
          <a class="item" href="/Ventas">Ventas</a>
          <a class="item" href="/Paquetes">Paquetes</a>
          <a class="item" href="/Descuentos">Descuentos</a>
          <a class="item" href="/">Salir</a>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped>
.mymenu{
  background: #2286C3 !important;
  border-radius: 0 !important;
}
.item{
  color: white !important;
}
.logo{
  height: 100%;
}

.wrapper {
  margin-left: 1%;
  overflow: hidden; /* Eliminamos errores de float */
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